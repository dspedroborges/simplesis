"use client";

import { createCompanySchedule } from "@/app/actions/company/CompanyScheduleActions";
import SubmitButton from "@/app/components/SubmitButton";
import TopBar from "@/app/components/TopBar";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Suspense } from 'react'
import Spinner from "@/app/components/Spinner";
import Toast from "@/app/components/Toast";

function Internal() {
    const searchParams = useSearchParams();
    const client = searchParams.get('client')?.split("-");
    const employee = searchParams.get('employee')?.split("-");
    const offer = searchParams.get('offer')?.split("-");
    const [isPaid, setIsPaid] = useState(false);
    const [paymentMode, setPaymentMode] = useState("Pix");
    const router = useRouter();

    if (!client || !employee || !offer) router.push("/empresa/agenda/novo/prev");

    const [formState, action] = useFormState(createCompanySchedule, {
        error: false,
        message: "",
    } as { message: string, error: boolean });

    const formRef = useRef<HTMLFormElement>(null);

    if (!formState.error && formState.message !== "") {
        formRef.current?.reset();
    }

    
    return (
        <>
            <TopBar title="Novo agendamento" />
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
                    <label htmlFor="description" className="block cursor-pointer font-bold mb-2">Descrição:</label>
                    <textarea name="description" id="description" className="rounded-xl border p-2 w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block cursor-pointer font-bold mb-2">Data:</label>
                    <input type="date" name="date" id="date" className="rounded-xl border p-2 w-full" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                    <label htmlFor="hourStart" className="block cursor-pointer font-bold mb-2">Hora início:</label>
                    <input type="number" name="hourStart" id="hourStart" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="hourEnd" className="block cursor-pointer font-bold mb-2">Hora fim:</label>
                    <input type="number" name="hourEnd" id="hourEnd" className="rounded-xl border p-2 w-full" />
                </div>
                <div>
                    <label htmlFor="confirmed" className="block cursor-pointer font-bold mb-2">Confirmado:</label>
                    <select name="confirmed" id="confirmed" className="rounded-xl border p-2 w-full">
                        <option value="">Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="paid" className="block cursor-pointer font-bold mb-2">Pago:</label>
                    <select name="paid" id="paid" className="rounded-xl border p-2 w-full" onChange={(e) => {
                        if (e.target.value === "true") setIsPaid(true);
                    }}>
                        <option value="">Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>

                {
                    isPaid && (
                        <div className="border p-4 rounded-xl">
                            <h2 className="text-xl my-4">Registro de venda</h2>
                            <div className="py-2">
                                <label htmlFor="title" className="block cursor-pointer font-bold mb-2">Título:</label>
                                <input type="text" name="title" id="title" className="rounded-xl border p-2 w-full" />
                            </div>
                            <div className="py-2">
                                <label htmlFor="comment" className="block cursor-pointer font-bold mb-2">Comentário:</label>
                                <textarea name="comment" id="comment" className="rounded-xl border p-2 w-full"></textarea>
                            </div>
                            <div className="py-2">
                                <label htmlFor="price" className="block cursor-pointer font-bold mb-2">Preço:</label>
                                <input type="number" name="price" id="price" className="rounded-xl border p-2 w-full" />
                            </div>
                            <div className="py-2">
                                <label htmlFor="paymentMode" className="block cursor-pointer font-bold mb-2">Modo de pagamento:</label>
                                <select name="paymentMode" id="price" className="rounded-xl border p-2 w-full" onChange={(e) => setPaymentMode(e.target.value)} required>
                                    <option value="">Selecione uma opção</option>
                                    <option value="Crédito">Crédito</option>
                                    <option value="Pix" defaultChecked>Pix</option>
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
                        </div>
                    )
                }

                <SubmitButton name="Registrar agendamento" loadingName="Registrando..." />
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