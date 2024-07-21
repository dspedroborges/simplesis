"use client";

import { useFormState } from "react-dom";
import { useRef } from "react";
import { useSearchParams } from 'next/navigation'
import SubmitButton from "@/app/components/SubmitButton";
import { resetPassword } from "@/app/actions/ResetPassword";

export default function Page() {
    const [formState, action] = useFormState(resetPassword, {
        error: false,
        message: ""
    });
    const searchParams = useSearchParams()
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <div className="my-8">
            {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center">{formState.message}</div>
                )
            }

            <h2 className="font-bold text-2xl text-center">Redefinir senha</h2>
            <div className="h-1 bg-blue-600 w-[100px] mx-auto mt-2 mb-4"></div>
            <form ref={formRef} action={action} defaultValue={formState.message} className="flex flex-col w-full lg:w-1/2 mx-auto">
                <input required type="hidden" name="token" value={String(token)} />
                <input required type="hidden" name="id" value={String(id)} />
                <label htmlFor="newPassword" className="font-bold my-4">Nova senha: <span className="text-xs text-red-500">*</span></label>
                <input required type="password" id="newPassword" className="py-4 px-2 rounded-xl border border-gray-400" name="newPassword" />
                <label htmlFor="newPasswordConfirmation" className="font-bold my-4">Confirme a nova senha: <span className="text-xs text-red-500">*</span></label>
                <input required type="password" id="newPasswordConfirmation" className="py-4 px-2 rounded-xl border border-gray-400" name="newPasswordConfirmation" />
                <SubmitButton name="Enviar" loadingName="Enviando..." />
            </form>
        </div>
    )
}