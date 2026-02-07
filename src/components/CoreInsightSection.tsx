"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), { ssr: false });
import SectionTitle from "./ui/section-title";
import { AlertTriangle } from "lucide-react";



/** Lottie animated icon URLs (free from LottieFiles) - replace with your own if needed */
const PILLAR_LOTTIE_URLS = {
    target: "/lottie-json/Target.json",
    layers: "/lottie-json/Stack Icon Animation.json",
    lightning: "/lottie-json/Lightning Lottie Animation.json",
    alert: "https://lottie.host/78370783-f8a4-4a4a-950e-360e7e974955/qQ6O5K9N0g.json",
};

const systemPillars = [
    { name: "Revenue Protection & Yield Improvement", range: "20–25%", minPercent: 20, maxPercent: 25 },
    { name: "Speed, Throughput & Operational Efficiency", range: "18–22%", minPercent: 18, maxPercent: 22 },
    { name: "Leadership Visibility & Control", range: "10–12%", minPercent: 10, maxPercent: 12 },
    { name: "People Performance & Quality at Scale", range: "15–18%", minPercent: 15, maxPercent: 18 },
    { name: "Culture, Alignment & Continuous Improvement", range: "5–8%", minPercent: 5, maxPercent: 8 },
    { name: "Efficiency gain", range: "60–70%", minPercent: 60, maxPercent: 70 },
];

const successPillars: Array<{
    lottieKey: keyof typeof PILLAR_LOTTIE_URLS;
    action: string;
    label: string;
    color: string;
}> = [
        { lottieKey: "target", action: "Defining clear", label: "OUTCOMES", color: "#ffffff" },
        { lottieKey: "layers", action: "Designing the right", label: "STRUCTURE", color: "#ffffff" },
        { lottieKey: "lightning", action: "Executing disciplined", label: "STRATEGIES", color: "#ffffff" },
    ];

export default function CoreInsightSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            // Existing animations
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

            // Pillar Cards Animation (Staggered Fade Up)
            gsap.fromTo(".ci-pillar-card",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".ci-pillars-grid",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Progress Bar Animation
            // Animate Base Bar
            gsap.fromTo(".ci-bar-base",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: ".ci-stats-list",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Animate Highlight Bar (with slight delay)
            gsap.fromTo(".ci-bar-highlight",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    stagger: 0.1,
                    delay: 0.2, // Start slightly after base
                    ease: "power3.out",
                    transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: ".ci-stats-list",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Animate RHS value from 0 to peak
            const items = sectionRef.current?.querySelectorAll<HTMLElement>(".ci-stats-item") || [];
            systemPillars.forEach((pillar, i) => {
                const item = items[i];
                const valueEl = item?.querySelector<HTMLElement>(".ci-stats-content strong");
                if (!valueEl) return;
                const obj = { min: 0, max: 0 };
                gsap.to(obj, {
                    min: pillar.minPercent,
                    max: pillar.maxPercent,
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "power2.out",
                    onUpdate: () => {
                        valueEl.textContent = `${Math.round(obj.min)}–${Math.round(obj.max)}%`;
                    },
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%", // Trigger earlier
                        toggleActions: "play none none none"
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="ci-section">
            <div className="ci-wrapper">
                {/* Title - Full Width Top */}
                <header className="ci-title ci-animate">
                    <SectionTitle
                        title="RCM Is Not Improved by Working Harder."
                        subtitle="It Is Improved by Designing It Right."
                        align="left"
                        subtitleSize="text-xl md:text-2xl lg:text-3xl"
                        subtitleRevealWithGlow
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

                        {/* Success Pillars - Cards with Lottie animated icons */}
                        <div className="ci-pillars-section">
                            <span className="ci-pillars-label">True success comes from:</span>
                            <div className="ci-pillars-grid">
                                {successPillars.map((pillar, idx) => (
                                    <div
                                        key={idx}
                                        className="ci-pillar-card"
                                    >
                                        <div
                                            className="ci-pillar-icon ci-pillar-icon-lottie"
                                            style={{ backgroundColor: `${pillar.color}10`, borderColor: `${pillar.color}30` }}
                                        >
                                            <Player
                                                src={PILLAR_LOTTIE_URLS[pillar.lottieKey]}
                                                autoplay
                                                loop
                                                style={{ width: 40, height: 40 }}
                                            />
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
                                <Player
                                    src={PILLAR_LOTTIE_URLS.alert}
                                    autoplay
                                    loop
                                    style={{ width: 80, height: 80 }}
                                />
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
                                <li
                                    key={idx}
                                    className={`ci-stats-item ${idx === systemPillars.length - 1 ? 'ci-stats-item-featured' : ''}`}
                                >
                                    {/* Animated Bars */}
                                    <div className="ci-bar-base" style={{ width: `${pillar.minPercent}%` }} />
                                    <div className={`ci-bar-highlight ${idx === systemPillars.length - 1 ? 'ci-bar-highlight-pulse' : ''}`} 
                                         style={{ left: `${pillar.minPercent}%`, width: `${pillar.maxPercent - pillar.minPercent}%` }} />

                                    {/* Content - value animates from 0–0% to pillar range via GSAP */}
                                    <div className="ci-stats-content">
                                        <span>{pillar.name}</span>
                                        <strong>--</strong>
                                    </div>
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
