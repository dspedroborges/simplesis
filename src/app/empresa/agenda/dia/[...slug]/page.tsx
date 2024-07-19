import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import SchedulerOptions from "@/app/components/SchedulerOptions";
import DayScheduler from "@/app/components/DayScheduler";

export default async function Page({ params }: { params: { slug: string[] } }) {
    const date = String(params.slug[0]);
    const employeeId = Number(params.slug[1]);

    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const convertedDate = new Date(date + "T00:00:00.000Z");

    let schedules;
    if (!employeeId) {
        schedules = await prisma.companySchedule.findMany({
            where: {
                companyId: company?.id,
                date: convertedDate,
            },

            include: {
                offer: true,
                client: true,
            },
            orderBy: [
                { hourStart: "asc" },
                { hourEnd: "desc" }
            ]
        });
    } else {
        schedules = await prisma.companySchedule.findMany({
            where: {
                companyId: company?.id,
                date: convertedDate,
                employeeId: employeeId
            },

            include: {
                employee: true,
                offer: true,
                client: true,
            },
            orderBy: [
                { hourStart: "asc" },
                { hourEnd: "desc" }
            ]
        });
    }


    const employees = await prisma.companyEmployee.findMany({
        where: {
            companyId: company?.id,
        },
        select: {
            name: true,
            id: true,
        }
    });

    return (
        <>
            <TopBar title="Agenda" />
            <SchedulerOptions type="dia" currentDate={date} employees={employees} />
            <DayScheduler header={["Hora", "Descrição", "Funcionário", "Produto/serviço", "Cliente", "Editar", "Deletar"]} schedules={schedules} />
        </>
    )
}