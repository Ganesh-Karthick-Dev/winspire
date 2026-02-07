"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./ui/section-title";
import { ArrowRight, TrendingDown, Clock, ShieldAlert, UserX, BarChart3, AlertCircle, UserMinus } from "lucide-react";

const consequences = [
    {
        icon: ShieldAlert,
        title: "Preventable Denials",
        desc: "Revenue lost to simple administrative errors.",
        color: "#ef4444",
        animClass: "mr-anim-alert"
    },
    {
        icon: Clock,
        title: "Missed Windows",
        desc: "Appeal deadlines that pass without action.",
        color: "#f97316",
        animClass: "mr-anim-clock"
    },
    {
        icon: TrendingDown,
        title: "AR Aging",
        desc: "Cash flow trapped in uncollectible buckets.",
        color: "#f59e0b",
        animClass: "mr-anim-sink"
    },
    {
        icon: UserX,
        title: "Patient Friction",
        desc: "Billing errors that erode trust and satisfaction.",
        color: "#f43f5e",
        animClass: "mr-anim-friction"
    },
    {
        icon: BarChart3,
        title: "Market Lag",
        desc: "Falling behind automated, efficient competitors.",
        color: "#fb7185",
        animClass: "mr-anim-lag"
    },
    {
        icon: UserMinus,
        title: "Client Attrition",
        desc: "Silent revenue erosion from lost provider trust.",
        color: "#ff3366",
        animClass: "mr-anim-attrition"
    }
];

import { useIconDraw } from "@/hooks/useIconDraw";

// ... existing imports

export default function MarketRealitySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const iconsRef = useIconDraw({ stagger: 0.05, start: "top 80%" });

    return (
        <section ref={sectionRef} id="market-reality" className="mr-section">
            <div className="mr-wrapper">
                {/* Header Section */}
                <header className="mr-header-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mr-title-wrapper"
                    >
                        <SectionTitle
                            title="Why Waiting Is Quietly Costing Your Revenue"
                            subtitle="The Cost of Operating RCM the Old Way"
                            align="left"
                            textColor="text-white"
                            subtitleSize="text-2xl md:text-3xl lg:text-4xl"
                            disableShadow={false}
                            shadowColor="rgba(244, 63, 94,"
                        />
                    </motion.div>

                    <div className="mr-header-content">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mr-truths"
                        >
                            <p className="mr-truth-p">
                                Healthcare reimbursement has changed. Payers are <span className="mr-highlight">automated</span>. Administrative costs continue to rise.
                                <span className="mr-truth-sub">Workflows remain fragmented.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mr-risk-card"
                        >
                            <div className="mr-risk-glow" />
                            <div className="mr-risk-header">
                                <div className="mr-risk-icon-box">
                                    <AlertCircle size={28} />
                                </div>
                                <span className="mr-risk-label">Critical Risk Area</span>
                            </div>
                            <p className="mr-risk-text">
                                Delays and denials don’t announce themselves. They <span className="mr-risk-highlight">compound quietly</span>—until cash flow tightens.
                            </p>
                        </motion.div>
                    </div>
                </header>

                {/* Consequences Grid */}
                <div className="mr-content-interior">
                    <div className="mr-leads-to-container">
                        <p className="mr-leads-to-text">Every day without clarity leads to:</p>
                        <div className="mr-leads-to-line" />
                    </div>

                    <div className="mr-consequence-grid" ref={iconsRef}>
                        {consequences.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="mr-glass-card"
                                style={{ '--item-color': item.color } as React.CSSProperties}
                            >


                                <div className={`mr-card-icon-prism ${item.animClass}`}>
                                    <item.icon size={28} />
                                </div>

                                <div className="mr-card-body">
                                    <h4 className="mr-card-title">{item.title}</h4>
                                    <p className="mr-card-desc">{item.desc}</p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="mr-card-accent-line" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Conclusion & CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 m-4 md:m-8 bg-white shadow-2xl overflow-hidden"
                    style={{ padding: "4rem 4rem" }}
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 max-w-[1250px] mx-auto w-full text-center lg:text-left">
                        <div className="max-w-[600px] flex-1">
                            <p className="font-outfit text-sm md:text-base uppercase tracking-[0.3em] !text-rose-500 font-bold mb-6 block leading-tight">Delay doesn’t preserve stability.</p>
                            <h3 className="font-outfit text-[3.5rem] md:text-[4.5rem] font-extrabold !text-slate-900 m-0 leading-[1.1] tracking-tighter">It erodes it.</h3>
                        </div>
                        <button
                            className="flex items-center justify-center gap-5 bg-rose-500 text-white font-outfit text-xl md:text-2xl font-bold rounded-[20px] transition-all hover:scale-105 hover:shadow-xl shadow-lg border-none cursor-pointer shrink-0 w-full md:w-auto min-w-fit whitespace-nowrap"
                            style={{ padding: "24px 48px" }}
                        >
                            <span className="relative top-[1px]">See Where Revenue Is Leaking</span>
                            <div className="mr-cta-arrow">
                                <ArrowRight size={24} strokeWidth={2.5} />
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .mr-section {
                    padding: 8rem 0;
                    background: transparent;
                    position: relative;
                    z-index: 30;
                }

                .mr-wrapper {
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
                    display: flex;
                    flex-direction: column;
                }

                /* Layout Containers */
                .mr-header-container {
                    padding: 0 64px;
                    margin-bottom: 6rem;
                    text-align: left;
                }

                .mr-title-wrapper {
                    margin-bottom: 12rem;
                }

                .mr-header-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    gap: 6rem;
                    margin-top: 4rem;
                }

                /* Truth Statements */
                .mr-truths {
                    flex: 1.4;
                }

                .mr-truth-p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2.75rem;
                    line-height: 1.25;
                    font-weight: 600;
                    color: #f1f5f9;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .mr-highlight {
                    color: #ffffff;
                    font-weight: 700;
                }

                .mr-truth-sub {
                    display: block;
                    margin-top: 1.5rem;
                    color: #fb7185;
                    font-weight: 700;
                    font-style: italic;
                }

                /* Risk Card Styling */
                .mr-risk-card {
                    flex: 1;
                    position: relative;
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(244, 63, 94, 0.3);
                    border-radius: 28px;
                    padding: 40px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .mr-risk-glow {
                    position: absolute;
                    top: -40px;
                    right: -40px;
                    width: 160px;
                    height: 160px;
                    background: rgba(244, 63, 94, 0.12);
                    filter: blur(60px);
                    pointer-events: none;
                }

                .mr-risk-header {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 24px;
                }

                .mr-risk-icon-box {
                    color: #f43f5e;
                    background: rgba(244, 63, 94, 0.15);
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse 2s infinite ease-in-out;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .mr-risk-label {
                    color: #f43f5e;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 0.25em;
                    font-size: 0.875rem;
                }

                .mr-risk-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.45rem;
                    line-height: 1.6;
                    color: #e2e8f0;
                    margin: 0;
                }

                .mr-risk-highlight {
                    color: #ffffff;
                    font-weight: 600;
                    text-decoration: underline;
                    text-decoration-color: rgba(244, 63, 94, 0.4);
                    text-underline-offset: 6px;
                }

                /* Consequence Section Styling */
                .mr-content-interior {
                    padding: 0 64px;
                    margin-bottom: 8rem;
                }

                .mr-leads-to-container {
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                    margin-bottom: 4rem;
                }

                .mr-leads-to-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                    white-space: nowrap;
                }

                .mr-leads-to-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
                }

                /* Grid & Cards */
                .mr-consequence-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .mr-glass-card {
                    position: relative;
                    padding: 48px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 40px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    z-index: 1;
                }

                .mr-glass-card:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-10px);
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6);
                }



                .mr-card-icon-prism {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cbd5e1;
                    margin-bottom: 40px;
                    transition: all 0.5s ease;
                }

                /* Unique icon animations */
                .mr-anim-alert { animation: mr-alert 2s infinite ease-in-out; }
                .mr-anim-clock { animation: mr-clock 4s infinite linear; }
                .mr-anim-sink { animation: mr-sink 3s infinite ease-in-out; }
                .mr-anim-friction { animation: mr-friction 2.5s infinite ease-in-out; }
                .mr-anim-lag { animation: mr-lag 3s infinite ease-in-out; }
                .mr-anim-attrition { animation: mr-attrition 4s infinite ease-in-out; }

                @keyframes mr-alert {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.1); filter: brightness(1.3); }
                }

                @keyframes mr-clock {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(10deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(-10deg); }
                    100% { transform: rotate(0deg); }
                }

                @keyframes mr-sink {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(8px); }
                }

                @keyframes mr-friction {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(3px) rotate(2deg); }
                    75% { transform: translateX(-3px) rotate(-2deg); }
                }

                @keyframes mr-lag {
                    0%, 100% { transform: scaleX(1); opacity: 1; }
                    50% { transform: scaleX(0.85); opacity: 0.7; }
                }

                @keyframes mr-attrition {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.9); }
                }

                .mr-glass-card:hover .mr-card-icon-prism {
                    background: rgba(var(--item-color-rgb), 0.15);
                    border-color: var(--item-color);
                    color: var(--item-color);
                    transform: scale(1.1) rotate(5deg);
                    animation: none !important; /* Stop unique anim on hover */
                }

                .mr-card-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.625rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 12px;
                    transition: transform 0.3s ease;
                }

                .mr-glass-card:hover .mr-card-title {
                    transform: translateX(4px);
                }

                .mr-card-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.15rem;
                    line-height: 1.6;
                    color: #94a3b8;
                    margin: 0;
                }

                .mr-card-accent-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--item-color), transparent);
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }

                .mr-glass-card:hover .mr-card-accent-line {
                    opacity: 1;
                }

                /* CTA Animation */
                .mr-cta-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: hit-border 1s infinite alternate cubic-bezier(0.17, 0.67, 0.83, 0.67);
                }

                @keyframes hit-border {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(10px); }
                }

                @media (max-width: 1100px) {
                    .mr-header-content {
                        flex-direction: column;
                        gap: 3rem;
                    }
                    .mr-consequence-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .mr-section { padding: 4rem 0; }
                    .mr-header-container, .mr-content-interior { padding: 0 24px; }
                    .mr-truth-p { font-size: 2rem; }
                    .mr-risk-card { padding: 30px; }
                    .mr-risk-text { font-size: 1.25rem; }
                    .mr-consequence-grid { grid-template-columns: 1fr; }
                    .mr-glass-card { padding: 32px; }
                    .mr-title-wrapper { margin-bottom: 4rem; }
                }
            `}</style>
        </section>
    );
}
