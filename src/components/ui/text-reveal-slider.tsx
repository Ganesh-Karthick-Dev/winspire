/**
 * TextRevealSlider
 * 
 * Features:
 * - Scroll-driven reveal
 * - Sticky counter (Left)
 * - Right-aligned text content
 * - Progress separator line
 * - CSS Modules only (No Tailwind)
 */

"use client";

import React, { FC, ReactNode, useRef, useState, useEffect } from "react";
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "@/styles/TextRevealSlider.module.css";

interface TextRevealSliderProps {
    text: string[];
    className?: string;
}

// Sub-components defined first to avoid TDZ issues
const CounterValue = ({ value, total }: { value: MotionValue<number>; total: number }) => {
    const [current, setCurrent] = useState(1);
    
    useEffect(() => {
        return value.on("change", (latest) => {
             setCurrent(Math.max(1, Math.ceil(latest)));
        });
    }, [value]);

    return <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>;
};

const WordReveal = ({ children, progress, range }: { children: ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.4, 1]); 
    const y = useTransform(progress, range, ["15%", "0%"]);
    
    return (
        <span className={styles.wordSpan}>
            <span className="absolute opacity-0">{children}</span>
            <motion.span style={{ opacity, y }} className={styles.wordInner}>
                {children}
            </motion.span>
        </span>
    );
};

const ScrollTextItem = ({ text, progress, range }: { text: string, progress: MotionValue<number>, range: [number, number] }) => {
    const [start, end] = range;
    const duration = end - start;

    const revealStart = start;
    const revealEnd = start + (duration * 0.7);
    const exitStart = start + (duration * 0.9); 
    const exitEnd = end;

    const display = useTransform(progress, (p: number) => (p >= start && p < end) ? 'block' : 'none');
    const yContainer = useTransform(progress, [exitStart, exitEnd], ["0%", "-100%"]); 
    const opacity = useTransform(progress, [exitStart, exitEnd], [1, 0]);
    const filter = useTransform(progress, [exitStart, exitEnd], ["blur(0px)", "blur(10px)"]);
    const revealProgress = useTransform(progress, [revealStart, revealEnd], [0, 1]);

    const words = text.split(" ");

    return (
        <motion.div 
            style={{ 
                display, 
                opacity, 
                y: yContainer,
                filter,
            }} 
            className={styles.textItemWrapper}
        >
             <p className={styles.textItem}>
                {words.map((word: string, i: number) => {
                     const wStart = i / words.length;
                     const wEnd = (i + 1) / words.length;
                     return (
                         <WordReveal key={i} progress={revealProgress} range={[wStart, wEnd]}>{word}</WordReveal>
                     );
                })}
             </p>
        </motion.div>
    );
};

export const TextRevealSlider: FC<TextRevealSliderProps> = ({
    text,
    className,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
    
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    
    const total = text.length;

    return (
        <div ref={targetRef} className={`${styles.container} ${className || ''}`}>
            <div className={styles.stickyWrapper}>
                
                {/* Progress Track */}
                <div className={styles.progressContainer}>
                     <div className={styles.track}>
                        <motion.div 
                            style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                            className={styles.progressBar}
                        />
                     </div>
                </div>

                {/* Counter */}
                 <div className={styles.counterContainer}>
                     <div className={styles.counterBox}>
                        <CounterValue value={useTransform(smoothProgress, v => v * total)} total={total} />
                     </div>
                </div>

                {/* Content */}
                <div className={styles.textContainer}>
                    {text.map((t, i) => (
                        <ScrollTextItem 
                            key={i} 
                            text={t} 
                            progress={smoothProgress} 
                            range={[i / total, (i + 1) / total]} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
