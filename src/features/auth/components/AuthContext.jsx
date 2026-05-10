import { useState } from "react";
import { AuthContext } from "../context/authContext";



export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const login = (userData, token) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("usuario", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("usuario");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
