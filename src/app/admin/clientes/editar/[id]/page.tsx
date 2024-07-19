import TopBar from "@/app/components/TopBar";
import prisma from "../../../../../../lib/prisma";
import EditCompanyAsAdminForm from "@/app/components/forms/EditCompanyAsAdminForm";

export default async function Page({ params }: { params: { id: string } }) {
    let result = await prisma.company.findUnique({
        where: {
            id: params.id
        },
        include: {
            user: true,
        }
    });

    const payment = await prisma.payment.findFirst({
        where: {
            companyId: params.id,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const data = { ...result, username: result?.user.username, plan: payment?.plan || "NO_PLAN" }

    return (
        <>
            <TopBar title="Editar empresa" />
            <EditCompanyAsAdminForm data={data} />
        </>
    )
}