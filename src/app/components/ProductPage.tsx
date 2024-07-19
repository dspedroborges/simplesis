"use client";

import { BsCheck2Square } from "react-icons/bs"
import { useEffect, useState } from "react"
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { createPayment } from "../actions/CreatePaymentAction";

type ProductPageType = {
    category: string
    productName: string
    description: string
    discount?: number
    price: string
    features?: string[]
    image: string
    callback: Function
    includeAsideOption: boolean
}

export default function ProductPage({ category, productName, description, discount, price, features, image, callback, includeAsideOption }: ProductPageType) {
    const [currentPrice, setCurrentPrice] = useState(price)
    const [asideOption, setAsideOption] = useState('6 aulas')
    const [paymentMethod, setPaymentMethod] = useState('pix')

    const [formState, action] = useFormState(createPayment, {
        message: "",
        error: false,
       
    } as any);

    let affiliateInLs = undefined;
    useEffect(() => {
        affiliateInLs = localStorage.getItem("affiliateUsername");
    }, []);

    const handleSelectChange = (value: string) => {
        switch (value) {
            case '6 aulas':
                setCurrentPrice(price)
                setAsideOption(value)
                break
            case '8 aulas':
                setCurrentPrice("R$249,99")
                setAsideOption(value)
                break
            case '10 aulas':
                setCurrentPrice("R$299,00")
                setAsideOption(value)
                break
        }
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-12 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                                {category}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                {productName}
                            </h1>
                            <p className="leading-relaxed">
                                {description}
                            </p>
                            <div className="grid grid-cols-1 gap-2 my-4">
                                {
                                    features && features.map((feature, i) => {
                                        return (
                                            <div key={i} className="bg-gray-50 rounded flex p-2 h-full items-center text-sm hover:brightness-110 hover:scale-110 cursor-pointer hover:border border-blue-800">
                                                <BsCheck2Square className="text-lg text-blue-800 mr-2" />
                                                <span className="title-font font-medium">{feature}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex flex-col mt-6 justify-center gap-2 py-2 first-letter:pb-5 border-b-2 border-gray-100 mb-5">

                                <div className="flex items-center justify-between">
                                    <label htmlFor="paymentMethod" className="mr-3 font-extrabold text-blue-800 cursor-pointer">Forma de pagamento</label>
                                    <select onChange={(e) => setPaymentMethod(e.target.value)} id="paymentMethod" className="rounded border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800 text-base pl-3 pr-10">
                                        <option value="pix">Pix</option>
                                        <option value="credit">Cartão de crédito</option>
                                    </select>
                                </div>
                                {
                                    includeAsideOption && (
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="amountOfClasses" className="mr-3 font-extrabold text-blue-800 cursor-pointer">Quantidade de aulas</label>
                                            <select onChange={(e) => handleSelectChange(e.target.value)} id="amountOfClasses" className="rounded border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800 text-base pl-3 pr-10">
                                                <option>6 aulas</option>
                                                <option>8 aulas</option>
                                                <option>10 aulas</option>
                                            </select>
                                        </div>
                                    )
                                }

                            </div>
                            <div className="flex flex-col">
                                {/* {
                                    discount && <span className="title-font text-xs text-red-900 line-through">
                                        R$----
                                    </span>
                                } */}
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    {price}
                                </span>

                                {
                formState.error ? (
                    <div className="text-red-600 my-4 text-center">{formState.message}</div>
                ) : (
                    <div className="text-green-600 my-4 text-center">{formState.message}</div>
                )
            }
                                <form defaultValue={formState.message} action={action}>
                                    <input type="hidden" name="affiliateUsername" value={affiliateInLs} />
                                    <input type="hidden" name="product" value={productName} />
                                    <input type="hidden" name="asideOption" value={asideOption} />
                                    <input type="hidden" name="paymentMethod" value={paymentMethod} />
                                    <SubmitButton name="Comprar" loadingName="Redirecionando..." />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}