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

// Image data for the two columns (4 images each)
const leftColumnImages = [
    { src: '/images/careers/team-rooftop.png', alt: 'Team on rooftop' },
    { src: '/images/careers/colleagues-chat.png', alt: 'Colleagues chatting' },
    { src: '/images/careers/skyscraper.png', alt: 'Modern skyscraper' },
    { src: '/images/careers/brainstorm.png', alt: 'Team brainstorming' },
];

const rightColumnImages = [
    { src: '/images/careers/office-aerial.png', alt: 'Office aerial view' },
    { src: '/images/careers/presentation.png', alt: 'Business presentation' },
    { src: '/images/careers/celebration.png', alt: 'Team celebration' },
    { src: '/images/careers/office-interior.png', alt: 'Office interior' },
];

export default function CareersScrollSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const stickyContainerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    // Frosty Button Refs
    const btnRef = useRef<HTMLAnchorElement>(null);
    const btnBgRef = useRef<HTMLDivElement>(null);
    const btnCircleRef = useRef<HTMLDivElement>(null);
    const btnArrowRef = useRef<HTMLSpanElement>(null);

    // Mobile Button Refs (Duplicate)
    const mobileBtnRef = useRef<HTMLAnchorElement>(null);
    const mobileBtnBgRef = useRef<HTMLDivElement>(null);
    const mobileBtnCircleRef = useRef<HTMLDivElement>(null);
    const mobileBtnArrowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const stickyContainer = stickyContainerRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        if (!section || !stickyContainer || !leftCol || !rightCol) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // GSAP Match Media
            mm.add("(max-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Horizontal scroll for mobile
                tl.fromTo(leftCol,
                    { x: 100 },
                    { x: -500, ease: "none" },
                    0
                );

                tl.fromTo(rightCol,
                    { x: -500 },
                    { x: 100, ease: "none" },
                    0
                );
            });

            mm.add("(min-width: 769px)", () => {
                // Column offset - how much the columns scroll
                const columnOffset = 550;

                // Desktop: Scroll-driven column animation (no GSAP pin - using CSS sticky)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });

                // LEFT COLUMN: 
                // - Starts at y: 0 (top images visible, no gap)
                // - Scrolls UP (negative Y) to reveal bottom images
                tl.fromTo(leftCol,
                    { y: 0 }, // Start: natural position, top images visible
                    { y: -columnOffset, ease: "none" }, // End: pulled up, bottom images visible
                    0
                );

                // RIGHT COLUMN:
                // - Starts at y: -offset (already pulled up, bottom images visible, NO empty gap at top)
                // - Scrolls DOWN (toward 0) to reveal top images  
                tl.fromTo(rightCol,
                    { y: -columnOffset }, // Start: pulled up, bottom images visible (NO empty space)
                    { y: 0, ease: "none" }, // End: natural position, top images visible
                    0
                );
            });

            // Button Hover Animation (Helper function)
            const setupBtnHover = (btn: HTMLElement | null, bg: HTMLElement | null, circle: HTMLElement | null, arrow: HTMLElement | null) => {
                if (btn && bg && circle && arrow) {
                    btn.addEventListener('mouseenter', () => {
                        gsap.to(bg, { opacity: 1, duration: 0.3 });
                        gsap.to(circle, { scale: 1.1, backgroundColor: '#3b82f6', duration: 0.3 });
                        gsap.to(arrow, { color: '#ffffff', x: 2, duration: 0.3 });
                    });
                    btn.addEventListener('mouseleave', () => {
                        gsap.to(bg, { opacity: 0.8, duration: 0.3 });
                        gsap.to(circle, { scale: 1, backgroundColor: '#ffffff', duration: 0.3 });
                        gsap.to(arrow, { color: '#000000', x: 0, duration: 0.3 });
                    });
                }
            };

            // Setup listeners for both buttons
            setupBtnHover(btnRef.current, btnBgRef.current, btnCircleRef.current, btnArrowRef.current);
            setupBtnHover(mobileBtnRef.current, mobileBtnBgRef.current, mobileBtnCircleRef.current, mobileBtnArrowRef.current);

        }, section);

        return () => ctx.revert();
    }, []);

    // Button Component JSX (Reusable render function not possible inside component easily without sub-component, so duplicating JSX for simplicity)
    const renderButton = (refs: any) => (
        <a
            ref={refs.btn}
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
                background: 'transparent',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
        >
            <div
                ref={refs.bg}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #083151 0%, #051e3e 100%)',
                    zIndex: 0,
                    transition: 'opacity 0.3s',
                    opacity: 0.9
                }}
            />
            <span style={{ position: 'relative', zIndex: 1, color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>Careers</span>
            <div
                ref={refs.circle}
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
                <span ref={refs.arrow} style={{ color: 'black', fontSize: '1.2rem', lineHeight: 1 }}>→</span>
            </div>
        </a>
    );

    return (
        <section
            ref={sectionRef}
            className="careers-scroll-section-wrapper"
        >
            {/* Sticky Card Container */}
            <div ref={stickyContainerRef} className="careers-sticky-container">
                {/* Frosted Glass Card */}
                <div className="careers-card">
                    {/* Left Content - Sticky Info */}
                    <div className="careers-left-content">
                        <div className="careers-title-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                            <div className="careers-accent-label" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {/* Two dots stacked vertically */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span
                                        className="careers-dot-rect"
                                        style={{
                                            width: '8px',
                                            height: '5px',
                                            backgroundColor: '#38bdf8', // Light blue like About Us
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <span
                                        className="careers-dot-rect"
                                        style={{
                                            width: '8px',
                                            height: '5px',
                                            backgroundColor: '#38bdf8',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </div>
                                <h2 style={{ margin: 0, lineHeight: 1, color: 'black' }}>Careers</h2>
                            </div>
                            <p className="careers-sublabel" style={{ margin: 0, paddingLeft: '24px', color: '#38bdf8' }}>Recruitment Information</p>
                        </div>

                        <h2 className="careers-headline">
                            Join the Future of Revenue Cycle Innovation. Build platforms that empower teams and redefine possibilities.
                        </h2>

                        {/* DESKTOP ONLY: Divider and Button */}
                        <div className="careers-desktop-elements">
                            <div className="careers-divider"></div>
                            {renderButton({ btn: btnRef, bg: btnBgRef, circle: btnCircleRef, arrow: btnArrowRef })}
                        </div>
                    </div>

                    {/* Right Content - Image Columns */}
                    <div className="careers-images-wrapper">
                        {/* Left/Top Image Column */}
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

                        {/* Right/Bottom Image Column */}
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

                    {/* MOBILE ONLY: Divider and Button (Placed AFTER images) */}
                    <div className="careers-mobile-elements">
                        <div className="careers-divider"></div>
                        {renderButton({ btn: mobileBtnRef, bg: mobileBtnBgRef, circle: mobileBtnCircleRef, arrow: mobileBtnArrowRef })}
                    </div>
                </div>
            </div>
        </section >
    );
}
