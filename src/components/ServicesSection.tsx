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
            style={{
                position: 'relative',
                width: '100%',
                background: 'transparent',
            }}
        >
            {/* Centered Container */}
            <div
                style={{
                    maxWidth: '1500px',
                    margin: '0 auto',
                    padding: '0 40px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                {/* === LEFT SIDE: STICKY CONTENT === */}
                <div
                    style={{
                        position: 'sticky',
                        top: '90px',
                        width: '45%',
                        alignSelf: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        paddingTop: '40px',
                        paddingRight: '60px',
                        paddingBottom: '60px',
                    }}
                >
                    {/* Large Headline - Bigger like reference */}
                    <h2
                        style={{
                            color: 'white',
                            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                            fontWeight: 600,
                            lineHeight: 1.45,
                            fontFamily: 'Outfit, sans-serif',
                            marginBottom: '48px',
                            maxWidth: '480px',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Building a globally recognized 3D communication platform for transformation.
                    </h2>

                    {/* Glossy Divider - Thicker with gradient */}
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '450px',
                            height: '4px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            marginBottom: '48px',
                        }}
                    />

                    {/* About Us Button - Premium glossy style */}
                    <FrostyButton
                        text="About Us"
                        onClick={() => window.location.href = '#about-details'}
                    />
                    {/* <button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '40px',
                            padding: '14px 14px 14px 28px',
                            background: 'linear-gradient(135deg, rgba(15,35,70,0.95) 0%, rgba(8,20,45,0.98) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '60px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Outfit, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: 'fit-content',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                    >
                        <span style={{ letterSpacing: '0.02em' }}>About Us</span>
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                background: 'linear-gradient(135deg, #4b8ef7 0%, #2563eb 100%)',
                                borderRadius: '50%',
                                boxShadow: '0 2px 8px rgba(37,99,235,0.4)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button> */}
                </div>

                {/* === RIGHT SIDE: SCROLLABLE CONTENT === */}
                <div
                    style={{
                        width: '55%',
                        // paddingTop: '10px',
                        paddingBottom: '50px',
                        paddingLeft: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '48px',
                        alignItems: 'center', // Push all content to the right
                    }}
                >
                    {/* Video Card */}
                    <div
                        style={{
                            width: '60%',
                            maxWidth: '100%',
                            height: '580px',
                            background: 'rgba(230, 240, 255, 0.95)',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            boxShadow: '0 16px 50px rgba(0,0,0,0.2)',
                        }}
                    >
                        <video
                            ref={videoRef}
                            src="/video/sample/section2_video.mp4"
                            muted
                            loop
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* Text Block 1 */}
                    <div
                        ref={para1Ref}
                        style={{
                            color: 'white',
                            fontSize: '25px',
                            lineHeight: 1.4,
                            fontFamily: 'Outfit, sans-serif',
                            maxWidth: '450px',
                            textAlign: 'left',
                        }}
                    >
                        <span className="fade-line" style={{ display: 'block' }}>Our platform empowers businesses to</span>
                        <span className="fade-line" style={{ display: 'block' }}>transform their digital presence through</span>
                        <span className="fade-line" style={{ display: 'block' }}>cutting-edge 3D visualization technology.</span>
                        <span className="fade-line" style={{ display: 'block' }}>We bridge the gap between imagination</span>
                        <span className="fade-line" style={{ display: 'block' }}>and reality, creating immersive experiences</span>
                        <span className="fade-line" style={{ display: 'block' }}>that captivate audiences and drive results.</span>
                    </div>

                    {/* Text Block 2 */}
                    <div
                        ref={para2Ref}
                        style={{
                            color: 'white',
                            fontSize: '25px',
                            lineHeight: 1.4,
                            fontFamily: 'Outfit, sans-serif',
                            maxWidth: '450px',
                            textAlign: 'left',
                        }}
                    >
                        <span className="fade-line" style={{ display: 'block' }}>For enterprises seeking operational</span>
                        <span className="fade-line" style={{ display: 'block' }}>efficiency and automation, and for</span>
                        <span className="fade-line" style={{ display: 'block' }}>individuals looking for intuitive solutions,</span>
                        <span className="fade-line" style={{ display: 'block' }}>we develop services using cutting-edge</span>
                        <span className="fade-line" style={{ display: 'block' }}>technology to realize both without compromise.</span>
                    </div>


                </div>
            </div>
        </section>
    );
}
