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

    const pipelineStages = ["Interesse", "Avaliação", "Negociação", "Compra", "Renovação", "Conhecimento"];

    const counts = await prisma.companyClient.groupBy({
      by: ['pipelineStage'],
      where: {
        companyId: company?.id,
        pipelineStage: { in: pipelineStages }
      },
      _count: true
    });
    
    const result = pipelineStages.reduce((acc: any, stage) => {
      const found = counts.find(count => count.pipelineStage === stage);
      acc[stage] = found ? found._count : 0;
      return acc;
    }, {});
    
    const countClients = await prisma.companyClient.count();

    return (
        <>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Estatística de pipeline:</h3>
                <div className="w-full lg:w-1/5">
                    <PieWrapper
                        labels={["Conhecimento", "Interesse", "Avaliação", "Negociação", "Compra", "Renovamento"]}
                        label='# de pipeline'
                        data={
                            [
                                countClients === 0 || result['Conhecimento'] === 0 ? 0 : ((result['Conhecimento'] / countClients) * 100),
                                countClients === 0 || result['Interesse'] === 0 ? 0 : ((result['Interesse'] / countClients) * 100),
                                countClients === 0 || result['Avaliação'] === 0 ? 0 : ((result['Avaliação'] / countClients) * 100),
                                countClients === 0 || result['Negociação'] === 0 ? 0 : ((result['Negociação'] / countClients) * 100),
                                countClients === 0 || result['Compra'] === 0 ? 0 : ((result['Compra'] / countClients) * 100),
                                countClients === 0 || result['Renovação'] === 0 ? 0 : ((result['Renovação'] / countClients) * 100)
                            ]
                        }
                        backgroundColor={["yellow", "orange", "tomato", "dodgerblue", "lightgreen", "green"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>
            </div>
        </>
    )
}