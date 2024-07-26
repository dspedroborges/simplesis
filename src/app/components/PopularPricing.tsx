import { Suspense } from "react";
import { createPayment } from "../actions/CreatePaymentAction";
import Spinner from "./Spinner";

export default function PopularPricing({ title, description, price, link, features, soon, time }: { title: string; description: string; price: string; link: string; features: string[], soon: boolean, time: string }) {
    return (
        <Suspense fallback={<Spinner/>}>
            <div className="flex flex-col space-y-4">
                <div className="relative flex flex-col gap-4 rounded-lg border border-blue-500 p-4 pt-6 h-[275px]">
                    <div className="absolute inset-x-0 -top-3 flex justify-center">
                        <span className="flex h-6 items-center justify-center rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                            {
                                soon ? "em breve" : "mais popular"
                            }
                        </span>
                    </div>
                    <h3 className="text-center text-2xl font-semibold text-gray-800">
                        {price !== "" && title}
                    </h3>
                    <div className={`flex items-end justify-center gap-1 ${soon && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"}`}>
                        <span className="text-4xl font-bold text-gray-800">{price !== "" ? price : title}</span>
                        {
                            price !== "" && <span className="text-gray-500">/ {time}</span>
                        }
                    </div>
                    <div className="mb-4 flex items-center justify-center gap-1 text-sm text-gray-500">
                        {description}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg> */}
                    </div>
                    {
                        !soon && (
                            <form action={createPayment} className="w-full">
                                <input type="hidden" value={title} name="product" />
                                <button
                                    className="w-full block rounded-lg bg-blue-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:text-gray-700 md:text-base"
                                >
                                    Comprar
                                </button>
                            </form>
                        )
                    }
                </div>
                {
                    features.length > 0 && (
                        <div className="flex-1 space-y-3 rounded-lg bg-gray-100 px-4 py-6">
                            {/* check - start */}
                            {
                                features.map((feature, i) => {
                                    return (
                                        <div className="flex gap-2" key={i}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 shrink-0 text-blue-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </div>
                                    )
                                })
                            }
                            {/* check - end */}
                        </div>
                    )
                }
            </div>
        </Suspense>
    )
}