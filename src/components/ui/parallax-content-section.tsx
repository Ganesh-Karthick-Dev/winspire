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

            // Animation configs for each card type
            // First pair (index 0): Smaller, slower
            // Second pair (index 1): Opposite tilt, faster
            // Third pair (index 2): Random/varied effects

            // Left cards animation
            leftCards?.forEach((card, index) => {
                let config;

                if (index === 0) {
                    // First card: Smaller movement, slower scrub
                    config = {
                        from: { y: 80, opacity: 0, rotateZ: -3, rotateY: 5, scale: 0.9 },
                        to: { y: -20, opacity: 1, rotateZ: 0, rotateY: 0, scale: 1 },
                        scrub: 2 // Slower
                    };
                } else if (index === 1) {
                    // Second card: Opposite tilt, faster
                    config = {
                        from: { y: 150, opacity: 0, rotateZ: 8, rotateY: -15, scale: 1 },
                        to: { y: -60, opacity: 1, rotateZ: 0, rotateY: 0, scale: 1 },
                        scrub: 0.5 // Faster
                    };
                } else {
                    // Third card: Random effects
                    config = {
                        from: { y: 200, opacity: 0, rotateZ: -10, rotateX: 20, scale: 0.85 },
                        to: { y: -80, opacity: 1, rotateZ: 2, rotateX: 0, scale: 1.02 },
                        scrub: 1
                    };
                }

                gsap.fromTo(card, config.from, {
                    ...config.to,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 100%',
                        end: 'top 20%',
                        scrub: config.scrub,
                    }
                });
            });

            // Right cards animation
            rightCards?.forEach((card, index) => {
                let config;

                if (index === 0) {
                    // First card: Smaller movement, slower scrub
                    config = {
                        from: { y: 80, opacity: 0, rotateZ: 3, rotateY: -5, scale: 0.9 },
                        to: { y: -20, opacity: 1, rotateZ: 0, rotateY: 0, scale: 1 },
                        scrub: 2 // Slower
                    };
                } else if (index === 1) {
                    // Second card: Opposite tilt, faster
                    config = {
                        from: { y: 150, opacity: 0, rotateZ: -8, rotateY: 15, scale: 1 },
                        to: { y: -60, opacity: 1, rotateZ: 0, rotateY: 0, scale: 1 },
                        scrub: 0.5 // Faster
                    };
                } else {
                    // Third card: Random effects
                    config = {
                        from: { y: 180, opacity: 0, rotateZ: 12, rotateX: -15, scale: 0.9 },
                        to: { y: -70, opacity: 1, rotateZ: -3, rotateX: 0, scale: 1.05 },
                        scrub: 0.8
                    };
                }

                gsap.fromTo(card, config.from, {
                    ...config.to,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 100%',
                        end: 'top 20%',
                        scrub: config.scrub,
                    }
                });
            });

            // Title animation
            const title = sectionRef.current?.querySelector('.section-title');
            if (title) {
                gsap.fromTo(title,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 90%',
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
                            <div key={index} className="parallax-card">
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Center Space for 3D Model (fixed at page level) */}
                    <div className="center-space"></div>

                    {/* Right Cards */}
                    <div className="right-cards">
                        {rightCards.map((text, index) => (
                            <div key={index} className="parallax-card">
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
                    padding: 80px 40px 120px;
                    background: transparent;
                    z-index: 25;
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
                    font-size: clamp(1.6rem, 3.5vw, 2.5rem);
                    font-weight: 700;
                    color: white;
                    line-height: 1.2;
                    margin-bottom: 60px;
                    text-align: center;
                }

                .cards-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr 1fr;
                    gap: 40px;
                    align-items: start;
                    perspective: 1000px;
                }

                .left-cards,
                .right-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .center-space {
                    min-height: 400px;
                }

                .parallax-card {
                    /* Square aspect ratio */
                    aspect-ratio: 1 / 1;
                    
                    /* White semi-transparent bg like careers section */
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    border-radius: 20px;
                    padding: 24px;
                    
                    transform-style: preserve-3d;
                    will-change: transform, opacity;
                    
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        0 2px 8px rgba(0, 0, 0, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.5);
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .parallax-card p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    line-height: 1.5;
                    margin: 0;
                    color: #1a1a2e;
                    text-align: center;
                    font-weight: 500;
                }

                @media (max-width: 1024px) {
                    .cards-layout {
                        grid-template-columns: 1fr 1fr;
                        gap: 24px;
                    }

                    .center-space {
                        display: none;
                    }
                }

                @media (max-width: 768px) {
                    .parallax-content-section {
                        padding: 60px 20px 80px;
                    }

                    .section-title {
                        font-size: clamp(1.3rem, 5vw, 1.8rem);
                        margin-bottom: 40px;
                    }

                    .cards-layout {
                        grid-template-columns: 1fr 1fr;
                        gap: 16px;
                    }

                    .parallax-card {
                        padding: 16px;
                        border-radius: 16px;
                    }

                    .parallax-card p {
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </section>
    );
}
