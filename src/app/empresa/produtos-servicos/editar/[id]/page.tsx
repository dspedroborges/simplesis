import EditOfferForm from "@/app/components/forms/EditOfferForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import { getSession } from "@/auth";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const result = await prisma.companyOffer.findUnique({
        where: {
            companyId: company?.id,
            id: Number(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar produto/serviço" />
            <EditOfferForm data={result} />
        </>
    )
}