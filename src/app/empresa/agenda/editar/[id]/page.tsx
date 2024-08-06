import EditScheduleForm from "@/app/components/forms/EditScheduleForm";
import prisma from "../../../../../../lib/prisma";
import { getSession } from "@/auth";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    let result = await prisma.companySchedule.findUnique({
        where: {
            companyId: company?.id,
            id: Number(params.id)
        },
    });

    return (
        <EditScheduleForm data={result} />
    )
}