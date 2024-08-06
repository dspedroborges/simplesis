"use server";

import prisma from "../../../lib/prisma";
const nodemailer = require("nodemailer");

const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "dasein.eigentlich@gmail.com",
        pass: process.env.MAIL_PASS
    }
});

export async function sendMailForgotPassword(previousState: { error: boolean, message: string}, formData: FormData) {
    const email = formData.get("email") as string;

    const company = await prisma.company.findUnique({
        where: {
            email,
        },
        select: {
            user: {
                select: {
                    id: true,
                }
            },
        }
    });

    if (!company) {
        return {
            message: "Email não encontrado.",
            error: true
        }
    }

    let token = crypto.randomUUID();
    const redefinitionInProgress = await prisma.forgotPassword.findUnique({
        where: {
            userId: company.user.id
        }
    });

    if (redefinitionInProgress) {
        return {
            message: "Você já tem uma redefinição em progresso. Por favor, cheque seu email, incluindo a caixa de spam.",
            error: true
        }
    }

    await prisma.forgotPassword.create({
        data: {
            userId: company.user.id,
            token,
        }
    });

    const configMail = {
        from: "dasein.eigentlich@gmail.com",
        to: email,
        subject: "Simplesis - Redefinição de senha",
        html: `
            <h1>Simplesis</h1>
            <h2>Redefinição de senha</h2>
            <p>Clique no link abaixo para definir a sua nova senha:</p>
            <a href="${process.env.SERVER_URL}/esqueci-minha-senha/redefinir?token=${token}&id=${company.user.id}" target="_blank">Redefinir</a>
        `,
    }

    try {
        await smtp.sendMail(configMail);
    } catch (err: any) {
        console.error(err)
    }

    return {
        message: "Email enviado com sucesso.",
        error: false
    }
}