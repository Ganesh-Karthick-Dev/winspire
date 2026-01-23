"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./ui/section-title";
import {
    ShieldAlert,
    ListFilter,
    Zap,
    CheckCircle2,
    BarChart3,
    PieChart,
    LineChart,
    Users,
    ShieldCheck,
    Heart,
    Globe2,
    BrainCircuit,
} from "lucide-react";
import { CircularCommandMenu } from "./ui/circular-command-menu";

// Data for "Neura enables our teams to"
const enablesList = [
    {
        icon: ShieldAlert,
        title: "Risk Identification",
        desc: "Identify risk before it becomes revenue loss",
        color: "#ef4444"
    },
    {
        icon: ListFilter,
        title: "Work Prioritization",
        desc: "Prioritize the work that actually moves cash",
        color: "#f97316"
    },
    {
        icon: Zap,
        title: "Manual Effort Reduction",
        desc: "Eliminate repetitive manual effort",
        color: "#eab308"
    },
    {
        icon: CheckCircle2,
        title: "Quality Improvement",
        desc: "Improve quality without micromanagement",
        color: "#22c55e"
    },
    {
        icon: BarChart3,
        title: "Real-time Visibility",
        desc: "Give leaders a clear, real-time view of performance",
        color: "#3b82f6"
    }
];

// Data for "Neura supports"
const supportsList = [
    { text: "Revenue operations", icon: PieChart },
    { text: "Leadership insight and governance", icon: LineChart },
    { text: "Workforce enablement", icon: Users },
    { text: "Quality and compliance", icon: ShieldCheck },
    { text: "Culture and accountability", icon: Heart },
    { text: "Offshore execution—without risk", icon: Globe2 }
];

export default function NeuraSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="neura-intelligence" className="ns-section">
            <div className="ns-wrapper">
                {/* Header */}
                <header className="ns-header">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle
                            title="NEURA — THE INTELLIGENCE LAYER"
                            subtitle="The Intelligence Behind Our Execution"
                            align="left"
                            textColor="text-white"
                            subtitleSize="text-2xl md:text-3xl lg:text-4xl"
                            disableShadow={false}
                            shadowColor="rgba(59, 130, 246,"
                        />
                    </motion.div>

                    <div className="ns-intro-grid">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="ns-intro-text"
                        >
                            Neura is not software you manage. It is an <strong>embedded intelligence layer</strong> that powers how work gets done.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="ns-alert"
                        >
                            <div className="ns-alert-icon"><BrainCircuit size={24} /></div>
                            <p><strong>Predictive, not reactive.</strong> Neura sees the problems before they impact your bottom line.</p>
                        </motion.div>
                    </div>
                </header>

                {/* Enables Grid - Same style as MarketReality consequences */}
                <div className="ns-content">
                    <p className="ns-content-intro">Neura enables our teams to:</p>
                    <div className="ns-grid">
                        {enablesList.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="ns-item"
                                style={{ '--item-color': item.color } as React.CSSProperties}
                            >
                                <div className="ns-icon-box">
                                    <item.icon size={28} />
                                </div>
                                <div className="ns-item-content">
                                    <h4 className="ns-item-title">{item.title}</h4>
                                    <p className="ns-item-desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Supports - Minimal Inline Design */}
                {/* Supports - Circular Command Menu */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="ns-circle-menu-container"
                >
                    <div className="ns-circle-wrapper">
                        <CircularCommandMenu
                            items={supportsList.map(item => ({
                                id: item.text.toLowerCase().replace(/\s+/g, '-'),
                                icon: <item.icon className="w-6 h-6" />,
                                label: item.text,
                                onClick: () => { }
                            }))}
                            trigger={<BrainCircuit size={32} className="text-blue-400" />}
                            defaultOpen={true}
                            radius={180}
                            className="ns-circle-menu"
                        />
                    </div>
                </motion.div>

                {/* Footer Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="ns-cta-banner"
                >
                    <div className="ns-cta-content">
                        <div className="ns-cta-left">
                            <p className="ns-cta-label">Technology with purpose</p>
                            <h3 className="ns-cta-title">Perform at your best.</h3>
                        </div>
                        <p className="ns-cta-quote">
                            "Technology exists here for one reason: to help people perform at their best, consistently and at scale."
                        </p>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                /* SECTION - Matching MarketRealitySection exactly */
                .ns-section {
                    padding: 8rem 0;
                    background: transparent;
                    position: relative;
                    z-index: 30;
                    min-height: auto;
                    display: block;
                }

                .ns-wrapper {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding-top: 6rem;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 32px;
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
                    overflow: hidden;
                }

                /* Header */
                .ns-header {
                    text-align: left;
                    margin-bottom: 5rem;
                    padding: 0 64px;
                }

                .ns-intro-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 5rem;
                    align-items: center;
                    margin-top: 3.5rem;
                }

                .ns-intro-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    line-height: 1.6;
                    color: #cbd5e1;
                    margin: 0;
                }

                .ns-intro-text strong {
                    color: #ffffff;
                    font-weight: 600;
                }

                .ns-alert {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 1.5rem 2rem;
                    background: rgba(59, 130, 246, 0.08);
                    border: 1px solid rgba(59, 130, 246, 0.25);
                    border-radius: 100px;
                    backdrop-filter: blur(10px);
                }

                .ns-alert-icon {
                    color: #3b82f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(59, 130, 246, 0.2);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .ns-alert p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #bfdbfe;
                    margin: 0;
                }

                .ns-alert strong {
                    color: #ffffff;
                    font-weight: 600;
                }

                /* Content Body */
                .ns-content {
                    padding: 0 64px;
                    margin-bottom: 5rem;
                }

                .ns-supports-content {
                    margin-bottom: 8rem;
                }

                .ns-content-intro {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    color: #ffffff;
                    margin-bottom: 2rem;
                    font-weight: 600;
                }

                /* Grid - Same as MarketReality */
                .ns-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .ns-item {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 2.5rem;
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .ns-item:hover {
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }

                .ns-item::after { 
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--item-color), transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .ns-item:hover::after {
                    opacity: 1;
                }

                .ns-icon-box {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--item-color);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }
                
                .ns-item:hover .ns-icon-box {
                    transform: scale(1.1);
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--item-color);
                    box-shadow: 0 0 20px -5px var(--item-color);
                }

                .ns-item-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.75rem;
                }

                .ns-item-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Circular Menu Container */
                /* Circular Menu Container - Simplified Robust Layout */
                /* Circular Menu Container - Final Robust Spacing */
                /* Circular Menu Container - Natural Flow */
                .ns-circle-menu-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    /* No longer needing massive fixed heights or margins */
                    padding: 4rem 0;
                    margin: 2rem 0;
                    position: relative;
                    z-index: 10;
                    isolation: isolate;
                }
                
                .ns-circle-wrapper {
                   position: relative;
                   width: 100%;
                   height: 100%;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   /* No transform scale to avoid layout confusion */
                }

                /* CTA Banner - Premium Dark Redesign */
                .ns-cta-banner {
                    background: linear-gradient(to bottom, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    padding: 8rem 64px 12rem; /* Increased bottom padding */
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                }

                .ns-cta-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 10%;
                    right: 10%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
                }

                .ns-cta-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 6rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .ns-cta-left {
                    flex: 1;
                }

                .ns-cta-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    color: #3b82f6;
                    margin-bottom: 1.5rem; /* Increased space below label */
                    font-weight: 700;
                    display: block;
                }

                .ns-cta-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(3rem, 6vw, 4rem);
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                }

                .ns-cta-quote {
                    flex: 1.5;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem; /* Increased font size */
                    color: #cbd5e1;
                    line-height: 1.6;
                    font-style: italic;
                    padding-left: 5rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.15);
                    margin: 0;
                    position: relative;
                }
                
                .ns-cta-quote::before {
                    content: '"';
                    position: absolute;
                    left: 2rem;
                    top: -0.5rem;
                    font-size: 4rem;
                    color: rgba(59, 130, 246, 0.2);
                    font-family: serif;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .ns-intro-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .ns-cta-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .ns-cta-quote {
                        padding-left: 0;
                        border-left: none;
                        border-top: 2px solid #e2e8f0;
                        padding-top: 2rem;
                        text-align: center;
                    }
                }

                @media (max-width: 768px) {
                    .ns-header, .ns-content {
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .ns-supports-block {
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .ns-intro-text {
                        font-size: 1.25rem;
                    }
                    .ns-inline-item {
                        font-size: 1.1rem;
                    }
                    .ns-cta-banner {
                        padding: 4rem 24px;
                    }
                }
            `}</style>
        </section>
    );
}
