"use client";

import { createOrEditCompanyClientRecord } from "@/app/actions/company/CompanyClientActions";
import SubmitButton from "@/app/components/SubmitButton";
import TopBar from "@/app/components/TopBar";
import { useRef } from "react";
import { useFormState } from "react-dom";
import Toast from "../Toast";

export default function EditClientRecordForm({ record }: { record?: string }) {
    const [formState, action] = useFormState(createOrEditCompanyClientRecord, {
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
                    <label htmlFor="record" className="block cursor-pointer font-bold mb-2">Ficha</label>
                    <textarea name="record" id="record" className="w-full min-h-[500px] border p-2" defaultValue={record}></textarea>
                </div>
                <SubmitButton name="Atualizar ficha" loadingName="Atualizando..." />
            </form>
        </>
    )
}