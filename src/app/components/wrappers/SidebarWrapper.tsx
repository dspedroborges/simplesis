import { getSession } from "@/auth";
import prisma from "../../../../lib/prisma";
import Sidebar from "../Sidebar";
import { BsCalendar2Date, BsCurrencyDollar, BsGraphUp, BsHouse, BsImage, BsJournals, BsList, BsPeople, BsPerson } from "react-icons/bs";
import { endOfTodayUTC, startOfTodayUTC } from "@/utils";

export default async function SidebarWrapper() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    if (session.user.id === "admin" && session.user.role === "ADMIN") {
        const options = [
            {
                name: "Início",
                link: "/admin",
                icon: <BsHouse/>
            },
            {
                name: "Vendas",
                link: "/admin/vendas/1",
                icon: <BsList/>
            },
            {
                name: "Clientes",
                link: "/admin/clientes/1",
                icon: <BsList/>,
            },
        ]

        return <Sidebar options={options} />
    }

    const countReminders = await prisma.companyReminder.count({
        where: {
            companyId: company?.id,
            done: false,
            date: {
                gte: startOfTodayUTC,
                lte: endOfTodayUTC
            }
        }
    });

    const countExpenses = await prisma.companyExpense.count({
        where: {
            companyId: company?.id,
            paid: false,
            date: {
                gte: startOfTodayUTC,
                lte: endOfTodayUTC
            }
        }
    });

    const firstEmployee = await prisma.companyEmployee.findFirst({
        where: {
            companyId: company?.id,
        },
        select: {
            id: true,
        },
    });

    const options = [
        {
            name: "Início",
            link: "/empresa",
            icon: <BsHouse/>
        },
        {
            name: "Dashboard",
            link: "/empresa/dashboard",
            icon: <BsGraphUp/>
        },
        {
            name: "Agendamentos",
            dropdown: [
                { name: "Agenda por dia", link: `/empresa/agenda/dia/${new Date().toISOString().split("T")[0]}/${firstEmployee?.id || 0}` },
                { name: "Agenda por semana", link: `/empresa/agenda/semana/${new Date().toISOString().split("T")[0]}/${firstEmployee?.id || 0}` },
                { name: "Novo", link: "/empresa/agenda/novo/prev" },
            ],
            icon: <BsCalendar2Date/>
        },
        {
            name: "Lembretes",
            notify: countReminders,
            dropdown: [
                { name: "Novo", link: "/empresa/lembretes/novo" },
                { name: "Pendentes", link: "/empresa/lembretes/pendentes/1", notify: countReminders },
                { name: "Realizados", link: "/empresa/lembretes/realizados/1" },
            ],
            icon: <BsJournals/>
        },
        {
            name: "Clientes",
            dropdown: [
                { name: "Novo", link: "/empresa/clientes/novo" },
                { name: "Todos", link: "/empresa/clientes/todos/1" },
            ],
            icon: <BsPeople/>
        },
        {
            name: "Vendas",
            dropdown: [
                { name: "Nova", link: "/empresa/vendas/nova/prev" },
                { name: "Todas", link: "/empresa/vendas/todas/1" },
            ],
            icon: <BsList/>
        },
        {
            name: "Gastos",
            notify: countExpenses,
            dropdown: [
                { name: "Novo", link: "/empresa/gastos/novo" },
                { name: "Pendentes", link: "/empresa/gastos/pendentes/1", notify: countExpenses },
                { name: "Pagos", link: "/empresa/gastos/pagos/1" },

            ],
            icon: <BsCurrencyDollar/>
        },
        {
            name: "Funcionários",
            dropdown: [
                { name: "Novo", link: "/empresa/funcionario/novo" },
                { name: "Todos", link: "/empresa/funcionario/todos/1" },
            ],
            icon: <BsPeople/>
        },
        {
            name: "Produtos/serviços",
            dropdown: [
                { name: "Novo", link: "/empresa/produtos-servicos/novo" },
                { name: "Todos", link: "/empresa/produtos-servicos/todos/1" },
            ],
            icon: <BsList/>
        },
        {
            name: "Ficha",
            link: "/empresa/ficha/",
            icon: <BsList/>
        },
        {
            name: "Perfil",
            link: "/empresa/perfil/",
            icon: <BsPerson/>
        },
    ];

    return <Sidebar options={options} />
}