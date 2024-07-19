"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanyExpense(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);

    if (!(companyId && title && comment && price && date)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyExpense.create({
        data: {
            companyId,
            title,
            comment,
            price,
            date
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function updateCompanyExpense(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);
    const paid = Boolean(formData.get("paid") as string);

    if (!(id && title && comment && price && date)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyExpense.update({
        where: {
            id,
        },
        data: {
            title,
            comment,
            price,
            date,
            paid
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function deleteCompanyExpense(id: number) {
    await prisma.companyExpense.delete({
        where: {
            id,
        }
    });

    revalidatePath("/");
}