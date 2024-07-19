import { getSession } from "@/auth";
import prisma from "../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { deleteCompanySchedule } from "@/app/actions/company/CompanyScheduleActions";
import Table from "@/app/components/Table";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const result = await prisma.companySchedule.findMany({
        where: {
            companyId: company?.id,
            OR: [
                {
                    description: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
            ]
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

    const resultsByClientName = await prisma.companyClient.findMany({
        where: {
            companyId: company?.id,
            name: {
                contains: String(searchParams.searchParam),
                mode: 'insensitive'
            },
        },
        include: {
            CompanySchedule: {
                include: {
                    employee: true,
                    offer: true,
                    client: true,
                }
            }
        }
    });

    const schedulesByClientName = resultsByClientName.map(r => {
        return r.CompanySchedule;
    });

    const schedules = [...result, ...schedulesByClientName.flat()].map(r => {
        return {
            date: r.date,
            hourStart: r.hourStart,
            hourEnd: r.hourEnd,
            description: r.description,
            employee: r.employee.name,
            offer: r.offer.name,
            client: r.client.name,
        }
    })

    return (
        <>
            <TopBar title="Busca: agenda" />
            <div>
                <Table
                    header={["Data", "Hora início", "Hora fim", "Descrição", "Funcionário", "Produto/serviço", "Cliente"]}
                    includeEdition={true}
                    includeDeletion={true}
                    deleteAction={deleteCompanySchedule}
                    ignoreList={["id", "companyId"]}
                    list={schedules}
                    updateLink="/empresa/agenda/editar"
                />

                {
                    schedules.length === 0 && (
                        <p className="text-center my-4">Nenhum agendamento encontrado para essa busca.</p>
                    )
                }
            </div>
        </>
    )
}