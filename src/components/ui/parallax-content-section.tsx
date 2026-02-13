// src/components/ui/parallax-content-section.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function ParallaxContentSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Get all cards
            const leftCards = sectionRef.current?.querySelectorAll('.left-cards .parallax-card');
            const rightCards = sectionRef.current?.querySelectorAll('.right-cards .parallax-card');

            // DRAMATIC PARALLAX CONFIGURATIONS
            // Unifying left and right cards into a single config approach for easier randomness control

            // Define custom animations for all 6 cards (3 left, 3 right)
            // We'll target them by specific class names or indices
            const allCards = [
                ...Array.from(sectionRef.current?.querySelectorAll('.left-cards .parallax-card') || []),
                ...Array.from(sectionRef.current?.querySelectorAll('.right-cards .parallax-card') || [])
            ];

            allCards.forEach((card, i) => {
                // Generate deterministic "random" values based on index
                // Scrub Lag: How "floaty" or heavy the card feels (latency)
                const scrubLags = [1.5, 0.5, 2.0, 0.8, 1.2, 0.4];

                // Parallax Speed: How FAR it moves relative to scroll (velocity)
                // MODERATED speeds to prevent collision (max 2.0 instead of 3.5)
                // Still varied enough to feel random
                const parallaxSpeeds = [0.6, 1.8, 1.1, 1.3, 0.5, 2.0];

                const yOffsets = [0, 100, -50, 50, -80, 20]; // Simpler offsets
                const rotations = [5, -5, 8, -6, 10, -4];

                const scrub = scrubLags[i % scrubLags.length];
                const speed = parallaxSpeeds[i % parallaxSpeeds.length];
                const rotation = rotations[i % rotations.length];
                const baseOffset = yOffsets[i % yOffsets.length];

                gsap.fromTo(card,
                    {
                        // Start point: Multiplied by speed for varying entrance distances
                        y: (250 * speed) + baseOffset, // Reduced multiplier slightly from 300
                        rotation: rotation * -1,
                    },
                    {
                        // End point: Multiplied by speed for varying exit distances
                        y: (-250 * speed) + baseOffset,
                        rotation: rotation,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current, // Use section as trigger for continuous flow
                            start: 'top bottom', // Start when section hits bottom of viewport
                            end: 'bottom top',   // End when section leaves top of viewport
                            scrub: scrub // Variable "weight" feel
                        }
                    }
                );
            });

            // Title animation
            const title = sectionRef.current?.querySelector('.section-title');
            if (title) {
                gsap.fromTo(title,
                    { y: 100, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const leftCards = [
        <span>Revenue cycles don’t break because teams lack effort.</span>,
        <span>They break because the system lacks intelligence.</span>,
        <span>It is not software you manage.</span>
    ];

    const rightCards = [
        <span>Neura AI replaces fragmented RCM activity with a <strong>single, intelligent operating structure</strong>.</span>,
        <span>It is the structure that governs how revenue cycles actually perform.</span>,
        <span>Where traditional systems tell you what happened after the damage is done, Neura AI works <strong>ahead of outcomes</strong>, continuously guiding execution across people, processes, and payers.</span>
    ];

    return (
        <section ref={sectionRef} className="parallax-content-section">
            <div className="content-wrapper">
                <h2 className="section-title">
                    The Operating Structure That Makes Revenue Cycles Predictable
                </h2>

                <div className="cards-layout">
                    {/* Left Cards */}
                    <div className="left-cards">
                        {leftCards.map((text, index) => (
                            <div
                                key={index}
                                className={`parallax-card card-left-${index}`}
                            >
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Center Space for 3D Model */}
                    <div className="center-space"></div>

                    {/* Right Cards */}
                    <div className="right-cards">
                        {rightCards.map((text, index) => (
                            <div
                                key={index}
                                className={`parallax-card card-right-${index}`}
                            >
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .parallax-content-section {
                    position: relative;
                    min-height: 100vh;
                    /* Increased bottom padding significantly */
                    padding: 80px 40px 300px;
                    background: transparent;
                    z-index: 25;
                    /* Allow vertical overflow but clip horizontal to prevent cards going off-screen */
                    overflow-x: clip;
                    overflow-y: visible;
                }

                .content-wrapper {
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(2rem, 4vw, 3.5rem);
                    font-weight: 700;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 60px;
                    text-align: center;
                    max-width: 900px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .cards-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 40px;
                    align-items: start;
                }

                .left-cards,
                .right-cards {
                    display: flex;
                    flex-direction: column;
                    /* MASSIVELY increased vertical gap to prevent overlap */
                    gap: 160px;
                }

                .center-space {
                    min-height: 400px;
                }

                .parallax-card {
                    /* White semi-transparent bg */
                    background: rgba(255, 255, 255, 0.95); /* More opaque to ensure readability if overlap happens */
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);

                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow:
                        0 8px 32px rgba(0, 0, 0, 0.15),
                        0 2px 8px rgba(0, 0, 0, 0.05);

                    border-radius: 24px;
                    padding: 32px; /* More padding for big text */

                    transform-style: preserve-3d;
                    will-change: transform;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    /* Variable widths for random look */
                    width: 100%;
                    min-height: 200px;
                }

                .parallax-card p {
                    font-family: 'Outfit', sans-serif;
                    /* BIG TEXT REQUEST */
                    font-size: 1.8rem;
                    line-height: 1.25;
                    margin: 0;
                    color: #0d1b2a; /* deeply dark blue/black */
                    text-align: left;
                    font-weight: 500; /* Reduced to 500 so bold stands out */
                }

                .parallax-card p strong {
                    font-weight: 800;
                    color: #000;
                }

                /* =========================================
                   DETERMINISTIC RANDOM POSITIONS & SIZES
                   ========================================= */

                /* Left 0 - Top Left */
                .card-left-0 {
                    transform: translateX(10%) rotate(-2deg) scale(0.95);
                    /* margin-bottom handled by gap now */
                }

                /* Left 1 - Middle Left (pushed out) */
                .card-left-1 {
                    transform: translateX(-5%) rotate(3deg) scale(1.1);
                    margin-left: 0;
                    z-index: 5; /* Lower Z-index to stay behind if overlap */
                }

                /* Left 2 - Bottom Left ("It is not software you manage") */
                .card-left-2 {
                    /* Moved further right but SEPARATED from center overlap */
                    transform: translateX(20%) rotate(-4deg) scale(1.0);
                    max-width: 90%;
                    z-index: 10;
                }


                /* Right 0 - Top Right */
                .card-right-0 {
                    transform: translateX(-5%) rotate(2deg) scale(1.05);
                    margin-top: 80px; /* Slight stagger for right col start */
                }

                /* Right 1 - Middle Right ("It is the structure that governs...") */
                .card-right-1 {
                    /* Moved further left but SEPARATED from center overlap */
                    transform: translateX(-20%) rotate(-3deg) scale(0.9);
                    margin-left: -40px;
                    z-index: 5; /* Lower Z-index */
                }

                /* Right 2 - Bottom Right (Pull closer) */
                .card-right-2 {
                    transform: translateX(10%) rotate(5deg) scale(1.15);
                    margin-right: -20px;
                    z-index: 10;
                }

                @media (max-width: 1024px) {
                    .cards-layout {
                        grid-template-columns: 1fr 1fr;
                        gap: 24px;
                    }
                    .center-space { display: none; }

                    .parallax-card p { font-size: 1.5rem; }
                }

                @media (max-width: 768px) {
                    .cards-layout {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .left-cards, .right-cards {
                        gap: 40px;
                    }

                    .parallax-card {
                        transform: none !important; /* Reset random transforms on mobile */
                        margin: 0 !important;
                        width: 100%;
                    }

                    .parallax-card p {
                        font-size: 1.4rem;
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
}
