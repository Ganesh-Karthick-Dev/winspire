"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FUIBentoGridDark() {
    return (
        <div className="container mx-auto flex min-w-full flex-col bg-transparent p-10 pt-32 text-white">
            <h1 className="font-outfit text-3xl tracking-tight md:text-5xl font-bold">
                Sales
            </h1>
            <p className="mt-2 text-2xl/8 font-medium tracking-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent max-w-3xl">
                Know more about your customers than they do.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                <BentoCard
                    eyebrow="Insight"
                    title="Get perfect clarity"
                    description="PerkAI uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
                    graphic={
                        <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png')] bg-cover bg-center" />
                    }
                    className="max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]"
                />
                <BentoCard
                    eyebrow="Analysis"
                    title="Undercut your competitors"
                    description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
                    graphic={
                        <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png')] bg-cover bg-center" />
                    }
                    className="lg:col-span-3 lg:rounded-tr-[2rem]"
                />
                <BentoCard
                    eyebrow="Speed"
                    title="Built for power users"
                    description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
                    graphic={
                        <div className="absolute inset-0 -top-20 -left-60 bg-[url('https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png')] bg-cover bg-center bg-black" />
                    }
                    className="lg:col-span-2 lg:rounded-bl-[2rem]"
                />
                <BentoCard
                    eyebrow="Source"
                    title="Get the furthest reach"
                    description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
                    graphic={
                        <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png')] bg-contain bg-no-repeat bg-center" />
                    }
                    className="lg:col-span-2"
                />
                <BentoCard
                    eyebrow="Limitless"
                    title="Sell globally"
                    description="PerkAI helps you sell in locations currently under international embargo."
                    graphic={
                        <div className="absolute inset-0 -top-44 -left-60 bg-[url('https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png')] bg-contain bg-no-repeat bg-center" />
                    }
                    className="max-lg:rounded-b-[2rem] lg:col-span-2 lg:rounded-br-[2rem]"
                />
            </div>
        </div>
    );
}

export function BentoCard({
    dark = false,
    className = "",
    eyebrow,
    title,
    description,
    graphic,
    fade = [],
}: {
    dark?: boolean;
    className?: string;
    eyebrow: ReactNode;
    title: ReactNode;
    description: ReactNode;
    graphic?: ReactNode;
    fade?: ("top" | "bottom")[];
}) {
    return (
        <motion.div
            initial="idle"
            whileHover="active"
            variants={{ idle: {}, active: {} }}
            data-dark={dark ? "true" : undefined}
            className={clsx(
                className,
                "group relative flex flex-col overflow-hidden rounded-lg",
                "bg-black transform-gpu transition-all duration-300",
                "box-border border border-white/10 shadow-sm hover:border-white/20",
                "h-[500px]" // Explicit height for consistent cards
            )}
        >
            <div className="relative h-full w-full shrink-0 overflow-hidden">
                {graphic}
                {/* Gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

                {fade.includes("top") && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50" />
                )}
                {fade.includes("bottom") && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end h-full pointer-events-none">
                <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-2">{eyebrow}</h3>
                <p className="text-2xl font-bold tracking-tight text-white mb-2">
                    {title}
                </p>
                <p className="text-sm font-normal text-gray-400 leading-relaxed max-w-prose">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
