import { getSession } from "@/auth";
import prisma from "../../../lib/prisma";
import TopBar from "../components/TopBar";
import { BsCake, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

function calculateDaysUntilExpiry(expiresAtDate: Date) {
    if (!expiresAtDate) return 0;

    const currentDate = new Date();
    const expiresAtTime = expiresAtDate.getTime();
    const currentTime = currentDate.getTime();
    const timeDifference = expiresAtTime - currentTime;
    const daysUntilExpiry = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysUntilExpiry;
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

    return (
        <>
            <TopBar title={`Bem-vindo, ${company?.companyName}`} />

            <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-screen">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Simplesis
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Seu plano expira em {calculateDaysUntilExpiry(payment?.expiresAt!)} dias.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <Link
                            href="/empresa/dashboard"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            Dashboard
                            <svg
                                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/empresa/clientes/todos/1"
                            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                        >
                            Clientes
                        </Link>
                    </div>
                </div>
            </section>


        </>
    )
}