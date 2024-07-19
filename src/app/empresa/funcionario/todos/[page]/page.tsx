import Link from "next/link";
import SubmitConfirmationButton from "@/app/components/SubmitConfirmationButton";
import { getSession } from "@/auth";
import prisma from "../../../../../../lib/prisma";
import { deleteCompanyEmployee } from "@/app/actions/company/CompanyEmployeeActions";
import TopBar from "@/app/components/TopBar";
import { BsArrowLeft, BsArrowRight, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
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
    const employees = await prisma.companyEmployee.findMany({
        where: {
            companyId: company?.id,
        },
        take: 10,
        skip: (page && page > 1) ? page * 10 : 0
    });

    return (
        <>
            <TopBar title="Funcionários" />

            <Table
                header={["Nome", "CPF", "Email", "Tel", "Salário", "Dia de pagamento", "Cor na agenda"]}
                includeEdition={true}
                includeDeletion={true}
                deleteAction={deleteCompanyEmployee}
                ignoreList={["id", "companyId"]}
                list={employees}
                updateLink="/empresa/funcionario/editar"
            />

            {
                employees.length <= 0 && (
                    <div className="text-center my-8 font-bold">Nenhum funcionário encontrado.</div>
                )
            }
            <Pagination link="/empresa/funcionario/todos" page={page} />
        </>
    )
}