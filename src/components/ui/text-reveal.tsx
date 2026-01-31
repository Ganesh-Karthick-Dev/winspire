"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
    text: string | string[];
    className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
    text,
    className,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const paragraphs = Array.isArray(text) ? text : [text];
    // Calculate global word count to map progress correctly across all paragraphs
    const allWords = paragraphs.flatMap(p => p.split(" ").filter(w => w));
    const totalWords = allWords.length;

    let globalWordIndex = 0;

    return (
        <div ref={targetRef} className={cn("relative z-0 min-h-[200vh]", className)}>
            <div
                className={
                    "sticky top-0 mx-auto flex h-[50vh] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
                }
            >
                <div className="flex flex-col gap-8">
                    {paragraphs.map((paragraph, pIndex) => (
                        <p
                            key={pIndex}
                            className={
                                "flex flex-wrap text-2xl font-bold text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
                            }
                        >
                            {paragraph.split(" ").map((word, i) => {
                                if (!word) return null;
                                const index = globalWordIndex++; // Capture current index and increment
                                const start = index / totalWords;
                                const end = start + 1 / totalWords;
                                return (
                                    <Word key={`${pIndex}-${i}`} progress={scrollYProgress} range={[start, end]}>
                                        {word}
                                    </Word>
                                );
                            })}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
            <span className={"absolute opacity-30"}>{children}</span>
            <motion.span
                style={{ opacity: opacity }}
                className={"text-white"}
            >
                {children}
            </motion.span>
        </span>
    );
};

export { TextRevealByWord };
