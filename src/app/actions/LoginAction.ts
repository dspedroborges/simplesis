"use server";

import { login } from "@/auth";
import { revalidatePath } from "next/cache";

export async function loginAction(previousState: { error: boolean, message: string }, formData: FormData) {
    const result = await login(formData);

    if (result) {
        return {
            error: false,
            message: "Ok."
        }
    }

    ;
    return {
        error: true,
        message: "Credenciais inválidas."
    }
}