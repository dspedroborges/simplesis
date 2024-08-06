"use client";

import { updateCompany } from "@/app/actions/company/CompanyActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRef } from "react";
import { useFormState } from "react-dom";
import Toast from "../Toast";

export default function Page({ data }: { data: Record<string, string | any> | null }) {
    const [formState, action] = useFormState(updateCompany, {
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
                formState.error && (
                    <Toast content={formState.message} type="danger" />
                )
            }

            {
                (!formState.error && formState.message !== "") && (
                    <Toast content={formState.message} type="success" />
                )
            }

            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 m-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">
                <input type="hidden" name="id" value={data?.id} />
                <div>
                    <label htmlFor="username" className="block cursor-pointer font-bold mb-2">Nome de usuário:</label>
                    <input type="text" name="username" id="username" className="rounded-xl border p-2 w-full" defaultValue={data?.username} />
                </div>
                <div>
                    <label htmlFor="companyName" className="block cursor-pointer font-bold mb-2">Nome da empresa:</label>
                    <input type="text" name="companyName" id="companyName" className="rounded-xl border p-2 w-full" defaultValue={data?.companyName} />
                </div>
                <div>
                    <label htmlFor="email" className="block cursor-pointer font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="rounded-xl border p-2 w-full" defaultValue={data?.email} />
                </div>
                <div>
                    <label htmlFor="tel" className="block cursor-pointer font-bold mb-2">Telefone:</label>
                    <input type="text" name="tel" id="tel" className="rounded-xl border p-2 w-full" defaultValue={data?.tel} />
                </div>
                <div>
                    <label htmlFor="currentPassword" className="block cursor-pointer font-bold mb-2">Senha atual:</label>
                    <input type="password" name="currentPassword" id="currentPassword" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block cursor-pointer font-bold mb-2">Nova senha:</label>
                    <input type="password" name="newPassword" id="newPassword" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="newPasswordConfirmation" className="block cursor-pointer font-bold mb-2">Confirmação de nova senha:</label>
                    <input type="password" name="newPasswordConfirmation" id="newPasswordConfirmation" className="rounded-xl border p-2 w-full" />
                </div>
                <SubmitButton name="Atualizar" loadingName="Atualizando..." />
            </form>
        </>
    )
}