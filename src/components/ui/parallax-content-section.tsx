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
                // Values > 1 move faster than scroll, < 1 move slower
                const parallaxSpeeds = [0.4, 2.5, 0.6, 1.8, 0.5, 2.2];

                const yOffsets = [-50, 50, -150, 80, -100, 40]; // Base offsets
                const rotations = [5, -5, 8, -6, 10, -4];

                const scrub = scrubLags[i % scrubLags.length];
                const speed = parallaxSpeeds[i % parallaxSpeeds.length];
                const rotation = rotations[i % rotations.length];
                const baseOffset = yOffsets[i % yOffsets.length];

                gsap.fromTo(card,
                    {
                        // Start point: Multiplied by speed for varying entrance distances
                        y: (300 * speed) + baseOffset,
                        rotation: rotation * -1,
                    },
                    {
                        // End point: Multiplied by speed for varying exit distances
                        y: (-300 * speed) + baseOffset,
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
        "Revenue cycles don't break because teams lack effort.",
        "They break because the system lacks intelligence.",
        "It is not software you manage."
    ];

    const rightCards = [
        "Neura AI replaces fragmented RCM activity with a single, intelligent operating structure.",
        "It is the structure that governs how revenue cycles actually perform.",
        "Neura works ahead of outcomes, continuously guiding execution."
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
                    /* Increased bottom padding significantly to prevent card cutoff */
                    padding: 80px 40px 250px;
                    background: transparent;
                    z-index: 25;
                    /* overflow: hidden;  <-- REMOVED to stop clipping */
                    overflow: visible; 
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
                    /* Reduced main gap */
                    gap: 20px; 
                    align-items: start;
                }

                .left-cards,
                .right-cards {
                    display: flex;
                    flex-direction: column;
                    /* Reduced vertical gap between cards */
                    gap: 60px; 
                }

                .center-space {
                    min-height: 400px;
                }

                .parallax-card {
                    /* White semi-transparent bg */
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    
                    border: 1px solid rgba(255, 255, 255, 0.6);
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
                    font-weight: 700; 
                }

                /* =========================================
                   DETERMINISTIC RANDOM POSITIONS & SIZES
                   ========================================= */

                /* Left 0 - Top Left */
                .card-left-0 {
                    transform: translateX(10%) rotate(-2deg) scale(0.95);
                    margin-bottom: 40px;
                }

                /* Left 1 - Middle Left (pushed out) */
                .card-left-1 {
                    transform: translateX(-15%) rotate(3deg) scale(1.1);
                    margin-left: -40px;
                }

                /* Left 2 - Bottom Left (Pull closer to avoid gap) */
                .card-left-2 {
                    transform: translateX(20%) rotate(-4deg) scale(1.0);
                    margin-top: -80px; /* Reduce space before last card */
                    max-width: 90%;
                }


                /* Right 0 - Top Right */
                .card-right-0 {
                    transform: translateX(-5%) rotate(2deg) scale(1.05);
                    margin-top: 60px; /* Stagger start */
                }

                /* Right 1 - Middle Right (pushed in) */
                .card-right-1 {
                    transform: translateX(-20%) rotate(-3deg) scale(0.9);
                    margin-left: -60px;
                }

                /* Right 2 - Bottom Right (Pull closer) */
                .card-right-2 {
                    transform: translateX(10%) rotate(5deg) scale(1.15);
                    margin-top: -100px; /* Reduce space before last card significantly */
                    margin-right: -20px;
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
