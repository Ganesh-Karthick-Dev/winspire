"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, Wrench, Cpu, Brain, ArrowUpRight, Hexagon, Network, Activity } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionTitle from "./section-title";

export function EngagementModelsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const models = [
        {
            icon: Wrench,
            title: "Manual RCM Support",
            description: "Foundational execution with structured accountability.",
            color: "text-blue-300",
            step: "01",
            visual: "GEAR"
        },
        {
            icon: Cpu,
            title: "Tech-Enabled RCM",
            tag: "MOST COMMON",
            description: "Experienced teams supported by automation and intelligence.",
            color: "text-blue-200",
            step: "02",
            visual: "NETWORK"
        },
        {
            icon: Brain,
            title: "AI-Driven RCM Ecosystem",
            description: "Predictive insights, system-driven execution, and full operational control.",
            color: "text-white",
            step: "03",
            visual: "BRAIN"
        }
    ];

    return (
        <section ref={sectionRef} id="engagement-models" className="engagement-section">
            <div className="engagement-container">

                {/* Header */}
                <div className="engagement-header">
                    <SectionTitle
                        title="ENGAGEMENT MODELS"
                        subtitle="Start Where You Are. Grow Where You’re Going."
                        align="left"
                        textColor="text-white"
                        subtitleSize="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                        disableShadow={false}
                    />
                    <p className="intro-text">
                        We offer flexible engagement models designed to meet today’s needs while building toward tomorrow:
                    </p>
                </div>

                <div className="content-grid">

                    {/* LEFT COLUMN: SCROLLING TIMELINE */}
                    <div className="timeline-column">
                        <div className="timeline-track"></div>

                        {models.map((model, index) => (
                            <TimelineStep
                                key={index}
                                model={model}
                                index={index}
                                setActiveStep={setActiveStep}
                            />
                        ))}

                        {/* Footer (Nested here to flow with scroll) */}
                        <div className="engagement-footer">
                            <p className="closing-text">
                                We meet you where you are—and architect for <span className="text-white font-bold tracking-wide">sustainable scale.</span>
                            </p>

                            <button className="engagement-cta group">
                                <span className="cta-text">Compare Engagement Models</span>
                                <ArrowUpRight size={20} className="cta-icon" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY VISUALIZER */}
                    <div className="visualizer-column">
                        <div className="sticky-wrapper">
                            <div className="hologram-box">
                                {/* Dynamic Title Overlay */}
                                <div className="holo-label">
                                    <span className="holo-tag">ACTIVE MODEL</span>
                                    <h4 className="holo-title">{models[activeStep].title}</h4>
                                </div>

                                {/* The 3D/Motion Visualization */}
                                <div className="holo-display">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeStep}
                                            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                                            transition={{ duration: 0.5 }}
                                            className="visual-container"
                                        >
                                            {models[activeStep].visual === "GEAR" && <GearVisual />}
                                            {models[activeStep].visual === "NETWORK" && <NetworkVisual />}
                                            {models[activeStep].visual === "BRAIN" && <BrainVisual />}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Decorative HUD Elements */}
                                <div className="hud-corner top-left"></div>
                                <div className="hud-corner top-right"></div>
                                <div className="hud-corner bottom-left"></div>
                                <div className="hud-corner bottom-right"></div>
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <style jsx>{`
                .engagement-section {
                    position: relative;
                    z-index: 40;
                    padding: 8rem 0;
                    background: transparent;
                }

                .engagement-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .engagement-header {
                    margin-bottom: 5rem;
                    text-align: left;
                    padding: 0 24px;
                }
                @media (min-width: 768px) {
                    .engagement-header { padding: 0 64px; }
                }

                .intro-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #bae6fd;
                    max-width: 700px;
                    margin-top: 2rem;
                    line-height: 1.6;
                }

                /* GRID LAYOUT */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                    padding: 0 24px;
                }
                @media (min-width: 1024px) {
                    .content-grid {
                        grid-template-columns: 1fr 1fr; /* 50/50 Split */
                        padding: 0 64px;
                        gap: 6rem;
                    }
                }

                /* LEFT COLUMN */
                .timeline-column {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 8rem; /* Space between steps */
                    padding-bottom: 4rem;
                }
                
                .timeline-track {
                    position: absolute;
                    left: 23px; /* Center of marker */
                    top: 2rem;
                    bottom: 10rem;
                    width: 2px;
                    background: linear-gradient(to bottom, rgba(96, 165, 250, 0.5), rgba(96, 165, 250, 0.1));
                    z-index: 0;
                }

                /* RIGHT COLUMN */
                .visualizer-column {
                    display: none; /* Hidden on mobile */
                }
                @media (min-width: 1024px) {
                    .visualizer-column {
                        display: block;
                        position: relative;
                    }
                }

                .sticky-wrapper {
                    position: sticky;
                    top: 15vh;
                    height: 500px;
                    width: 100%;
                }

                /* HOLOGRAM BOX */
                .hologram-box {
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(20px);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
                }

                .holo-label {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    z-index: 10;
                }
                .holo-tag {
                    color: #60a5fa;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                .holo-title {
                    color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0;
                }

                .holo-display {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* HUD DECOR */
                .hud-corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: rgba(96, 165, 250, 0.5);
                    border-style: solid;
                }
                .top-left { top: 20px; left: 20px; border-width: 2px 0 0 2px; }
                .top-right { top: 20px; right: 20px; border-width: 2px 2px 0 0; }
                .bottom-left { bottom: 20px; left: 20px; border-width: 0 0 2px 2px; }
                .bottom-right { bottom: 20px; right: 20px; border-width: 0 2px 2px 0; }

                .scan-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgba(96, 165, 250, 0.5);
                    animation: scan 3s linear infinite;
                    opacity: 0.5;
                }
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }

                /* FOOTER */
                .engagement-footer {
                    margin-top: 4rem;
                }
                .closing-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    color: #bae6fd;
                    line-height: 1.4;
                    margin-bottom: 2rem;
                }
                .engagement-cta {
                    background: white;
                    color: #0f172a;
                    border: none;
                    border-radius: 100px;
                    padding: 1.25rem 2.5rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 1rem;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                }
                .engagement-cta:hover {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
                    transform: translateX(5px);
                }

            `}</style>
        </section>
    );
}

// --- SUB-COMPONENTS ---

function TimelineStep({ model, index, setActiveStep }: { model: any, index: number, setActiveStep: (n: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" }); // Active when in center 20% of screen

    useEffect(() => {
        if (isInView) {
            setActiveStep(index);
        }
    }, [isInView, index, setActiveStep]);

    const Icon = model.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.2, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`timeline-step ${isInView ? 'active' : ''}`}
        >
            <style jsx>{`
                .timeline-step {
                    display: flex;
                    align-items: flex-start;
                    gap: 2rem;
                    opacity: 0.5;
                    transition: opacity 0.5s ease;
                    z-index: 10;
                }
                .timeline-step.active {
                    opacity: 1;
                }

                .step-marker {
                    width: 3rem;
                    height: 3rem;
                    background: #0f172a;
                    border: 2px solid ${isInView ? '#60a5fa' : '#334155'};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.5s ease;
                    box-shadow: ${isInView ? '0 0 20px rgba(96, 165, 250, 0.5)' : 'none'};
                }

                :global(.step-icon-s) {
                    color: ${isInView ? 'white' : '#64748b'};
                    transition: all 0.5s ease;
                }

                .step-content {
                    padding-top: 0.5rem;
                }
                .step-num {
                    font-size: 0.875rem;
                    color: #60a5fa;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                .step-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 1rem 0;
                }
                .step-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #e2e8f0;
                    line-height: 1.6;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
             `}</style>

            <div className="step-marker">
                <Icon size={20} className="step-icon-s" />
            </div>
            <div className="step-content">
                <span className="step-num">{model.step}</span>
                <h3 className="step-title">
                    {model.title}
                </h3>
                <p className="step-desc">{model.description}</p>
            </div>
        </motion.div>
    );
}

// --- VISUALIZERS ---

function GearVisual() {
    return (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ position: 'relative' }}>
            <Hexagon size={180} color="#60a5fa" strokeWidth={1} />
            <motion.div style={{ position: 'absolute', top: 45, left: 45 }} animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                <Hexagon size={90} color="#93c5fd" strokeWidth={2} />
            </motion.div>
        </motion.div>
    );
}

function NetworkVisual() {
    return (
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <Network size={200} color="#60a5fa" strokeWidth={1.5} />
        </motion.div>
    );
}

function BrainVisual() {
    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Brain size={200} color="#a5b4fc" strokeWidth={1.5} />
            </motion.div>
            <motion.div
                style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid rgba(165, 180, 252, 0.3)' }}
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </div>
    );
}
