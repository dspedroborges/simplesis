import Link from "next/link";
import { deleteCompanyClient } from "@/app/actions/company/CompanyClientActions";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import { deleteCompanyExpense } from "@/app/actions/company/CompanyExpenseActions";
import TopBar from "@/app/components/TopBar";
import Searcher from "@/app/components/Searcher";
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
    const expenses = await prisma.companyExpense.findMany({
        where: {
            companyId: company?.id,
            paid: true,
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    return (
        <>
            <TopBar title="Gastos pagos" />
            <Searcher url="/empresa/gastos/busca" />
            <Table
                header={["Título", "Comentário", "Preço", "Data", "Pago"]}
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
            <Pagination link="/empresa/gastos/pagos" page={page} />
        </>
    )
}