"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import styles from "./NeuraGeminiEffectSection.module.css";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function NeuraGeminiEffectSection() {
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: isMobile ? ["start end", "end start"] : ["start start", "end start"],
    });

    // SVG path animations - keep them smooth throughout the scroll
    // Mobile: Start animating much earlier (as soon as section enters)
    const opacity1Start = isMobile ? 0 : 0.2;
    const pathLengthFirst = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0, 0.8], [opacity1Start, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0, 0.8], [isMobile ? 0 : 0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0, 0.8], [isMobile ? 0 : 0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0, 0.8], [isMobile ? 0 : 0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0, 0.8], [0, 1.2]);

    // Content Transitions
    // Slide 1: Denial Management
    // Visible initially, fades out as we scroll past midway

    // Content Transitions
    // Slide 1: Denial Management
    // Mobile (100vh): Visible during entry [0 - 0.3], fade out [0.3 - 0.4]
    const opacity1 = useTransform(
        scrollYProgress, 
        isMobile ? [0, 0.3, 0.4] : [0, 0.35, 0.45], 
        [1, 1, 0]
    );
    const y1 = useTransform(
        scrollYProgress, 
        isMobile ? [0, 0.4] : [0, 0.45], 
        [0, -30]
    );
    const scale1 = useTransform(
        scrollYProgress, 
        isMobile ? [0, 0.4] : [0, 0.45], 
        [1, 0.95]
    );

    // Slide 2: Cross-Department Alignment
    // Mobile: Fade in just before center [0.35 - 0.45], visible for rest [0.45 - 1]
    const opacity2 = useTransform(
        scrollYProgress, 
        isMobile ? [0.35, 0.45, 1] : [0.40, 0.5, 1], 
        [0, 1, 1]
    );
    const y2 = useTransform(
        scrollYProgress, 
        isMobile ? [0.35, 0.45] : [0.40, 0.5], 
        [30, 0]
    );
    const scale2 = useTransform(
        scrollYProgress, 
        isMobile ? [0.35, 0.45] : [0.40, 0.5], 
        [0.95, 1]
    );

    // Logic to toggle pointer events to avoid blocking interactions (if any)
    // Using a simpler approach: z-index
    // No easily animatable z-index in framer-motion without 'step' curve, 
    // but opacity 0 usually ignores pointer events in some browsers, but purely safe to ignore for now as text isn't clickable.

    return (
        <div
            className={styles.section}
            ref={ref}
        >
            <GoogleGeminiEffect
                pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                ]}
            >
                <div className={styles.contentWrapper}>
                    {/* Slide 1 */}
                    <motion.div
                        className={styles.slide}
                        style={{
                            opacity: opacity1,
                            y: y1,
                            scale: scale1,
                            zIndex: 10
                        }}
                    >
                        <h2 className={styles.slideTitle}>
                            Denial Management That Thinks Strategically
                        </h2>
                        <p className={styles.slideSubtitle}>
                            Neura transforms denial management from reaction to prevention.
                            It classifies inventory, routes work intelligently, generates payer-specific appeals, and identifies trends that prevent repeat failures.
                            <br /><br />
                            Effort is focused only where value exists.
                        </p>
                    </motion.div>

                    {/* Slide 2 */}
                    <motion.div
                        className={styles.slide}
                        style={{
                            opacity: opacity2,
                            y: y2,
                            scale: scale2,
                            zIndex: 20
                        }}
                    >
                        <h2 className={styles.slideTitle}>
                            Cross-Department Alignment at Scale
                        </h2>
                        <p className={styles.slideSubtitle}>
                            Neura aligns billing, coding, AR, denials, eligibility, and posting around enterprise-level outcomes.
                        </p>

                        <div className={styles.glassCardsGrid}>
                            <div className={styles.glassCard}>
                                <h3 className={styles.cardTitle}>Predictable Timelines</h3>
                                <p className={styles.cardDescription}>Clear turnaround times</p>
                            </div>
                            <div className={styles.glassCard}>
                                <h3 className={styles.cardTitle}>Real-time Control</h3>
                                <p className={styles.cardDescription}>Real-time SLA risk alerts</p>
                            </div>
                            <div className={styles.glassCard}>
                                <h3 className={styles.cardTitle}>Connected Workflows</h3>
                                <p className={styles.cardDescription}>Structured, visible handoffs across teams</p>
                            </div>
                        </div>

                        <div className={styles.finalGlassCard}>
                            <p className={styles.finalText}>
                                In revenue cycles, communication is money.
                                <span className={styles.finalTextHighlight}>Neura makes it measurable and accountable.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </GoogleGeminiEffect>
        </div>
    );
}
