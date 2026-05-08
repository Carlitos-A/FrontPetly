import { useState } from "react";
import { registerUser } from "../services/registerService";
import { useNavigate } from "react-router-dom";

export function useRegisterForm() {
  const initialState = {
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    contrasena: "",
    direccion: "",
    run: "",
    dv: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  function mapToBackend(data) {

    const runValue = parseInt(data.run?.trim() || "0", 10);
    if (isNaN(runValue) || runValue === 0) {
      throw new Error("RUN inválido");
    }

    const telefonoValue = data.telefono?.trim() || null;
    if (telefonoValue && !/^\d{7,15}$/.test(telefonoValue)) {
      throw new Error("Teléfono inválido");
    }

    const contrasenaValue = data.contrasena?.trim() || "";
    if (contrasenaValue.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }



    const payload = {
      nombre: data.nombre.trim(),
      apellido_paterno: data.apellido_paterno.trim(),
      apellido_materno: data.apellido_materno?.trim() || null,
      telefono: data.telefono?.trim() || null,
      direccion: data.direccion?.trim() || null,
      correo: data.correo.trim(),
      contrasena: data.contrasena.trim(),
      run: runValue,
      dv: data.dv.trim(),
    };

    console.log("Payload enviado:", JSON.stringify(payload));

    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setError("El nombre es requerido");
      return;
    }
    if (!formData.apellido_paterno.trim()) {
      setError("El apellido paterno es requerido");
      return;
    }
    if (!formData.correo.trim()) {
      setError("El correo es requerido");
      return;
    }
    if (!formData.contrasena.trim()) {
      setError("La contraseña es requerida");
      return;
    }
    if (!formData.run.trim()) {
      setError("El RUN es requerido");
      return;
    }
    if (!formData.dv.trim()) {
      setError("El dígito verificador es requerido");
      return;
    }


    setLoading(true);
    setError(null);

    try {
      const payload = mapToBackend(formData);
      const response = await registerUser(payload);



      if (!response.success) {
        throw new Error(response.error || "Error en el registro");
      }

      console.log("[Register OK]:", response.data);
      setFormData(initialState);
      navigate("/login");


    } catch (err) {
      console.error(err);
      setError(err.message);
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
    loading,
    error,
  };
}