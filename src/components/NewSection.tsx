"use client";

import React, { useEffect, useRef } from "react";
import SectionTitle from "./ui/section-title";
import { Users, Cpu, LineChart, ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Users,
        title: "Deep RCM Expertise",
        description: "Expertise across complex healthcare environments, ensuring every claim is handled with precision.",
        color: "#22c55e"
    },
    {
        icon: Cpu,
        title: "Intelligent Systems",
        description: "Advanced technology that removes friction and guesswork, automating routine tasks for speed.",
        color: "#3b82f6"
    },
    {
        icon: LineChart,
        title: "Real-Time Insight",
        description: "Operational visibility that leaders can trust, providing data-driven confidence in every decision.",
        color: "#a855f7"
    }
];

export default function NewSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(".ns-header-animate",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".ns-header",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Features Animation
            gsap.fromTo(".ns-feature-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".ns-features-grid",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Bottom Content Animation
            gsap.fromTo(".ns-bottom-animate",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".ns-cta-banner",
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="why-winspire" className="ns-section">
            <div className="ns-wrapper">
                {/* Header Section */}
                <header className="ns-header">
                    <div className="ns-header-animate title-container">
                        <SectionTitle
                            title="WHY WINSPIRE"
                            subtitle="Your Extended Revenue Team. Designed for Reliability."
                            align="left"
                            textColor="!text-black"
                            subtitleSize="text-lg md:text-xl"
                            disableShadow={true}
                        />
                    </div>

                    <div className="ns-intro-grid ns-header-animate">
                        <div className="ns-intro-item">
                            <div className="ns-check-icon"><CheckCircle2 size={20} /></div>
                            <p>Your clinicians focus on <strong>care</strong>.</p>
                        </div>
                        <div className="ns-intro-item">
                            <div className="ns-check-icon"><CheckCircle2 size={20} /></div>
                            <p>Your leadership focuses on <strong>vision and growth</strong>.</p>
                        </div>
                    </div>

                    <p className="ns-main-desc ns-header-animate">
                        We operate your revenue cycle with discipline, accountability, and real-time visibility—so revenue becomes <strong>predictable instead of stressful</strong>.
                    </p>
                </header>

                {/* Content Body - Modern Feature List */}
                <div className="ns-content-body ns-header-animate">
                    <p className="ns-body-intro">
                        Winspire functions as your internal revenue capability, powered by:
                    </p>

                    <div className="ns-modern-grid">
                        {/* Item 1 */}
                        <div className="ns-modern-item">
                            <div className="ns-icon-box blue">
                                <Users size={24} />
                            </div>
                            <p className="ns-item-text">
                                Deep RCM expertise across complex healthcare environments
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="ns-modern-item">
                            <div className="ns-icon-box purple">
                                <Cpu size={24} />
                            </div>
                            <p className="ns-item-text">
                                Intelligent systems that remove friction and guesswork
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="ns-modern-item">
                            <div className="ns-icon-box green">
                                <LineChart size={24} />
                            </div>
                            <p className="ns-item-text">
                                Real-time operational insight leaders can trust
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conclusion & CTA - Blue Banner Redesign */}
                <div className="ns-cta-banner ns-bottom-animate">
                    {/* Left Geometric Pattern */}
                    <div className="ns-geo-pattern pattern-left">
                        <div className="ns-geo-square s1"></div>
                        <div className="ns-geo-square s2"></div>
                        <div className="ns-geo-square s3"></div>
                        <div className="ns-geo-square s4"></div>
                        <div className="ns-geo-square s5"></div>
                    </div>

                    {/* Right Geometric Pattern */}
                    <div className="ns-geo-pattern pattern-right">
                        <div className="ns-geo-square s1"></div>
                        <div className="ns-geo-square s2"></div>
                        <div className="ns-geo-square s3"></div>
                        <div className="ns-geo-square s4"></div>
                        <div className="ns-geo-square s5"></div>
                    </div>

                    <div className="ns-cta-content">
                        <h3 className="ns-cta-title">The result is not more effort.</h3>
                        <p className="ns-cta-text">
                            It’s <strong>control, predictability, and confidence</strong>—day after day.
                        </p>

                        <button className="ns-cta-button-white mt-8">
                            <span>Explore How We Work</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ns-section {
                    padding: 8rem 0;
                    background: transparent; /* Transparent to show page background through the card */
                    position: relative;
                    z-index: 30;
                }

                .ns-wrapper {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 6rem 48px;
                    background: rgba(255, 255, 255, 0.85); /* Transparent white */
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }

                /* Header Styling */
                .ns-header {
                    text-align: left;
                    margin-bottom: 3rem;
                    max-width: 800px;
                }

                .ns-header-animate.title-container {
                    margin-bottom: 3rem;
                }

                .ns-intro-grid {
                    display: flex;
                    justify-content: flex-start;
                    gap: 3rem;
                    margin-bottom: 2.5rem;
                    flex-wrap: wrap;
                }

                .ns-intro-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 500;
                }

                .ns-intro-item p {
                    color: #000000 !important;
                    margin: 0;
                }

                .ns-intro-item strong {
                    color: #000000 !important;
                }

                .ns-check-icon {
                    color: #22c55e;
                    display: flex;
                    align-items: center;
                }

                .ns-main-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    line-height: 1.6;
                    color: #000000;
                    max-width: 900px;
                }

                .ns-main-desc strong {
                    color: #000000;
                    font-weight: 700;
                }

                /* Body Content Styling */
                .ns-content-body {
                    margin-bottom: 6rem;
                    width: 100%;
                }

                .ns-body-intro {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #000000;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .ns-modern-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .ns-modern-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    background: #f8fafc;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .ns-modern-item:hover {
                    background: #ffffff;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    border-color: #cbd5e1;
                    transform: translateY(-2px);
                }

                .ns-icon-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .ns-icon-box.blue {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                }

                .ns-icon-box.purple {
                    background: rgba(168, 85, 247, 0.1);
                    color: #a855f7;
                }

                .ns-icon-box.green {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                }

                .ns-item-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #0f172a;
                    line-height: 1.5;
                    font-weight: 500;
                    margin: 0;
                    padding-top: 2px;
                }

                /* CTA Banner Styling */
                .ns-cta-banner {
                    position: relative;
                    width: 100%;
                    background: #3b82f6;
                    border-radius: 24px;
                    padding: 5rem 2rem;
                    text-align: center;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                /* Geometric Patterns */
                .ns-geo-pattern {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 500px;
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }

                .pattern-left {
                    left: -250px;
                }

                .pattern-right {
                    right: -250px;
                }

                .ns-geo-square {
                    position: absolute;
                    border-radius: 40px;
                    border: 1.5px solid rgba(255, 255, 255, 0.15);
                    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
                }

                .s1 { width: 100%; height: 100%; background: rgba(255, 255, 255, 0.03); }
                .s2 { width: 80%; height: 80%; background: rgba(255, 255, 255, 0.05); }
                .s3 { width: 60%; height: 60%; background: rgba(255, 255, 255, 0.08); }
                .s4 { width: 40%; height: 40%; background: rgba(255, 255, 255, 0.12); }
                .s5 { width: 20%; height: 20%; background: rgba(255, 255, 255, 0.18); }

                .ns-cta-content {
                    position: relative;
                    z-index: 10;
                    max-width: 700px;
                }

                .ns-cta-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(2rem, 5vw, 2.5rem);
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .ns-cta-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 0;
                    line-height: 1.6;
                }

                .ns-cta-text strong {
                    color: #ffffff;
                    font-weight: 600;
                }

                .ns-cta-button-white {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: #ffffff;
                    color: #0f172a;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .ns-cta-button-white:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    background: #f8fafc;
                }

                @media (max-width: 768px) {
                    .ns-section {
                        padding: 5rem 0;
                    }
                    
                    .ns-wrapper {
                        padding: 2.5rem 24px 2.5rem;
                    }

                    .ns-header {
                        padding-top: 0.5rem;
                    }

                    .ns-header-animate.title-container {
                        margin-bottom: 2rem;
                    }

                    .ns-intro-grid {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }

                    .ns-content-body {
                        margin-bottom: 3rem;
                    }

                    .ns-modern-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    /* CTA banner: one centered block on mobile, no side boxy patterns */
                    .ns-cta-banner {
                        padding: 3rem 1.5rem 3rem;
                        border-radius: 16px;
                    }

                    .ns-geo-pattern {
                        display: none;
                    }

                    .ns-cta-content {
                        padding: 0.5rem 0;
                        width: 100%;
                        max-width: 100%;
                    }

                    .ns-cta-title {
                        margin-top: 0;
                        margin-bottom: 1rem;
                        font-size: clamp(1.5rem, 5vw, 2rem);
                    }

                    .ns-cta-text {
                        margin-bottom: 1.5rem;
                        font-size: 1.1rem;
                    }

                    .ns-cta-button-white {
                        min-height: 48px;
                        padding: 1rem 1.5rem;
                        font-size: 1rem;
                    }
                    
                    .pattern-left { left: -200px; }
                    .pattern-right { right: -200px; }
                }

                @media (max-width: 480px) {
                    .ns-wrapper {
                        padding: 2rem 1rem 2rem;
                    }

                    .ns-cta-banner {
                        padding: 2.5rem 1.25rem 2.5rem;
                    }

                    .ns-cta-title {
                        font-size: clamp(1.35rem, 4.5vw, 1.75rem);
                    }

                    .ns-cta-button-white {
                        width: 100%;
                        justify-content: center;
                        min-height: 52px;
                    }
                }
            `}</style>
        </section>
    );
}
