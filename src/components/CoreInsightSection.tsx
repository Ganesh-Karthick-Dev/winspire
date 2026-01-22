"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SectionTitle from "./ui/section-title";
import { Target, Layers, Zap, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const systemPillars = [
    { name: "Revenue Protection & Yield Improvement", range: "20–25%" },
    { name: "Speed, Throughput & Operational Efficiency", range: "18–22%" },
    { name: "Leadership Visibility & Control", range: "10–12%" },
    { name: "People Performance & Quality at Scale", range: "15–18%" },
    { name: "Culture, Alignment & Continuous Improvement", range: "5–8%" },
];

const successPillars = [
    {
        icon: Target,
        action: "Defining clear",
        label: "OUTCOMES",
        color: "#22c55e" // green
    },
    {
        icon: Layers,
        action: "Designing the right",
        label: "STRUCTURE",
        color: "#3b82f6" // blue
    },
    {
        icon: Zap,
        action: "Executing disciplined",
        label: "STRATEGIES",
        color: "#a855f7" // purple
    },
];

export default function CoreInsightSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".ci-animate").forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="core-insight" className="ci-section">
            <div className="ci-wrapper">
                {/* Title - Full Width Top */}
                <header className="ci-title ci-animate">
                    <SectionTitle
                        title="RCM Is Not Improved by Working Harder."
                        subtitle="It Is Improved by Designing It Right."
                        align="left"
                        subtitleSize="text-lg md:text-xl"
                    />
                </header>

                {/* Content Grid - Two Columns */}
                <div className="ci-content">
                    {/* Column 1 */}
                    <div className="ci-col ci-animate">
                        <p className="ci-para">
                            Most revenue cycles don't break because teams aren't working hard.
                            <strong> They break because leadership is forced to manage activity instead of outcomes.</strong>
                        </p>
                        <p className="ci-para">
                            Effective revenue performance is determined long before work begins—by how
                            <strong> accountability</strong>, <strong>intelligence</strong>, and <strong>execution</strong> are designed upfront.
                        </p>

                        {/* Success Pillars - Cards with Icons */}
                        <div className="ci-pillars-section">
                            <span className="ci-pillars-label">True success comes from:</span>
                            <div className="ci-pillars-grid">
                                {successPillars.map((pillar, idx) => (
                                    <div key={idx} className="ci-pillar-card">
                                        <div className="ci-pillar-icon" style={{ backgroundColor: `${pillar.color}20`, borderColor: `${pillar.color}40` }}>
                                            <pillar.icon size={20} style={{ color: pillar.color }} />
                                        </div>
                                        <div className="ci-pillar-text">
                                            <span className="ci-pillar-action">{pillar.action}</span>
                                            <strong className="ci-pillar-name">{pillar.label}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quote with Icon */}
                        <div className="ci-quote-box">
                            <div className="ci-quote-icon">
                                <AlertTriangle size={20} />
                            </div>
                            <div className="ci-quote-content">
                                <p>In today's RCM environments, one of these is almost always missing or misaligned.</p>
                                <p className="ci-quote-emphasis">Teams stay busy. Results stay reactive.</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="ci-col ci-animate">
                        <h3 className="ci-stats-title">What Happens When the System Is Designed Correctly</h3>
                        <p className="ci-stats-intro">
                            Our partners typically achieve <strong>60–70%</strong> efficiency improvement
                            within <strong>60–90 days</strong>, driven by:
                        </p>
                        <ul className="ci-stats-list">
                            {systemPillars.map((pillar, idx) => (
                                <li key={idx}>
                                    <span>{pillar.name}</span>
                                    <strong>{pillar.range}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="ci-closing">
                            Winspire redesigns revenue outcomes across <strong>people</strong>, <strong>process</strong>, and <strong>intelligence</strong>—so performance becomes repeatable, not heroic.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
