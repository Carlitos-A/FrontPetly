import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMisMascotas } from "../services/misMascotasService";
import { getPetId, updatePet } from "../services/editPetService";

const mapPetToForm = (pet) => ({
    chip: pet?.chip || "",
    name: pet?.nombre || "",
    gender: pet?.sexo || "",
    type: pet?.tipo || "",
    color: pet?.color || "",
    breed: pet?.raza || "",
    age: pet?.edad?.toString() || "",
    description: pet?.descripcion || "",
    otherPetType: pet?.otroTipo || "",
    photo: null,
});

export function useEditPet() {
    const { petId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const statePet = location.state?.pet;
    const [pet, setPet] = useState(statePet || null);
    const [formData, setFormData] = useState(() => mapPetToForm(statePet));
    const [preview, setPreview] = useState(statePet?.imagenUrl || null);
    const [loading, setLoading] = useState(!statePet);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const currentPetId = useMemo(() => petId || getPetId(pet), [petId, pet]);

    useEffect(() => {
        if (statePet) return;

        async function fetchPet() {
            setLoading(true);
            setError("");

            const result = await getMisMascotas();
            if (!result.success) {
                setError(result.error || "No se pudo cargar la mascota");
                setLoading(false);
                return;
            }

            const foundPet = result.data.find((item) => String(getPetId(item)) === String(petId));
            if (!foundPet) {
                setError("No encontramos la mascota seleccionada");
                setLoading(false);
                return;
            }

            setPet(foundPet);
            setFormData(mapPetToForm(foundPet));
            setPreview(foundPet.imagenUrl || null);
            setLoading(false);
        }

        fetchPet();
    }, [petId, statePet]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
        setSuccess("");
    }

    function handlePhoto(file) {
        if (!file) return;
        setFormData((prev) => ({
            ...prev,
            photo: file,
        }));
        setPreview(URL.createObjectURL(file));
    }

    function validate() {
        if (!formData.chip.trim()) throw new Error("El identificador es requerido");
        if (!formData.name.trim()) throw new Error("El nombre es requerido");
        if (!formData.type) throw new Error("El tipo de mascota es requerido");
        if (!formData.gender) throw new Error("El sexo es requerido");
        if (!formData.color.trim()) throw new Error("El color es requerido");
        if (!formData.breed.trim()) throw new Error("La raza es requerida");
        if (!formData.age.toString().trim() || !/^\d+$/.test(formData.age.toString())) {
            throw new Error("La edad debe ser numérica");
        }
        if (!formData.description.trim()) throw new Error("La descripción es requerida");
        if (formData.type === "OTRO" && !formData.otherPetType.trim()) {
            throw new Error("Debes indicar el otro tipo de mascota");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            validate();
            const result = await updatePet(currentPetId, formData);

            if (!result.success) {
                throw new Error(result.error || "No se pudieron actualizar los datos de la mascota");
            }

            setSuccess("Datos de la mascota actualizados correctamente");
            setTimeout(() => navigate("/mis-mascotas"), 900);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return {
        formData,
        preview,
        loading,
        saving,
        error,
        success,
        handleChange,
        handlePhoto,
        handleSubmit,
    };
}
