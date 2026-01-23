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
                            >
                                <div className="mr-icon-box" style={{ color: item.color, backgroundColor: `${item.color}15` }}>
                                    <item.icon size={24} />
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
                    /* padding: 6rem 48px; REMOVED padding here */
                    padding-top: 6rem;
                    background: rgba(15, 23, 42, 0.9); /* Dark frosted glass */
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                /* Header Styling */
                .mr-header {
                    text-align: left;
                    margin-bottom: 4rem;
                    padding-left: 48px;
                    padding-right: 48px;
                }

                .title-container {
                    margin-bottom: 3.5rem;
                }

                .mr-intro-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .mr-intro-text p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    line-height: 1.5;
                    color: #cbd5e1;
                    margin: 0;
                }

                .mr-intro-text strong {
                    color: #ffffff;
                }

                .mr-risk-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    background: rgba(244, 63, 94, 0.1);
                    border: 1px solid rgba(244, 63, 94, 0.2);
                    border-radius: 16px;
                }

                .mr-alert-icon {
                    color: #f43f5e;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .mr-risk-alert p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    line-height: 1.5;
                    color: #e2e8f0;
                    margin: 0;
                }

                .mr-risk-alert strong {
                    color: #ffffff;
                }

                /* Body Content Styling */
                .mr-content-body {
                    margin-bottom: 6rem;
                    padding-left: 48px;
                    padding-right: 48px;
                    flex: 1; /* Pushes footer down if content is short */
                }

                .mr-body-intro {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #94a3b8;
                    margin-bottom: 2.5rem;
                    font-weight: 500;
                }

                .mr-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }

                .mr-item {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }

                .mr-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-4px);
                }

                .mr-icon-box {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .mr-item-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                }

                .mr-item-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    color: #94a3b8;
                    line-height: 1.5;
                    margin: 0;
                }

                /* CTA Banner Styling */
                .mr-cta-banner {
                    background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%) !important;
                    border-radius: 0;
                    padding: 12rem 48px !important; /* Force padding application */
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.05);
                    z-index: 20;
                    width: 100%;
                    border-top: 1px solid rgba(0, 0, 0, 0.03);
                }

                .mr-cta-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 6rem;
                    position: relative;
                    z-index: 10;
                    max-width: 1200px; /* Constrained width */
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 2rem; /* Inner breathing room */
                }

                .mr-cta-text-group {
                    max-width: 600px;
                }

                .mr-cta-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #64748b;
                    margin-bottom: 0; /* No space between */
                    font-weight: 700;
                    display: block;
                    line-height: 1.2;
                }

                .mr-cta-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(3rem, 6vw, 4rem);
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                    line-height: 1; /* Tight line height */
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
