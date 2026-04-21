import { useState } from "react";

export default function SearchBar({ value, onChange }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`relative transition-all duration-300 mb-6 ${isFocused ? "w-full" : "w-96"} mx-auto`}>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Buscar..."
                className={`
      w-full py-2 pl-10 pr-4
      text-white
      bg-white/5
      border rounded-full
      outline-none
      backdrop-blur-xl
      transition-all
      ${isFocused
                        ? "border-[#5DCAA5] bg-white/10"
                        : "border-white/10"
                    }
    `}
            />

            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                    className={`w-5 h-5 transition-all ${isFocused ? "text-[#5DCAA5]" : "text-white/30"
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

        </div>
    );
}