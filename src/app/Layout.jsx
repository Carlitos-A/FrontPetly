import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen md:h-screen md:overflow-hidden bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
            <Header />

            <main className="min-h-0 flex-1 pt-12 md:pt-0 md:pb-12">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
