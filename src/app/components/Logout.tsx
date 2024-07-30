import { logout } from "@/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions/Logout";

export default async function Logout() {
    return (
        <form className="fixed bottom-0 right-0" action={logoutAction}>
            <button className="w-full bg-red-100 hover:bg-red-200 text-black p-4 rounded-t-xl text-center border-b">
                Sair
            </button>
        </form>
    )
}