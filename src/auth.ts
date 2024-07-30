import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../lib/prisma";
const bcrypt = require("bcryptjs");

export async function encryptPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error("Erro ao criptografar senha");
    }
}

export async function checkEncryptedPassword(password: string, hash: string) {
    try {
        const match = await bcrypt.compare(password, hash)
        return match;
    } catch (error) {
        throw new Error("Erro ao verificar a senha")
    }
}

const secretKey = "secret"; // this secret key must be defined as env variable
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h") // 10 seconds from now must be changed, this is only for test
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(formData: FormData) {
    // Verify credentials && get the user
    let user;
    const dbUser = await prisma.user.findUnique({
        where: {
            username: String(formData.get("username")),
        },
        include: {
            company: true,
        }
    });
    
    if (dbUser) {
        if (await checkEncryptedPassword(String(formData.get("password")), dbUser.password)) {
            user = { id: dbUser?.id, role: dbUser?.role, system: "Simplesis" };
        }
    }

    let admin = false;
    if (String(formData.get("username")) === "admin" && String(formData.get("password")) === process.env.ADMIN_PASSWORD) {
        user = { id: "admin", role: "ADMIN", system: process.env.SYSTEM_NAME };
        admin = true;
    };

    if (!dbUser && !admin) return false;

    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true }); // httpOnly means it can only be read on server side; it's safer

    return true;
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;

    if (session) {
        const decrypted = await decrypt(session);

        if (decrypted?.user?.system === process.env.SYSTEM_NAME) {
            return decrypted;
        }

        return null;
    }

    return null;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}