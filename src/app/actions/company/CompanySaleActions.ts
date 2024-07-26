"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { getLoggedCompanyId } from "./CompanyActions";

export async function createCompanySale(previousState: { message: string, error: boolean }, formData: FormData) {
    const gottenId = await getLoggedCompanyId();
    if (!gottenId) {
        return {
            message: "Não autorizado.",
            error: true
        }
    }
    const companyId = String(gottenId);
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const paymentMode = formData.get("paymentMode") as string;
    const installments = Number(formData.get("installments"));
    const employeeId = Number(formData.get("employeeId"));
    const clientId = Number(formData.get("clientId"));
    const offerId = Number(formData.get("offerId"));

    if (!(companyId && title && comment && price && paymentMode && installments)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companyClient.update({
        where: {
            id: clientId
        },
        data: {
            pipelineStage: "Compra"
        }
    });

    const offer = await prisma.companyOffer.findUnique({
        where: {
            id: offerId,
        }
    });

    // atualiza estoque após a venda
    if (offer?.type === "PRODUCT") {
        await prisma.companyOffer.update({
            where: {
                id: offerId,
            },
            data: {
                amountAvailable: offer?.amountAvailable - 1
            }
        });
    }

    await prisma.companySale.create({
        data: {
            companyId,
            title,
            comment,
            price,
            paymentMode,
            installments,
            clientId,
            employeeId,
            offerId
        },
    })

    // returns
    ;
    return {
        message: "Ok.",
        error: false
    }
}

export async function updateCompanySale(previousState: { message: string, error: boolean }, formData: FormData) {
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const price = Number(formData.get("price") as string);
    const paymentMode = formData.get("paymentMode") as string;
    const installments = Number(formData.get("installments"));

    if (!(id && title && comment && price && paymentMode && installments)) {
        return {
            message: "Preencha todos os campos corretamente.",
            error: true
        }
    }

    await prisma.companySale.update({
        where: {
            id,
        },
        data: {
            title,
            comment,
            price,
            paymentMode,
            installments
        },
    })

    // returns
    ;
    return {
        message: "Ok.",
        error: false
    }
}

export async function deleteCompanySale(id: number) {
    await prisma.companySale.delete({
        where: {
            id,
        }
    });

    ;
}