"use client";

import { useRouter } from "next/navigation";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default function GoBack() {
    const router = useRouter();

    return (
        <span onClick={(() => router.back())} className="cursor-pointer text-xl text-left w-full block text-blue-600 px-4 my-8 hover:underline hover:text-blue-700"><BsArrowLeftCircleFill className="inline" /> Voltar</span>
    )
}