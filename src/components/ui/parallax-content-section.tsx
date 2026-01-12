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
            // Each card has unique, eye-catching animations

            // Left cards - dramatic animations
            leftCards?.forEach((card, index) => {
                let config;

                if (index === 0) {
                    // First card: Float in from far left with spin
                    config = {
                        from: {
                            y: 300,
                            x: -150,
                            opacity: 0,
                            rotateZ: -25,
                            rotateY: 45,
                            rotateX: 20,
                            scale: 0.6
                        },
                        to: {
                            y: -100,
                            x: 60,
                            opacity: 1,
                            rotateZ: 5,
                            rotateY: -8,
                            rotateX: -3,
                            scale: 1
                        },
                        start: 'top 110%',
                        end: 'top 10%',
                        scrub: 1.5
                    };
                } else if (index === 1) {
                    // Second card: Dramatic flip and rush
                    config = {
                        from: {
                            y: 400,
                            x: 50,
                            opacity: 0,
                            rotateZ: 30,
                            rotateY: -60,
                            rotateX: -25,
                            scale: 0.7
                        },
                        to: {
                            y: -150,
                            x: -20,
                            opacity: 1,
                            rotateZ: -4,
                            rotateY: 6,
                            rotateX: 2,
                            scale: 1.02
                        },
                        start: 'top 120%',
                        end: 'top 5%',
                        scrub: 0.3
                    };
                } else {
                    // Third card: Spiral entrance from bottom
                    config = {
                        from: {
                            y: 500,
                            x: -100,
                            opacity: 0,
                            rotateZ: -40,
                            rotateX: 50,
                            rotateY: 30,
                            scale: 0.5
                        },
                        to: {
                            y: -200,
                            x: 80,
                            opacity: 1,
                            rotateZ: 8,
                            rotateX: -5,
                            rotateY: -6,
                            scale: 1.05
                        },
                        start: 'top 130%',
                        end: 'top 0%',
                        scrub: 0.8
                    };
                }

                gsap.fromTo(card, config.from, {
                    ...config.to,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: config.start,
                        end: config.end,
                        scrub: config.scrub,
                    }
                });
            });

            // Right cards - mirror dramatic animations
            rightCards?.forEach((card, index) => {
                let config;

                if (index === 0) {
                    // First card: Float in from far right with spin
                    config = {
                        from: {
                            y: 300,
                            x: 150,
                            opacity: 0,
                            rotateZ: 25,
                            rotateY: -45,
                            rotateX: 20,
                            scale: 0.6
                        },
                        to: {
                            y: -100,
                            x: -60,
                            opacity: 1,
                            rotateZ: -5,
                            rotateY: 8,
                            rotateX: -3,
                            scale: 1
                        },
                        start: 'top 110%',
                        end: 'top 10%',
                        scrub: 1.5
                    };
                } else if (index === 1) {
                    // Second card: Dramatic flip and rush
                    config = {
                        from: {
                            y: 400,
                            x: -50,
                            opacity: 0,
                            rotateZ: -30,
                            rotateY: 60,
                            rotateX: -25,
                            scale: 0.7
                        },
                        to: {
                            y: -150,
                            x: 20,
                            opacity: 1,
                            rotateZ: 4,
                            rotateY: -6,
                            rotateX: 2,
                            scale: 1.02
                        },
                        start: 'top 120%',
                        end: 'top 5%',
                        scrub: 0.3
                    };
                } else {
                    // Third card: Spiral entrance from bottom
                    config = {
                        from: {
                            y: 500,
                            x: 100,
                            opacity: 0,
                            rotateZ: 40,
                            rotateX: -50,
                            rotateY: -30,
                            scale: 0.5
                        },
                        to: {
                            y: -200,
                            x: -80,
                            opacity: 1,
                            rotateZ: -8,
                            rotateX: 5,
                            rotateY: 6,
                            scale: 1.05
                        },
                        start: 'top 130%',
                        end: 'top 0%',
                        scrub: 0.8
                    };
                }

                gsap.fromTo(card, config.from, {
                    ...config.to,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: config.start,
                        end: config.end,
                        scrub: config.scrub,
                    }
                });
            });

            // Title animation - dramatic entrance
            const title = sectionRef.current?.querySelector('.section-title');
            if (title) {
                gsap.fromTo(title,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.8,
                        rotateX: 30
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 95%',
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
                                className={`parallax-card ${index === 0 || index === 2 ? 'card-small' : ''}`}
                            >
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Center Space for 3D Model (fixed at page level) */}
                    <div className="center-space"></div>

                    {/* Right Cards */}
                    <div className="right-cards">
                        {rightCards.map((text, index) => (
                            <div
                                key={index}
                                className={`parallax-card ${index === 0 || index === 2 ? 'card-small' : ''}`}
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

                /* Smaller cards for first and last pairs */
                .parallax-card.card-small {
                    width: 70%;
                    align-self: center;
                }

                .left-cards .parallax-card.card-small {
                    align-self: flex-end; /* Move toward center */
                }

                .right-cards .parallax-card.card-small {
                    align-self: flex-start; /* Move toward center */
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
