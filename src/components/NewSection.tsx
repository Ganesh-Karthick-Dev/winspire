"use client";

import React, { useEffect, useRef } from "react";
import SectionTitle from "./ui/section-title";
import { TrendingUp, Shield, Lightbulb, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: TrendingUp,
        title: "Strategic Growth",
        description: "Drive sustainable revenue growth through data-driven insights and intelligent automation.",
        color: "#22c55e"
    },
    {
        icon: Shield,
        title: "Risk Mitigation",
        description: "Proactively identify and address compliance gaps before they impact your bottom line.",
        color: "#3b82f6"
    },
    {
        icon: Lightbulb,
        title: "Innovation at Scale",
        description: "Transform operations with cutting-edge AI solutions tailored to healthcare workflows.",
        color: "#a855f7"
    }
];


export default function NewSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".ns-animate").forEach((el, idx) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: idx * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="new-section" className="ns-section">
            <div className="ns-wrapper">
                {/* Section Header */}
                <header className="ns-header ns-animate">
                    <SectionTitle
                        title="Transforming Healthcare Financial Operations"
                        subtitle="A smarter approach to revenue cycle excellence."
                        align="center"
                        subtitleSize="text-lg md:text-xl"
                    />
                </header>

                {/* Features Grid */}
                <div className="ns-features-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="ns-feature-card ns-animate">
                            <div
                                className="ns-feature-icon"
                                style={{
                                    backgroundColor: `${feature.color}15`,
                                    borderColor: `${feature.color}30`
                                }}
                            >
                                <feature.icon size={28} style={{ color: feature.color }} />
                            </div>
                            <h3 className="ns-feature-title">{feature.title}</h3>
                            <p className="ns-feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Block */}
                <div className="ns-cta-block ns-animate">
                    <div className="ns-cta-content">
                        <h3 className="ns-cta-title">Ready to Transform Your Revenue Cycle?</h3>
                        <p className="ns-cta-text">
                            Discover how our AI-powered solutions can unlock predictable financial outcomes for your organization.
                        </p>
                    </div>
                    <button className="ns-cta-button">
                        <span>Get Started</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .ns-section {
                    padding: 6rem 0;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    position: relative;
                    z-index: 30;
                    overflow: hidden;
                }

                .ns-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .ns-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .ns-features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 4rem;
                }

                .ns-feature-card {
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 16px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
                }

                .ns-feature-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
                    border-color: rgba(0, 0, 0, 0.1);
                }

                .ns-feature-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid;
                    margin-bottom: 1.25rem;
                }

                .ns-feature-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 0.75rem;
                }

                .ns-feature-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #64748b;
                }

                .ns-cta-block {
                    background: linear-gradient(135deg, #083151 0%, #0a4d7a 100%);
                    border-radius: 20px;
                    padding: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .ns-cta-content {
                    flex: 1;
                    min-width: 280px;
                }

                .ns-cta-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                }

                .ns-cta-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                }

                .ns-cta-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #ffffff;
                    color: #083151;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .ns-cta-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                }

                @media (max-width: 768px) {
                    .ns-section {
                        padding: 4rem 0;
                    }

                    .ns-cta-block {
                        flex-direction: column;
                        text-align: center;
                        padding: 2rem;
                    }

                    .ns-cta-button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
}
