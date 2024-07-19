"use client";

import { createCompanyClientRecord } from "@/app/actions/company/CompanyClientActions";
import SubmitButton from "@/app/components/SubmitButton";
import TopBar from "@/app/components/TopBar";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page() {
    const [formState, action] = useFormState(createCompanyClientRecord, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }


    return (
        <>
            <TopBar title="Ficha para cliente" />
            {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center font-bold">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center font-bold">{formState.message}</div>
                )
            }


            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 p-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">
                <div>
                    <label htmlFor="record" className="block cursor-pointer font-bold mb-2">Ficha</label>
                    <textarea name="record" id="record" className="w-full min-h-[500px] border p-2"></textarea>
                </div>
                <SubmitButton name="Criar ficha" loadingName="Criando..." />
            </form>
        </>
    )
}