import { deleteCompanyClient } from "@/app/actions/company/CompanyClientActions"
import TopBar from "@/app/components/TopBar"
import prisma from "../../../../../lib/prisma"
import { getSession } from "@/auth"
import Table from "@/app/components/Table"

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const clients = await prisma.companyClient.findMany({
        where: {
            companyId: company?.id,
            OR: [
                {
                    name: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
                {
                    pipelineStage: {
                        contains: String(searchParams.searchParam),
                        mode: 'insensitive'
                    }
                },
            ]
        }
    });

    return (
        <>
            <TopBar title="Clientes" />
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
        </>
    )
}