"use server";

import { login } from "@/auth";

export async function loginAction(previousState: { error: boolean, message: string }, formData: FormData) {
    const result = await login(formData);

    if (result) {
        return {
            error: false,
            message: "Autenticado."
        }
    }

    ;
    return {
        error: true,
        message: "Credenciais inválidas."
    }
}