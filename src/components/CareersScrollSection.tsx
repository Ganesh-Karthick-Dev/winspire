'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import FrostyButton from './FrostyButton';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Image data for the two columns
const leftColumnImages = [
    { src: '/images/careers/team-rooftop.png', alt: 'Team on rooftop' },
    { src: '/images/careers/colleagues-chat.png', alt: 'Colleagues chatting' },
    { src: '/images/careers/skyscraper.png', alt: 'Modern skyscraper' },
    { src: '/images/careers/brainstorm.png', alt: 'Team brainstorming' },
    // Duplicate for infinite scroll feel
    { src: '/images/careers/team-rooftop.png', alt: 'Team on rooftop' },
    { src: '/images/careers/colleagues-chat.png', alt: 'Colleagues chatting' },
];

const rightColumnImages = [
    { src: '/images/careers/office-aerial.png', alt: 'Office aerial view' },
    { src: '/images/careers/presentation.png', alt: 'Business presentation' },
    { src: '/images/careers/celebration.png', alt: 'Team celebration' },
    { src: '/images/careers/office-interior.png', alt: 'Office interior' },
    // Duplicate for infinite scroll feel
    { src: '/images/careers/office-aerial.png', alt: 'Office aerial view' },
    { src: '/images/careers/presentation.png', alt: 'Business presentation' },
];

export default function CareersScrollSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    // Frosty Button Refs
    const btnRef = useRef<HTMLAnchorElement>(null);
    const btnBgRef = useRef<HTMLDivElement>(null);
    const btnCircleRef = useRef<HTMLDivElement>(null);
    const btnArrowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        if (!section || !leftCol || !rightCol) return;

        const ctx = gsap.context(() => {
            // Create a timeline linked to scroll for image column animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

            // Left column: scroll DOWN (starts shifted UP, moves DOWN)
            // Start at -350 (top hidden) and move to -50 (still slightly hidden)
            // This ensures we NEVER have positive Y, so no empty space at top
            tl.fromTo(
                leftCol,
                { y: -350 },
                { y: -50, duration: 1 },
                0
            );

            // Right column: scroll UP (starts at -50, moves UP to -350)
            tl.fromTo(
                rightCol,
                { y: -50 },
                { y: -350, duration: 1 },
                0
            );

            // Button Hover Animation
            const btn = btnRef.current;
            const bg = btnBgRef.current;
            const circle = btnCircleRef.current;
            const arrow = btnArrowRef.current;

            if (btn && bg && circle && arrow) {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(bg, { opacity: 1, duration: 0.3 });
                    gsap.to(circle, { scale: 1.1, backgroundColor: '#3b82f6', duration: 0.3 }); // Circle to Blue
                    gsap.to(arrow, { color: '#ffffff', x: 2, duration: 0.3 }); // Arrow to White
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(bg, { opacity: 0.8, duration: 0.3 });
                    gsap.to(circle, { scale: 1, backgroundColor: '#ffffff', duration: 0.3 }); // Back to White
                    gsap.to(arrow, { color: '#000000', x: 0, duration: 0.3 }); // Back to Black
                });
            }

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="careers-scroll-section-wrapper"
            style={{
                position: 'relative',
                width: '100%',
                height: '300vh', // Reduced height to fix gap issue
                marginTop: '-50vh',
            }}
        >
            {/* Sticky Card Container */}
            <div
                className="careers-sticky-container"
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    boxSizing: 'border-box',
                }}
            >
                {/* Frosted Glass Card */}
                <div className="careers-card">
                    {/* Left Content - Sticky Info */}
                    <div className="careers-left-content" style={{ paddingLeft: '80px' }}>
                        <div className="careers-accent-label">
                            <span className="careers-dot"></span>
                            Careers
                        </div>
                        <p className="careers-sublabel">choose your career</p>

                        <h2 className="careers-headline">
                            Join the Future of Revenue Cycle Innovation
                        </h2>

                        <div className="careers-divider"></div>
                        {/* 
                        <FrostyButton 
                        text="About Us"
                        onClick={() => window.location.href = '#about-details'}
                         /> */}

                        <a
                            ref={btnRef}
                            href="/careers"
                            className="careers-cta-button"
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px 24px 16px 40px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                overflow: 'hidden',
                                width: 'fit-content',
                                minWidth: '220px',
                                border: 'none',
                                background: 'transparent', // Custom BG handled below
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            {/* Gradient Background Layer */}
                            <div
                                ref={btnBgRef}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(90deg, #083151 0%, #051e3e 100%)', // Requested Gradient
                                    zIndex: 0,
                                    transition: 'opacity 0.3s',
                                    opacity: 0.9
                                }}
                            />

                            <span style={{ position: 'relative', zIndex: 1, color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>Careers</span>

                            <div
                                ref={btnCircleRef}
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <span ref={btnArrowRef} style={{ color: 'black', fontSize: '1.2rem', lineHeight: 1 }}>→</span>
                            </div>
                        </a>
                    </div>

                    {/* Right Content - Image Columns */}
                    <div className="careers-images-wrapper">
                        {/* Left Image Column - Scrolls DOWN */}
                        <div ref={leftColRef} className="careers-image-column careers-col-left">
                            {leftColumnImages.map((img, index) => (
                                <div key={index} className="careers-image-card">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Image Column - Scrolls UP */}
                        <div ref={rightColRef} className="careers-image-column careers-col-right">
                            {rightColumnImages.map((img, index) => (
                                <div key={index} className="careers-image-card">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
