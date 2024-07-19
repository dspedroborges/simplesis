import TopBar from "@/app/components/TopBar";
import prisma from "../../../../../lib/prisma";
import Table from "@/app/components/Table";
import Pagination from "@/app/components/Pagination";
import { deleteCompany } from "@/app/actions/company/CompanyActions";

export default async function Page({ params }: { params: { page: number } }) {
    const page = params.page;
    const salesUser = await prisma.company.findMany({
        include: {
            user: true,
            Payment: {
                where: {
                    paymentConfirmed: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 1
            }
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    const sales = salesUser.map((su) => {
        const latestPayment = su.Payment[0];
        return {
            id: su.id,
            plan: latestPayment ? latestPayment.plan : "NO_PLAN",
            companyName: su.companyName,
            tel: su.tel,
            email: su.email,
            username: su.user.username
        }
    })

    return (
        <>
            <TopBar title="Vendas" />
            <Table
                header={["Plano", "Empresa", "Telefone", "Email", "Usuário"]}
                list={sales}
                includeDeletion={true}
                includeEdition={true}
                ignoreList={["id"]}
                updateLink="/admin/clientes/editar"
                deleteAction={deleteCompany}
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