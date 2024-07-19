"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanyEmployee(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const name = formData.get("name") as string;
    const cpf = formData.get("cpf") as string;
    const email = formData.get("email") as string;
    const tel = formData.get("tel") as string;
    const wage = Number(formData.get("wage"));
    const payDay = Number(formData.get("payDay") as string);
    const schedulerColor = formData.get("schedulerColor") as string;

    if (!(companyId && name && cpf && email && tel && wage && payDay && schedulerColor)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyEmployee.create({
        data: {
            companyId,
            name,
            cpf,
            email,
            tel,
            wage,
            payDay,
            schedulerColor
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function updateCompanyEmployee(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const cpf = formData.get("cpf") as string;
    const email = formData.get("email") as string;
    const tel = formData.get("tel") as string;
    const wage = Number(formData.get("wage"));
    const payDay = Number(formData.get("payDay") as string);
    const schedulerColor = formData.get("schedulerColor") as string;

    if (!(id && name && cpf && email && tel && wage && payDay && schedulerColor)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyEmployee.update({
        where: {
            id
        },
        data: {
            name,
            cpf,
            email,
            tel,
            wage,
            payDay,
            schedulerColor
        },
    })

    // returns
    revalidatePath("/");
    return {
        message: "Ok.",
        error: false
    }
}

export async function deleteCompanyEmployee(id: number) {
    await prisma.companyEmployee.delete({
        where: {
            id,
        }
    });

    revalidatePath("/");
}