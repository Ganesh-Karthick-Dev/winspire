/**
 * ServicesSection Component
 * 
 * Split-screen layout matching "Style Port" reference:
 * - Centered container (not edge-to-edge)
 * - LEFT: Sticky content (headline + button)
 * - RIGHT: Scrollable content (video card + text paragraphs)
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FrostyButton from './FrostyButton';
import { useIsMobile } from '@/hooks/useIsMobile';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
    const para1Ref = useRef<HTMLParagraphElement>(null);
    const para2Ref = useRef<HTMLParagraphElement>(null);
    const para3Ref = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useIsMobile();



    // GSAP Scroll-triggered fade animations for individual lines
    // Only fade IN from bottom when scrolling down, no fade out when scrolling up
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Get all fade-line elements
            const lines = document.querySelectorAll('.fade-line');

            lines.forEach((line) => {
                // Set initial state - faded and slightly below
                gsap.set(line, { opacity: 0.15, y: 15 });

                // Fade in from bottom when entering viewport
                gsap.to(line, {
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 95%',
                        end: 'top 60%',
                        scrub: 0.3,
                        // Once animation is done, it stays - no reverse
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="services-section-wrapper"
        >
            {/* Centered Container */}
            <div className="services-container">
                {/* === LEFT SIDE: STICKY CONTENT === */}
                <div className="services-left">
                    {/* Large Headline - Bigger like reference */}
                    <h2 className="services-headline">
                        Your Extended Revenue Team.
                        Always On. Always Intelligent. Always Reliable.
                    </h2>

                    {/* Glossy Divider - Hidden on mobile via CSS */}
                    <div className="services-divider" />

                    {/* About Us Button - Hidden on mobile */}
                    {!isMobile && (
                        <FrostyButton
                            text="Explore Our AI-Driven RCM Model"
                            onClick={() => window.location.href = '#about-details'}
                        />
                    )}
                </div>

                {/* === RIGHT SIDE: SCROLLABLE CONTENT === */}
                <div className="services-right">
                    {/* Image Card */}
                    <div className="services-video-card">
                        <img
                            src="/poster/qefqe.webp"
                            alt="Winspire Healthcare"
                            className="services-video"
                        />
                    </div>

                    {/* Text Block 1 */}
                    <div ref={para1Ref} className="services-text-block">
                        <span className="fade-line" style={{ display: 'block' }}>Your clinicians lead the care.</span>
                        <span className="fade-line" style={{ display: 'block' }}>Your leadership drives the vision.</span>
                        <span className="fade-line" style={{ display: 'block' }}>And we run your entire revenue cycle</span>
                        <span className="fade-line" style={{ display: 'block' }}>quietly in the background so you can</span>
                        <span className="fade-line" style={{ display: 'block' }}>focus on strategy, expansion,</span>
                        <span className="fade-line" style={{ display: 'block' }}>and patient experience.</span>
                    </div>

                    {/* Text Block 2 */}
                    <div ref={para2Ref} className="services-text-block">
                        <span className="fade-line" style={{ display: 'block' }}>Winspire RCM operates like an internal</span>
                        <span className="fade-line" style={{ display: 'block' }}>revenue engine powered by top 1% RCM</span>
                        <span className="fade-line" style={{ display: 'block' }}>Experts in the country, AI, automation,</span>
                        <span className="fade-line" style={{ display: 'block' }}>and real-time intelligence.</span>
                        <span className="fade-line" style={{ display: 'block' }}>The results are predictable, measurable,</span>
                        <span className="fade-line" style={{ display: 'block' }}>and repeatable.</span>
                    </div>

                    {/* Performance Highlights */}
                    <div ref={para3Ref} className="services-text-block services-highlights">
                        <span className="fade-line highlights-title" style={{ display: 'block', fontWeight: 600, marginBottom: '16px' }}>
                            Performance Highlights:
                        </span>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li className="fade-line" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>•</span> Revenue collected faster
                            </li>
                            <li className="fade-line" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>•</span> Fewer denials
                            </li>
                            <li className="fade-line" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>•</span> Lower cost-to-collect
                            </li>
                            <li className="fade-line" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>•</span> Real-time visibility into every department
                            </li>
                            <li className="fade-line" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#38bdf8' }}>•</span> No workflows left to chance
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Bottom CTA - Divider + Button */}
                    {isMobile && (
                        <div className="services-mobile-cta">
                            <div className="services-mobile-divider" />
                            <FrostyButton
                                text="Explore Our AI-Driven RCM Model"
                                onClick={() => window.location.href = '#about-details'}
                            />
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .services-section-wrapper {
                    position: relative;
                    width: 100%;
                    background: transparent;
                }

                .services-container {
                    max-width: 1500px;
                    margin: 0 auto;
                    padding: 0 40px;
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }

                .services-left {
                    position: sticky;
                    top: 90px;
                    width: 45%;
                    align-self: flex-start;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    padding-top: 40px;
                    padding-right: 60px;
                    padding-bottom: 60px;
                    padding-left: 80px; /* Increased to move more to center */
                }

                .services-headline {
                    color: white;
                    font-size: clamp(1.8rem, 3.2vw, 2.6rem);
                    font-weight: 600;
                    line-height: 1.45;
                    font-family: 'Outfit', sans-serif;
                    margin-bottom: 48px;
                    max-width: 480px;
                    letter-spacing: -0.01em;
                }

                .services-divider {
                    width: 100%;
                    max-width: 450px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    margin-bottom: 48px;
                }

                .services-right {
                    width: 55%;
                    padding-bottom: 50px;
                    padding-left: 80px;
                    display: flex;
                    flex-direction: column;
                    gap: 48px;
                    align-items: center;
                }

                .services-video-card {
                    width: 60%;
                    max-width: 100%;
                    height: 580px;
                    background: rgba(230, 240, 255, 0.95);
                    border-radius: 14px;
                    overflow: hidden;
                    box-shadow: 0 16px 50px rgba(0,0,0,0.2);
                }

                .services-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .services-text-block {
                    color: white;
                    font-size: 25px;
                    line-height: 1.4;
                    font-family: 'Outfit', sans-serif;
                    max-width: 450px;
                    text-align: left;
                    width: 450px;
                }

                /* Tablet */
                @media (max-width: 1024px) {
                    .services-container {
                        padding: 0 24px;
                    }
                    
                    .services-left {
                        padding-right: 30px;
                    }

                    .services-right {
                        padding-left: 40px;
                    }

                    .services-video-card {
                        width: 80%;
                        height: 450px;
                    }
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .services-container {
                        flex-direction: column;
                        padding: 0 24px;
                    }

                    .services-left {
                        position: relative;
                        top: 0;
                        width: 100%;
                        padding: 40px 0 24px 0;
                    }

                    .services-headline {
                        font-size: clamp(1.4rem, 6vw, 1.8rem);
                        margin-bottom: 0;
                        max-width: 100%;
                        text-align: left;
                    }

                    /* Hide divider on mobile */
                    .services-divider {
                        display: none;
                    }

                    .services-right {
                        width: 100%;
                        padding: 0 0 40px 0;
                        gap: 32px;
                        align-items: flex-start;
                    }

                    .services-video-card {
                        width: 100%;
                        height: 450px;
                    }

                    .services-text-block {
                        font-size: 28px;
                        max-width: 100%;
                        text-align: left;
                        line-height: 1.6;
                        width: 100%;
                    }

                    /* Mobile CTA at bottom */
                    .services-mobile-cta {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 32px;
                    }

                    .services-mobile-divider {
                        width: 100%;
                        height: 3px;
                        background: rgba(255, 255, 255, 0.25);
                        margin-bottom: 32px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .services-headline {
                        font-size: clamp(1.2rem, 5.5vw, 1.5rem);
                        margin-bottom: 20px;
                    }

                    .services-divider {
                        margin-bottom: 20px;
                        height: 3px;
                    }

                    .services-video-card {
                        height: 380px;
                        border-radius: 12px;
                    }

                    .services-text-block {
                        font-size: 16px;
                        line-height: 1.5;
                    }

                    .services-right {
                        gap: 24px;
                    }
                }
            `}</style>
        </section>
    );
}

