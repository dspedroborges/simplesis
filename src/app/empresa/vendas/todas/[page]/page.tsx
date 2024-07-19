import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import { deleteCompanySale } from "@/app/actions/company/CompanySaleActions";
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
    const sales = await prisma.companySale.findMany({
        where: {
            companyId: company?.id,
        },
        select: {
            title: true,
            comment: true,
            price: true,
            paymentMode: true,
            installments: true,
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    return (
        <>
            <TopBar title="Vendas" />
            <Searcher url="/empresa/vendas/busca" />
            <Table
                header={["Título", "Comentário", "Preço", "Modo de pagamento", "Parcelas"]}
                includeEdition={true}
                includeDeletion={true}
                deleteAction={deleteCompanySale}
                ignoreList={["id", "companyId"]}
                list={sales}
                updateLink="/empresa/vendas/editar"
            />
            {
                sales.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhuma venda encontrada.</div>
                )
            }
            <Pagination link="/empresa/vendas/todas" page={page} />
        </>
    )
}