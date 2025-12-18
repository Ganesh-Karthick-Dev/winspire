/**
 * ServiceCardSection Component
 * 
 * Sticky card section with:
 * - Dark transparent background (like hero card)
 * - Row 1: Top-left "Service" title with subtitle
 * - Row 2: Center animated sphere (grows from small to big with video inside)
 * - Row 3: Bottom-right text content and button with divider
 * 
 * Uses GSAP ScrollTrigger for pinning and sphere animation
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
    const contentRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

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

    // GSAP ScrollTrigger for sphere animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const sphere = sphereRef.current;
            const content = contentRef.current;
            const headline = headlineRef.current;
            const section = sectionRef.current;

            if (!sphere || !section) return;

            // Timeline for scroll-based animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

            // Sphere: starts small and below, grows and rises
            tl.fromTo(sphere,
                { scale: 0.2, y: 150, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.6 },
                0
            );

            // Headline: fades up slightly as sphere grows
            if (headline) {
                tl.fromTo(headline,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3 },
                    0.1
                );
            }

            // Content: fades in after sphere is centered
            if (content) {
                tl.fromTo(content,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4 },
                    0.5
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
                marginTop: '-450px', // Pull much closer to previous section
            }}
        >
            {/* Sticky Card Container - stays fixed while scrolling */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    padding: '15px',
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
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '48px',
                    }}
                >
                    {/* === ROW 1: Top Left - Service Title === */}
                    <div style={{ marginBottom: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span
                                style={{
                                    width: '6px',
                                    height: '6px',
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
                                marginLeft: '18px',
                                margin: '0 0 0 18px',
                            }}
                        >
                            Our Services
                        </p>

                        {/* Headline below title */}
                        <h3
                            ref={headlineRef}
                            style={{
                                color: 'white',
                                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif',
                                lineHeight: 1.4,
                                marginTop: '60px',
                                maxWidth: '450px',
                            }}
                        >
                            3D communication platform solving all spatial selection challenges.
                        </h3>
                    </div>

                    {/* === ROW 2: Center - Animated Sphere with Video === */}
                    <div
                        ref={sphereRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'min(400px, 50vw)',
                            height: 'min(400px, 50vw)',
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

                    {/* === ROW 3: Bottom Right - Content + Button === */}
                    <div
                        ref={contentRef}
                        style={{
                            marginTop: 'auto',
                            marginLeft: 'auto',
                            maxWidth: '450px',
                            textAlign: 'right',
                        }}
                    >
                        {/* Description text */}
                        <p
                            style={{
                                color: 'white',
                                fontSize: '15px',
                                lineHeight: 1.8,
                                fontFamily: 'Outfit, sans-serif',
                                opacity: 0.9,
                                marginBottom: '32px',
                            }}
                        >
                            Our platform provides digital twin-based 3D communication
                            services. Anytime, anywhere, with anyone - enabling spatial
                            image sharing for residential and housing businesses.
                        </p>

                        {/* Divider line */}
                        <div
                            style={{
                                width: '100%',
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
                                marginBottom: '24px',
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
                                    width: '100px',
                                    padding: '20px',
                                    background: 'linear-gradient(135deg, #00b4a0 0%, #0088cc 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span style={{ fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>SERVICE</span>
                            </div>
                            {/* Right side - Text + Arrow */}
                            <div
                                style={{
                                    flex: 1,
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '24px',
                                }}
                            >
                                <div>
                                    <p style={{ color: '#333', fontSize: '14px', fontWeight: 600, fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                                        Explore Services
                                    </p>
                                    <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Outfit, sans-serif', margin: '4px 0 0 0' }}>
                                        Service Site
                                    </p>
                                </div>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
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
