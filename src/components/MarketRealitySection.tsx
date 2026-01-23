"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./ui/section-title";
import { ArrowRight, TrendingDown, Clock, ShieldAlert, UserX, BarChart3, AlertCircle } from "lucide-react";

const consequences = [
    {
        icon: ShieldAlert,
        title: "Preventable Denials",
        desc: "Revenue lost to simple administrative errors.",
        color: "#ef4444"
    },
    {
        icon: Clock,
        title: "Missed Windows",
        desc: "Appeal deadlines that pass without action.",
        color: "#f97316"
    },
    {
        icon: TrendingDown,
        title: "AR Aging",
        desc: "Cash flow trapped in uncollectible buckets.",
        color: "#f59e0b"
    },
    {
        icon: UserX,
        title: "Patient Friction",
        desc: "Billing errors that erode trust and satisfaction.",
        color: "#f43f5e"
    },
    {
        icon: BarChart3,
        title: "Market Lag",
        desc: "Falling behind automated, efficient competitors.",
        color: "#fb7185"
    }
];

export default function MarketRealitySection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="market-reality" className="mr-section">
            <div className="mr-wrapper">
                {/* Header Section */}
                <header className="mr-header">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="title-container"
                    >
                        <SectionTitle
                            title="MARKET REALITY — COST OF WAITING"
                            subtitle="The Cost of Operating RCM the Old Way"
                            align="left"
                            textColor="text-white"
                            subtitleSize="text-2xl md:text-3xl lg:text-4xl"
                            disableShadow={false}
                            shadowColor="rgba(244, 63, 94,"
                        />
                    </motion.div>

                    <div className="mr-intro-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mr-intro-text"
                        >
                            <p>
                                Healthcare reimbursement has changed. Payers are automated. Administrative costs continue to rise.
                                <strong> Workflows remain fragmented.</strong>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mr-risk-alert"
                        >
                            <div className="mr-alert-icon"><AlertCircle size={24} /></div>
                            <p>Delays and denials don’t announce themselves. They <strong>compound quietly—until cash flow tightens</strong>.</p>
                        </motion.div>
                    </div>
                </header>

                {/* Consequences Grid */}
                <div className="mr-content-body">
                    <p className="mr-body-intro">Every day without clarity leads to:</p>

                    <div className="mr-grid">
                        {consequences.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="mr-item"
                                style={{ '--item-color': item.color } as React.CSSProperties}
                            >
                                <div className="mr-icon-box">
                                    <item.icon size={28} />
                                </div>
                                <div className="mr-item-content">
                                    <h4 className="mr-item-title">{item.title}</h4>
                                    <p className="mr-item-desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Conclusion & CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mr-cta-banner"
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '5rem 3rem'
                    }}
                >
                    <div className="mr-cta-content">
                        <div className="mr-cta-text-group">
                            <p className="mr-cta-label">Delay doesn’t preserve stability.</p>
                            <h3 className="mr-cta-title">It erodes it.</h3>
                        </div>
                        <button className="mr-cta-button">
                            <span>Stop Revenue Leakage</span>
                            <ArrowRight size={20} />
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

                
                /* Header Styling */
                .mr-header {
                    text-align: left;
                    margin-bottom: 5rem;
                    padding-left: 64px;
                    padding-right: 64px;
                }

                .title-container {
                    margin-bottom: 3.5rem;
                }

                .mr-intro-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 5rem;
                    align-items: center;
                }

                .mr-intro-text p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    line-height: 1.6;
                    color: #cbd5e1;
                    margin: 0;
                }

                .mr-intro-text strong {
                    color: #ffffff;
                    font-weight: 600;
                }

                .mr-risk-alert {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 1.5rem 2rem;
                    background: rgba(244, 63, 94, 0.08); /* More subtle red background */
                    border: 1px solid rgba(244, 63, 94, 0.25);
                    border-radius: 100px; /* Pill shape for modern look */
                    backdrop-filter: blur(10px);
                }

                .mr-alert-icon {
                    color: #f43f5e;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(244, 63, 94, 0.2);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .mr-risk-alert p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #ffdce5; /* Lighter text for contrast */
                    margin: 0;
                    font-weight: 400;
                }

                .mr-risk-alert strong {
                    color: #ffffff;
                    font-weight: 600;
                }

                /* Body Content Styling */
                .mr-content-body {
                    margin-bottom: 8rem;
                    padding-left: 64px;
                    padding-right: 64px;
                    flex: 1;
                }

                .mr-body-intro {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem; /* Larger intro */
                    color: #ffffff;
                    margin-bottom: 3rem;
                    font-weight: 600;
                }

                .mr-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Slightly wider cards */
                    gap: 2rem;
                }

                .mr-item {
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

                .mr-item:hover {
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }

                /* Colored line at top of card instead of glow */
                .mr-item::after { 
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

                .mr-item:hover::after {
                    opacity: 1;
                }

                .mr-icon-box {
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
                
                .mr-item:hover .mr-icon-box {
                    transform: scale(1.1);
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--item-color);
                    box-shadow: 0 0 20px -5px var(--item-color);
                }

                .mr-item-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.75rem;
                }

                .mr-item-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin: 0;
                }

                /* CTA Banner - Premium Dark Redesign */
                .mr-cta-banner {
                    background: linear-gradient(to bottom, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%) !important;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 0;
                    padding: 8rem 64px 12rem !important; /* Increased bottom padding */
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 20;
                    width: 100%;
                }

                .mr-cta-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 10%;
                    right: 10%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.5), transparent);
                }

                .mr-cta-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 6rem;
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                }

                .mr-cta-text-group {
                    max-width: 600px;
                }

                .mr-cta-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: #fb7185;
                    margin-bottom: 0.75rem;
                    font-weight: 700;
                    display: block;
                    line-height: 1.2;
                }

                .mr-cta-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(3rem, 6vw, 4rem);
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                }

                .mr-cta-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 1rem;
                    background: #f43f5e;
                    color: #ffffff;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 800;
                    padding: 1.25rem 2.5rem;
                    border-radius: 16px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    flex-shrink: 0;
                    box-shadow: 0 10px 30px rgba(244, 63, 94, 0.2);
                }

                .mr-cta-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 30px rgba(244, 63, 94, 0.4);
                }

                @media (max-width: 1024px) {
                    .mr-intro-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    
                    .mr-cta-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .mr-wrapper {
                        padding-top: 4rem; /* Mobile top padding */
                    }

                    .mr-header, .mr-content-body {
                        padding-left: 24px;
                        padding-right: 24px;
                    }

                    .mr-intro-text p {
                        font-size: 1.25rem;
                    }

                    .mr-cta-banner {
                        padding: 3rem 1.5rem;
                        margin-bottom: 0;
                        width: 100%;
                    }
                    
                    .mr-content-body {
                        margin-bottom: 0; /* Remove extra space above footer on mobile */
                    }

                    .mr-cta-button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
}
