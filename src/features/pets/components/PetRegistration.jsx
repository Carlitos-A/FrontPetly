import { usePetRegistration } from "../hooks/usePetRegistration";
import IndicadorPaso from "./IndicadorPaso";
import SubirFoto from "./SubirFoto";
import SizeGender from "./SizeGender";
import PantallaExitosa from "./PantallaExitosa";

export default function PetRegistration() {
    const {
        step,
        setStep,
        handleSubmit,
        next,
        back,
        reset,
        ...form
    } = usePetRegistration();

    if (step === 3) {
        return <PantallaExitosa onReset={reset} />;
    }

    return (
        <div className="h-full pt-20 pb-8">
            <div className="max-w-2xl mx-auto px-4">

                <IndicadorPaso Paso={step} onStepClick={setStep} />

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">

                    {step === 1 && <SubirFoto {...form} next={next} />}
                    {step === 2 && <SizeGender {...form} next={next} back={back} />}

                </form>
            </div>
        </div>
    );
}