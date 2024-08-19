"use client";

import Link from "next/link";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Searcher from "./Searcher";
import { usePathname } from 'next/navigation'

export default function SchedulerOptions({ type, currentDate, employees, currentEmployee }: { type: string, currentDate: string, employees: Record<string, any>[], currentEmployee: number }) {
    if (employees.length === 0) return <></>;
    const pathname = usePathname();
    const [date, setDate] = useState(currentDate);
    const [employee, setEmployee] = useState(String(currentEmployee));

    const normalizePathname = () => {
        if (pathname.search("semana") !== -1) {
            let newPathname = pathname.split("semana/");
            return newPathname[0] + "semana/";
        }

        let newPathname = pathname.split("dia/");
        return newPathname[0] + "dia/";
    }

    return (
        <div>
            <div className="flex justify-center gap-2 my-8">
                <Link href={`/empresa/agenda/dia/${new Date().toISOString().split("T")[0]}/${employees[0].id}`} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
                    Ver no modo diário
                </Link>
                <Link href={`/empresa/agenda/semana/${new Date().toISOString().split("T")[0]}/${employees[0].id}`} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
                    Ver no modo semanal
                </Link>
            </div>
            <div className="flex justify-center gap-2 my-8">
                {
                    employees.map((e, i) => {
                        return (
                            <Link href={`${normalizePathname()}${new Date().toISOString().split("T")[0]}/${e.id}`} key={i} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-gray-600" style={{background: e.schedulerColor}}>
                                {e.name}
                                <span className={`inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold ${e._count.companySchedule !== 0 ? "text-red-800 bg-red-200 animate-bounce" : "text-blue-800 bg-blue-200"} rounded-full`}>
                                    {e._count.companySchedule as number}
                                </span>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="flex flex-col lg:flex-row justify-around items-center my-4 lg:h-[50px]">
                <div className="flex flex-col lg:flex-row w-full lg:w-1/3 gap-2">
                    <input type="date" className="w-full border p-2 rounded-xl" defaultValue={currentDate} onChange={(e) => setDate(e.target.value.split("T")[0])} />
                    <select onChange={(e) => setEmployee(e.target.value)} value={employee} className="w-full p-2 rounded-xl border">
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
        </div>
    )
}