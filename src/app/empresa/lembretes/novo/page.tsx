"use client";

import { createCompanyReminder } from "@/app/actions/company/CompanyReminderActions";
import SubmitButton from "@/app/components/SubmitButton";
import Toast from "@/app/components/Toast";
import TopBar from "@/app/components/TopBar";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page() {
    const [formState, action] = useFormState(createCompanyReminder, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            <TopBar title="Novo lembrete" />
            {
                formState.error && (
                    <Toast content={formState.message} type="danger" />
                )
            }

            {
                (!formState.error && formState.message !== "") && (
                    <Toast content={formState.message} type="success" />
                )
            }

            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 p-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">
                
                <div>
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="rounded-xl border p-2 w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block cursor-pointer font-bold mb-2">Data:</label>
                    <input type="date" name="date" id="date" className="rounded-xl border p-2 w-full" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <SubmitButton name="Criar lembrete" loadingName="Criando..." />
            </form>
        </>
    )
}