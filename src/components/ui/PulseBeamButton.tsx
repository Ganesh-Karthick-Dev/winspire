"use client";

import React from "react";

interface PulseBeamButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
}

export const PulseBeamButton = ({ text, href, onClick }: PulseBeamButtonProps) => {
    const buttonContent = (
        <button
            className="bg-slate-800 w-[320px] z-40 h-[70px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
            onClick={onClick}
            type="button"
        >
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex justify-center w-[320px] text-center space-x-2 h-[70px] items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                <span className="md:text-lg text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 font-medium">
                    {text}
                </span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );

    if (href) {
        return (
            <a href={href} className="inline-block">
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
};

export default PulseBeamButton;
