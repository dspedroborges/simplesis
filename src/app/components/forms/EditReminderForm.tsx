"use client";

import { updateCompanyReminder } from "@/app/actions/company/CompanyReminderActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page({ data }: { data: Record<string, string | any> | null }) {
    const [formState, action] = useFormState(updateCompanyReminder, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center font-bold">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center font-bold">{formState.message}</div>
                )
            }

            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 m-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">
                <input type="hidden" name="id" value={data?.id} />
                <div>
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="rounded-xl border p-2 w-full" defaultValue={data?.description}></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block cursor-pointer font-bold mb-2">Data:</label>
                    <input type="date" name="date" id="date" className="rounded-xl border p-2 w-full" defaultValue={new Date(data?.date).toISOString().split('T')[0]}  />
                </div>
                <div>
                    <label htmlFor="done" className="block cursor-pointer font-bold mb-2">Realizado:</label>
                    <select name="done" id="done" className="rounded-xl border p-2 w-full" defaultValue={data?.done}>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <SubmitButton name="Atualizar" loadingName="Atualizando..." />
            </form>
        </>
    )
}