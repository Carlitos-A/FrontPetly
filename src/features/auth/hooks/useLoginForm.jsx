import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginService";

export function useLoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        correo: "",
        contrasena: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(formData);

            const token = response.data.token;

            if (!token) {
                throw new Error("Token no recibido");

            }


            localStorage.setItem("token", token);

            if (response.usuario) {
                localStorage.setItem("usuario", JSON.stringify(response.usuario));
            }


            navigate("/");

        } catch (err) {
            console.error(err);

            // Manejo fino de errores del backend
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError("Error al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        showPassword,
        togglePassword,
        loading,
        error,
    };
}