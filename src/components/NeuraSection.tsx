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
import { useIsMobile } from "@/hooks/useIsMobile";

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
    const isMobile = useIsMobile();

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

                {/* Supports: desktop = circular menu, mobile = simple list */}
                {isMobile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="ns-supports-list-mobile"
                    >
                        <div className="ns-supports-list-inner">
                            {supportsList.map((item, index) => (
                                <div key={index} className="ns-supports-list-item">
                                    <div className="ns-supports-list-icon">
                                        <item.icon size={22} className="text-blue-400" />
                                    </div>
                                    <span className="ns-supports-list-label">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
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
                                trigger={
                                    <img
                                        src="/images/Logo-White-Icon.svg"
                                        alt=""
                                        className="w-10 h-10 object-contain"
                                        aria-hidden
                                    />
                                }
                                defaultOpen={true}
                                radius={180}
                                className="ns-circle-menu"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Footer Banner */}
                {/* Footer Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 m-4 md:m-8"
                    style={{ padding: "6rem 4rem" }}
                >
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-32 max-w-[1250px] mx-auto">
                        <div className="flex-1 min-w-[300px]">
                            <p className="font-outfit text-sm md:text-base uppercase tracking-[0.3em] text-blue-500 font-bold mb-6 block">Technology with purpose</p>
                            <h3 className="font-outfit text-[3.5rem] md:text-[4.5rem] font-extrabold text-white m-0 leading-[1.05] tracking-tight">Perform at your best.</h3>
                        </div>
                        <div className="flex-1 lg:pl-12 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-700 pt-8 lg:pt-0 relative mt-2 lg:mt-0">
                            <p className="font-outfit text-2xl md:text-3xl text-slate-300 italic leading-relaxed font-medium">
                                "Technology exists here for one reason: to help people perform at their best, consistently and at scale."
                            </p>
                        </div>
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

                /* Circular Menu Container - desktop only */
                .ns-circle-menu-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
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
                }

                /* Mobile: simple vertical list (no circular menu) */
                .ns-supports-list-mobile {
                    width: 100%;
                    padding: 2rem 0;
                    margin: 2rem 0;
                }

                .ns-supports-list-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    max-width: 100%;
                    padding: 0 1rem;
                }

                .ns-supports-list-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.25rem;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                }

                .ns-supports-list-icon {
                    flex-shrink: 0;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(59, 130, 246, 0.15);
                    border-radius: 10px;
                }

                .ns-supports-list-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #e2e8f0;
                }

                /* CTA Banner - Targeted Spacing & Visibility Redesign */
                /* Removed custom .ns-cta-banner styles in favor of Tailwind classes */

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
                    .ns-supports-list-inner {
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
