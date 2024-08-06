"use client";

import { createCompanyClient } from "@/app/actions/company/CompanyClientActions";
import SubmitButton from "@/app/components/SubmitButton";
import TopBar from "@/app/components/TopBar";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function CreateClientForm({ companyClientRecord }: { companyClientRecord: string }) {
    const [formState, action] = useFormState(createCompanyClient, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            <TopBar title="Novo cliente" />
            {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center font-bold">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center font-bold">{formState.message}</div>
                )
            }

            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 p-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">

                <div>
                    <label htmlFor="name" className="block cursor-pointer font-bold mb-2">Nome:</label>
                    <input type="text" name="name" id="name" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="sex" className="block cursor-pointer font-bold mb-2">Sexo:</label>
                    <select name="sex" id="sex" className="p-2 border w-full rounded-xl">
                        <option value="">Selecione uma opção</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birth" className="block cursor-pointer font-bold mb-2">Data de nascimento:</label>
                    <input type="date" name="birth" id="birth" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="border p-2 w-full min-h-[500px] rounded-xl" defaultValue={companyClientRecord}></textarea>
                </div>
                <div>
                    <label htmlFor="tel" className="block cursor-pointer font-bold mb-2">Telefone:</label>
                    <input type="text" name="tel" id="tel" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block cursor-pointer font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="pipelineStage" className="block cursor-pointer font-bold mb-2">Pipeline:</label>
                    <select name="pipelineStage" id="pipelineStage" className="p-2 border w-full rounded-xl">
                        <option value="">Selecione uma opção</option>
                        <option value="Conhecimento">Conhecimento</option>
                        <option value="Interesse">Interesse</option>
                        <option value="Avaliação">Avaliação</option>
                        <option value="Negociação">Negociação</option>
                        <option value="Compra">Compra</option>
                        <option value="Renovamento">Renovamento</option>
                    </select>
                </div>
                <SubmitButton name="Registrar cliente" loadingName="Registrando..." />
            </form>
        </>
    )
}