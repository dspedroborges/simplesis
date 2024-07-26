import { getSession } from "@/auth";
import prisma from "../../../../lib/prisma";
import EditClientRecordForm from "@/app/components/forms/EditClientRecordForm";

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });
    const record = await prisma.companyClientRecord.findUnique({
        where: {
            companyId: company?.id
        }
    });


    return <EditClientRecordForm record={record?.record || ""} />
}