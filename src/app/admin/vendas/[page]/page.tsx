import TopBar from "@/app/components/TopBar";
import prisma from "../../../../../lib/prisma";
import Table from "@/app/components/Table";
import Pagination from "@/app/components/Pagination";

export default async function Page({ params }: { params: { page: number } }) {
    const page = params.page;
    const _sales = await prisma.payment.findMany({
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0,
        include: {
            company: true,
        }
    });

    let sales = _sales.map((s) => {
        return {
            plan: s.plan,
            company: s.company.companyName,
            paymentConfirmed: s.paymentConfirmed,
            expiresAt: s.expiresAt
        }
    })

    return (
        <>
            <TopBar title="Vendas" />
            <Table
                header={["Plano", "Empresa", "Pagamento confirmado", "Data de expiração"]}
                list={sales}
                includeDeletion={false}
                includeEdition={false}
                ignoreList={[]}
                updateLink=""
            />
            {
                sales.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhuma venda encontrada.</div>
                )
            }
            <Pagination link="/admin/vendas" page={page} />
        </>
    )
}