"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Whatsapp() {
    const pathname = usePathname();

    if (pathname !== "/" && pathname !== "/sobre" && pathname !== "/contato" && pathname !== "/registro" && !pathname.startsWith("/sucesso") && !pathname.startsWith("/cancelamento")) return <></>;

    return (
        <>
            <div className="w-[75px] h-[75px] rounded-full fixed bottom-5 right-5 animate-ping bg-green-300 z-50"></div>
            <Link href="https://wa.me/5561998746331?text=Olá" target="_blank">
                <img
                    src="/whatsapp.png"
                    alt="Whatsapp logo"
                    width={75}
                    height={75}
                    className="fixed bottom-5 right-5 cursor-pointer hover:scale-110 transition-all z-50"
                />
            </Link>
        </>
    )
}