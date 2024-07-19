import EditCompanyForm from "@/app/components/forms/EditCompanyForm";
import prisma from "../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: string } }) {
    const result = await prisma.company.findUnique({
        where: {
            id: String(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar perfil" />
            <EditCompanyForm data={result} />
        </>
    )
}