import EditOfferForm from "@/app/components/forms/EditOfferForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: number } }) {
    const result = await prisma.companyOffer.findUnique({
        where: {
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