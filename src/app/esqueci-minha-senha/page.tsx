"use client";

import { useFormState } from "react-dom";
import { useRef } from "react";
import { sendMailForgotPassword } from "../actions/SendMailResetPassword";
import SubmitButton from "../components/SubmitButton";

export default function Page() {
    const [formState, action] = useFormState(sendMailForgotPassword, {
        error: false,
        message: ""
    });

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

            <h2 className="font-bold text-2xl text-center">Esqueci minha senha</h2>
            <div className="h-1 bg-blue-600 w-[100px] mx-auto mt-2 mb-4"></div>
            <form ref={formRef} action={action} defaultValue={formState.message} className="flex flex-col w-full lg:w-1/2 mx-auto">
                <label htmlFor="email" className="font-bold my-4">Email: <span className="text-xs text-red-500">*</span></label>
                <input required type="text" id="email" className="py-4 px-2 rounded-xl border border-gray-400" name="email" />
                <SubmitButton name="Enviar" loadingName="Enviando..." />
            </form>
        </div>
    )
}