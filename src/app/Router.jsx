import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MapaB from "../pages/MapaB";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/mapa" element={<MapaB/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
