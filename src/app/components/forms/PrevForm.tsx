"use client";

import Link from "next/link";
import { useState } from "react";

export default function PrevForm({ clients, employees, offers, redirect }: { clients: Record<string, any>[], employees: Record<string, any>[], offers: Record<string, any>[], redirect: string }) {
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedOffer, setSelectedOffer] = useState("");

    return (
        <form className="lg:w-1/2 mx-auto my-8">
            <div className="my-4">

                <label htmlFor="client" className="block cursor-pointer font-bold mb-2">Cliente:</label>
                <select name="client" id="client" className="border p-2 w-full" onChange={(e) => setSelectedClient(e.target.value)}>
                    <option value="">Selecione uma opção</option>
                    {
                        clients.map((client, i) => {
                            return (
                                <option key={i} value={client.id + "-" + client.name}>
                                    {client.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            {
                selectedClient !== "" && <Link href={`/empresa/clientes/editar/${selectedClient.split("-")[0]}`} className="hover:underline text-blue-800">Clique aqui para alterar o estágio de venda do cliente selecionado.</Link>
            }
            <div className="my-4">
                <label htmlFor="employee" className="block cursor-pointer font-bold mb-2">Funcionário:</label>
                <select name="employee" id="employee" className="border p-2 w-full" onChange={(e) => setSelectedEmployee(e.target.value)}>
                    <option value="">Selecione uma opção</option>
                    {
                        employees.map((employee, i) => {
                            return (
                                <option key={i} value={employee.id + "-" + employee.name}>
                                    {employee.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="my-4">
                <label htmlFor="offer" className="block cursor-pointer font-bold mb-2">Produto/serviço:</label>
                <select name="offer" id="offer" className="border p-2 w-full" onChange={(e) => setSelectedOffer(e.target.value)}>
                    <option value="">Selecione uma opção</option>
                    {
                        offers.map((offer, i) => {
                            return (
                                <option key={i} value={offer.id + "-" + offer.name}>
                                    {offer.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            {
                (selectedClient !== "" && selectedEmployee !== "" && selectedOffer !== "") ? (
                    <Link href={`${redirect}?client=${selectedClient}&employee=${selectedEmployee}&offer=${selectedOffer}`} className="block mx-auto w-1/3 bg-blue-800 text-white p-2 rounded-xl my-8 hover:bg-blue-600 hover:text-white transition-all text-center">Continuar</Link>
                ) : (
                    <span>Selecione as opções.</span>
                )
            }
        </form>
    )
}