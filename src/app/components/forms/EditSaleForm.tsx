"use client";

import { updateCompanySale } from "@/app/actions/company/CompanySaleActions";
import SubmitButton from "@/app/components/SubmitButton";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

export default function Page({ data }: { data: Record<string, string | any> | null }) {
    const [formState, action] = useFormState(updateCompanySale, {
        error: false,
        message: "",
    } as { message: string, error: boolean });
    const [paymentMode, setPaymentMode] = useState(data?.paymentMode);
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
                    <label htmlFor="paymentMode" className="block cursor-pointer font-bold mb-2">Modo de pagamento:</label>
                    <select name="paymentMode" id="paymentMode" className="rounded-xl border p-2 w-full" defaultValue={data?.paymentMode} onChange={(e) => setPaymentMode(e.target.value)} required>
                        <option value="">Selecione uma opção</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Pix">Pix</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </select>
                </div>
                {
                    paymentMode === "Crédito" ? (
                        <div>
                            <label htmlFor="installments" className="block cursor-pointer font-bold mb-2">Parcelas:</label>
                            <input type="number" name="installments" id="installments" defaultValue={data?.installments} className="rounded-xl border p-2 w-full" required />
                        </div>
                    ) : (
                        <input type="hidden" name="installments" id="installments" value={1} className="rounded-xl border p-2 w-full" />
                    )
                }
                <SubmitButton name="Atualizar" loadingName="Atualizando..." />
            </form>
        </>
    )
}