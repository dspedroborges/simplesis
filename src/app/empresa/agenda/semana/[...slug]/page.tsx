import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import WeekScheduler from "@/app/components/WeekScheduler";
import SchedulerOptions from "@/app/components/SchedulerOptions";
import TopBar from "@/app/components/TopBar";
import { endOfTodayUTC, startOfTodayUTC } from "@/utils";

function getNextSixDaysFromDate(inputDate: string) {
    const startDate = new Date(inputDate);
    const nextSixDays = [startDate.toISOString().split("T")[0]];

    for (let i = 1; i <= 6; i++) {
        const nextDay = new Date(startDate);
        nextDay.setDate(startDate.getDate() + i);
        nextSixDays.push(nextDay.toISOString().split("T")[0]);
    }
    
    return nextSixDays;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const date = String(params.slug[0]);
    const employeeId = Number(params.slug[1]);

    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const weekDays = getNextSixDaysFromDate(date);
    const schedulesPromises = weekDays.map(day => {
        const normalizedDate = new Date(day + "T00:00:00.000Z");
    
        return prisma.companySchedule.findMany({
            where: {
                companyId: company?.id,
                date: normalizedDate,
                employeeId
            },
            include: {
                employee: true,
                client: true,
                offer: true,
            }
        });
    });
    
    const schedulesMatrix = await Promise.all(schedulesPromises);

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
            <TopBar title="Agenda: semana" />
            <SchedulerOptions type="semana" currentDate={date} employees={employees} currentEmployee={employeeId} />
            <WeekScheduler header={["Hora", ...weekDays]} schedulesMatrix={schedulesMatrix} />
        </>
    )
}