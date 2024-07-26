import { getSession } from "@/auth"
import prisma from "../../../../../lib/prisma"
import { BsCake, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

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


export default async function Page() {
    const session = await getSession();
    const company = await prisma.company.findUnique({
        where: {
            userId: String(session.user.id)
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

    return (
        <>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-4 bg-blue-950 text-white p-2 rounded-xl">Aniversariantes:</h3>
                <h4 className="my-8 p-2"><span className="font-bold">Média de idade:</span> {avgAge || 0}</h4>
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