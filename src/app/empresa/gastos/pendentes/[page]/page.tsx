import Link from "next/link";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import { deleteCompanyExpense } from "@/app/actions/company/CompanyExpenseActions";
import prisma from "../../../../../../lib/prisma";
import TopBar from "@/app/components/TopBar";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";

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

    const expenses = await prisma.companyExpense.findMany({
        where: {
            companyId: company?.id,
            paid: false,
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
            <TopBar title="Gastos pendentes" />
            <Table
                header={["Título", "Comentário", "Preço", "Data"]}
                includeEdition={true}
                includeDeletion={true}
                deleteAction={deleteCompanyExpense}
                ignoreList={["id", "companyId"]}
                list={expenses}
                updateLink="/empresa/gastos/editar"
            />
            {
                expenses.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhum gasto encontrado.</div>
                )
            }
            <Pagination link="/empresa/gastos/pendentes" page={page} />
        </>
    )
}