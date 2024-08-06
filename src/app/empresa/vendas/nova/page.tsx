"use client";

import { createCompanySale } from "@/app/actions/company/CompanySaleActions";
import SubmitButton from "@/app/components/SubmitButton";
import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Suspense } from 'react'
import Spinner from "@/app/components/Spinner";

function Internal() {
    const [formState, action] = useFormState(createCompanySale, {
        error: false,
        message: "",
    } as { message: string, error: boolean });
    const [paymentMode, setPaymentMode] = useState("Pix");
    const searchParams = useSearchParams();
    const router = useRouter();
    const client = searchParams.get('client')?.split("-");
    const employee = searchParams.get('employee')?.split("-");
    const offer = searchParams.get('offer')?.split("-");

    if (!client || !employee || !offer) router.push("/empresa/venda/nova/prev");

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    return (
        <>
            <TopBar title="Nova venda" />
            {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center font-bold">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center font-bold">{formState.message}</div>
                )
            }

            <p className="text-center my-4 text-gray-600 w-1/2 mx-auto">Se você pretende realizar um agendamento logo em seguida, não registre uma venda diretamente. Registre a venda no próprio agendamento, marcando o agendamento como pago. <Link href="/empresa/agenda/novo/prev" className="text-blue-600 hover:underline">Clique aqui para ir para o agendamento</Link>.</p>

            <form defaultValue={formState.message} action={action} ref={formRef} className="mt-8 p-2 w-full md:mx-auto md:w-1/2 flex flex-col gap-4">
                <div className="border p-2 border-dashed">
                    <h2 className="font-bold text-green-700">Agendamento para:</h2>
                    <p className="font-extralight my-2">Cliente: {Array.isArray(client) && client[1]}</p>
                    <p className="font-extralight my-2">Funcionário: {Array.isArray(employee) && employee[1]}</p>
                    <p className="font-extralight my-2">Produto/serviço: {Array.isArray(offer) && offer[1]}</p>

                    <Link href="/empresa/agenda/novo/prev" className="block font-bold hover:underline my-2 text-center">Voltar para prévia</Link>
                </div>
                <input type="hidden" name="clientId" value={Array.isArray(client) ? client[0] : ""} />
                <input type="hidden" name="employeeId" value={Array.isArray(employee) ? employee[0] : ""} />
                <input type="hidden" name="offerId" value={Array.isArray(offer) ? offer[0] : ""} />
                <div>
                    <label htmlFor="title" className="block cursor-pointer font-bold mb-2">Título:</label>
                    <input type="text" name="title" id="title" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="comment" className="block cursor-pointer font-bold mb-2">Comentário:</label>
                    <textarea name="comment" id="comment" className="rounded-xl border p-2 w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block cursor-pointer font-bold mb-2">Preço:</label>
                    <input type="number" name="price" id="price" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="paymentMode" className="block cursor-pointer font-bold mb-2">Modo de pagamento:</label>
                    <select name="paymentMode" id="price" className="rounded-xl border p-2 w-full" onChange={(e) => setPaymentMode(e.target.value)} required>
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
                            <input type="number" name="installments" id="installments" className="rounded-xl border p-2 w-full" required />
                        </div>
                    ) : (
                        <input type="hidden" name="installments" id="installments" value={1} className="rounded-xl border p-2 w-full" />
                    )
                }
                <SubmitButton name="Registrar venda" loadingName="Registrando..." />
            </form>
        </>
    )
}

export default function Page() {


    return (
        <Suspense fallback={<Spinner/>}>
            <Internal/>
        </Suspense>
    )
}