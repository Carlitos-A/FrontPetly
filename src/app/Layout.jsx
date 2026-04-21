import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}