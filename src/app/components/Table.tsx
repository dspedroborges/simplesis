"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link"
import SubmitConfirmationButton from "./SubmitConfirmationButton"
import { BsPencilSquare, BsTrash, BsXCircleFill } from "react-icons/bs";

export default function Table({ header, list, includeEdition, includeDeletion, deleteAction, ignoreList, updateLink }: { header: string[], list: Record<string, string | number | boolean | Date | null | undefined>[], includeEdition: boolean, includeDeletion: boolean, deleteAction?: Function, ignoreList: string[], updateLink: string }) {


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2 p-2 lg:hidden">
                {
                    list.map((e, i) => {
                        return (
                            <div className="flex flex-col border rounded-xl" key={i}>
                                {
                                    Object.keys(e).map((k, j) => {
                                        if (ignoreList.includes(k)) return;

                                        if (e[k] instanceof Date) {
                                            return <span className="text-center p-2" key={j}>{e[k].toLocaleDateString()}</span>
                                        }

                                        if (typeof e[k] === "boolean") {
                                            return <span className="text-center p-2" key={j}>{e[k] ? "Sim" : "Não"}</span>
                                        }

                                        return <span className="text-center p-2" key={j}>{e[k]}</span>

                                    })
                                }
                                {
                                    includeEdition && (
                                        <span className="text-center p-2 hover:scale-110"><Link className="w-full py-4 px-2 text-center hover:underline" href={`${updateLink}/${e.id}`}><BsPencilSquare className="inline" /></Link></span>
                                    )
                                }
                                {
                                    includeDeletion && deleteAction && (
                                        <div className="text-center p-2">
                                            <form action={deleteAction.bind(null, e?.id)} className="w-full py-4 px-2">
                                                <LocalSubmitConfirmationButton name="Deletar" loadingName="Deletando..." />
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
            <table className="text-[8px] md:text-xs lg:text-base mx-auto w-full hidden lg:table">
                <thead>
                    <tr className="bg-blue-800 text-white w-full">
                        {
                            header.map((h, i) => {
                                return <th className="border text-center p-2" key={i}>{h}</th>
                            })
                        }
                        {
                            includeEdition && (
                                <th className="border text-center p-2">Editar</th>
                            )
                        }
                        {
                            includeDeletion && (
                                <th className="border text-center p-2">Excluir</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((e, i) => {
                            return (
                                <tr className="hover:bg-gray-100" key={i}>
                                    {
                                        Object.keys(e).map((k, j) => {
                                            if (ignoreList.includes(k)) return;

                                            if (e[k] instanceof Date) {
                                                return <td className="border text-center p-2" key={j}>{e[k].toLocaleDateString()}</td>
                                            }

                                            if (typeof e[k] === "boolean") {
                                                return <td className="border text-center p-2" key={j}>{e[k] ? "Sim" : "Não"}</td>
                                            }

                                            return <td className="border text-center p-2" key={j}>{e[k]}</td>

                                        })
                                    }
                                    {
                                        includeEdition && (
                                            <td className="border text-center p-2 hover:scale-110"><Link className="w-full py-4 px-2 text-center hover:underline" href={`${updateLink}/${e.id}`}><BsPencilSquare className="inline" /></Link></td>
                                        )
                                    }
                                    {
                                        includeDeletion && deleteAction && (
                                            <td className="border text-center p-2">
                                                <form action={deleteAction.bind(null, e?.id)} className="w-full py-4 px-2">
                                                    <SubmitConfirmationButton name="Deletar" loadingName="Deletando..." />
                                                </form>
                                            </td>
                                        )
                                    }


                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function LocalSubmitConfirmationButton({ name, loadingName }: { name: string, loadingName: string }) {
    const { pending } = useFormStatus();
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    return (
        <>
            {
                !showConfirmation ? (
                    <span onClick={() => {
                        setShowConfirmation(true);
                        setTimeout(() => {
                            setShowConfirmation(false);
                        }, 3000);
                    }} className=" mx-auto block text-center cursor-pointer hover:scale-110">
                        <BsTrash className="inline" />
                    </span>
                ) : (
                    <button className="block mx-auto text-center text-red-600 hover:text-red-700 cursor-pointer hover:scale-110">
                        {pending ? loadingName : <BsXCircleFill className="inline" />}
                    </button>
                )
            }
        </>
    )
}