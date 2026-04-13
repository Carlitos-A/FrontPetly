export default function ReportModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2>Crear reporte</h2>

        <button
          onClick={() => onSubmit({ type: "robo" })}
          className="bg-red-500 text-white p-2 mt-2"
        >
          Reportar robo
        </button>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}