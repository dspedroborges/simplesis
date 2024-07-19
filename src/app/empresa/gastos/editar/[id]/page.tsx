import EditExpenseForm from "@/app/components/forms/EditExpenseForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: number } }) {
    const result = await prisma.companyExpense.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar gasto" />
            <EditExpenseForm data={result} />
        </>
    )
}