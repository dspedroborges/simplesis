import { getSession } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { endOfMonth, endOfTodayUTC, startOfMonth, startOfTodayUTC } from "@/utils";
import LineWrapper from "@/app/components/wrappers/LineWrapper";
import PieWrapper from "@/app/components/wrappers/PieWrapper";

export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
        }
    });

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

    return (
        <>
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
        </>
    )
}