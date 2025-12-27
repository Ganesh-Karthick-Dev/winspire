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
import { useIsMobile } from '@/hooks/useIsMobile';

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
    const isMobile = useIsMobile();

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

    // GSAP ScrollTrigger for scroll-based animations (desktop only)
    useEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const sphere = sphereRef.current;
            const title = titleRef.current;
            const headline = headlineRef.current;
            const content = contentRef.current;
            const section = sectionRef.current;

            if (!sphere || !section) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

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

            tl.fromTo(sphere,
                { scale: 0.15, y: 100, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.4 },
                0.15
            );

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

            if (content) {
                tl.fromTo(content,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.3 },
                    0.55
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile sphere scroll animation
    const mobileSphereRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMobile) return;

        const sphere = mobileSphereRef.current;
        if (!sphere) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(sphere,
                { scale: 0.3, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sphere,
                        start: 'top 90%',
                        end: 'top 40%',
                        scrub: 0.5,
                    }
                }
            );
        });

        return () => ctx.revert();
    }, [isMobile]);

    // ==================== MOBILE LAYOUT ====================
    if (isMobile) {
        return (
            <section id="service-card" className="service-card-mobile">
                <div className="service-mobile-card">
                    {/* Service Title */}
                    <div className="service-mobile-header">
                        <div className="service-mobile-title-row">
                            <div className="service-mobile-dots">
                                <span className="service-dot" />
                                <span className="service-dot" />
                            </div>
                            <h2 className="service-mobile-title">Service</h2>
                        </div>
                        <p className="service-mobile-subtitle">Our Services</p>
                    </div>

                    {/* Headline */}
                    <h3 className="service-mobile-headline">
                        3D Communication Services Powered by Digital Twins
                    </h3>

                    {/* Circular Video/Image */}
                    <div ref={mobileSphereRef} className="service-mobile-sphere">
                        <video
                            ref={videoRef}
                            src="/video/sample/section2_video.mp4"
                            muted
                            loop
                            playsInline
                            className="service-mobile-video"
                        />
                    </div>

                    {/* Description */}
                    <p className="service-mobile-description">
                        Providing real-time spatial interaction and visualization services for seamless collaboration across digital and physical environments.
                    </p>

                    {/* Service Button Card */}
                    <div className="service-mobile-button-card">
                        <div className="service-button-left">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            <span>SERVICE</span>
                        </div>
                        <div className="service-button-right">
                            <div>
                                <p className="service-button-title">Explore Services</p>
                                <p className="service-button-sub">Service Site</p>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .service-card-mobile {
                        position: relative;
                        width: 100%;
                        padding: 20px 16px;
                    }

                    .service-mobile-card {
                        background: rgba(8, 49, 81, 0.85);
                        border-radius: 24px;
                        padding: 40px 24px;
                        display: flex;
                        flex-direction: column;
                        gap: 24px;
                    }

                    .service-mobile-header {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .service-mobile-title-row {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .service-mobile-dots {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .service-dot {
                        width: 8px;
                        height: 5px;
                        background-color: #38bdf8;
                        border-radius: 50%;
                    }

                    .service-mobile-title {
                        color: white;
                        font-size: 2rem;
                        font-weight: 700;
                        font-family: 'Outfit', sans-serif;
                        margin: 0;
                    }

                    .service-mobile-subtitle {
                        color: #4d9fff;
                        font-size: 14px;
                        font-family: 'Outfit', sans-serif;
                        margin: 0 0 0 24px;
                    }

                    .service-mobile-headline {
                        color: white;
                        font-size: clamp(1.5rem, 6vw, 2rem);
                        font-weight: 600;
                        font-family: 'Outfit', sans-serif;
                        line-height: 1.4;
                        margin: 16px 0;
                    }

                    .service-mobile-sphere {
                        width: 70%;
                        aspect-ratio: 1;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 20px auto;
                        background: linear-gradient(135deg, rgba(100,140,200,0.4) 0%, rgba(60,100,180,0.6) 100%);
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    }

                    .service-mobile-video {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .service-mobile-description {
                        color: white;
                        font-size: 18px;
                        line-height: 1.7;
                        font-family: 'Outfit', sans-serif;
                        margin: 0;
                    }

                    .service-mobile-button-card {
                        display: flex;
                        align-items: stretch;
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
                        margin-top: 16px;
                    }

                    .service-button-left {
                        width: 80px;
                        padding: 16px;
                        background: linear-gradient(135deg, #00b4a0 0%, #0088cc 100%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        gap: 6px;
                        font-size: 11px;
                        font-weight: 600;
                    }

                    .service-button-right {
                        flex: 1;
                        padding: 12px 16px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .service-button-title {
                        color: #333;
                        font-size: 14px;
                        font-weight: 600;
                        font-family: 'Outfit', sans-serif;
                        margin: 0;
                    }

                    .service-button-sub {
                        color: #666;
                        font-size: 12px;
                        font-family: 'Outfit', sans-serif;
                        margin: 2px 0 0 0;
                    }
                `}</style>
            </section>
        );
    }

    // ==================== DESKTOP LAYOUT ====================
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
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(8, 49, 81, 0.7)',
                        borderRadius: '50px',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '18px',
                    }}
                >
                    {/* ROW 1: Top Left - Service Title */}
                    <div
                        ref={titleRef}
                        className="service-left-panel"
                        style={{
                            position: 'absolute',
                            top: '120px',
                            left: '120px',
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

                        <h3
                            ref={headlineRef}
                            className="service-headline-text"
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
                            3D Communication Services Powered by Digital Twins
                        </h3>
                    </div>

                    {/* ROW 2: Center - Animated Sphere */}
                    <div
                        ref={sphereRef}
                        className="service-center-sphere"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'min(500px, 55vw)',
                            height: 'min(500px, 55vw)',
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

                    {/* ROW 3: Bottom Right - Content */}
                    <div
                        ref={contentRef}
                        className="service-right-panel"
                        style={{
                            position: 'absolute',
                            bottom: '120px',
                            right: '120px',
                            maxWidth: '490px',
                            textAlign: 'right',
                        }}
                    >
                        <p
                            className="service-description-text"
                            style={{
                                color: 'white',
                                fontSize: '25px',
                                lineHeight: 1.8,
                                fontFamily: 'Outfit, sans-serif',
                                marginBottom: '28px',
                                wordSpacing: '10px',
                                fontWeight: 600,
                            }}
                        >
                            Providing real-time spatial interaction and visualization services for seamless collaboration across digital and physical environments.
                        </p>

                        <div
                            style={{
                                width: '100%',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                marginBottom: '30px',
                            }}
                        />

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
