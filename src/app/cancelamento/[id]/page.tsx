import { decryptAES } from "@/crypto";
import prisma from "../../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const [failureKey, id] = params.id ? decryptAES(params.id).split("_") : ["", ""];

    console.log({failureKey, id});

    if (failureKey === process.env.FAILURE_KEY) {
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
        <div className="text-center p-8 rounded-xl m-4">
            <h2 className="text-2xl font-extrabold">Notamos que você desistiu da compra</h2>

            <p className="mb-8 mt-4">Caso tenha alguma dúvida, não hesite em entrar em contato conosco.</p>

            <img src="/man.jpg" className="mx-auto rounded-xl w-full md:w-1/2" />
        </div>
    )
}