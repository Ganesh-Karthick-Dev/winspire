/**
 * ServicesSection Component
 * 
 * Split-screen layout matching "Style Port" reference:
 * - Centered container (not edge-to-edge)
 * - LEFT: Sticky content (headline + button)
 * - RIGHT: Scrollable content (video card + text paragraphs)
 */

import { useRef, useEffect } from 'react';

export default function ServicesSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto-play video when in view
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

    return (
        <section
            id="services"
            style={{
                position: 'relative',
                width: '100%',
                background: 'transparent',
            }}
        >
            {/* Centered Container */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 60px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                {/* === LEFT SIDE: STICKY CONTENT === */}
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        width: '45%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingRight: '60px',
                        flexShrink: 0,
                    }}
                >
                    {/* Large Headline - Bigger like reference */}
                    <h2
                        style={{
                            color: 'white',
                            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                            fontWeight: 700,
                            lineHeight: 1.45,
                            fontFamily: 'Outfit, sans-serif',
                            marginBottom: '48px',
                            maxWidth: '480px',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Building a globally recognized 3D communication platform for transformation.
                    </h2>

                    {/* Glossy Divider - Thicker with gradient */}
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '450px',
                            height: '2px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                            marginBottom: '48px',
                        }}
                    />

                    {/* About Us Button - Premium glossy style */}
                    <button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '40px',
                            padding: '14px 14px 14px 28px',
                            background: 'linear-gradient(135deg, rgba(15,35,70,0.95) 0%, rgba(8,20,45,0.98) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '60px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Outfit, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: 'fit-content',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                    >
                        <span style={{ letterSpacing: '0.02em' }}>About Us</span>
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                background: 'linear-gradient(135deg, #4b8ef7 0%, #2563eb 100%)',
                                borderRadius: '50%',
                                boxShadow: '0 2px 8px rgba(37,99,235,0.4)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* === RIGHT SIDE: SCROLLABLE CONTENT === */}
                <div
                    style={{
                        width: '55%',
                        paddingTop: '120px',
                        paddingBottom: '50px',
                        paddingLeft: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '48px',
                        alignItems: 'flex-end', // Push all content to the right
                    }}
                >
                    {/* Video Card */}
                    <div
                        style={{
                            width: '340px',
                            maxWidth: '100%',
                            background: 'rgba(230, 240, 255, 0.95)',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            boxShadow: '0 16px 50px rgba(0,0,0,0.2)',
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
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* Text Paragraph 1 */}
                    <p
                        style={{
                            color: 'white',
                            fontSize: '15px',
                            lineHeight: 1.85,
                            fontFamily: 'Outfit, sans-serif',
                            opacity: 0.9,
                            maxWidth: '450px',
                            textAlign: 'left',
                        }}
                    >
                        Our platform empowers businesses to transform their digital presence
                        through cutting-edge 3D visualization technology. We bridge the gap
                        between imagination and reality, creating immersive experiences that
                        captivate audiences and drive results.
                    </p>

                    {/* Text Paragraph 2 */}
                    <p
                        style={{
                            color: 'white',
                            fontSize: '15px',
                            lineHeight: 1.85,
                            fontFamily: 'Outfit, sans-serif',
                            opacity: 0.9,
                            maxWidth: '450px',
                            textAlign: 'left',
                        }}
                    >
                        For enterprises seeking operational efficiency and automation,
                        and for individuals looking for intuitive solutions, we develop
                        services using cutting-edge technology to realize both without
                        compromise.
                    </p>

                    {/* Text Paragraph 3 - Last item, no extra space after */}
                    <p
                        style={{
                            color: 'white',
                            fontSize: '15px',
                            lineHeight: 1.85,
                            fontFamily: 'Outfit, sans-serif',
                            opacity: 0.9,
                            maxWidth: '450px',
                            textAlign: 'left',
                        }}
                    >
                        With an "overwhelmingly easy to use" approach, we create
                        exceptional services that users will never want to go back from.
                        We aim to expand the value we create not just domestically,
                        but across the world.
                    </p>
                </div>
            </div>
        </section>
    );
}
