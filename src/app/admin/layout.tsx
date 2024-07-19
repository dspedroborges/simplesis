import GoBack from "../components/GoBack";
import Logout from "../components/Logout";
import SidebarWrapper from "../components/wrappers/SidebarWrapper";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarWrapper />
            <div className="w-full">

                {children}
                <GoBack />
                <Logout />
            </div>
        </div>

    )
}