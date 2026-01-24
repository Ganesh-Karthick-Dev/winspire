"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Quote, Activity, Shield, Users, Eye, Zap } from "lucide-react";
import SectionTitle from "./ui/section-title";

export default function OutcomesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const outcomes = [
        {
            text: "Faster, more predictable cash flow",
            icon: Zap,
            stat: "30%",
            statLabel: "Faster Cycle"
        },
        {
            text: "Fewer denials and stronger first-pass performance",
            icon: Shield,
            stat: "98%",
            statLabel: "Clean Claims"
        },
        {
            text: "Lower cost to collect without staff dependency",
            icon: Users,
            stat: "-25%",
            statLabel: "OpEx Reduction"
        },
        {
            text: "Transparent oversight across every department",
            icon: Eye,
            stat: "100%",
            statLabel: "Visibility"
        },
        {
            text: "Decisions guided by intelligence—not guesswork",
            icon: Activity,
            stat: "AI",
            statLabel: "Driven Insights"
        }
    ];

    const testimonials = [
        {
            quote: "For the first time, our revenue cycle feels predictable and under control.",
            author: "CFO, Specialty Practice"
        },
        {
            quote: "Winspire redesigned how we operate—not just our numbers.",
            author: "CEO, Healthcare Network"
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
                        align="center"
                        textColor="text-white"
                        subtitleSize="text-sm md:text-base tracking-[0.3em] font-bold text-blue-400 uppercase"
                        disableShadow={true}
                    />
                </div>

                {/* 3D Grid Layout */}
                <div className="outcomes-grid">
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
                                            <span className="stat-value">{item.stat}</span>
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

                {/* Testimonials & CTA Section */}
                <div className="proof-footer">
                    <div className="testimonials-row">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-simple">
                                <p className="t-quote">"{t.quote}"</p>
                                <p className="t-author">— {t.author}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cta-container">
                        <button className="premium-cta group">
                            <span className="cta-text">Read Client Stories</span>
                            <ArrowRight size={20} className="cta-arrow" />
                        </button>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .outcomes-section {
                    position: relative;
                    padding: 8rem 2rem;
                    background: transparent;
                    perspective: 2000px; /* Enable 3D space */
                }

                .outcomes-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .outcomes-header {
                    margin-bottom: 6rem;
                    text-align: center;
                }

                /* 3D Grid */
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 6rem;
                    perspective: 1000px;
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

                .stat-value {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(to right, #60a5fa, #a5b4fc);
                    -webkit-background-clip: text;
                    color: transparent;
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
                }

                .testimonials-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 3rem;
                    text-align: center;
                }

                .testimonial-simple {
                    max-width: 500px;
                }

                .t-quote {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #e2e8f0;
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .t-author {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #60a5fa;
                    font-weight: 700;
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
