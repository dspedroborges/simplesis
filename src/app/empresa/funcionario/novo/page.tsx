"use client";

import { createCompanyEmployee } from "@/app/actions/company/CompanyEmployeeActions";
import SubmitButton from "@/app/components/SubmitButton";
import Toast from "@/app/components/Toast";
import TopBar from "@/app/components/TopBar";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page() {
    const [formState, action] = useFormState(createCompanyEmployee, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            <TopBar title="Novo funcionário" />
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
                    <label htmlFor="cpf" className="block cursor-pointer font-bold mb-2">CPF:</label>
                    <input type="text" name="cpf" id="cpf" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block cursor-pointer font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="tel" className="block cursor-pointer font-bold mb-2">Telefone:</label>
                    <input type="text" name="tel" id="tel" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="wage" className="block cursor-pointer font-bold mb-2">Salário:</label>
                    <input type="number" name="wage" id="wage" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="payDay" className="block cursor-pointer font-bold mb-2">Dia de pagamento:</label>
                    <input type="number" name="payDay" id="payDay" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="schedulerColor" className="block cursor-pointer font-bold mb-2">Cor na agenda:</label>
                    <input type="color" name="schedulerColor" id="schedulerColor" className="border" />
                </div>
                <SubmitButton name="Registrar funcionário" loadingName="Registrando..." />
            </form>
        </>
    )
}