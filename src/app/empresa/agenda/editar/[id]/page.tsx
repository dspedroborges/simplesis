import EditScheduleForm from "@/app/components/forms/EditScheduleForm";
import prisma from "../../../../../../lib/prisma";

export default async function Page({ params }: { params: { id: number } }) {
    let result = await prisma.companySchedule.findUnique({
        where: {
            id: Number(params.id)
        },
    });

    return (
        <EditScheduleForm data={result} />
    )
}