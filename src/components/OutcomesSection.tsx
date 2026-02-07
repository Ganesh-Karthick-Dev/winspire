"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity, Shield, Users, Eye, Zap } from "lucide-react";
import SectionTitle from "./ui/section-title";
import { CleanTestimonial } from "./ui/clean-testimonial";

// Animated Counter Component
function AnimatedCounter({ value, startValue = "0", delay = 0 }: { value: string; startValue?: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(startValue);

    // Initial animation
    useEffect(() => {
        if (!isInView) return;

        const cleanValue = value.replace(/[^0-9.]/g, "");
        const numericValue = parseFloat(cleanValue);
        const suffix = value.replace(/[0-9.-]/g, "");

        const cleanStartValue = startValue.replace(/[^0-9.]/g, "");
        const numericStart = parseFloat(cleanStartValue) || 0;

        if (isNaN(numericValue)) {
            const timer = setTimeout(() => setDisplayValue(value), delay * 1000);
            return () => clearTimeout(timer);
        }

        const duration = 2000; // Increased to 2 seconds for a more dramatic entrance
        const startTime = Date.now() + delay * 1000;
        const isDecimal = cleanValue.includes(".");

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed < 0) {
                requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // Smoother ease-out
            const current = numericStart + eased * (numericValue - numericStart);

            const formatted = isDecimal
                ? current.toFixed(1)
                : Math.floor(current).toString();

            setDisplayValue(`${formatted}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, startValue, delay]);

    // Random Jitter/Fluctuation effect (Continuous)
    useEffect(() => {
        if (!isInView) return;

        const cleanValue = value.replace(/[^0-9.]/g, "");
        const numericValue = parseFloat(cleanValue);
        const suffix = value.replace(/[0-9.-]/g, "");
        const isDecimal = cleanValue.includes(".");

        if (isNaN(numericValue)) {
            // Special handling for non-numeric like "AI"
            if (value === "AI") {
                const terms = ["AI", "ML", "GEN", "IQ", "AI"];
                const interval = setInterval(() => {
                    if (Math.random() > 0.8) { // Only change occasionally
                        const randomTerm = terms[Math.floor(Math.random() * terms.length)];
                        setDisplayValue(randomTerm);
                        setTimeout(() => setDisplayValue("AI"), 300); // Quick flicker back
                    }
                }, 3000);
                return () => clearInterval(interval);
            }
            return;
        }

        // Periodic jitter for numeric values
        const interval = setInterval(() => {
            if (Math.random() > 0.6) { // 40% chance every check
                // Random drift between -1.5% and +1.5% of the value
                const drift = numericValue * (0.015 * (Math.random() * 2 - 1));
                const jittered = numericValue + drift;
                
                const formatted = isDecimal
                    ? jittered.toFixed(1)
                    : Math.round(jittered).toString();
                
                setDisplayValue(`${formatted}${suffix}`);
                
                // Return to base value after a short moment
                setTimeout(() => {
                    setDisplayValue(value);
                }, 1000 + Math.random() * 1000);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isInView, value]);

    return (
        <span ref={ref} className="stat-value animated-stat">
            {displayValue}
        </span>
    );
}

import { useIconDraw } from "@/hooks/useIconDraw";

export default function OutcomesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const iconsRef = useIconDraw({ stagger: 0.1, start: "top 75%" });

    const outcomes = [
        {
            text: "Faster, more predictable cash flow",
            icon: Zap,
            stat: "50%",
            startStat: "25%",
            statLabel: "Faster Claim to Cash Cycle"
        },
        {
            text: "Fewer denials and stronger first-pass performance",
            icon: Shield,
            stat: "98%",
            startStat: "85%",
            statLabel: "Clean Claims"
        },
        {
            text: "Lower cost to collect without staff dependency",
            icon: Users,
            stat: "200%",
            startStat: "50%",
            statLabel: "Cost to Collection"
        },
        {
            text: "Transparent oversight across every department",
            icon: Eye,
            stat: "100%",
            startStat: "0%",
            statLabel: "Visibility"
        },
        {
            text: "Decisions guided by intelligence—not guesswork",
            icon: Activity,
            stat: "AI",
            startStat: "0",
            statLabel: "Driven Insights"
        },
        {
            text: "Scale operations without proportional cost increases",
            icon: CheckCircle2,
            stat: "3x",
            startStat: "1x",
            statLabel: "Capacity Growth"
        }
    ];

    return (
        <section ref={sectionRef} id="outcomes" className="outcomes-section">
            <div className="outcomes-container">

                {/* Header */}
                <div className="outcomes-header">
                    <SectionTitle
                        title="RESULTS THAT SPEAK FOR THEMSELVES."
                        subtitle="Outcomes & Proof"
                        align="left"
                        textColor="text-white"
                        subtitleSize="text-sm md:text-base tracking-[0.3em] font-bold text-blue-400 uppercase"
                        disableShadow={true}
                    />
                </div>

                {/* 3D Grid Layout */}
                <div className="outcomes-grid" ref={iconsRef}>
                    {outcomes.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                                className="outcome-card-wrapper"
                            >
                                <div className="outcome-card">
                                    <div className="card-content">
                                        <div className="icon-box">
                                            <Icon size={24} className="card-icon" />
                                        </div>
                                        <h3 className="card-text">{item.text}</h3>
                                        <div className="card-stat">
                                            <AnimatedCounter value={item.stat} startValue={item.startStat} delay={index * 0.15} />
                                            <span className="stat-label">{item.statLabel}</span>
                                        </div>
                                    </div>
                                    {/* Holographic Glows using CSS */}
                                    <div className="card-glow"></div>
                                    <div className="card-border"></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Testimonial Section with Glossy Card */}
                <div className="testimonial-wrapper">
                    <div className="glossy-card">
                        <CleanTestimonial />
                    </div>
                </div>

            </div>

            <style jsx>{`
                .outcomes-section {
                    position: relative;
                    z-index: 50; /* Increased to stay above 3D viewer */
                    padding: 8rem 0; /* Removed side padding here */
                    background: transparent;
                    perspective: 2000px; /* Enable 3D space */
                }

                .outcomes-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .outcomes-header {
                    margin-bottom: 6rem;
                    text-align: left;
                    padding: 0 24px; /* Mobile Padding */
                }
                @media (min-width: 768px) {
                    .outcomes-header { padding: 0 64px; } /* Desktop Padding to match Neura */
                }

                /* 3D Grid */
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 6rem;
                    perspective: 1000px;
                    padding: 0 24px; /* Mobile Padding */
                }
                @media (min-width: 768px) {
                    .outcomes-grid { 
                        padding: 0 64px; /* Desktop Padding to match Neura */
                        grid-template-columns: repeat(3, 1fr); /* Force 3 columns on large screens */
                    }
                }

                .testimonial-wrapper {
                    padding: 0 24px;
                    margin-top: 4rem;
                }
                @media (min-width: 768px) {
                    .testimonial-wrapper { padding: 0 64px; }
                }

                /* Glossy Card with Glassmorphism */
                .glossy-card {
                    position: relative;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 
                        0 4px 30px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05);
                }

                @media (min-width: 768px) {
                    .glossy-card {
                        padding: 3rem;
                    }
                }

                /* Corner Markers */
                .corner-marker {
                    position: absolute;
                    font-size: 1.25rem;
                    font-weight: 300;
                    color: rgba(255, 255, 255, 0.4);
                    pointer-events: none;
                    user-select: none;
                    line-height: 1;
                }

                .corner-marker.top-left {
                    top: 0.75rem;
                    left: 1rem;
                }

                .corner-marker.top-right {
                    top: 0.75rem;
                    right: 1rem;
                }

                .corner-marker.bottom-left {
                    bottom: 0.75rem;
                    left: 1rem;
                }

                .corner-marker.bottom-right {
                    bottom: 0.75rem;
                    right: 1rem;
                }

                .outcome-card-wrapper {
                    height: 100%;
                    transform-style: preserve-3d;
                }

                /* The Card Itself */
                .outcome-card {
                    position: relative;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.4); /* Dark semi-transparent */
                    border-radius: 24px;
                    padding: 3rem 2rem;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                box-shadow 0.4s ease,
                                background 0.4s ease;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transform-style: preserve-3d;
                    overflow: hidden;
                }

                /* Hover Effect: Lift and Glow */
                .outcome-card-wrapper:hover .outcome-card {
                    transform: translateY(-10px) scale(1.02);
                    background: rgba(30, 41, 59, 0.6);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5),
                                0 0 20px rgba(59, 130, 246, 0.2); /* Blue glow */
                    border-color: rgba(96, 165, 250, 0.3);
                }

                /* Content */
                .card-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .icon-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.1));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
                }

                :global(.card-icon) {
                    color: #60a5fa; /* Blue-400 */
                }

                .card-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: white;
                    line-height: 1.3;
                    margin-bottom: 3rem;
                    flex-grow: 1;
                }

                .card-stat {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                :global(.stat-value) {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(to right, #60a5fa, #a5b4fc);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    display: inline-block;
                }

                /* Animated stat - just for count-up, no glow */
                :global(.animated-stat) {
                    display: inline-block;
                }

                .stat-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #94a3b8;
                    font-weight: 600;
                }

                /* Holographic Decor */
                .card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 1;
                }
                .outcome-card-wrapper:hover .card-glow {
                    opacity: 1;
                }

                /* PROOF FOOTER */
                .proof-footer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4rem;
                    padding: 0 24px; /* Mobile Padding */
                }
                @media (min-width: 768px) {
                    .proof-footer { padding: 0 64px; } /* Desktop Padding */
                }

                .testimonials-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 3rem;
                    text-align: center;
                }

                .testimonial-simple {
                    flex: 1;
                    min-width: 300px;
                    max-width: 450px;
                    padding: 2rem 2.5rem;
                    border-radius: 24px;
                    background: rgba(15, 23, 42, 0.3);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }

                .testimonial-simple:hover {
                    background: rgba(15, 23, 42, 0.5);
                    border-color: rgba(96, 165, 250, 0.3);
                    transform: translateY(-5px);
                }

                .t-quote {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: white;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Good contrast */
                }
                @media (min-width: 768px) {
                    .t-quote { font-size: 1.25rem; }
                }

                .t-author {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #bae6fd; /* Sky-200 for visibility */
                    font-weight: 800;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }

                /* PREMIUM CTA */
                .cta-container {
                    margin-top: 2rem;
                }

                .premium-cta {
                    background: white;
                    border: none;
                    border-radius: 100px;
                    padding: 1.25rem 3rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                }

                .premium-cta:hover {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
                    transform: scale(1.05); /* Slight grow */
                }

                .cta-text {
                    font-family: 'Outfit', sans-serif;
                    color: #0f172a;
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                :global(.cta-arrow) {
                    color: #0f172a;
                    transition: transform 0.3s ease;
                }
                .premium-cta:hover :global(.cta-arrow) {
                    transform: translateX(4px);
                }

            `}</style>
        </section>
    );
}
