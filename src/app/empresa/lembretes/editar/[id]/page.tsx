import EditReminderForm from "@/app/components/forms/EditReminderForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import { getSession } from "@/auth";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const result = await prisma.companyReminder.findUnique({
        where: {
            companyId: company?.id,
            id: Number(params.id)
        }
    });

    return (
        <>
            <TopBar title="Editar lembrete" />
            <EditReminderForm data={result} />
        </>
    )
}