import { getSession } from "@/auth";
import Menu from "../Menu";

export default async function MenuWrapper() {
    const session = await getSession();

    if (session) return <Menu loggedUser={{ role: session.user.role }} />;

    return <Menu />
}