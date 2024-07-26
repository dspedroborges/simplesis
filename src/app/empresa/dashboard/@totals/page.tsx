import { getSession } from "@/auth";
import { endOfMonth, endOfTodayUTC, startOfMonth, startOfTodayUTC } from "@/utils";
import prisma from "../../../../../lib/prisma";

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const countSchedulesForToday = await prisma.companySchedule.count({
        where: {
            companyId: company?.id,
            date: {
                gte: startOfTodayUTC,
                lte: endOfTodayUTC
            }
        }
    });

    const countClients = await prisma.companyClient.count();

    const countBuy = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Compra"
        }
    });
    const countRenew = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Renovação"
        }
    });

    const totalSales = await prisma.companySale.aggregate({
        _sum: {
            price: true
        },
        where: {
            companyId: company?.id,
            createdAt: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        }
    })

    const totalExpenses = await prisma.companyExpense.aggregate({
        _sum: {
            price: true
        },
        where: {
            companyId: company?.id,
            date: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        }
    })

    const profit = Number(totalSales._sum.price) - Number(totalExpenses._sum.price);

    return (
        <div>
            <div className="p-2 flex flex-col justify-start items-center gap-2 lg:flex-row lg:justify-around lg:items-center mb-4">
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Agendamentos para hoje:</h3>
                    <h4>{countSchedulesForToday}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total de clientes:</h3>
                    <h4>{countClients}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Taxa de conversão:</h3>
                    <h4>{(countBuy >= 0 && countRenew >= 0 && countClients > 0) ? (((countBuy + countRenew) / countClients) * 100).toFixed(2) : 0}%</h4>
                </div>
            </div>
            <div className="p-2 flex flex-col justify-start items-center gap-2 lg:flex-row lg:justify-around lg:items-center mb-4">
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total vendido (mês):</h3>
                    <h4>R${Number(totalSales._sum.price)}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total gasto (mês):</h3>
                    <h4>R${Number(totalExpenses._sum.price)}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Lucro (mês):</h3>
                    <h4>R${Number(profit)}</h4>
                </div>
            </div>
        </div>
    )
}