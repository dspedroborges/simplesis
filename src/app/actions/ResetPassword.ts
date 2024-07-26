"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";
import { encryptPassword } from "@/auth";

export async function resetPassword(previousState: { error: boolean, message: string}, formData: FormData) {
    const token = formData.get("token") as string;
    const id = formData.get("id") as string;
    const newPassword = formData.get("newPassword") as string;
    const newPasswordConfirmation = formData.get("newPasswordConfirmation") as string;

    const rightTokenAndId = await prisma.forgotPassword.findUnique({
        where: {
            userId: id,
            token: token,
        }
    });

    if (!rightTokenAndId) {
        return {
            message: "Token inválido.",
            error: true
        }
    }

    if (newPassword !== newPasswordConfirmation) {
        return {
            message: "Senhas diferentes.",
            error: true
        }
    }

    await prisma.user.update({
        where: {
            id,
        },
        data: {
            password: await encryptPassword(newPassword)
        }
    });

    await prisma.forgotPassword.delete({
        where: {
            userId: id,
            token,
        }
    });

    // returns
    ;
    return {
        message: "Senha redefinida com sucesso.",
        error: false
    }
}