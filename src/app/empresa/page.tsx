import { getSession } from "@/auth";
import prisma from "../../../lib/prisma";
import TopBar from "../components/TopBar";
import { BsCake, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import PieWrapper from "../components/wrappers/PieWrapper";
import LineWrapper from "../components/wrappers/LineWrapper";

function calculateDaysUntilExpiry(expiresAtDate: Date) {
    if (!expiresAtDate) return 0;

    const currentDate = new Date();
    const expiresAtTime = expiresAtDate.getTime();
    const currentTime = currentDate.getTime();
    const timeDifference = expiresAtTime - currentTime;
    const daysUntilExpiry = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysUntilExpiry;
}

function calculateAge(birth: Date) {
    const today = new Date()
    const birthDate = new Date(birth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

function averageAge(ages: number[]) {
    const total = ages.reduce((acc, age) => acc + age, 0)
    return total / ages.length
}

function getBirthdays(clients: Record<string, any>[]) {
    const date = new Date();
    const currentDay = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    let birthdays = [];

    for (let i = 0; i < clients.length; i++) {
        const birth = clients[i].birth.toISOString().split("T")[0];
        const day = Number(birth.split("-")[2]);
        const month = Number(birth.split("-")[1]);

        if (currentDay === day && currentMonth === month) {
            birthdays.push(clients[i]);
        }
    }

    return birthdays;
}

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

    const payment = await prisma.payment.findFirst({
        where: {
            companyId: company?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const today = new Date();
    const startOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const endOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));

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
    const countLeads = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            OR: [
                {
                    pipelineStage: "Conhecimento",
                },
                {
                    pipelineStage: "Interesse",
                },
                {
                    pipelineStage: "Avaliação",
                },
                {
                    pipelineStage: "Negociação",
                },
            ]
        }
    });

    const countMan = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            sex: "M"
        }
    });
    const countWoman = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            sex: "F"
        }
    });

    const clients = await prisma.companyClient.findMany({
        where: {
            companyId: company?.id
        }
    });
    const ages = clients.map(client => calculateAge(client.birth));
    const avgAge = averageAge(ages);

    const birthdays = getBirthdays(clients);
    const countKnow = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Conhecimento"
        }
    });
    const countInterest = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Interesse"
        }
    });
    const countEvaluation = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Avaliação"
        }
    });
    const countNegotiation = await prisma.companyClient.count({
        where: {
            companyId: company?.id,
            pipelineStage: "Negociação"
        }
    });
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

    const startOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1)
    const endOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)

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

    const allSales = await prisma.companySale.findMany({
        where: {
            companyId: company?.id,
            createdAt: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        },
        select: {
            price: true,
            createdAt: true,
        }
    });

    const salesArray = allSales.map((sale) => {
        let currentDate = sale.createdAt.toLocaleDateString();
        let sum = 0;
        for (let i = 0; i < allSales.length; i++) {
            if (allSales[i].createdAt.toLocaleDateString() === currentDate) {
                sum += allSales[i].price;
            }
        }

        return sum;
    });
    const distinctDates = new Set();
    
    for (const sale of allSales) {
        distinctDates.add(sale.createdAt.toLocaleDateString()); // Replace 'columnName' with your actual field name
    }
    
    const daysSalesArray: string[] = Array.from(distinctDates).map((e) => {
        return String(e);
    });

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
        <>
            <TopBar title={`Bem-vindo, ${company?.companyName}`} />
            <span className="text-center my-4 block text-blue-800 font-bold">Seu plano expira em {calculateDaysUntilExpiry(payment?.expiresAt!)} dias.</span>
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
                    <h4>{(((countBuy + countRenew) / countClients) * 100).toFixed(2)}%</h4>
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

            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Vendas ao longo do mês:</h3>
                <div className="w-full lg:w-1/5">
                    <LineWrapper
                        labels={daysSalesArray}
                        label='# vendas'
                        data={salesArray}
                        backgroundColor={["dodgerblue"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Estatística de clientes:</h3>
                <h4 className="my-8 p-2"><span className="font-bold">Média de idade:</span> {avgAge}</h4>
                <div className="w-full lg:w-1/5">
                    <PieWrapper
                        labels={["Masculino", "Feminino"]}
                        label='# de gênero'
                        data={[(countClients === 0 || countMan === 0 ? 0 : ((countMan / countClients) * 100)), (countClients === 0 || countWoman === 0 ? 0 : ((countWoman / countClients) * 100))]}
                        backgroundColor={["blue", "pink"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>

                
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Estatística de pipeline:</h3>
                <div className="w-full lg:w-1/5">
                    <PieWrapper
                        labels={["Conhecimento", "Interesse", "Avaliação", "Negociação", "Compra", "Renovamento"]}
                        label='# de gênero'
                        data={
                            [
                                countClients === 0 || countKnow === 0 ? 0 : ((countKnow / countClients) * 100),
                                countClients === 0 || countInterest === 0 ? 0 : ((countInterest / countClients) * 100),
                                countClients === 0 || countEvaluation === 0 ? 0 : ((countEvaluation / countClients) * 100),
                                countClients === 0 || countNegotiation === 0 ? 0 : ((countNegotiation / countClients) * 100),
                                countClients === 0 || countBuy === 0 ? 0 : ((countBuy / countClients) * 100),
                                countClients === 0 || countRenew === 0 ? 0 : ((countRenew / countClients) * 100)
                            ]
                        }
                        backgroundColor={["yellow", "orange", "tomato", "dodgerblue", "lightgreen", "green"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Aniversariantes:</h3>
                {
                    birthdays.map((b, i) => {
                        return (
                            <div key={i} className="shadow-md bg-white flex items-center justify-start gap-8 border p-2 rounded-xl mb-2">
                                <BsCake className="text-blue-800" />
                                <div><span className="font-bold">Nome:</span> {b.name}</div>
                                <Link href={`https://wa.me/55${b.tel}`} target="_blank"><span className="font-bold text-green-700 hover:underline hover:text-green-600"><BsWhatsapp className="inline" /> Clique aqui para enviar mensagem</span> </Link>
                            </div>
                        )
                    })
                }

                {
                    birthdays.length === 0 && (
                        <p className="my-4 font-extralight p-2">Nenhum aniversariante hoje.</p>
                    )
                }
            </div>
        </>
    )
}