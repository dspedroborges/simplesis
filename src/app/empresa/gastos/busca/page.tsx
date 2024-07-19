import Link from "next/link";
import { deleteCompanyClient } from "@/app/actions/company/CompanyClientActions";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import { deleteCompanyExpense } from "@/app/actions/company/CompanyExpenseActions";
import TopBar from "@/app/components/TopBar";
import Searcher from "@/app/components/Searcher";
import prisma from "../../../../../lib/prisma";
import Table from "@/app/components/Table";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
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
            OR: [
                {
                    title: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
                {
                    comment: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
            ]
        },
    });

    return (
        <>
            <TopBar title="Gastos: busca" />
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
                expenses.length === 0 && (
                    <div className="text-center my-8 font-bold">Nenhum gasto encontrado.</div>
                )
            }
        </>
    )
}