import { getSession } from "@/auth";
import prisma from "../../../lib/prisma";
import TopBar from "../components/TopBar";
import { BsCake, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

function calculateDaysUntilExpiry(expiresAtDate: Date) {
    if (!expiresAtDate) return 0;

    const currentDate = new Date();
    const expiresAtTime = expiresAtDate.getTime();
    const currentTime = currentDate.getTime();
    const timeDifference = expiresAtTime - currentTime;
    const daysUntilExpiry = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysUntilExpiry;
}


export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const payment = await prisma.payment.findFirst({
        where: {
            companyId: company?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <>
            <TopBar title={`Bem-vindo, ${company?.companyName}`} />
            <span className="text-center my-4 block text-blue-800 font-bold">Seu plano expira em {calculateDaysUntilExpiry(payment?.expiresAt!)} dias.</span>
        </>
    )
}