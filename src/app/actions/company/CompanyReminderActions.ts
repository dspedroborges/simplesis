"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanyReminder(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);
    const description = formData.get("description") as string;

    if (!(date && description)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyReminder.create({
        data: {
            companyId,
            date,
            description,
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function updateCompanyReminder(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const date = new Date(`${formData.get("date") as string}T00:00:00.000Z`);
    const description = formData.get("description") as string;
    const done = Boolean(formData.get("done"));

    if (!(date && description && done)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyReminder.update({
        where: {
            id,
        },
        data: {
            date,
            description,
            done,
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function deleteCompanyReminder(id: number) {
    await prisma.companyReminder.delete({
        where: {
            id,
        }
    });

    revalidatePath("/");
}