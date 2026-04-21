import React from "react";

export default function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[11px] text-white/40 uppercase tracking-wide font-semibold">
                {label}
            </label>
            <div
                className="[&_input]:w-full [&_input]:bg-white/6 [&_input]:border [&_input]:border-white/12
                   [&_input]:rounded-lg [&_input]:px-4 [&_input]:py-3 [&_input]:text-[14px]
                   [&_input]:text-white [&_input]:outline-none [&_input]:transition-all [&_input]:duration-200
                   [&_input:focus]:border-[rgba(93,202,165,0.8)] [&_input:focus]:bg-[rgba(93,202,165,0.08)] [&_input:focus]:shadow-lg [&_input:focus]:shadow-[rgba(93,202,165,0.1)]
                   [&_input::placeholder]:text-white/30
                   [&_select]:w-full [&_select]:bg-white/6 [&_select]:border [&_select]:border-white/12
                   [&_select]:rounded-lg [&_select]:px-4 [&_select]:py-3 [&_select]:text-[14px]
                   [&_select]:text-white [&_select]:outline-none [&_select]:transition-all [&_select]:duration-200 [&_select]:cursor-pointer
                   [&_select:focus]:border-[rgba(93,202,165,0.8)] [&_select:focus]:bg-[rgba(93,202,165,0.08)] [&_select:focus]:shadow-lg [&_select:focus]:shadow-[rgba(93,202,165,0.1)]
                   [&_select_option]:bg-[#1a2e22] [&_select_option]:text-white"
            >
                {children}
            </div>
        </div>
    );
}