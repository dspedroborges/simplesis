"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanyOffer(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const name = formData.get("name") as string;
    const type: "PRODUCT"|"SERVICE" = formData.get("type") as "PRODUCT"|"SERVICE";
    const amountAvailable = Number(formData.get("amountAvailable") as string);
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    if (!(companyId && name && description && price && type)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyOffer.create({
        data: {
            companyId,
            name,
            description,
            price,
            type,
            amountAvailable: amountAvailable || 0
        },
    })

    // returns
    ;
    return {
        message: "Ok.",
        error: false
    }
}

export async function updateCompanyOffer(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const type: "PRODUCT"|"SERVICE" = formData.get("type") as "PRODUCT"|"SERVICE";
    const amountAvailable = Number(formData.get("amountAvailable") as string);
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    if (!(id && name && description && price && type)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyOffer.update({
        where: {
            id,
        },
        data: {
            name,
            description,
            price,
            type,
            amountAvailable: amountAvailable || 0
        },
    })

    // returns
    ;
    return {
        message: "Ok.",
        error: false
    }
}

export async function deleteCompanyOffer(id: number) {
    await prisma.companyOffer.delete({
        where: {
            id, 
        }
    });

    ;
}