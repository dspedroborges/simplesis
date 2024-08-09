"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ name, loadingName }: { name: string, loadingName: string }) {
    const { pending } = useFormStatus();
    return <button className="w-full block mx-auto bg-blue-800 text-white p-2 rounded-xl my-8 hover:bg-blue-600 hover:text-white transition-all">{pending ? loadingName : name }</button>
}