import { useState } from "react";
import { registerUser } from "../services/registerService";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    ciudad: "",
  });

  const [hasPet, setHasPet] = useState("si");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await registerUser({ ...formData, hasPet });

      console.log("[Register OK]:", response);

      // aquí podrías resetear form si quieres
      // setFormData({...})

    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    togglePassword,
    hasPet,
    setHasPet,
    loading,
    error,
  };
}