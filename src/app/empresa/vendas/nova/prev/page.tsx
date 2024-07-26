import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import PrevForm from "@/app/components/forms/PrevForm";

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const clients = await prisma.companyClient.findMany({
        where: {
            companyId: company?.id,
        }
    });

    const employees = await prisma.companyEmployee.findMany({
        where: {
            companyId: company?.id,
        }
    });

    const offers = await prisma.companyOffer.findMany({
        where: {
            companyId: company?.id,
        }
    });

    return (
        <>
            <TopBar title="Informações prévias" />
            <PrevForm clients={clients} employees={employees} offers={offers} redirect="/empresa/vendas/nova" />
        </>
    )
}