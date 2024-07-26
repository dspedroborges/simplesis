"use client";

import Link from "next/link";
import { useState } from "react";
import { BsCaretDownFill, BsCaretRight, BsDot, BsList, BsX } from "react-icons/bs";

export default function Sidebar({ options }: { options: Record<string, any>[] }) {
    const [showSidebar, setShowSideabar] = useState(true);

    return (
        <>
            <BsList className={`hover:scale-110 text-2xl absolute top-4 right-2 text-white cursor-pointer z-50 ${showSidebar && "hidden"}`} onClick={() => setShowSideabar(!showSidebar)} />
            {
                showSidebar && (
                    <div className="bg-gray-950 text-white flex flex-col overflow-y-scroll h-screen md:overflow-y-hidden md:h-auto md:min-h-screen fixed left-0 top-0 w-full lg:relative lg:min-w-[300px] lg:w-1/5 select-none">
                        <BsX className="text-2xl text-white absolute top-4 right-2 hover:scale-110 cursor-pointer" onClick={() => setShowSideabar(false)} />
                        <img src="/logo.png" className="block mx-auto my-8 w-[100px] hover:scale-110" />
                        <ul className="w-full flex flex-col items-center justify-center">
                            {
                                options && options.map((o: Record<string, any>, i: number) => {
                                    if (o.link) {
                                        return <Link prefetch={false} key={i} href={o.link} className="relative w-full py-4 bg-gray-800 hover:bg-gray-700 flex items-center justify-between p-2 border-b">
                                            {
                                                o.icon && (
                                                    o.icon
                                                )
                                            }
                                            <li>{o.name}</li>
                                            <BsDot />
                                            {
                                                (o.notify && o.notify > 0) && (
                                                    <span className="animate-pulse absolute top-1/2 left-4 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">{o.notify}</span>
                                                )
                                            }
                                        </Link>
                                    }

                                    if (o.dropdown) {
                                        return <Dropdown key={i} name={o.name} dropdown={o.dropdown} notify={o.notify} icon={o.icon} />
                                    }

                                    return <span key={i} className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-center border-b">
                                        <li className="block relative">
                                            {
                                                o.icon && (
                                                    o.icon
                                                )
                                            }
                                            {o.name}
                                            {
                                                (o.notify && o.notify > 0) && (
                                                    <span className="animate-pulse absolute top-1/2 left-4 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">{o.notify}</span>
                                                )
                                            }
                                        </li>
                                    </span>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export function Dropdown({ name, dropdown, notify, icon }: { name: string, dropdown: { name: string, link: string, notify?: number }[], notify?: number, icon?: React.ReactNode }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <span onClick={() => setShowDropdown(!showDropdown)} className="relative w-full py-4 bg-gray-800 hover:bg-gray-700 text-center border-b p-2 flex items-center justify-between gap-2 cursor-pointer">
                {
                    icon && (
                        icon
                    )
                }
                <li>{name}</li>
                {
                    showDropdown ? (
                        <BsCaretDownFill />
                    ) : (
                        <BsCaretRight />
                    )
                }
                {
                    (Number(notify) > 0) && (
                        <span className="animate-pulse absolute top-1/2 left-4 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">{notify}</span>
                    )
                }
            </span>
            {
                showDropdown && (
                    <div className="flex flex-col w-full">
                        {
                            dropdown.map((d, i) => {
                                return <Link prefetch={false} key={i} href={d.link} className="relative w-full py-4 bg-blue-950 hover:bg-blue-900 text-center border-b">
                                    <li>{d.name}</li>
                                    {
                                        (Number(d.notify) > 0) && (
                                            <span className="animate-pulse absolute top-1/2 left-4 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">{d.notify}</span>
                                        )
                                    }
                                </Link>
                            })
                        }
                    </div>
                )
            }
        </>
    )
}