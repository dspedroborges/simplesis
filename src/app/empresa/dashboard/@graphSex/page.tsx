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

    const countClients = await prisma.companyClient.count();

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

    return (
        <>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Estatística de clientes:</h3>
                <div className="w-full lg:w-1/5">
                    <PieWrapper
                        labels={["Masculino", "Feminino"]}
                        label='# de gênero'
                        data={[(countClients === 0 || countMan === 0 ? 0 : ((countMan / countClients) * 100)), (countClients === 0 || countWoman === 0 ? 0 : ((countWoman / countClients) * 100))]}
                        backgroundColor={["dodgerblue", "pink"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>
            </div>
        </>
    )
}