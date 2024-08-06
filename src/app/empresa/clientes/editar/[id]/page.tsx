import TopBar from "@/app/components/TopBar";
import prisma from "../../../../../../lib/prisma";
import EditClientForm from "@/app/components/forms/EditClientForm";
import { decryptAES } from "@/crypto";
import { getSession } from "@/auth";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const result = await prisma.companyClient.findUnique({
        where: {
            companyId: company?.id,
            id: Number(params.id)
        }
    });

    let data;
    if (result) data = { ... result, description: decryptAES(result.description), email: decryptAES(result.email), tel: decryptAES(result.tel) }

    return (
        <>
            <TopBar title="Editar cliente" />
            <EditClientForm data={data || {}} />
        </>
        
    )
}