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
import { BentoGridShowcase } from "./ui/bento-product-features";
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

function NeuraBentoSlot({ item }: { item: (typeof enablesList)[number] }) {
    const Icon = item.icon;
    return (
        <div className="ns-bento-card ns-bento-card-cell" style={{ "--item-color": item.color } as React.CSSProperties}>
            <div className="ns-stack-icon ns-stack-icon-tint">
                <Icon size={22} />
            </div>
            <div className="ns-stack-text">
                <h3 className="ns-stack-title">{item.title}</h3>
                <p className="ns-stack-desc">{item.desc}</p>
            </div>
        </div>
    );
}

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
                        className="ns-title-wrapper"
                    >
                        <div className="ns-header-main">
                            <h2 className="ns-mega-title-v2">
                                NEURA — <br />
                                <span className="text-glow">THE INTELLIGENCE LAYER</span>
                            </h2>
                            <p className="ns-mega-subtitle-v2">
                                The Intelligence Behind Our Execution
                            </p>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ marginTop: "4rem" }}
                        className="ns-intro-text"
                    >
                        Neura is not software you manage. <br />
                        It is intelligence embedded into how work happens.
                    </motion.p>
                </header>

                {/* Bento grid: Predictive (tall left) + 5 capabilities (raw CSS, all bordered, images) */}
                <div className="ns-content">
                    <p className="ns-content-intro">Neura enables our teams to:</p>
                    <BentoGridShowcase
                        integration={
                            <div className="ns-bento-card ns-bento-card-hero">
                                <div className="ns-bento-hero-bg" aria-hidden="true" />
                                <div className="ns-stack-icon ns-stack-icon-blue">
                                    <BrainCircuit size={24} />
                                </div>
                                <div className="ns-stack-text">
                                    <h3 className="ns-stack-title">Predictive, not reactive.</h3>
                                    <p className="ns-stack-desc">Neura sees the problems before they impact your bottom line.</p>
                                </div>
                            </div>
                        }
                        trackers={<NeuraBentoSlot item={enablesList[0]} />}
                        statistic={<NeuraBentoSlot item={enablesList[1]} />}
                        focus={<NeuraBentoSlot item={enablesList[2]} />}
                        productivity={<NeuraBentoSlot item={enablesList[3]} />}
                        shortcuts={<NeuraBentoSlot item={enablesList[4]} />}
                    />
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
                                        <item.icon size={22} className="ns-supports-list-icon-svg" />
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
                        style={{ marginBottom: '5rem' }}
                    >
                        <div className="ns-circle-wrapper">
                            <CircularCommandMenu
                                items={supportsList.map(item => ({
                                    id: item.text.toLowerCase().replace(/\s+/g, '-'),
                                    icon: <item.icon className="ns-circle-menu-item-icon" />,
                                    label: item.text,
                                    onClick: () => { }
                                }))}
                                trigger={
                                    <img
                                        src="/images/Logo-White-Icon.svg"
                                        alt=""
                                        className="ns-circle-menu-trigger-img"
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="ns-footer-banner"
                >
                    <div className="ns-footer-inner">
                        <div className="ns-footer-head">
                            <p className="ns-footer-eyebrow">Technology with purpose</p>
                            <h3 className="ns-footer-title">Perform at your best.</h3>
                        </div>
                        <div className="ns-footer-quote-wrap">
                            <p className="ns-footer-quote">
                                &ldquo;Technology exists here for one reason: to help people perform at their best, consistently and at scale.&rdquo;
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
                    margin-bottom: 6rem;
                    padding: 0 64px;
                }

                .ns-title-wrapper {
                    margin-bottom: 12rem;
                }

                .ns-header-main {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .ns-mega-title-v2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(3rem, 10vw, 110px);
                    line-height: 0.95;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    text-transform: uppercase;
                    color: #ffffff;
                    margin: 0;
                    padding: 0;
                }

                .ns-mega-title-v2 span.text-glow {
                    background: linear-gradient(180deg, #ffffff 30%, #3b82f6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .ns-mega-subtitle-v2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(1.25rem, 3vw, 2rem);
                    font-weight: 300;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    margin: 0;
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
                    margin-bottom: 0;
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

                /* Bento slot cards - content centered (main styles in globals.css #neura-intelligence) */
                .ns-bento-card {
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .ns-bento-card-cell {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    position: relative;
                    overflow: hidden;
                }

                /* Frosty noise texture overlay */
                /* Frosty noise texture overlay - actual div element */
                .ns-frosty-overlay {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(600px circle at 50% 50%, rgba(79, 156, 249, 0.25) 0%, transparent 60%),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
                    background-size: cover, 200px 200px;
                    mix-blend-mode: screen;
                    opacity: 0.7;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: inherit;
                }

                .ns-bento-card-cell .ns-stack-icon,
                .ns-bento-card-cell .ns-stack-text {
                    position: relative;
                    z-index: 2;
                }

                /* Hero (Predictive) card: fill empty space with subtle image */
                .ns-bento-card-hero {
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    position: relative;
                    overflow: hidden;
                }

                .ns-bento-card-hero .ns-frosty-overlay {
                    background: 
                        radial-gradient(600px circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
                    opacity: 0.8;
                }


                .ns-bento-hero-bg {
                    position: absolute;
                    inset: 0;
                    background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.15;
                    pointer-events: none;
                }

                .ns-bento-card-hero .ns-stack-icon,
                .ns-bento-card-hero .ns-stack-text {
                    position: relative;
                    z-index: 1;
                }

                .ns-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .ns-stack-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    padding: 1.5rem 1.75rem;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    font-family: 'Outfit', sans-serif;
                }

                .ns-stack-icon {
                    flex-shrink: 0;
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ns-stack-icon-blue {
                    background: rgba(59, 130, 246, 0.2);
                    color: #93c5fd;
                }

                .ns-stack-icon-tint {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--item-color);
                }

                .ns-stack-text {
                    flex: 1;
                    min-width: 0;
                }

                .ns-stack-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 0.35rem 0;
                    letter-spacing: -0.01em;
                }

                .ns-stack-desc {
                    font-size: 0.9375rem;
                    color: #94a3b8;
                    line-height: 1.5;
                    margin: 0;
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
                    padding: 0;
                    margin: -1rem 0 2rem 0;
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

                .ns-circle-menu-trigger-img {
                    width: 2.5rem;
                    height: 2.5rem;
                    object-fit: contain;
                }

                .ns-circle-menu-item-icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    display: block;
                }

                .ns-supports-list-icon-svg {
                    color: #60a5fa;
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

                /* Footer banner – generous padding, balanced two-column */
                .ns-footer-banner {
                    position: relative;
                    z-index: 20;
                    margin: 4rem;
                    padding: 5rem 4rem 6rem;
                }

                .ns-footer-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    gap: 3rem;
                    max-width: 1250px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .ns-footer-head {
                    flex: 1;
                    min-width: 0;
                    padding: 1.5rem 0 1rem;
                }

                .ns-footer-eyebrow {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 700;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: #ffffff;
                    margin: 0 0 1.5rem 0;
                }

                .ns-footer-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                    color: #ffffff;
                    margin: 0;
                }

                .ns-footer-quote-wrap {
                    flex: 1;
                    min-width: 0;
                    padding: 2.5rem 0 1rem;
                    padding-left: 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.25);
                }

                .ns-footer-quote {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
                    font-weight: 500;
                    font-style: normal;
                    line-height: 1.75;
                    letter-spacing: 0.02em;
                    color: #ffffff;
                    margin: 0;
                    max-width: 32em;
                    padding: 0 0.5rem 0 0;
                }

                @media (min-width: 1024px) {
                    .ns-footer-inner {
                        flex-direction: row;
                        align-items: center;
                        gap: 4rem;
                        padding: 0 2rem;
                    }
                    .ns-footer-head {
                        padding: 2rem 2rem 2rem 0;
                    }
                    .ns-footer-quote-wrap {
                        padding: 2rem 0 2rem 2.5rem;
                        border-top: none;
                        border-left: 3px solid rgba(255, 255, 255, 0.3);
                    }
                    .ns-footer-quote {
                        max-width: 22em;
                        padding: 1rem 2rem 1rem 0;
                        line-height: 1.8;
                    }
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
                    .ns-footer-banner {
                        margin: 2rem;
                        padding: 4rem 1.5rem 5rem;
                    }
                    .ns-footer-inner {
                        padding: 0 0.5rem;
                    }
                    .ns-footer-quote {
                        padding: 0 0.25rem 0 0;
                    }
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
