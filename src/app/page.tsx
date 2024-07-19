"use client";

import { useEffect } from "react";
import { useGlobalContext } from "./components/providers/GlobalProvider";
import PopularPricing from "./components/PopularPricing";
import NormalPricing from "./components/NormalPricing";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const features = [
    {
      "title": "Agenda",
      "description": "A agenda possui duas opções de visualização: diária e semanal. Além disso, você pode definir cores para os funcionários."
    },
    {
      "title": "Controle do que entra e sai",
      "description": "O sistema permite o registro de vendas e gastos, de modo que você fique a par de tudo que entra e sai."
    },
    {
      "title": "Estatística de clientes",
      "description": "Conheça o perfil do seu cliente, sabendo se a maioria é homem ou mulher, além da média de idade."
    },
    {
      "title": "Armazenamento criptografado dos dados sensíveis dos clientes",
      "description": "Ainda que o sistema seja invadido por pessoas mal intencionadas, elas não conseguirão decifrar as informações sensíveis dos seus clientes, pois tudo estará criptografado no banco de dados."
    },
    {
      "title": "Estatística mensal de vendas, gastos e lucros",
      "description": "Saiba o quanto você vendeu, gastou e o quanto lucrou no mês."
    },
    {
      "title": "Taxa de conversão",
      "description": "O sistema verifica em qual estágio de venda está o seu cliente e calcula a taxa de conversão, isto é, a proporção de clientes que chegaram a fazer uma compra."
    },
    {
      "title": "Lembretes personalizados",
      "description": "Nunca mais esqueça nenhum compromisso ou tarefa a ser realizada. Crie lembretes personalizados de acordo com a suas necessidades."
    },
    {
      "title": "Lembretes automáticos para clientes aniversariantes",
      "description": "É sempre bom lembrar o aniversário de um cliente para mantê-lo próximo. Não se preocupe, o sistema faz isso por você."
    },
    {
      "title": "Registro de clientes",
      "description": "Algo fundamental para o funcionamento da agenda e dos lembretes."
    },
    {
      "title": "Registro de produtos/serviços",
      "description": "Catalogue tudo o que você oferece e tenha mais controle e conhecimento sobre o próprio negócio."
    },
    {
      "title": "Registro de funcionários",
      "description": "Registre seus funcionários para que eles tenham cores na agenda e visualização separada."
    },
    {
      "title": "Criador de fichas para clientes",
      "description": "Prepare de antemão um conjunto fixo de perguntas que sempre aparecerão quando você for criar um cliente. Dessa forma, você pode criar suas fichas personalizadas e armazenar o que quiser sobre seus clientes."
    },
    {
      "title": "Gerador de orçamento",
      "description": "Preencha um simples formulário e gere um orçamento imediatamente."
    }
  ]

const monthly = {
    title: 'Mensal',
    description: 'Plano acessível',
    features: [

    ],
    price: "R$29,99",
    link: '/registro?plan=monthly',
    previousPrice: 'R$18,99',
    image: '/img1.jpg'
}

const quaterly = {
    title: 'Trimestral',
    description: '11% de desconto',
    features: [
    ],
    price: "R$79,99",
    link: '/registro?plan=quaterly',
    previousPrice: 'R$999',
    image: '/img2.jpg'
}

const semiannual = {
    title: 'Semestral',
    description: '5% de desconto',
    features: [

    ],
    price: "R$169,99",
    link: '/registro?plan=semiannual',
    previousPrice: 'R$999',
    image: '/img3.jpg',
    specialContent: 'Em breve'
}

export default function Home() {
    return (
        <>
            <section className="mx-auto max-w-screen-2xl px-4 md:px-8 pt-8">
                <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                    <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
                            Simplifique a Gestão
                            <br />
                            do Seu Negócio
                        </h1>
                        <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
                            Sistema simples e acessível para pequenas empresas que precisam gerenciar o seu negócio.
                        </p>
                    </div>
                    <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                        <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                            <img
                                src="/man.jpg"
                                loading="lazy"
                                alt="Imagem de lookstudio no Freepik"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                            <img
                                src="woman.jpg"
                                loading="lazy"
                                alt="Imagem de lookstudio no Freepik"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div id="planos">
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
                            Escolha seu plano
                        </h2>

                        <Carousel className="lg:hidden max-w-full">
                            <CarouselContent className="py-8">
                                <CarouselItem>
                                    <PopularPricing
                                        time="mês"
                                        title={monthly.title}
                                        description={monthly.description}
                                        price={monthly.price}
                                        link={monthly.link}
                                        features={monthly.features}
                                        soon={false}
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <NormalPricing
                                        time="trimestre"
                                        title={quaterly.title}
                                        description={quaterly.description}
                                        price={quaterly.price}
                                        link={quaterly.link}
                                        features={quaterly.features}
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <NormalPricing
                                        time="semestre"
                                        title={semiannual.title}
                                        description={semiannual.description}
                                        price={semiannual.price}
                                        link={semiannual.link}
                                        features={semiannual.features}
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="absolute top-32 -translate-y-1/2 left-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-80 text-white hover:text-white" />
                            <CarouselNext className="absolute top-32 -translate-y-1/2 right-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-80 text-white hover:text-white" />
                        </Carousel>

                        <div className="mb-6 gap-x-6 gap-y-12 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 lg:gap-x-8 hidden lg:grid">
                            <PopularPricing
                                time={"mês"}
                                title={monthly.title}
                                description={monthly.description}
                                price={monthly.price}
                                link={monthly.link}
                                features={monthly.features}
                                soon={false}
                            />
                            <NormalPricing
                                time={"trimestre"}
                                title={quaterly.title}
                                description={quaterly.description}
                                price={quaterly.price}
                                link={quaterly.link}
                                features={quaterly.features}
                            />
                            <NormalPricing
                                time={"semestre"}
                                title={semiannual.title}
                                description={semiannual.description}
                                price={semiannual.price}
                                link={semiannual.link}
                                features={semiannual.features}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    {/* text - start */}
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                            Funcionalidades
                        </h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                            Confira abaixo as funcionalidades do sistema
                        </p>
                    </div>
                    {/* text - end */}
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
                        {/* feature - start */}
                        {
                            features.map((f, i) => {
                                return (
                                    <div key={i} className="flex divide-x rounded-lg border bg-gray-50 hover:scale-105">
                                        <div className="flex items-center p-2 text-blue-500 md:p-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 md:h-8 md:w-8"
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
                                        </div>
                                        <div className="p-4 md:p-6">
                                            <h3 className="mb-2 text-lg font-semibold md:text-xl">{f.title}</h3>
                                            <p className="text-gray-500">
                                                {f.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* feature - end */}
                    </div>
                </div>
            </div>
        </>
    )
}
