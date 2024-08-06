"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";
import { encryptAES  } from "@/crypto";

export async function createCompanyClient(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }

    const companyId = String(gottenId);
    const name = formData.get("name") as string;
    const sex = formData.get("sex") as string;
    const birth = new Date(`${formData.get("birth") as string}T00:00:00.000Z`);
    const description = formData.get("description") as string;
    const tel = formData.get("tel") as string;
    const email = formData.get("email") as string;
    const pipelineStage = formData.get("pipelineStage") as string;

    if (!(companyId && name && sex && birth && description && tel && email && pipelineStage)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyClient.create({
        data: {
            companyId,
            name,
            sex,
            birth,
            description: encryptAES(description),
            tel: encryptAES(tel),
            email: encryptAES(email),
            pipelineStage
        },
    })

    // returns
    ;
    return {
        message: "Cliente criado com sucesso.",
        error: false
    }
}

export async function createOrEditCompanyClientRecord(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }

    const companyId = String(gottenId);
    const record = formData.get("record") as string;

    if (!record) {
        return {
            message: "Preencha o campo obrigatório.",
            error: true
        }
    }

    const countExistingRecord = await prisma.companyClientRecord.count({
        where: {
            companyId
        }
    });

    if (countExistingRecord > 0) {
        await prisma.companyClientRecord.update({
            where: {
                companyId
            },
            data: {
                record
            }
        });
    }

    try {
        await prisma.companyClientRecord.create({
            data: {
                companyId,
                record,
            }
        });
    } catch (e) {
        return {
            message: "Erro.",
            error: true
        }
    }

    // returns
    ;
    return {
        message: "Ficha atualizada com sucesso.",
        error: false
    }
}

export async function updateCompanyClient(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const sex = formData.get("sex") as string;
    const birth = new Date(`${formData.get("birth") as string}T00:00:00.000Z`);
    const description = formData.get("description") as string;
    const tel = formData.get("tel") as string;
    const email = formData.get("email") as string;
    const pipelineStage = formData.get("pipelineStage") as string;

    if (!(id && name && sex && birth && description && tel && email && pipelineStage)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyClient.update({
        where: {
            id,
        },
        data: {
            name,
            sex,
            birth,
            description: encryptAES(description),
            tel: encryptAES(tel),
            email: encryptAES(email),
            pipelineStage
        },
    })

    // returns
    ;
    return {
        message: "Cliente atualizado com sucesso.",
        error: false
    }
}

export async function deleteCompanyClient(id: number) {
    await prisma.companyClient.delete({
        where: {
            id,
        }
    });

    ;
}