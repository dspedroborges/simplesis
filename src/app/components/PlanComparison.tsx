import Link from "next/link";

type PlanComparisonType = {
    name: string;
    price: string;
    description: string;
    features: string[];
    link: string
}

export default function PlanComparison({ currentPlan, betterPlan, isCurrentPlanFree }: { currentPlan: PlanComparisonType, betterPlan: PlanComparisonType, isCurrentPlanFree: boolean }) {
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                {/* text - start */}
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        {
                            isCurrentPlanFree ? (
                                "Ei, notamos que você ainda não tem um plano!"
                            ) : (
                                "Sabia que seu plano pode ser ainda melhor?"
                            )
                        }
                    </h2>
                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                        {
                            isCurrentPlanFree ? (
                                "Considere assinar um de nossos planos para obter os benefícios que a plataforma oferece!"
                            ) : (
                                "Considere assinar um plano superior para obter benefícios ainda melhores!"
                            )
                        }
                    </p>
                </div>
                {/* text - end */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0">
                    {/* left side - start */}
                    <div className="w-full rounded-lg bg-gray-800 p-6 sm:w-1/2 sm:rounded-r-none sm:p-8 lg:w-1/3">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gray-100 sm:text-3xl">
                                {currentPlan.name}
                            </h3>
                            <p className="text-gray-300">{currentPlan.description}</p>
                        </div>
                        <div className="mb-4 space-x-2">
                            <span className="text-4xl font-bold text-gray-100">{currentPlan.price}</span>
                            {/* <span className="text-2xl text-gray-300 line-through">$49</span> */}
                        </div>
                        <ul className="mb-6 space-y-2 text-gray-300">
                            {
                                currentPlan.features.map((feature, i) => {
                                    return (
                                        <li className="flex items-center gap-1.5" key={i}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 shrink-0"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {/* left side - end */}
                    {/* right side - start */}
                    <div className="w-full rounded-lg bg-gradient-to-tr from-blue-500 to-violet-400 p-6 shadow-xl sm:w-1/2 sm:p-8">
                        <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row">
                            <div>
                                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                                    {betterPlan.name}
                                </h3>
                                <p className="text-blue-100">{betterPlan.description}</p>
                            </div>
                            <span className="order-first inline-block rounded-full bg-blue-200 bg-opacity-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:order-none">
                                Recomendado
                            </span>
                        </div>
                        <div className="mb-4 space-x-2">
                            <span className="text-4xl font-bold text-white">{betterPlan.price}</span>
                            {/* <span className="text-2xl text-blue-100 line-through"></span> */}
                        </div>
                        <ul className="mb-6 space-y-2 text-blue-100">
                            {
                                betterPlan.features.map((feature, i) => {
                                    return (
                                        <li className="flex items-center gap-1.5" key={i}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 shrink-0"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <Link
                            href={betterPlan.link}
                            className="block rounded-lg bg-blue-200 bg-opacity-50 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-300 focus-visible:ring active:bg-blue-400 md:text-base"
                        >
                            Obter plano superior
                        </Link>
                    </div>
                    {/* right side - end */}
                </div>
            </div>
        </div>
    )

}