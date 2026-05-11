import { useState } from "react";
import MapModal from "./MapModal";
import FormModal from "./FormModal";



export default function ReportModal({ open, onClose, onSubmit, actionType, tipoReporte }) {

    const [step, setStep] = useState("map"); // "map" | "form"
    const [coords, setCoords] = useState(null);

    function handleClose() {
        setStep("map");
        setCoords(null);
        onClose();
    }

    if (!open) return null;
    return (
        <>
            {step === "map" && (
                <MapModal
                    open={true}
                    onClose={handleClose}
                    onContinue={(selectedCoords) => {
                        setCoords(selectedCoords);
                        setStep("form");
                    }}
                />
            )}

            {step === "form" && (
                <FormModal
                    open={true}
                    coords={coords}
                    actionType={actionType}
                    tipoReporte={tipoReporte}
                    onBack={() => setStep("map")}
                    onClose={handleClose}
                    onSubmit={async (data) => {
                        await onSubmit(data);
                    }}
                />
            )}
        </>
    );
}
