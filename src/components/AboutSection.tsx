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

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);

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
            {/* === TRANSITION SPACER === */}
            <section
                id="transition-zone"
                className="relative"
                style={{ height: '100vh' }}
                aria-hidden="true"
            >
                {/* Empty - just scroll space for 3D animation */}
            </section>

            {/* === ABOUT US SECTION === */}
            <section
                id="about"
                ref={sectionRef}
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* Top Left: "About Us" Label - Absolute positioned */}
                <div
                    ref={labelRef}
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '48px',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: 'rgba(255,255,255,0.6)',
                                borderRadius: '50%',
                            }}
                        />
                        <h2
                            style={{
                                color: 'white',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                fontFamily: 'Outfit, sans-serif',
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
                            marginLeft: '20px',
                            display: 'block',
                            marginTop: '4px',
                        }}
                    >
                        Establish New Standards
                    </span>
                </div>

                {/* Center Center: HUGE Headline - Absolute positioned */}
                <div
                    ref={headlineRef}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '100%',
                        padding: '0 24px',
                    }}
                >
                    <h3
                        style={{
                            color: 'white',
                            fontSize: 'clamp(2rem, 8vw, 7rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '-0.02em',
                            margin: 0,
                        }}
                    >
                        Rebuilding the Society
                    </h3>
                    <h3
                        style={{
                            color: 'white',
                            fontSize: 'clamp(2rem, 8vw, 7rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '-0.02em',
                            margin: 0,
                            marginTop: '0.1em',
                        }}
                    >
                        through Digital Twins
                    </h3>
                </div>
            </section>
        </>
    );
}
