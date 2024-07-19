"use client";

import Link from "next/link";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Searcher({ url }: { url: string }) {
    const [searchParam, setSearchParam] = useState("");

    return (
        <form className="w-full lg:w-auto flex gap-2 items-center p-2">
            <input placeholder="Digite aqui o que quer buscar" type="search" className="border border-blue  -800 p-4 rounded-xl w-full my-2" onChange={(e) => setSearchParam(e.target.value)} />
            <Link href={`${url}?searchParam=${searchParam}`}>
                <button type="submit">
                    <BsSearch className="hover:scale-110" />
                </button>
            </Link>
        </form>
    )
}