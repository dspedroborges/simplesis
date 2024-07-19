
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { decryptAES } from "@/crypto";
import { redirect } from "next/navigation";

export default async function Sucesso({ params }: { params: { id: string } }) {
    const [successKey, id] = params.id ? decryptAES(params.id).split("_") : ["", ""];

    console.log({successKey, id});

    if (successKey === process.env.SUCCESS_KEY) {
        await prisma.payment.update({
            where: {
                id,
            },
            data: {
                paymentConfirmed: true,
            }
        });
    } else {
        redirect("/");
    }

    return (
        <>
            <div className="text-center p-8 rounded-xl m-4">
                <h2 className="text-2xl font-extrabold">Obrigado por comprar conosco!</h2>

                <p className="mb-8 mt-4">Seu plano já está ativo.</p>

                <img src="/woman.jpg" className="mx-auto rounded-xl w-full md:w-1/2" />
            </div>
        </>
    )
}