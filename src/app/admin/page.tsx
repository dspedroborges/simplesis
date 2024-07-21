
import prisma from "../../../lib/prisma";
import TopBar from "../components/TopBar";

export default async function Page() {
    const totalClients = await prisma.company.count();
    const totalSchedules = await prisma.companySchedule.count();
    const clientsWithPlan = await prisma.company.findMany({
        include: {
            Payment: {
                where: {
                    expiresAt: {
                        gte: new Date()
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 1,
            }
        }
    });
    const totalPayments = await prisma.payment.count({
        where: {
            paymentConfirmed: true,
        }
    });

    const totalClientsWithPlan = (clientsWithPlan.map((c) => {
        if (c.Payment) return c;
    })).length;

    return (
        <>
            <TopBar title="Bem-vindo, Admin" />
            <div className="p-2 flex flex-col justify-start items-center gap-2 lg:flex-row lg:justify-around lg:items-center mb-4">
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total de clientes:</h3>
                    <h4>{totalClients}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total de vendas:</h3>
                    <h4>{totalPayments}</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Total de agendamentos:</h3>
                    <h4>{totalSchedules}</h4>
                </div>
            </div>
            <div className="p-2 flex flex-col justify-start items-center gap-2 lg:flex-row lg:justify-around lg:items-center mb-4">
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Taxa de conversão:</h3>
                    <h4>{((totalClientsWithPlan / totalClients) * 100).toFixed(2)}%</h4>
                </div>
                <div className="hover:scale-105 bg-white shadow-md w-full border p-2 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Lucro mensal esperado:</h3>
                    <h4>{totalClients * 29.99}</h4>
                </div>
            </div>
        </>
    )
}