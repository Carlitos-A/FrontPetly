import { useState } from "react";
import { useAuth } from "../../auth/context/authContext";
import { updateUserProfile } from "../services/profileServices";

const getInitialFormData = (user) => ({
    nombre: user?.nombre || "",
    apellido_paterno: user?.apellido_paterno || "",
    apellido_materno: user?.apellido_materno || "",
    telefono: user?.telefono || "",
    correo: user?.correo || "",
    direccion: user?.direccion || "",
    run: user?.run?.toString() || "",
    dv: user?.dv || "",
});

export function useEditProfile() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState(() => getInitialFormData(user));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
        setSuccess("");
    }

    function buildPayload() {
        if (!formData.nombre.trim()) {
            throw new Error("El nombre es requerido");
        }
        if (!formData.apellido_paterno.trim()) {
            throw new Error("El apellido paterno es requerido");
        }
        if (!formData.correo.trim()) {
            throw new Error("El correo es requerido");
        }

        const runValue = formData.run?.trim() ? parseInt(formData.run.trim(), 10) : user?.run;
        if (formData.run?.trim() && Number.isNaN(runValue)) {
            throw new Error("RUN inválido");
        }

        const telefonoValue = formData.telefono?.trim() || null;
        if (telefonoValue && !/^\d{7,15}$/.test(telefonoValue)) {
            throw new Error("Teléfono inválido");
        }

        return {
            ...user,
            nombre: formData.nombre.trim(),
            apellido_paterno: formData.apellido_paterno.trim(),
            apellido_materno: formData.apellido_materno?.trim() || null,
            telefono: telefonoValue,
            correo: formData.correo.trim(),
            direccion: formData.direccion?.trim() || null,
            run: runValue,
            dv: formData.dv?.trim() || user?.dv,
        };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = buildPayload();
            const result = await updateUserProfile(payload);

            if (!result.success) {
                throw new Error(result.error || "No se pudieron actualizar los datos del usuario");
            }

            updateUser(result.data);
            setSuccess("Datos del usuario actualizados correctamente");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
}