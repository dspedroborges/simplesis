"use server";

import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";
import { getLoggedCompanyId } from "./company/CompanyActions";
import { encryptAES } from "@/crypto";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const arrayToNumber = (array: string[]) => {
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
        newArr.push(Number(array[i]));
    }

    return newArr;
}

const priceByProductName: Record<string, number> = {
    "Mensal": 39.99,
    "Trimestral": 180.00,
    "Semestral": 239.99
}

const dbName: Record<string, string> = {
    "Mensal": "MONTHLY",
    "Trimestral": "QUATERLY",
    "Semestral": "SEMI_ANNUAL"
}

const priceInCentsByProductName: Record<string, number> = {
    "Mensal": priceByProductName["Mensal"] * 100,
    "Trimestral": priceByProductName["Trimestral"] * 100,
    "Semestral": priceByProductName["Semestral"] * 100
}

const parseProductToStripe = (productName: string, amount: number) => {
    return {
        price_data: {
            currency: "BRL",
            product_data: {
                name: productName,
            },
            unit_amount: priceInCentsByProductName[productName],
        },
        quantity: amount
    }
}

export async function createPayment(formData: FormData) {
    const product = formData.get("product") as string;
    const price = priceByProductName[product];

    const gottenId = await getLoggedCompanyId();
    const idFromLoggedCompany = String(gottenId);

    if (!gottenId) {
        redirect("/registro");
    }

    if (!product) {
        return {
            message: "Produto não encontrado.",
            error: true
        }
    }

    const currentDate = new Date();
    const expiresAt = new Date(currentDate);

    switch (product) {
        case "Mensal":
            expiresAt.setDate(currentDate.getDate() + 30);
            break;
        case "Trimestral":
            expiresAt.setDate(currentDate.getDate() + 90);
            break;
        case "Semestral":
            expiresAt.setDate(currentDate.getDate() + 180);
            break;
    }

    let payment;
    try {
        payment = await prisma.payment.create({
            data: {
                companyId: idFromLoggedCompany,
                plan: dbName[product] as "MONTHLY" | "QUATERLY" | "SEMI_ANNUAL",
                expiresAt
            },
        });
    } catch(e) {
        console.log(e);
    }

    // definições para gerar url de pagamento stripe
    let stripeProduct = [parseProductToStripe(product, 1)]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment", // subscription
        line_items: stripeProduct,
        success_url: `${process.env.SERVER_URL}/sucesso/${encryptAES(`${process.env.SUCCESS_KEY}_${payment?.id}`).toString()}`,
        cancel_url: `${process.env.SERVER_URL}/cancelamento/${encryptAES(`${process.env.FAILURE_KEY}_${payment?.id}`).toString()}`,
    });

    if (session) redirect(session.url);
}