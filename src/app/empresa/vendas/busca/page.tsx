import { getSession } from "@/auth";
import { deleteCompanySale } from "@/app/actions/company/CompanySaleActions";
import TopBar from "@/app/components/TopBar";
import prisma from "../../../../../lib/prisma";
import Table from "@/app/components/Table";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });
    const sales = await prisma.companySale.findMany({
        where: {
            companyId: company?.id,
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
        select: {
            title: true,
            comment: true,
            price: true,
            paymentMode: true,
            installments: true,
        },
    });

    return (
        <>
            <TopBar title="Vendas: busca" />
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
                sales.length === 0 && (
                    <div className="text-center my-8 font-bold">Nenhuma venda encontrada.</div>
                )
            }
        </>
    )
}