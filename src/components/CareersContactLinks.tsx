import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CareersContactLinks: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const rightCardRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const rightCard = rightCardRef.current;

        if (!section || !rightCard) return;

        const ctx = gsap.context(() => {
            // Right card: starts lower, moves up on scroll
            gsap.fromTo(rightCard,
                { y: 80 },
                {
                    y: -30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1
                    }
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="links-section"
            style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '100px 0',
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif"
            }}
        >
            <div className="links-container" style={{ width: '100%', maxWidth: '100%', padding: '0 16px' }}>
                {/* DESKTOP VIEW */}
                <div className="links-desktop-view">
                    <h2 className="links-main-title text-gradient-shimmer" style={{ paddingLeft: '16px', textAlign: 'left', width: '100%', alignSelf: 'flex-start', display: 'block', marginBlock: '100px' }}>Open The Door to The New World.</h2>

                    <div
                        className="links-grid"
                        style={{
                            display: 'flex',
                            gap: '16px',
                            width: '100%',
                            padding: '0 70px'
                        }}
                    >
                        {/* Careers Card */}
                        <a
                            href="/careers"
                            style={{
                                flex: 1,
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                height: '500px',
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: '70px 50px',
                                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.9, lineHeight: 1.5 }}>Generate<br />New Values</span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <h3 style={{ fontSize: '2.8rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>Careers</h3>
                                        <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '10px', opacity: 0.8 }}>opportunity</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.3)', margin: '0 25px' }}></div>
                                        <span style={{ fontSize: '1.5rem' }}>→</span>
                                    </div>
                                </div>
                            </div>
                            {/* Image - Floating, No Shadow */}
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                right: '50px',
                                width: '300px',
                                height: '200px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                zIndex: 1
                            }}>
                                <Image
                                    src="/images/links/links_team_meeting_1766075227437.png"
                                    alt="Team Meeting"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </a>

                        {/* Contact Card */}
                        <a
                            ref={rightCardRef}
                            href="/contact"
                            style={{
                                flex: 1,
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                height: '500px',
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: '70px 50px',
                                background: 'linear-gradient(135deg, #4527a0 0%, #7b1fa2 100%)',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.9, lineHeight: 1.5 }}>Feel Free<br />to Connect</span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <h3 style={{ fontSize: '2.8rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>Contact</h3>
                                        <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '10px', opacity: 0.8 }}>sales</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.3)', margin: '0 25px' }}></div>
                                        <span style={{ fontSize: '1.5rem' }}>→</span>
                                    </div>
                                </div>
                            </div>
                            {/* Image - Floating, No Shadow */}
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                right: '50px',
                                width: '300px',
                                height: '200px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                zIndex: 1
                            }}>
                                <Image
                                    src="/images/links/links_workspace_laptop_1766075249577.png"
                                    alt="Workspace"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </a>
                    </div>
                </div>

                {/* MOBILE VIEW */}
                <div className="links-mobile-view">
                    <div className="links-mobile-header">
                        <div className="links-header-line"></div>
                        <h2 className="links-mobile-title text-gradient-shimmer">Open The Door<br />to The New World.</h2>
                    </div>

                    <div className="links-mobile-cards">
                        {/* Careers Card Mobile */}
                        <a href="/careers" className="links-mobile-card card-blue">
                            <div className="card-top-row">
                                <span className="card-label">Generate<br />New Values</span>
                                <div className="card-image-thumb">
                                    <img src="/images/links/links_team_meeting_1766075227437.png" alt="Careers" />
                                </div>
                            </div>
                            <div className="card-bottom-row">
                                <div>
                                    <h3 className="card-title">Careers</h3>
                                    <span className="card-subtitle">Recruitment Information</span>
                                </div>
                                <div className="card-arrow-wrap">
                                    <div className="card-divider-v"></div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Contact Card Mobile */}
                        <a href="/contact" className="links-mobile-card card-purple">
                            <div className="card-top-row">
                                <span className="card-label">Feel Free<br />to Connect</span>
                                <div className="card-image-thumb">
                                    <img src="/images/links/links_workspace_laptop_1766075249577.png" alt="Contact" />
                                </div>
                            </div>
                            <div className="card-bottom-row">
                                <div>
                                    <h3 className="card-title">Contact</h3>
                                    <span className="card-subtitle">inquiry</span>
                                </div>
                                <div className="card-arrow-wrap">
                                    <div className="card-divider-v"></div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareersContactLinks;
