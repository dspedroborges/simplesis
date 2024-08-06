"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanySchedule(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);
    const hourStart = Number(formData.get("hourStart"));
    const hourEnd = Number(formData.get("hourEnd"));
    const description = formData.get("description") as string;
    const employeeId = Number(formData.get("employeeId"));
    const clientId = Number(formData.get("clientId"));
    const offerId = Number(formData.get("offerId"));
    const confirmed = Boolean(formData.get("confirmed"));
    const paid = Boolean(formData.get("paid"));

    // sale options
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const paymentMode = formData.get("paymentMode") as string;

    if (!(companyId && date && hourStart && hourEnd && description && paid && employeeId && clientId && offerId)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    // verifica conflito
    const conflict = await prisma.companySchedule.findFirst({
        where: {
            companyId,
            employeeId,
            date,
            hourStart: {
                gte: hourStart
            },
            hourEnd: {
                lte: hourEnd
            }
        }
    });

    if (conflict) {
        return {
            message: "Já existe um agendamento nessa data e horário.",
            error: true
        }
    }

    let companySaleId;
    if (title && comment && price && paymentMode) {
        const result = await prisma.companySale.create({
            data: {
                companyId, clientId, employeeId, offerId, title, comment, price, paymentMode
            }
        });
        companySaleId = result.id;

        const clientInfo = await prisma.companyClient.findUnique({
            where: {
                id: clientId,
            },
            select: {
                pipelineStage: true,
            }
        });

        await prisma.companyClient.update({
            where: {
                id: clientId,
                companyId: companyId,
            },
            data: {
                pipelineStage: clientInfo?.pipelineStage !== "Compra" ? "Compra" : "Renovação",
            }
        });
    }

    let data: any = {
        companyId,
        date,
        hourStart,
        hourEnd,
        description,
        confirmed,
        paid: companySaleId ? true : false,
        employeeId,
        clientId,
        offerId
    };

    if (!confirmed) {
        const clientInfo = await prisma.companyClient.findUnique({
            where: {
                id: clientId,
            },
            select: {
                name: true,
            }
        });
        const offerInfo = await prisma.companyOffer.findUnique({
            where: {
                id: offerId,
            },
            select: {
                name: true,
            }
        });


        const threeDaysBefore = new Date(date);
        threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

        await prisma.companyReminder.create({
            data: {
                companyId,
                date: threeDaysBefore,
                description: `Dentro de 3 dias você tem um compromisso. Confirme o agendamento com o cliente ${clientInfo?.name} referente a ${offerInfo?.name}.`
            }
        });
    }

    await prisma.companySchedule.create({
        data,
    });

    // returns
    ;
    return {
        message: "Agendamento criado com sucesso.",
        error: false
    }
}

export async function updateCompanySchedule(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);

    const id = Number(formData.get("id"));
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);
    const hourStart = Number(formData.get("hourStart"));
    const hourEnd = Number(formData.get("hourEnd"));
    const description = formData.get("description") as string;
    const confirmed = Boolean(formData.get("confirmed"));
    const paid = Boolean(formData.get("paid"));
    const done = Boolean(formData.get("done"));

    console.log(formData.get("confirmed"));
    console.log(formData.get("done"));
    console.log(formData.get("paid"));

    // sale options
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const paymentMode = formData.get("paymentMode") as string;

    if (!(id && date && hourStart && hourEnd && description)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    const foundSchedule = await prisma.companySchedule.findUnique({
        where: {
            id
        }
    });

    let companySaleId;
    if (title && comment && price && paymentMode && foundSchedule) {
        const result = await prisma.companySale.create({
            data: {
                companyId,
                clientId: foundSchedule.clientId,
                offerId: foundSchedule.offerId,
                employeeId: foundSchedule.employeeId,
                title,
                comment,
                price,
                paymentMode
            }
        });
        companySaleId = result.id;

        const clientInfo = await prisma.companyClient.findUnique({
            where: {
                id: foundSchedule.clientId,
            },
            select: {
                pipelineStage: true,
            }
        });

        await prisma.companyClient.update({
            where: {
                id: foundSchedule.clientId,
                companyId: companyId,
            },
            data: {
                pipelineStage: clientInfo?.pipelineStage !== "Compra" ? "Compra" : "Renovação",
            }
        });

    }

    let data: Record<string, string | boolean | number | Date> = {
        date,
        hourStart,
        hourEnd,
        description,
        confirmed,
        paid: companySaleId ? true : false,
        done,
    }

    if (!foundSchedule?.paid) {
        if (companySaleId) data.companySaleId = companySaleId;
    }

    console.log(data);

    await prisma.companySchedule.update({
        where: {
            id
        },
        data,
    })

        // returns
        ;
    return {
        message: "Agendamento atualizado com sucesso.",
        error: false
    }
}

export async function deleteCompanySchedule(id: number) {
    await prisma.companySchedule.delete({
        where: {
            id,
        }
    });

    ;
}