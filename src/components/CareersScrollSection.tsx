'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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
                    <div className="careers-left-content">
                        <div className="careers-accent-label">
                            <span className="careers-dot"></span>
                            Careers
                        </div>
                        <p className="careers-sublabel">採用情報</p>

                        <h2 className="careers-headline">
                            Join the Future of Revenue Cycle Innovation
                        </h2>

                        <div className="careers-divider"></div>

                        <a href="/careers" className="careers-cta-button">
                            <span>Careers</span>
                            <span className="careers-cta-arrow">→</span>
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
