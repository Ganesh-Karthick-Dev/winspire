"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FUIBentoGridDark() {
    return (
        <div className="container mx-auto flex flex-col bg-transparent p-10 pt-32 text-white">
            <h1 className="font-outfit text-3xl tracking-tight md:text-5xl font-bold mb-8">
                Proven Structural Outcomes
            </h1>
            <p
                className="text-2xl/8 font-medium tracking-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent max-w-3xl mb-20"
                style={{ marginBottom: '60px' }}
            >
                Across Neura-enabled organizations
            </p>
            <div
                className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2"
                style={{ marginTop: '60px' }}
            >
                <BentoCard
                    eyebrow="Revenue"
                    title="Net Collection Rate"
                    description="Improves from approximately 75% to 95%"
                    graphic={
                        <img 
                            src="/neura%20ai/Comprehensive%20Revenue%20Cycle%20Solutions.webp" 
                            alt="Revenue" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    }
                    className="max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]"
                />
                <BentoCard
                    eyebrow="Speed"
                    title="AR Days"
                    description="Reduce from 50–60 to 25–30"
                    graphic={
                        <img 
                            src="/neura%20ai/speed.webp" 
                            alt="Speed" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    }
                    className="lg:col-span-3 lg:rounded-tr-[2rem]"
                />
                <BentoCard
                    eyebrow="Efficiency"
                    title="Denial Rates"
                    description="Fall from 12–15% to below 3%"
                    graphic={
                        <img 
                            src="/neura%20ai/Efficiency.webp" 
                            alt="Efficiency" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    }
                    className="lg:col-span-2 lg:rounded-bl-[2rem]"
                />
                <BentoCard
                    eyebrow="Accuracy"
                    title="First-pass Resolution"
                    description="Rises from 40–50% to 80–90%"
                    graphic={
                        <img 
                            src="/neura%20ai/acuracy.webp" 
                            alt="Accuracy" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    }
                    className="lg:col-span-2"
                />
                <BentoCard
                    eyebrow="Savings"
                    title="Cost to Collect"
                    description="Drops from 10–15% to approximately 5%"
                    graphic={
                        <img 
                            src="/neura%20ai/savings.webp" 
                            alt="Savings" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
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
                {/* Gradient overlays for text readability - reduced opacity slightly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />

                {fade.includes("top") && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50" />
                )}
                {fade.includes("bottom") && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                )}
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-md border-t border-white/10 box-border"
                style={{ padding: '3rem' }}
            >
                <h3 className="text-secondary text-[10px] font-bold uppercase tracking-wider mb-2">{eyebrow}</h3>
                <p className="text-lg font-bold tracking-tight text-white mb-2">
                    {title}
                </p>
                <p className="text-[11px] font-normal text-gray-300 leading-relaxed max-w-prose">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
