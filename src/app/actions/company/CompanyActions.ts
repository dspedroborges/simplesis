"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { encryptPassword, getSession } from "@/auth";

type PlanType = "MONTHLY" | "QUATERLY" | "SEMI_ANNUAL";

export async function getLoggedCompanyId() {
    const session = await getSession();

    if (!session) return false;

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            company: true,
        }
    });

    if (!user || !user.company) return false;

    return user.company.id;
}

export async function createCompany(previousState: { message: string, error: boolean }, formData: FormData) {
    const username = formData.get("username") as string;
    const companyName = formData.get("companyName") as string;
    const email = formData.get("email") as string;
    const tel = formData.get("tel") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;

    if (!(username && companyName && email && tel && password)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    if (password !== passwordConfirmation) {
        return {
            message: "Senhas diferentes.",
            error: true
        }
    }

    const checkUser = await prisma.user.count({
        where: {
            OR: [
                {
                    username,
                },
            ]
        }
    });

    if (checkUser > 0) {
        return {
            message: "Já existe um usuário cadastrado com esse nome de usuário.",
            error: true
        }
    }

    const checkCompany = await prisma.company.count({
        where: {
            OR: [
                {
                    tel
                },
                {
                    email
                },
                {
                    companyName
                }
            ]
        }
    });

    if (checkCompany > 0) {
        return {
            message: "Já existe um afiliado cadastro com esse email, telefone ou nome de empresa",
            error: true
        }
    }

    await prisma.user.create({
        data: {
            username,
            password: await encryptPassword(password),
            role: "COMPANY",
            company: {
                create: {
                    companyName,
                    tel,
                    email,
                }
            }
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Empresa criada com sucesso.",
        error: false
    }
}

export async function updateCompany(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    const idFromLoggedCompany = String(gottenId);

    let companyData = await prisma.company.findUnique({
        where: {
            id: idFromLoggedCompany
        },
        include: {
            user: true,
        }
    });

    if (!companyData) {
        const id = formData.get("id") as string;
        companyData = await prisma.company.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        });
    }

    if (!companyData) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }

    const session = await getSession();

    const username = formData.get("username") as string;
    const companyName = formData.get("companyName") as string;
    const email = formData.get("email") as string;
    const tel = formData.get("tel") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;
    const plan = formData.get("plan") as string;

    if (!(username && companyName && email && tel)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    if (password) {
        if (password !== passwordConfirmation) {
            return {
                message: "Senhas diferentes.",
                error: true
            }
        }
    }

    let checkUser = 0;
    if (username !== companyData.user.username) {
        checkUser = await prisma.user.count({
            where: {
                username
            }
        });
    }

    if (checkUser > 0) {
        return {
            message: "Já existe um usuário cadastrado com esse nome de usuário.",
            error: true
        }
    }

    let checkTel = 0, checkEmail = 0, checkCompanyName = 0;

    if (tel !== companyData?.tel) {
        checkTel = await prisma.company.count({
            where: {
                tel
            }
        });
    }

    if (email !== companyData?.email) {
        checkEmail = await prisma.company.count({
            where: {
                email
            }
        });
    }

    if (companyName !== companyData?.companyName) {
        checkCompanyName = await prisma.company.count({
            where: {
                companyName
            }
        });
    }

    if (checkTel > 0) {
        return {
            message: "Já existe uma empresa com esse telefone.",
            error: true
        }
    }

    if (checkEmail > 0) {
        return {
            message: "Já existe uma empresa com esse email.",
            error: true
        }
    }

    if (checkCompanyName > 0) {
        return {
            message: "Já existe uma empresa com esse nome de empresa.",
            error: true
        }
    }

    console.log(session);

    if (session.user.id === "admin" && session.user.role === "ADMIN") {
        console.log("ADMIN");

        const payment = await prisma.payment.findFirst({
            where: {
                companyId: companyData?.id,
                paymentConfirmed: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        console.log({payment});
        console.log(plan);

        if (plan && !payment) {
            const currentDate = new Date();
            const expiresAt = new Date(currentDate);
            let invalidPlan = false;
            switch (plan) {
                case "MONTHLY":
                    expiresAt.setDate(currentDate.getDate() + 30);
                    break;
                case "QUATERLY":
                    expiresAt.setDate(currentDate.getDate() + 90);
                    break;
                case "SEMI_ANNUAL":
                    expiresAt.setDate(currentDate.getDate() + 180);
                    break;
                default:
                    invalidPlan = true;
            }

            console.log({invalidPlan})

            if (!invalidPlan) {
                await prisma.payment.create({
                    data: {
                        expiresAt,
                        plan: plan as PlanType,
                        companyId: String(companyData?.id),
                        paymentConfirmed: true,
                    }
                });
            } else if (plan === "NO_PLAN") {
                await prisma.payment.deleteMany({
                    where: {
                        companyId: companyData?.id
                    }
                });
            }
        }
    }

    if (password) {
        await prisma.user.update({
            where: {
                id: companyData?.user.id
            },
            data: {
                username,
                password: await encryptPassword(password),
                role: "COMPANY",
                company: {
                    update: {
                        companyName,
                        tel,
                        email,
                    }
                }
            },
        })
    } else {
        await prisma.user.update({
            where: {
                id: companyData?.user.id
            },
            data: {
                username,
                role: "COMPANY",
                company: {
                    update: {
                        companyName,
                        tel,
                        email,
                    }
                }
            },
        })
    }

    // returns
    revalidatePath("/");
    return {
        message: "Empresa atualizada com sucesso.",
        error: false
    }
}

export async function deleteCompany(id: string) {
    try {
        const company = await prisma.company.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        });

        await prisma.company.delete({
            where: {
                id,
            }
        });

        await prisma.user.delete({
            where: {
                id: company?.user.id
            }
        });
    } catch (e) {
        console.log(e);
    }

    revalidatePath("/");
}