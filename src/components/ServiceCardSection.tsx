/**
 * ServiceCardSection Component
 * 
 * Sticky card with THREE SCROLLABLE SECTIONS inside:
 * - Row 1: Top-left "Service" title (fades in first, fades out as sphere grows)
 * - Row 2: Center animated sphere (grows from small to big)
 * - Row 3: Bottom-right content (fades in last)
 * 
 * Uses GSAP ScrollTrigger for scroll-based animations
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceCardSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-play video
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

    // GSAP ScrollTrigger for scroll-based animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const sphere = sphereRef.current;
            const title = titleRef.current;
            const headline = headlineRef.current;
            const content = contentRef.current;
            const section = sectionRef.current;

            if (!sphere || !section) return;

            // Create a timeline linked to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

            // === PHASE 1 (0-30%): Title and headline fade IN ===
            if (title) {
                tl.fromTo(title,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.15 },
                    0
                );
            }
            if (headline) {
                tl.fromTo(headline,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.15 },
                    0.05
                );
            }

            // === PHASE 2 (20-60%): Sphere grows from small to big ===
            tl.fromTo(sphere,
                { scale: 0.15, y: 100, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.4 },
                0.15
            );

            // === PHASE 3 (50-80%): Title fades OUT as content comes in ===
            if (title) {
                tl.to(title,
                    { opacity: 0, y: -20, duration: 0.15 },
                    0.5
                );
            }
            if (headline) {
                tl.to(headline,
                    { opacity: 0, y: -20, duration: 0.15 },
                    0.5
                );
            }

            // === PHASE 4 (60-100%): Bottom content fades IN ===
            if (content) {
                tl.fromTo(content,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.3 },
                    0.55
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="service-card"
            ref={sectionRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '250vh',
                marginTop: '-450px',
            }}
        >
            {/* Sticky Card Container */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    // padding: '10px',
                    boxSizing: 'border-box',
                }}
            >
                {/* Dark Transparent Card */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(15,25,50,0.95) 0%, rgba(10,15,35,0.98) 100%)',
                        borderRadius: '32px',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '18px',
                        opacity: 0.7,
                    }}
                >
                    {/* === ROW 1: Top Left - Service Title (fades in/out) === */}
                    <div
                        ref={titleRef}
                        style={{
                            position: 'absolute',
                            top: '120px', // Moved inside
                            left: '120px', // Moved inside
                            maxWidth: '500px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    borderRadius: '50%',
                                }}
                            />
                            <h2
                                style={{
                                    color: 'white',
                                    fontSize: '28px',
                                    fontWeight: 700,
                                    fontFamily: 'Outfit, sans-serif',
                                    letterSpacing: '-0.01em',
                                    margin: 0,
                                }}
                            >
                                Service
                            </h2>
                        </div>
                        <p
                            style={{
                                color: '#4d9fff',
                                fontSize: '14px',
                                fontFamily: 'Outfit, sans-serif',
                                margin: '0 0 0 20px',
                            }}
                        >
                            Our Services
                        </p>

                        {/* Headline - same block as title (top-left) */}
                        <h3
                            ref={headlineRef}
                            style={{
                                color: 'white',
                                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                fontWeight: 600,
                                fontFamily: 'Outfit, sans-serif',
                                lineHeight: 1.5,
                                marginTop: '100px',
                                wordSpacing: '10px',
                            }}
                        >
                            3D communication platform solving all spatial selection challenges.
                        </h3>
                    </div>

                    {/* === ROW 2: Center - Animated Sphere === */}
                    <div
                        ref={sphereRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'min(500px, 55vw)', // Increased size
                            height: 'min(500px, 55vw)', // Increased size
                            borderRadius: '50%',
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, rgba(100,140,200,0.4) 0%, rgba(60,100,180,0.6) 100%)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 60px rgba(100,150,255,0.2)',
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
                                opacity: 0.85,
                            }}
                        />
                    </div>

                    {/* === ROW 3: Bottom Right - Content (fades in last) === */}
                    <div
                        ref={contentRef}
                        style={{
                            position: 'absolute',
                            bottom: '120px', // Matched Row 1 spacing
                            right: '120px', // Matched Row 1 spacing
                            maxWidth: '490px',
                            textAlign: 'right',
                        }}
                    >
                        {/* Description text */}
                        <p
                            style={{
                                color: 'white',
                                fontSize: '25px',
                                lineHeight: 1.8,
                                fontFamily: 'Outfit, sans-serif',
                                // opacity: 0.9,
                                marginBottom: '28px',
                                wordSpacing: '10px',
                                fontWeight: 600,
                            }}
                        >
                            Our platform provides digital twin-based 3D communication
                            services. Anytime, with anyone - enabling spatial
                            image sharing for residential
                        </p>

                        {/* Divider line */}
                        <div
                            style={{
                                width: '100%',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                marginBottom: '30px',
                            }}
                        />

                        {/* Button Card */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'stretch',
                                background: 'white',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                                marginLeft: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            {/* Left side - Gradient with logo */}
                            <div
                                style={{
                                    width: '90px',
                                    padding: '20px',
                                    background: 'linear-gradient(135deg, #00b4a0 0%, #0088cc 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span style={{ fontSize: '13px', marginTop: '6px', fontWeight: 600 }}>SERVICE</span>
                            </div>
                            {/* Right side - Text + Arrow */}
                            <div
                                style={{
                                    flex: 1,
                                    padding: '14px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '20px',
                                }}
                            >
                                <div>
                                    <p style={{ color: '#333', fontSize: '16px', fontWeight: 600, fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                                        Explore Services
                                    </p>
                                    <p style={{ color: '#666', fontSize: '13px', fontFamily: 'Outfit, sans-serif', margin: '3px 0 0 0' }}>
                                        Service Site
                                    </p>
                                </div>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
