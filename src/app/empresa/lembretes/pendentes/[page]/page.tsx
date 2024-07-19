import Link from "next/link";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import { deleteCompanyReminder } from "@/app/actions/company/CompanyReminderActions";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import Pagination from "@/app/components/Pagination";

export default async function Page({ params }: { params: { page: number } }) {
    const page = params.page;
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const today = new Date();
    const startOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const endOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));

    const reminders = await prisma.companyReminder.findMany({
        where: {
            companyId: company?.id,
            done: false,
            date: {
                gte: startOfTodayUTC,
                lte: endOfTodayUTC
            }
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    return (
        <>
            <TopBar title="Lembretes pendentes" />
            {
                reminders.map((elem, i) => {
                    return (
                        <div key={i} className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 p-8">
                            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Lembrete
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {elem.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/empresa/lembretes/editar/${elem.id}`}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Atualizar
                                        <svg
                                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </Link>
                                    <form action={deleteCompanyReminder.bind(null, elem?.id)} className="w-full">
                                        <SubmitConfirmationButton name="Deletar" loadingName="Deletando..." />
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                reminders.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhum lembrete encontrado.</div>
                )
            }
            <Pagination link="/empresa/lembretes/todos" page={page} />
        </>
    )
}