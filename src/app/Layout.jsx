import { Outlet, useLocation } from "react-router-dom";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

export default function Layout() {
    const location = useLocation();
    const hideFooter = location.pathname.toLowerCase() === "/mapa";

    return (
        <div className="flex h-screen flex-col bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
            <Header />

            <main className="min-h-0 flex-1 pt-12 md:pt-0 md:pb-12">
                <Outlet />
            </main>

            {!hideFooter && <Footer />}
        </div>
    );
}
