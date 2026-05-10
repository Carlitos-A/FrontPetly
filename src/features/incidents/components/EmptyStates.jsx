import PawIcon from "../../../shared/components/PawIcon";

export default function EmptyStates({ title, text }) {
  return (
    <div className="rounded-2xl border border-[#143624]/10 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#5DCAA5]/15 text-[#143624]">
        <PawIcon />
      </div>

      <h2 className="mt-4 text-xl font-black text-[#102218]">
        {title}
      </h2>

      <p className="mt-2 text-sm font-semibold text-[#102218]/60">
        {text}
      </p>
    </div>
  );
}
