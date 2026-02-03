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

import { FC, ReactNode, useRef, useState, useEffect } from "react";
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "@/styles/TextRevealSlider.module.css";

interface TextRevealSliderProps {
    text: string[];
    className?: string; // Kept for API compatibility but styles are handled internally mainly
}

export const TextRevealSlider: FC<TextRevealSliderProps> = ({
    text,
    className,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
    
    // Add smoothing to the scroll progress - Snappier but smooth
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 40,
        mass: 0.2, // Lighter mass for less "heavy" feel
        restDelta: 0.001
    });
    
    const total = text.length;

    return (
        <div ref={targetRef} className={`${styles.container} ${className || ''}`}>
            <div className={styles.stickyWrapper}>
                
                {/* Progress Separator Line */}
                <div className={styles.progressContainer}>
                     <div className={styles.track}>
                        <motion.div 
                            style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                            className={styles.progressBar}
                        />
                     </div>
                </div>

                {/* Counter - ON THE LEFT */}
                 <div className={styles.counterContainer}>
                     <div className={styles.counterBox}>
                        <CounterValue value={useTransform(smoothProgress, v => Math.min(Math.ceil(v * total) || 1, total))} total={total} />
                     </div>
                </div>

                {/* Text Content Area - ON THE RIGHT */}
                <div className={styles.textContainer}>
                    {text.map((t, i) => {
                        const stepStart = i / total;
                        const stepEnd = (i + 1) / total;
                        
                        return (
                            <ScrollTextItem 
                                key={i} 
                                text={t} 
                                progress={smoothProgress} 
                                range={[stepStart, stepEnd]} 
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const CounterValue = ({ value, total }: { value: MotionValue<number>; total: number }) => {
    const [current, setCurrent] = useState(1);
    
    useEffect(() => {
        return value.on("change", (latest) => {
             setCurrent(Math.max(1, latest));
        });
    }, [value]);

    return <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>;
};

const ScrollTextItem = ({ text, progress, range }: { text: string, progress: MotionValue<number>, range: [number, number] }) => {
    const [start, end] = range;
    const duration = end - start;

    // Phasing
    const revealStart = start;
    const revealEnd = start + (duration * 0.7); // Stretched from 0.4 to 0.7 to slow down reveal
    // Hold from 0.7 to 0.9
    const exitStart = start + (duration * 0.9); 
    const exitEnd = end;

    // Global Visibility
    const display = useTransform(progress, (p: number) => (p >= start && p < end) ? 'block' : 'none');

    // Slide Up Exit (No rotation)
    // Move from y:0 to y:-100% (Slide Up completely out of view)
    const yContainer = useTransform(progress, [exitStart, exitEnd], ["0%", "-100%"]); 
    const opacity = useTransform(progress, [exitStart, exitEnd], [1, 0]);
    const filter = useTransform(progress, [exitStart, exitEnd], ["blur(0px)", "blur(10px)"]);

    // Word Reveal Progress map
    const revealProgress = useTransform(progress, [revealStart, revealEnd], [0, 1]);

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
                {text.split(" ").map((word: string, i: number) => {
                     const words = text.split(" ");
                     const wStart = i / words.length;
                     const wEnd = (i + 1) / words.length;
                     return (
                         <WordReveal key={i} progress={revealProgress} range={[wStart, wEnd]}>{word}</WordReveal>
                     );
                })}
             </p>
        </motion.div>
    );
}

const WordReveal = ({ children, progress, range }: { children: ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
    // Smoother fade in, start from light white (0.5)
    const opacity = useTransform(progress, range, [0.5, 1]); 
    // Subtle slide up for words
    const y = useTransform(progress, range, ["20%", "0%"]);
    
    return (
        <span className={styles.wordSpan}>
            <span className="absolute opacity-0">{children}</span> {/* Placeholder */}
            <motion.span style={{ opacity, y }} className={styles.wordInner}>
                {children}
            </motion.span>
        </span>
    );
};
