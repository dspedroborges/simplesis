import EditSaleForm from "@/app/components/forms/EditSaleForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: number } }) {
    const result = await prisma.companySale.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar venda" />
            <EditSaleForm data={result} />
        </>
    )
}