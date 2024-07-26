"use client";

import Link from "next/link";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Searcher from "./Searcher";

export default function SchedulerOptions({ type, currentDate, employees }: { type: string, currentDate: string, employees: Record<string, any>[] }) {
    if (employees.length === 0) return <></>;

    const [date, setDate] = useState(currentDate);
    const [employee, setEmployee] = useState(employees[0].id);

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-around items-center my-4 h-[50px]">
                <div className="flex flex-col lg:flex-row w-full lg:w-1/3 gap-2">
                    <input type="date" className="w-full border p-2 rounded-xl" defaultValue={currentDate} onChange={(e) => setDate(e.target.value.split("T")[0])} />
                    <select onChange={(e) => setEmployee(e.target.value)} className="w-full p-2 rounded-xl border">
                        {
                            employees?.map((e, i) => {
                                return (
                                    <option value={e.id} key={i}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                    <Link href={`/empresa/agenda/${type}/${date}/${employee}`} className="block w-full p-2 rounded-xl border py-4 text-center bg-blue-800 hover:bg-blue-600 text-white">Filtrar</Link>
                </div>
                <Link href="/empresa/agenda/novo/prev" className="h-full bg-green-800 hover:bg-green-600 text-white w-full lg:w-auto p-2 rounded-xl text-center flex items-center justify-center border gap-2">
                    <BsPlusCircle />
                    Novo agendamento
                </Link>
            </div>
            <Searcher url="/empresa/agenda/busca" />
        </>
    )
}