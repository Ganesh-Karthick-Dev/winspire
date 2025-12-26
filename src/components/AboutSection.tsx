/**
 * AboutSection Component
 * 
 * Matches the "Style Port" reference design:
 * - Empty transition space at the top (for 3D model focus)
 * - "About Us" label pinned top-left
 * - Large headline at CENTER CENTER
 * - All text on left side, leaving right side for 3D model
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // "About Us" label fades in when entering the section
            gsap.fromTo(labelRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Headline slides up and fades in (like the reference)
            gsap.fromTo(headlineRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 40%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* === TRANSITION SPACER - Hidden on mobile === */}
            {!isMobile && (
                <section
                    id="transition-zone"
                    className="transition-zone-spacer"
                    aria-hidden="true"
                >
                    {/* Empty - just scroll space for 3D animation */}
                </section>
            )}

            {/* === ABOUT US SECTION === */}
            <section
                id="about"
                ref={sectionRef}
                className="about-section"
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* Top Left: "About Us" Label with two-dot pattern */}
                <div
                    ref={labelRef}
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '88px',
                    }}
                    className="about-label-container"
                >
                    <div className="flex items-center gap-4">
                        {/* Two dots stacked vertically */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span
                                style={{
                                    width: '8px',
                                    height: '5px',
                                    backgroundColor: '#38bdf8',
                                    borderRadius: '50%',
                                }}
                            />
                            <span
                                style={{
                                    width: '8px',
                                    height: '5px',
                                    backgroundColor: '#38bdf8',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                        <h2
                            style={{
                                color: 'white',
                                fontSize: '1.95rem',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                fontFamily: 'Outfit, sans-serif',
                                margin: 0,
                            }}
                        >
                            About Us
                        </h2>
                    </div>
                    <span
                        style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.75rem',
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '0.1em',
                            marginLeft: '24px',
                            display: 'block',
                            marginTop: '4px',
                        }}
                    >
                        Establish New Standards
                    </span>
                </div>

                {/* Headline - Centered Desktop, Left Mobile */}
                <div
                    ref={headlineRef}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: isMobile ? '0' : '50%',
                        transform: isMobile ? 'translate(0, -50%)' : 'translate(-50%, -50%)',
                        textAlign: isMobile ? 'left' : 'center',
                        width: '100%',
                        padding: isMobile ? '0 24px' : '0 24px',
                    }}
                    className="about-headline-container"
                >
                    <h3
                        style={{
                            color: 'white',
                            fontSize: 'clamp(2.5rem, 12vw, 7rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '-0.02em',
                            margin: 0,
                        }}
                    >
                        Intelligent Digital Twins for
                    </h3>
                    <h3
                        style={{
                            color: 'white',
                            fontSize: 'clamp(2.5rem, 12vw, 7rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '-0.02em',
                            margin: 0,
                            marginTop: '0.1em',
                        }}
                    >
                        Real-World Impact
                    </h3>
                    <p
                        style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            margin: '2.5rem auto 0',
                        }}
                    >
                        We create AI-driven digital twin solutions that mirror real-world systems, enabling data-led planning, predictive insights, and scalable transformation across society.
                    </p>
                </div>
            </section>
        </>
    );
}
