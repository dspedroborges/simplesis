"use client";

import { createCompany } from "@/app/actions/company/CompanyActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import Toast from "../components/Toast";

export default function Page() {
    const [formState, action] = useFormState(createCompany, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    }

    return (
        <>
            <h2 className="mt-8 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                Registro
            </h2>
            <p className="text-center mb-8 text-green-800">Para realizar uma compra, você primeiro deve se registrar e estar logado. Por favor, complete o cadastro abaixo e em seguida faça login.</p>
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

            <form defaultValue={formState.message} action={action} ref={formRef} className="w-full md:mx-auto md:w-1/2 flex flex-col gap-4">

                <div>
                    <label htmlFor="username" className="block cursor-pointer font-bold mb-2">Nome de usuário:</label>
                    <input type="text" name="username" id="username" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="password" className="block cursor-pointer font-bold mb-2">Senha:</label>
                    <input type="password" name="password" id="password" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation" className="block cursor-pointer font-bold mb-2">Confirmação de senha:</label>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="companyName" className="block cursor-pointer font-bold mb-2">Nome da empresa:</label>
                    <input type="text" name="companyName" id="companyName" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block cursor-pointer font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="tel" className="block cursor-pointer font-bold mb-2">Telefone:</label>
                    <input type="text" name="tel" id="tel" className="rounded-xl border p-2 w-full" />
                </div>
                <SubmitButton name="Criar conta" loadingName="Criando conta..." />
            </form>
        </>
    )
}