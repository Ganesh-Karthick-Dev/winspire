"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Player } from "@lottiefiles/react-lottie-player";
import SectionTitle from "./ui/section-title";
import { AlertTriangle, Target, Zap, Layers } from "lucide-react";



/** Lottie animated icon URLs (free from LottieFiles) - replace with your own if needed */
const PILLAR_LOTTIE_URLS = {
    target: "https://assets10.lottiefiles.com/packages/lf20_touohxvx.json",
    layers: "https://assets4.lottiefiles.com/packages/lf20_kxsd2tqp.json",
    lightning: "https://assets9.lottiefiles.com/packages/lf20_2g2J5s.json",
};

const systemPillars = [
    { name: "Revenue Protection & Yield Improvement", range: "20–25%", minPercent: 20, maxPercent: 25 },
    { name: "Speed, Throughput & Operational Efficiency", range: "18–22%", minPercent: 18, maxPercent: 22 },
    { name: "Leadership Visibility & Control", range: "10–12%", minPercent: 10, maxPercent: 12 },
    { name: "People Performance & Quality at Scale", range: "15–18%", minPercent: 15, maxPercent: 18 },
    { name: "Culture, Alignment & Continuous Improvement", range: "5–8%", minPercent: 5, maxPercent: 8 },
    { name: "Total Impact", range: "100%", minPercent: 0, maxPercent: 100 },
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
            const cards = gsap.utils.toArray<HTMLElement>(".ci-pillar-card");
            cards.forEach((card, i) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });

                tl.fromTo(card,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );

                // Icon Specific Animations
                if (i === 0) { // Target - Spiral Outward
                    tl.fromTo(card.querySelector(".icon-target"),
                        { scale: 0, rotate: -180, opacity: 0 },
                        { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                        "-=0.3"
                    );
                } else if (i === 1) { // Layers - Stacking
                    tl.fromTo(card.querySelectorAll(".icon-layer"),
                        { y: 10, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, stagger: 0.2, ease: "power2.out" },
                        "-=0.3"
                    );
                } else if (i === 2) { // Lightning - Flashy
                    tl.fromTo(card.querySelector(".icon-zap"),
                        { opacity: 0.3, scale: 0.8 },
                        { opacity: 1, scale: 1.1, duration: 0.15, repeat: 3, yoyo: true, ease: "power1.inOut" },
                        "-=0.3"
                    ).to(card.querySelector(".icon-zap"), { scale: 1, duration: 0.2 });
                }
            });


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

            // Animate RHS value from 0 to peak (e.g. "0–0%" → "20–25%")
            const items = sectionRef.current?.querySelectorAll<HTMLElement>(".ci-stats-item") || [];
            systemPillars.forEach((pillar, i) => {
                const item = items[i];
                const valueEl = item?.querySelector<HTMLElement>(".ci-stats-content strong");
                if (!valueEl) return;
                const obj = { min: 0, max: 0 };
                gsap.to(obj, {
                    min: pillar.minPercent,
                    max: pillar.maxPercent,
                    duration: 1,
                    delay: 0.2 + i * 0.1,
                    ease: "power3.out",
                    onUpdate: () => {
                        valueEl.textContent = `${Math.round(obj.min)}–${Math.round(obj.max)}%`;
                    },
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
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

                        {/* Success Pillars - Custom Animated Icons */}
                        <div className="ci-pillars-section">
                            <span className="ci-pillars-label">True success comes from:</span>
                            <div className="ci-pillars-grid">

                                {/* 1. Spiral (Target) */}
                                <div className="ci-pillar-card">
                                    <div className="ci-pillar-icon bg-blue-500/10 border-blue-500/20 text-blue-500 relative flex items-center justify-center overflow-hidden">
                                        <Target className="icon-target w-6 h-6" />
                                    </div>
                                    <div className="ci-pillar-text">
                                        <span className="ci-pillar-action">Defining clear</span>
                                        <strong className="ci-pillar-name">OUTCOMES</strong>
                                    </div>
                                </div>

                                {/* 2. Stacking (Layers) */}
                                <div className="ci-pillar-card">
                                    <div className="ci-pillar-icon bg-blue-500/10 border-blue-500/20 text-blue-500 relative flex items-center justify-center">
                                        {/* Simulated stacked layers */}
                                        <div className="icon-layer absolute w-5 h-5 border-2 border-current rounded-sm z-10 bg-white dark:bg-slate-900" style={{ transform: 'translateY(0)' }}></div>
                                        <div className="icon-layer absolute w-5 h-5 border-2 border-current rounded-sm z-0 opacity-60" style={{ transform: 'translateY(-4px) scale(0.9)' }}></div>
                                        <div className="icon-layer absolute w-5 h-5 border-2 border-current rounded-sm z-0 opacity-30" style={{ transform: 'translateY(-8px) scale(0.8)' }}></div>
                                    </div>
                                    <div className="ci-pillar-text">
                                        <span className="ci-pillar-action">Designing the right</span>
                                        <strong className="ci-pillar-name">STRUCTURE</strong>
                                    </div>
                                </div>

                                {/* 3. Flashy (Lightning) */}
                                <div className="ci-pillar-card">
                                    <div className="ci-pillar-icon bg-blue-500/10 border-blue-500/20 text-blue-500 flex items-center justify-center">
                                        <Zap className="icon-zap w-6 h-6 fill-current" />
                                    </div>
                                    <div className="ci-pillar-text">
                                        <span className="ci-pillar-action">Executing disciplined</span>
                                        <strong className="ci-pillar-name">STRATEGIES</strong>
                                    </div>
                                </div>

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
                                <li
                                    key={idx}
                                    className="ci-stats-item"
                                >
                                    {/* Animated Bars */}
                                    <div className="ci-bar-base" style={{ width: `${pillar.minPercent}%` }} />
                                    <div className="ci-bar-highlight" style={{ left: `${pillar.minPercent}%`, width: `${pillar.maxPercent - pillar.minPercent}%` }} />

                                    {/* Content - value animates from 0–0% to pillar range via GSAP */}
                                    <div className="ci-stats-content">
                                        <span>{pillar.name}</span>
                                        <strong>0–0%</strong>
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
