import React from "react";

export default function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[11px] text-white uppercase tracking-wide font-bold">
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
                    [&_select>option]:bg-[#1a2e22] [&_select>option]:text-white
                   [&_textarea]:w-full [&_textarea]:bg-white/6 [&_textarea]:border [&_textarea]:border-white/12
                    [&_textarea]:rounded-lg [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-[14px]
                    [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:transition-all [&_textarea]:duration-200
                    [&_textarea:focus]:border-[rgba(93,202,165,0.8)] [&_textarea:focus]:bg-[rgba(93,202,165,0.08)]
                     [&_textarea:focus]:shadow-lg [&_textarea:focus]:shadow-[rgba(93,202,165,0.1)]
                     [&_textarea::placeholder]:text-white/30"
            >
                {children}
            </div>
        </div>
    );
}