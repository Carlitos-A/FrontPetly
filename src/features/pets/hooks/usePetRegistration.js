import { useState } from "react";
import { registerService } from "../services/registerService";


export function usePetRegistration() {
  const [formData, setFormData] = useState({
    chip: "",
    name: "",
    gender: "",
    type: "",
    color: "",
    breed: "",
    age:"",
    description: "",
    otherPetType: "",
    photo: null,
  });

  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejo estándar de inputs (Actualiza formData con name y value)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Similar al anterior pero recibe nombre y valor directamente (para elementos que no son inputs nativos, como los selectores).
  const handleSelect = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Imagen
  const handlePhoto = (file) => {
    if (!file) return; //Si no hay imagen, no hacer nada

    setFormData({
      ...formData,
      photo: file, // guarda el archivo en el estado
    });

    setPreview(URL.createObjectURL(file)); // crea URL temporal para mostrar la imagen seleccionada
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const reset = () => {
    setFormData({
      chip: "",
      name: "",
      gender: "",
      age:"",
      type: "",
      color: "",
      breed: "",
      description: "",
      otherPetType: "",
      photo: null,
    });

    setPreview(null);
    setStep(1);
    setError("");
  };

  // Envío del formulario
  const handleSubmit = async (e) => {

    e.preventDefault(); // evita que recargue la página
    setLoading(true);
    setError("");
    const result = await registerService(formData); // Llama al servicio de registro con formData

    if (result.success) {
      setStep(3); // Avanza a la pantalla de éxito
    } else {
      setError(result.error || "Error al registrar mascota"); // Muestra el error devuelto por el servicio o un mensaje genérico
    }
    setLoading(false);
    };

  return {
    formData,
    handleChange,
    handleSelect,
    handlePhoto,
    handleSubmit,
    step,
    setStep,
    next,
    back,
    preview,
    loading,
    error,
    reset,
  };
}