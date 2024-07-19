import EditReminderForm from "@/app/components/forms/EditReminderForm";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: { id: number } }) {
    const result = await prisma.companyReminder.findUnique({
        where: {
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