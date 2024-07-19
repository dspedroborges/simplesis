import CreateClientForm from "@/app/components/forms/CreateClientForm";
import { getSession } from "@/auth";
import prisma from "../../../../../lib/prisma";

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const companyClientRecord = await prisma.companyClientRecord.findFirst({
        where: {
            companyId: company?.id
        }
    });

    return (
        <CreateClientForm companyClientRecord={companyClientRecord?.record || ""} />
    )
}