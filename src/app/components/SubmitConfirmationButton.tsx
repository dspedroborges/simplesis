"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BsTrash, BsXCircleFill } from "react-icons/bs";

export default function SubmitButton({ name, loadingName }: { name: string, loadingName: string }) {
    const { pending } = useFormStatus();
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (name !== "Deletar") {
        return (
            <>
                {
                    !showConfirmation ? (
                        <span onClick={() => {
                            setShowConfirmation(true);
                            setTimeout(() => {
                                setShowConfirmation(false);
                            }, 3000);
                        }} className="text-xs lg:text-base mx-auto block text-center cursor-pointer bg-blue-800 text-white p-2 rounded-xl hover:bg-blue-600 transition-all">
                            {name}
                        </span>
                    ) : (
                        <button className="text-xs lg:text-base block mx-auto bg-red-100 text-black p-2 rounded-xl hover:bg-red-800 hover:text-white transition-all">
                            {pending ? loadingName : "Tenho certeza"}
                        </button>
                    )
                }
            </>
        )
    }

    return (
        <>
            {
                !showConfirmation ? (
                    <span onClick={() => {
                        setShowConfirmation(true);
                        setTimeout(() => {
                            setShowConfirmation(false);
                        }, 3000);
                    }} className="text-[8px] lg:text-base mx-auto block text-center cursor-pointer hover:scale-110">
                        <BsTrash className="inline" />
                    </span>
                ) : (
                    <button className="text-[8px] lg:text-base block mx-auto text-center text-red-600 hover:text-red-700 cursor-pointer hover:scale-110">
                        {pending ? loadingName : <BsXCircleFill className="inline" />}
                    </button>
                )
            }
        </>
    )
}