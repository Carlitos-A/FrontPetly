export default function FloatingButton({ onClick, icon = "+", label }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        w-16 h-16
        bg-red-500 hover:bg-red-600
        text-white text-2xl font-bold
        rounded-full
        shadow-lg
        flex items-center justify-center
        transition-transform active:scale-95 hover:scale-110
        z-50
      "
      aria-label={label || "floating button"}
    >
      {icon}
    </button>
  );
}