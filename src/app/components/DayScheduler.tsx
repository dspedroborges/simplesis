import Link from "next/link";
import SubmitConfirmationButton from "./SubmitConfirmationButton";
import { deleteCompanySchedule } from "../actions/company/CompanyScheduleActions";
import { BsCheck2Square, BsCurrencyDollar, BsHandThumbsDown, BsHandThumbsUp, BsPencilSquare, BsSquare } from "react-icons/bs";
import { memo } from "react";

export const createNumbersList = (start: number, end: number) => {
    let list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }

    return list;
}

export const isThereHourStart = (hour: number, schedules: Record<string, any>[]) => {
    for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].hourStart === hour) {
            return schedules[i];
        }
    }

    return false;
}

export const isThisHourBusy = (hour: number, schedules: Record<string, any>[]) => {
    for (let i = 0; i < schedules.length; i++) {
        if (hour >= schedules[i].hourStart && hour <= schedules[i].hourEnd) {
            return true;
        }
    }

    return false;
}

export default memo(function DayScheduler({ header, schedules }: { header: string[], schedules: Record<string, any>[] }) {
    const hours = createNumbersList(8, 21);

    return (
        <>
            <div className="p-4">
                <div className="w-full flex rounded-t-xl py-4 bg-gray-800 text-white">
                    {
                        header.map((h, i) => {
                            return <span key={i} className="text-[8px] lg:text-base hidden w-full text-center font-bold lg:flex items-center justify-center">{h}</span>
                        })
                    }
                </div>
                <div className="flex w-full">
                    <div style={{ width: `${100 / header.length}%` }}>
                        {
                            hours.map((hour, i) => {
                                return <div key={i} className="text-[8px] lg:text-base w-full h-[35px] bg-gray-700 hover:bg-gray-800 text-white border-b border-white flex items-center justify-center last:rounded-b-xl">{hour}</div>
                            })
                        }
                    </div>
                    <div className="w-[90%] flex flex-col">
                        {
                            hours.map((hour, i) => {
                                const hourStart = isThereHourStart(hour, schedules);
                                const hourBusy = isThisHourBusy(hour, schedules);
                                if (hourStart) {
                                    const range = (hourStart.hourEnd - hourStart.hourStart) + 1;
                                    return (
                                        <div key={i} className={`border-y rounded-r-xl border-white flex items-center bg-[${hourStart.employee?.schedulerColor}]`} style={{ backgroundColor: hourStart.employee?.schedulerColor || "#eee", height: `${range * 35}px` }}>
                                            <span className="border-r w-full text-center py-2 px-2 text-[8px] lg:text-base">
                                                {hourStart.description}
                                                <span className="flex text-[8px] lg:text-base items-center justify-center gap-1 my-1">
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
                                                </span>
                                            </span>
                                            <span className="border-r w-full text-center py-2 px-2 text-[8px] lg:text-base">{hourStart.employee?.name}</span>
                                            <span className="border-r w-full text-center py-2 px-2 text-[8px] lg:text-base">{hourStart.offer?.name}</span>
                                            <span className="border-r w-full text-center py-2 px-2 text-[8px] lg:text-base">{hourStart.client?.name}</span>
                                            <Link className="w-full lg:py-4 lg:px-2 text-center hover:scale-110 text-[8px] lg:text-base" href={`/empresa/agenda/editar/${hourStart.id}`}><BsPencilSquare className="inline" /></Link>
                                            <form action={deleteCompanySchedule.bind(null, hourStart?.id)} className="w-full py-4 px-2">
                                                <SubmitConfirmationButton name="Deletar" loadingName="Deletando..." />
                                            </form>
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
                </div>
            </div>
        </>
    )
})