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

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const para1Ref = useRef<HTMLParagraphElement>(null);
    const para2Ref = useRef<HTMLParagraphElement>(null);
    const para3Ref = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Auto-play video when in view
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

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
                        Building a globally recognized 3D communication platform for transformation.
                    </h2>

                    {/* Glossy Divider - Thicker with gradient */}
                    <div className="services-divider" />

                    {/* About Us Button - Premium glossy style */}
                    <FrostyButton
                        text="About Us"
                        onClick={() => window.location.href = '#about-details'}
                    />
                </div>

                {/* === RIGHT SIDE: SCROLLABLE CONTENT === */}
                <div className="services-right">
                    {/* Video Card */}
                    <div className="services-video-card">
                        <video
                            ref={videoRef}
                            src="/video/sample/section2_video.mp4"
                            muted
                            loop
                            playsInline
                            className="services-video"
                        />
                    </div>

                    {/* Text Block 1 */}
                    <div ref={para1Ref} className="services-text-block">
                        <span className="fade-line" style={{ display: 'block' }}>Our platform empowers businesses to</span>
                        <span className="fade-line" style={{ display: 'block' }}>transform their digital presence through</span>
                        <span className="fade-line" style={{ display: 'block' }}>cutting-edge 3D visualization technology.</span>
                        <span className="fade-line" style={{ display: 'block' }}>We bridge the gap between imagination</span>
                        <span className="fade-line" style={{ display: 'block' }}>and reality, creating immersive experiences</span>
                        <span className="fade-line" style={{ display: 'block' }}>that captivate audiences and drive results.</span>
                    </div>

                    {/* Text Block 2 */}
                    <div ref={para2Ref} className="services-text-block">
                        <span className="fade-line" style={{ display: 'block' }}>For enterprises seeking operational</span>
                        <span className="fade-line" style={{ display: 'block' }}>efficiency and automation, and for</span>
                        <span className="fade-line" style={{ display: 'block' }}>individuals looking for intuitive solutions,</span>
                        <span className="fade-line" style={{ display: 'block' }}>we develop services using cutting-edge</span>
                        <span className="fade-line" style={{ display: 'block' }}>technology to realize both without compromise.</span>
                    </div>
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
                        padding: 0 16px;
                    }

                    .services-left {
                        position: relative;
                        top: 0;
                        width: 100%;
                        padding: 40px 0 32px 0;
                    }

                    .services-headline {
                        font-size: clamp(1.4rem, 6vw, 1.8rem);
                        margin-bottom: 24px;
                        max-width: 100%;
                    }

                    .services-divider {
                        margin-bottom: 24px;
                        max-width: 100%;
                    }

                    .services-right {
                        width: 100%;
                        padding: 0 0 40px 0;
                        gap: 32px;
                    }

                    .services-video-card {
                        width: 100%;
                        height: 280px;
                    }

                    .services-text-block {
                        font-size: 18px;
                        max-width: 100%;
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
                        height: 220px;
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

