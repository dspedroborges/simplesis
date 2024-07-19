"use server";

import { logoutAction } from "@/app/actions/Logout";
import prisma from "../../../../lib/prisma";
import { getSession } from "@/auth";
import TopBar from "@/app/components/TopBar";

export default async function Page() {
    const session = await getSession();
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        include: {
            company: true,
        }
    });

    return (
        <>
            <TopBar title={String(user?.company?.companyName)} />
            <form
                action={logoutAction}
                className="border-t pt-4 mt-4 flex justify-center md:justify-end md:mr-8"
            >
                <button type="submit" className="font-bold text-white bg-red-700 p-2 rounded-xl hover:bg-red-900">Sair</button>
            </form>

        </>
    )
}