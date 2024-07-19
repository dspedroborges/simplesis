import Link from "next/link";
import { deleteCompanyClient } from "@/app/actions/company/CompanyClientActions";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import { deleteCompanyOffer } from "@/app/actions/company/CompanyOfferActions";
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
    const offers = await prisma.companyOffer.findMany({
        where: {
            companyId: company?.id,
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    return (
        <>
            <TopBar title="Produtos/serviços" />
            <Table
                header={["Tipo", "Nome", "Descrição", "Preço", "Estoque"]}
                includeEdition={true}
                includeDeletion={true}
                deleteAction={deleteCompanyOffer}
                ignoreList={["id", "companyId"]}
                list={offers}
                updateLink="/empresa/produtos-servicos/editar"
            />
            {
                offers.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhum produto/serviço encontrado.</div>
                )
            }
            <Pagination link="/empresa/produtos-servicos/todos" page={page} />
        </>
    )
}