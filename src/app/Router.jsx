import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../pages/Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}