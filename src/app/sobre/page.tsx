export default function Sobre() {
    return (
        <>
            <div className="bg-white py-4 sm:py-4 lg:py-6 mt-12">
                <div className="mx-auto max-w-screen-md px-4 md:px-8">
                    <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
                        Sobre o sistema
                    </h1>
                    <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                        Bem-vindo ao Simplesis, a solução ideal para pequenas empresas que buscam uma maneira eficaz e intuitiva de gerenciar seus clientes, agendar compromissos, organizar lembretes e controlar seus gastos.
                    </p>
                    <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
                        Missão
                    </h2>
                    <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                        O Simplesis tem como principal objetivo ajudar pequenas empresas a otimizar suas operações e crescer de maneira sustentável. Com uma visão voltada para a simplicidade e eficiência, Pedro desenvolveu esta ferramenta com base em sua experiência e conhecimento na área de tecnologia, visando atender às necessidades específicas dos pequenos empresários.
                    </p>
                    <ul className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8">
                        <li className="mb-4"><span className="font-bold">Gerenciamento de Clientes:</span> Mantenha todas as informações dos seus clientes organizadas e acessíveis em um só lugar. Adicione detalhes de contato, acompanhe interações e mantenha um registro histórico para um atendimento mais eficiente e personalizado.</li>
                        <li className="mb-4"><span className="font-bold">Agenda de Compromissos:</span> Organize sua agenda com facilidade. Agende reuniões, compromissos e eventos, e receba notificações para não perder nenhum prazo importante.</li>
                        <li className="mb-4"><span className="font-bold">Lembretes:</span> Crie lembretes para tarefas e compromissos futuros, garantindo que você se mantenha no caminho certo para atingir seus objetivos.</li>
                        <li className="mb-4"><span className="font-bold">Controle de Gastos:</span> Acompanhe suas despesas e receitas com uma ferramenta prática de controle financeiro. Monitore seus gastos, visualize relatórios e planeje seu orçamento com eficiência.</li>
                    </ul>
                    <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6">
                        “No Simplesis, acreditamos que a tecnologia deve ser uma aliada no crescimento dos negócios. Estamos comprometidos em oferecer uma ferramenta que não apenas atenda às suas necessidades, mas que também facilite a gestão do seu dia a dia, permitindo que você se concentre no que realmente importa: o sucesso do seu negócio.” (Simplesis)
                    </blockquote>
                    <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
                        <img
                            src="/woman.jpg"
                            loading="lazy"
                            alt="Imagem de uma mulher sorrindo"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    {/* <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
                        Features
                    </h2>
                    <p className="text-gray-500 sm:text-lg">
                        This is a section of some simple filler text, also known as placeholder
                        text. It shares some characteristics of a real written text but is random
                        or otherwise generated. It may be used to display a sample of fonts or
                        generate text for testing. Filler text is dummy text which has no meaning
                        however looks very similar to real text.
                    </p> */}
                </div>
            </div>

        </>
    )
}