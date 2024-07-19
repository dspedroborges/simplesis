import EditEmployeeForm from "@/app/components/forms/EditEmployeeForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: number } }) {
    const result = await prisma.companyEmployee.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar funcionário" />
            <EditEmployeeForm data={result} />
        </>
    )
}