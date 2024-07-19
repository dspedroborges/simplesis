"use client";

import { updateCompanyClient } from "@/app/actions/company/CompanyClientActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page({ data }: { data: Record<string, string | any> | null }) {
    const [formState, action] = useFormState(updateCompanyClient, {
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
                    <label htmlFor="name" className="block cursor-pointer font-bold mb-2">Nome:</label>
                    <input type="text" name="name" id="name" className="border p-2 w-full" defaultValue={data?.name} />
                </div>
                <div>
                    <label htmlFor="sex" className="block cursor-pointer font-bold mb-2">Comentário:</label>
                    <select name="sex" id="sex" className="p-2 border w-full" defaultValue={data?.sex}>
                        <option value="">Selecione uma opção</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birth" className="block cursor-pointer font-bold mb-2">Data de nascimento:</label>
                    <input type="date" name="birth" id="birth" className="border p-2 w-full" defaultValue={new Date(data?.birth).toISOString().split('T')[0]} />
                </div>
                <div>
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="border p-2 w-full" defaultValue={data?.description}></textarea>
                </div>
                <div>
                    <label htmlFor="tel" className="block cursor-pointer font-bold mb-2">Telefone:</label>
                    <input type="text" name="tel" id="tel" className="border p-2 w-full" defaultValue={data?.tel} />
                </div>
                <div>
                    <label htmlFor="email" className="block cursor-pointer font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="border p-2 w-full" defaultValue={data?.email} />
                </div>
                <div>
                    <label htmlFor="pipelineStage" className="block cursor-pointer font-bold mb-2">Pipeline:</label>
                    <select name="pipelineStage" id="pipelineStage" className="p-2 border w-full" defaultValue={data?.pipelineStage}>
                        <option value="">Selecione uma opção</option>
                        <option value="Conhecimento">Conhecimento</option>
                        <option value="Interesse">Interesse</option>
                        <option value="Avaliação">Avaliação</option>
                        <option value="Negociação">Negociação</option>
                        <option value="Compra">Compra</option>
                        <option value="Renovamento">Renovamento</option>
                    </select>
                </div>
                <SubmitButton name="Atualizar cliente" loadingName="Atualizando..." />
            </form>
        </>
    )
}