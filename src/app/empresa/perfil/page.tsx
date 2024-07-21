import EditCompanyForm from "@/app/components/forms/EditCompanyForm";
import prisma from "../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import { getSession } from "@/auth";

export default async function Page() {
    const session = await getSession();
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        include: {
            company: {
                select: {
                    id: true,
                    email: true,
                    companyName: true,
                    tel: true,
                }
            }
        }
    });
    const result = {
        ...user?.company,
        username: user?.username,
    }

    return (
        <>
            <TopBar title="Editar perfil" />
            <EditCompanyForm data={result} />
        </>
    )
}