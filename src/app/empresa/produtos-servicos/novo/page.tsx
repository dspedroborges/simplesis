"use client";

import { createCompanyOffer } from "@/app/actions/company/CompanyOfferActions";
import SubmitButton from "@/app/components/SubmitButton";
import Toast from "@/app/components/Toast";
import TopBar from "@/app/components/TopBar";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

export default function Page() {
    const [formState, action] = useFormState(createCompanyOffer, {
        error: false,
        message: "",
    } as { message: string, error: boolean });
    const [type, setType] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            <TopBar title="Novo produto/serviço" />
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
                    <label htmlFor="name" className="block cursor-pointer font-bold mb-2">Nome:</label>
                    <input type="text" name="name" id="name" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="type" className="block cursor-pointer font-bold mb-2">Tipo:</label>
                    <select name="type" id="type" className="rounded-xl border p-2 w-full" onChange={(e) => setType(e.target.value)}>
                        <option value="">Selecione um tipo</option>
                        <option value="PRODUCT">Produto</option>
                        <option value="SERVICE">Serviço</option>
                    </select>
                </div>
                {
                    type === "PRODUCT" && (
                        <div>
                            <label htmlFor="amountAvailable" className="block cursor-pointer font-bold mb-2">Quantidade em estoque:</label>
                            <input type="number" name="amountAvailable" id="amountAvailable" className="rounded-xl border p-2 w-full" />
                        </div>
                    )
                }
                <div>
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="rounded-xl border p-2 w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block cursor-pointer font-bold mb-2">Preço:</label>
                    <input type="number" name="price" id="price" className="rounded-xl border p-2 w-full" />
                </div>
                <SubmitButton name="Criar produto/serviço" loadingName="Criando..." />
            </form>
        </>
    )
}