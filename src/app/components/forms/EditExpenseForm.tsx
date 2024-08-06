"use client";

import { updateCompanyExpense } from "@/app/actions/company/CompanyExpenseActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Page({ data }: { data: Record<string, string | any> | null }) {
    const [formState, action] = useFormState(updateCompanyExpense, {
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
                    <label htmlFor="title" className="block cursor-pointer font-bold mb-2">Título:</label>
                    <input type="text" name="title" id="title" className="rounded-xl border p-2 w-full" defaultValue={data?.title} />
                </div>
                <div>
                    <label htmlFor="comment" className="block cursor-pointer font-bold mb-2">Comentário:</label>
                    <textarea name="comment" id="comment" className="rounded-xl border p-2 w-full" defaultValue={data?.comment}></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block cursor-pointer font-bold mb-2">Preço:</label>
                    <input type="number" name="price" id="price" className="rounded-xl border p-2 w-full" defaultValue={data?.price} />
                </div>
                <div>
                    <label htmlFor="date" className="block cursor-pointer font-bold mb-2">Data:</label>
                    <input type="date" name="date" id="date" className="rounded-xl border p-2 w-full" defaultValue={new Date(data?.date).toISOString().split('T')[0]} />
                </div>
                <div>
                    <label htmlFor="paid" className="block cursor-pointer font-bold mb-2">Pago:</label>
                    <select name="paid" id="paid" className="rounded-xl border p-2 w-full" defaultValue={data?.paid}>
                        <option value="">Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <SubmitButton name="Atualizar" loadingName="Atualizando..." />
            </form>
        </>
    )
}