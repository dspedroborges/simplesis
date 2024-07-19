import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Pagination({ link, page }: { link: string, page: number }) {
    return (
        <div className="bg-gray-100 text-gray-800 py-1 flex items-center justify-around">
            <Link className="hover:scale-110" href={`${link}/${Number(page) - 1}`}><BsArrowLeft /></Link>
            <span>{(page && page > 1) ? page : 1}</span>
            <Link className="hover:scale-110" href={`${link}/${Number(page) + 1}`}><BsArrowRight /></Link>
        </div>
    )
}