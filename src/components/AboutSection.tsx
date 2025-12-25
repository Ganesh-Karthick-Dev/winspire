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
                    className="about-label-container"
                >
                    <div className="flex items-center gap-4">
                        {/* Two dots stacked vertically */}
                        <div className="about-label-dots">
                            <span className="about-dot" />
                            <span className="about-dot" />
                        </div>
                        <h2 className="about-label-text">
                            About Us
                        </h2>
                    </div>
                    <span className="about-sublabel">
                        Establish New Standards
                    </span>
                </div>

                {/* Headline - Centered */}
                <div
                    ref={headlineRef}
                    className="about-headline-container"
                >
                    <h3 className="about-headline-text">
                        Rebuilding the Society
                    </h3>
                    <h3 className="about-headline-text mt-2">
                        through Digital Twins
                    </h3>
                </div>
            </section>
        </>
    );
}
