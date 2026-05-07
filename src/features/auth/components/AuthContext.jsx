import { useState } from "react";
import { AuthContext } from "../context/authContext";



export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUser(null);
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        localStorage.setItem("usuario", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout,updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
