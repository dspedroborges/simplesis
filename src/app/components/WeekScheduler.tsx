"use client";

import Link from "next/link";
import SubmitConfirmationButton from "./SubmitConfirmationButton";
import { deleteCompanySchedule } from "../actions/company/CompanyScheduleActions";
import { createNumbersList, isThereHourStart, isThisHourBusy } from "./DayScheduler";
import { BsCheck2Square, BsCurrencyDollar, BsHandThumbsDown, BsHandThumbsUp, BsInfoCircle, BsPencilSquare, BsPlusCircle, BsSquare, BsX } from "react-icons/bs";
import { useState } from "react";

function getWeekDayName(dayNumber: number) {
    const weekDays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    if (dayNumber < 0 || dayNumber > 6) {
        return "Inválido";
    }

    return weekDays[dayNumber];
}

export default function WeekScheduler({ header, schedulesMatrix }: { header: string[], schedulesMatrix: Record<string, any>[][] }) {
    const hours = createNumbersList(8, 21);

    return (
        <div className="p-4">
            <div className="flex text-center rounded-t-xl py-4 bg-gray-800 text-white">
                {
                    header.map((h, i) => {
                        if (i === 0) {
                            return <span key={i} className="text-[8px] lg:text-xs w-full text-center font-bold flex items-center justify-center">{h}</span>
                        }

                        const date = new Date(h);
                        return (
                            <div key={i} className="text-[4px] lg:text-xs w-full text-center font-bold flex flex-col items-center justify-center">
                                {date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()}/{(date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}/{date.getUTCFullYear()}

                                <span className="text-[4px] lg:text-xs text-gray-100">({getWeekDayName(new Date(h).getUTCDay())})</span>
                            </div>
                        );
                    })
                }
            </div>
            <div className="flex">
                <div className="w-[14.3%] text-center">
                    {
                        hours.map((hour, i) => {
                            return <div className="text-[8px] lg:text-xs h-[35px] bg-gray-700 hover:bg-gray-800 text-white border-b border-white flex items-center justify-center last:rounded-b-xl" key={i}>{hour}</div>
                        })
                    }
                </div>
                <div className="w-full flex">
                    {
                        schedulesMatrix.map((schedules, i) => {
                            return <Column key={i} schedules={schedules} hours={hours} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function Column({ schedules, hours }: { schedules: Record<string, any>[], hours: number[] }) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div className="w-full flex flex-col">
            {
                hours.map((hour, i) => {
                    const hourStart = isThereHourStart(hour, schedules);
                    const hourBusy = isThisHourBusy(hour, schedules);
                    if (hourStart) {
                        const range = (hourStart.hourEnd - hourStart.hourStart) + 1;
                        return (
                            <div
                                key={i}
                                className="border rounded-xl border-white flex flex-col justify-around items-center"
                                style={{ backgroundColor: hourStart.employee?.schedulerColor || "#eee", height: `${range * 35}px` }}
                            >
                                {
                                    showModal && (
                                        <Modal
                                            info={{
                                                "Cliente": hourStart.client.name,
                                                "Funcionário": hourStart.employee.name,
                                                "Produto/serviço": hourStart.offer.name,
                                            }} 
                                            onClose={() => setShowModal(false)} 
                                        />
                                    )
                                }
                                <span className="w-full text-center text-[8px] lg:text-xs">{hourStart.employee?.name}: {hourStart.description}</span>
                                <span className="grid grid-cols-2 lg:grid-cols-4 text-[8px] lg:text-xs items-center justify-center gap-1">
                                    {
                                        hourStart.confirmed ? (
                                            <BsHandThumbsUp title="Confirmado" className="text-green-600 hover:scale-110" />
                                        ) : (
                                            <BsHandThumbsDown title="Não confirmado" className="text-red-600 hover:scale-110" />
                                        )
                                    }
                                    {
                                        hourStart.done ? (
                                            <BsCheck2Square title="Realizado" className="text-green-600 hover:scale-110" />
                                        ) : (
                                            <BsSquare title="Não realizado" className="text-red-600 hover:scale-110" />
                                        )

                                    }
                                    {
                                        hourStart.paid ? (
                                            <BsCurrencyDollar title="Pago" className="text-green-600 hover:scale-110" />
                                        ) : (
                                            <BsCurrencyDollar title="Não pago" className="text-red-600 hover:scale-110" />
                                        )
                                    }

                                    <BsInfoCircle onClick={() => setShowModal(true)} className="text-blue-600 hover:scale-110 cursor-pointer" />
                                </span>
                                <div className="flex gap-1 lg:gap-2">
                                    <Link className="hover:scale-110 w-full text-center hover:underline text-[8px] lg:text-base" href={`/empresa/agenda/editar/${hourStart.id}`}><BsPencilSquare className="inline" /></Link>
                                    <form action={deleteCompanySchedule.bind(null, hourStart?.id)} className="w-full">
                                        <SubmitConfirmationButton name="Deletar" loadingName="Deletando..." />
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    if (!hourStart && !hourBusy) {
                        return (
                            <div className="h-[35px]"></div>
                        )
                    }
                })
            }
        </div>
    )
}

function Modal({ info, onClose }: { info: Record<string, string|number|boolean|Date>, onClose: Function }) {
    const keys = Object.keys(info);
    return (
        <div className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-45 z-40 flex items-center justify-center">
            <div className="relative min-w-1/2 min-h-[400px] bg-white p-4 rounded-xl">
                <ul className="flex flex-col gap-2">
                    {
                        keys.map((k, i) => {
                            if (info[k] instanceof Date) {
                                return <li key={i}><span className="font-bold">{k}:</span> {info[k].toLocaleDateString()}</li>
                            } else if (typeof info[k] === "boolean") {
                                return <li key={i}><span className="font-bold">{k}:</span> {info[k] ? "Sim" : "Não"}</li>
                            } else {
                                return <li key={i}><span className="font-bold">{k}:</span> {info[k]}</li>
                            }
                        })
                    }
                </ul>
                <BsX className="text-xl absolute top-2 right-2 hover:scale-110 cursor-pointer" onClick={() => onClose()} />
            </div>
        </div>
    )
}