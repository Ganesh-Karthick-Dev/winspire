/**
 * AboutSection Component
 * 
 * Matches the "Style Port" reference design:
 * - Empty transition space at the top (for 3D model focus)
 * - "About Us" label pinned top-left
 * - Large headline at CENTER CENTER
 * - All text on left side, leaving right side for 3D model
 */

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIsMobile } from '@/hooks/useIsMobile';
import FrostyButton from './FrostyButton';
import ContactModal from './ContactModal';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    className="about-headline-container"
                >
                    <h3
                        style={{
                            color: 'white',
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                            fontWeight: 700,
                            lineHeight: 1.15,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '-0.02em',
                            margin: 0,
                            marginBottom: '1.5rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            maxWidth: '900px',
                            textAlign: 'center',
                        }}
                    >
                        Welcome to the Future of Revenue Cycle.
                    </h3>
                    <h3
                        style={{
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                            fontWeight: 500,
                            lineHeight: 1.3,
                            fontFamily: 'Outfit, sans-serif',
                            letterSpacing: '0.02em',
                            margin: 0,
                            marginTop: '1.5rem',
                        }}
                    >
                        AI-Powered. System-Driven. Outcome-Guaranteed.
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
                        Winspire RCM combines intelligent automation, predictive insights, and human expertise to deliver measurable financial improvement in weeks, not years.
                    </p>

                    {/* CTA Button - Opens Contact Modal */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2.5rem',
                        }}
                    >
                        <FrostyButton
                            text="Book a Zero-Risk AI RCM Demo"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

