import Link from "next/link";
import prisma from "../../../../../../lib/prisma"
import { deleteCompanyClient } from "@/app/actions/company/CompanyClientActions";
import { getSession } from "@/auth";
import TopBar from "@/app/components/TopBar";
import Searcher from "@/app/components/Searcher";
import Table from "@/app/components/Table";
import Pagination from "@/app/components/Pagination";
import { decryptAES } from "@/crypto";

export default async function Page({ params }: { params: { page: number } }) {
    const page = params.page;
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const clientsEncrypted = await prisma.companyClient.findMany({
        where: {
            companyId: company?.id
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    let clients = clientsEncrypted.map(c => {
        return {
            ...c,
            description: decryptAES(c.description),
            email: decryptAES(c.email),
            tel: decryptAES(c.tel)

        }
    })

    return (
        <>
            <TopBar title="Clientes" />
            <Searcher url="/empresa/clientes/busca" />

            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 my-8 p-2">
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Conhecimento">Conhecimento</Link>
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Interesse">Interesse</Link>
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Avaliação">Avaliação</Link>
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Negociação">Negociação</Link>
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Compra">Compra</Link>
                <Link className="w-full text-center border border-blue-800 p-2 rounded-xl hover:scale-105" href="/empresa/clientes/busca?searchParam=Renovamento">Renovamento</Link>
            </div>

            <Table
                header={["Nome", "Sexo", "Nascimento", "Descrição", "Tel", "Email", "Pipeline"]}
                includeEdition={true}
                includeDeletion={true}
                deleteAction={deleteCompanyClient}
                ignoreList={["id", "companyId"]}
                list={clients}
                updateLink="/empresa/clientes/editar"
            />
            {
                clients.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhum cliente encontrado.</div>
                )
            }
            <Pagination link="/empresa/clientes/todos" page={page} />
        </>
    )
}