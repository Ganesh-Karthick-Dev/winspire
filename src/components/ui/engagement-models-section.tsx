"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Wrench, Cpu, Brain } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface EngagementModel {
    icon: React.ReactNode;
    title: string;
    tag?: string;
    description: string;
}

const models: EngagementModel[] = [
    {
        icon: <Wrench style={{ width: 28, height: 28 }} />,
        title: "Manual RCM Support",
        description: "Traditional execution with foundational structure",
    },
    {
        icon: <Cpu style={{ width: 28, height: 28 }} />,
        title: "Tech-Enabled RCM",
        tag: "Most Common",
        description: "Experienced teams supported by automation and intelligence",
    },
    {
        icon: <Brain style={{ width: 28, height: 28 }} />,
        title: "AI-Driven RCM Ecosystem",
        description: "Predictive insights, system-driven execution, and full operational control",
    },
];

export function EngagementModelsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!cardsContainerRef.current) return;

        const ctx = gsap.context(() => {
            const cards = cardRefs.current;
            const triggerElement = cardsContainerRef.current;

            const mm = gsap.matchMedia();

            // Desktop/Tablet (Landscape) - Apply Parallax
            // Only apply when cards are likely side-by-side
            mm.add("(min-width: 900px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true, // Fix recalculation bugs on resize
                    }
                });

                // Card 1: Natural (No movement)

                // Card 2: Moves UP (faster)
                if (cards[1]) {
                    tl.to(cards[1], {
                        y: -120,
                        ease: "none",
                    }, 0);
                }

                // Card 3: Moves UP MORE (fastest)
                if (cards[2]) {
                    tl.to(cards[2], {
                        y: -240,
                        ease: "none",
                    }, 0);
                }
            });

            // Mobile (Stacked) - NO Parallax on Y-axis to prevent overlapping
            // We can add a subtle fade-in or scale effects instead if desired, 
            // but for "removing bugs", cleaner is better.
            mm.add("(max-width: 899px)", () => {
                // Reset any potential styles if resizing from desktop
                gsap.set(cards, { y: 0 });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    };

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                width: "100%",
                padding: "140px 40px 160px",
                background: "transparent",
                zIndex: 30,
                overflow: "visible",
            }}
        >
            {/* Heading Section - Static */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto 100px",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#38bdf8",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        marginBottom: "24px",
                    }}
                >
                    Our Engagement Models
                </span>

                <h2
                    style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                        fontWeight: 700,
                        color: "white",
                        lineHeight: 1.1,
                        marginBottom: "0",
                    }}
                >
                    Start Where You Are.<br />
                    Grow Where You're Going.
                </h2>
            </div>

            {/* Cards Container */}
            <div
                ref={cardsContainerRef}
                style={{
                    maxWidth: "1300px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                    gap: "32px",
                    padding: "0 20px",
                    alignItems: "start",
                }}
            >
                {models.map((model, index) => (
                    <div
                        key={index}
                        ref={(el) => addToRefs(el, index)}
                        style={{
                            position: "relative",
                            padding: "52px 44px",
                            borderRadius: "28px",
                            // White with little transparency (0.75 opacity)
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(255, 255, 255, 0.6)",
                            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                            cursor: "default",
                            willChange: "transform",
                        }}
                        onMouseEnter={(e) => {
                            // GSAP Hover
                            gsap.to(e.currentTarget, {
                                scale: 1.03,
                                backgroundColor: "rgba(255, 255, 255, 0.85)",
                                boxShadow: "0 40px 80px rgba(0, 0, 0, 0.15)",
                                duration: 0.3,
                                ease: "power1.out"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                backgroundColor: "rgba(255, 255, 255, 0.75)",
                                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.1)",
                                duration: 0.3,
                                ease: "power1.out"
                            });
                        }}
                    >
                        {/* Tag Badge */}
                        {model.tag && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "24px",
                                    right: "24px",
                                    padding: "8px 16px",
                                    borderRadius: "20px",
                                    background: "linear-gradient(135deg, #0a1f44 0%, #1e3a8a 100%)",
                                    fontFamily: "Outfit, sans-serif",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    color: "white",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {model.tag}
                            </span>
                        )}

                        {/* Icon */}
                        <div
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "18px",
                                background: "rgba(79, 156, 249, 0.15)",
                                border: "1px solid rgba(79, 156, 249, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "32px",
                                color: "#0284c7",
                            }}
                        >
                            {model.icon}
                        </div>

                        {/* Title */}
                        <h3
                            style={{
                                fontFamily: "Outfit, sans-serif",
                                fontSize: "1.6rem",
                                fontWeight: 700,
                                color: "#0a1f44",
                                marginBottom: "18px",
                            }}
                        >
                            {model.title}
                        </h3>

                        {/* Description */}
                        <p
                            style={{
                                fontFamily: "Outfit, sans-serif",
                                fontSize: "1.15rem",
                                color: "#4b5563",
                                lineHeight: 1.65,
                            }}
                        >
                            {model.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Bottom Text and CTA - Static */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "100px auto 0",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
                        color: "rgba(255, 255, 255, 0.9)",
                        marginBottom: "44px",
                    }}
                >
                    We meet you where you are and design for where you're headed.
                </p>

                {/* CTA Button */}
                <a
                    href="/engagement-models"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "22px",
                        padding: "18px 18px 18px 40px",
                        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                        backgroundSize: "200% 200%",
                        borderRadius: "50px",
                        color: "white",
                        textDecoration: "none",
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        transition: "background-position 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundPosition = "100% 0";
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(79, 156, 249, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundPosition = "0% 0";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.25)";
                    }}
                >
                    Compare Engagement Models
                    <span
                        style={{
                            width: "48px",
                            height: "48px",
                            background: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1a1a1a",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <ArrowUpRight style={{ width: 22, height: 22 }} />
                    </span>
                </a>
            </div>
        </section>
    );
}
