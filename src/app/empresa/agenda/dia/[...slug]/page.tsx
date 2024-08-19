import { getSession } from "@/auth";
import DayScheduler from "@/app/components/DayScheduler";
import prisma from "../../../../../../lib/prisma";
import SchedulerOptions from "@/app/components/SchedulerOptions";
import TopBar from "@/app/components/TopBar";
import { endOfTodayUTC, startOfTodayUTC } from "@/utils";

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
          schedulerColor: true,
          _count: {
            select: {
              companySchedule: {
                where: {
                  date: {
                    gte: startOfTodayUTC,
                    lte: endOfTodayUTC,
                  },
                },
              },
            },
          },
        },
      });

    return (
        <>
            <TopBar title="Agenda: dia" />
            <SchedulerOptions type="dia" currentDate={date} employees={employees} currentEmployee={employeeId} />
            <DayScheduler header={["Hora", "Descrição", "Funcionário", "Produto/serviço", "Cliente", "Editar", "Deletar"]} schedules={schedules} />
        </>
    )
}