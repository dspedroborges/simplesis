"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsPerson, BsX } from "react-icons/bs";
import Logout from "./Logout";

export default function Menu({ loggedUser }: { loggedUser?: Record<string, string> }) {
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith("/empresa")) return <></>;

    return (
        <header className="flex items-center justify-between px-4 py-4 bg-black">

            {/* logo - start */}
            <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
                aria-label="logo"
            >
                <img src="/logo.png" width={100} height={100} alt="Logo" />
                Simplesis
            </Link>
            {/* logo - end */}
            {/* nav - start */}
            <nav className={`${showMenu ? "flex flex-col z-30 fixed top-0 left-0 h-screen w-full bg-black items-center justify-center" : "hidden"} lg:flex lg:flex-row lg:justify-between lg:items-center w-1/2 h-full gap-12`}>
                <BsX className="lg:hidden text-white absolute top-2 right-2 text-4xl cursor-pointer hover:scale-105 hover:rotate-180 transition-all" onClick={() => setShowMenu(false)} />
                <Link onClick={() => setShowMenu(false)} href="/" className={`text-lg font-semibold ${(pathname == '/' || pathname.search("afiliado") !== -1) ? "text-blue-100" : "text-gray-600 hover:text-blue-200 transition duration-100"}`}>
                    Home
                </Link>
                <Link
                    onClick={() => setShowMenu(false)}
                    href="/sobre"
                    className={`text-lg font-semibold ${pathname == '/sobre' ? "text-blue-100" : "text-gray-600 hover:text-blue-200 transition duration-100"}`}
                >
                    Sobre
                </Link>
                {
                    loggedUser ? (
                        <Link
                            onClick={() => setShowMenu(false)}
                            href={loggedUser.role === "COMPANY" ? "/empresa" : "/admin"}
                            className="rounded-lg bg-gray-800 p-2 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-white hover:text-blue-800 focus-visible:ring md:text-base lg:inline-block"
                        >
                            <BsPerson className="text-2xl inline" />
                        </Link>
                    ) : (
                        <Link
                            onClick={() => setShowMenu(false)}
                            href={"/login"}
                            className="rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-gray-950 outline-none ring-yellow-300 transition duration-100 hover:bg-blue-100 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
                        >
                            <BsPerson className="text-2xl inline mr-2" />
                            <span>Login</span>
                        </Link>
                    )
                }
            </nav>
            {/* nav - end */}
            {/* buttons - start */}
            {
                loggedUser && (
                    <>

                        <Logout />
                    </>
                )
            }
            <button
                onClick={() => setShowMenu(!showMenu)}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-200 px-2.5 py-2 text-sm font-semibold text-gray-950 ring-yellow-300 hover:bg-blue-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
                Menu
            </button>
            {/* buttons - end */}
        </header>

    )
}