/**
 * Home Page (index.tsx)
 * 
 * Main single-page layout integrating:
 * - GLTFViewer (dynamically imported, SSR disabled)
 * - GSAP ScrollTrigger for scroll-based 3D animation
 * - Leva debug panel for coordinate export (dev mode only)
 * 
 * SEO Architecture:
 * - All text content is SSR-rendered
 * - 3D components load after hydration via requestIdleCallback
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import DebugPanel from '@/components/DebugPanel';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { animationSettings } from '@/lib/scrollAnimations';
import MarqueeText from '@/components/MarqueeText';
import GradientButton from '@/components/ui/GradientButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// All sections enabled
import Hero from '@/components/Hero';
// STEP 2: Enable AboutSection
import AboutSection from '@/components/AboutSection';
// STEP 3: Enable ValuePropsSection
import ValuePropsSection from '@/components/ValuePropsSection';
// STEP 4: Enable ServicesSection
import ServicesSection from '@/components/ServicesSection';
// STEP 5: Enable ServiceCardSection
import ServiceCardSection from '@/components/ServiceCardSection';
// STEP 6: Enable CenterTextSection
import CenterTextSection from '@/components/CenterTextSection';
// STEP 7: Enable SpecialtySection
import { SpecialtySection } from '@/components/ui/specialty-section';
// STEP 8: EngagementModelsSection - ⚠️ ISSUE FOUND: This section causes compilation hang
// import { EngagementModelsSection } from '@/components/ui/engagement-models-section';
// STEP 9: Enable CareersScrollSection
import CareersScrollSection from '@/components/CareersScrollSection';
// STEP 10: Enable MarketRealitySection
import MarketRealitySection from '@/components/MarketRealitySection';
// STEP 11: Enable NeuraSection
import NeuraSection from '@/components/NeuraSection';
// STEP 12: Enable OutcomesSection
import OutcomesSection from '@/components/OutcomesSection';
// STEP 13: Enable NewsSection
import NewsSection from '@/components/NewsSection';
// STEP 14: Enable CareersContactLinks (last section)
import CareersContactLinks from '@/components/CareersContactLinks';
// import ValuePropsSection from '@/components/ValuePropsSection';
// import ServicesSection from '@/components/ServicesSection';
// import ServiceCardSection from '@/components/ServiceCardSection';
// import CenterTextSection from '@/components/CenterTextSection';
// import { SpecialtySection } from '@/components/ui/specialty-section';
// import { EngagementModelsSection } from '@/components/ui/engagement-models-section';
// import CareersScrollSection from '@/components/CareersScrollSection';
// import NewsSection from '@/components/NewsSection';
// import CareersContactLinks from '@/components/CareersContactLinks';
// import WhyNeuraSection from '@/components/WhyNeuraSection';
// import MarketRealitySection from '@/components/MarketRealitySection';
// import NeuraSection from '@/components/NeuraSection';
// import OutcomesSection from '@/components/OutcomesSection';

/**
 * 3D Model imports - ENABLED
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

const ModelDebugPanel = dynamic(() => import('@/components/ModelDebugPanel'), {
    ssr: false,
});

// Wrapper component to track Hero load time
function HeroWrapper() {
    useEffect(() => {
        if ((window as any).debugPanel) {
            (window as any).debugPanel.startTimer('Hero');
        }
        const timer = setTimeout(() => {
            if ((window as any).debugPanel) {
                (window as any).debugPanel.endTimer('Hero');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Hero
            title="Designing Revenue Cycles That Actually Work"
            subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
            ctaText="Explore Features"
            ctaHref="#about"
        />
    );
}

// Generic wrapper to track any section load time
function SectionWrapper({ name, children }: { name: string; children: React.ReactNode }) {
    useEffect(() => {
        if ((window as any).debugPanel) {
            (window as any).debugPanel.startTimer(name);
            (window as any).debugPanel.log('info', `Rendering ${name}`, name);
        }
        const timer = setTimeout(() => {
            if ((window as any).debugPanel) {
                (window as any).debugPanel.endTimer(name);
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [name]);

    return <>{children}</>;
}

export default function Home() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);
    const isDev = process.env.NODE_ENV === 'development';
    const isMobile = useIsMobile();

    // Loader management - ENABLED
    const SHOW_LOADER = true;
    useEffect(() => {
        if ((window as any).debugPanel) {
            (window as any).debugPanel.log('info', 'Home component mounted', 'Home');
        }

        if (!SHOW_LOADER) {
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
            return;
        }

        // Reset loader and check if 3D should be disabled
        resetLoaderToZero();
        is3DDisabled.current = shouldDisable3D();

        if ((window as any).debugPanel) {
            (window as any).debugPanel.log('info', `3D disabled: ${is3DDisabled.current}`, 'Home');
        }

        // Safety timeout: If loader is still stuck after 5 seconds, hide it
        const safetyTimeout = setTimeout(() => {
            const progressEl = document.querySelector('.loader-progress');
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (progressEl && progressEl.textContent === '0%' && loaderOverlay) {
                if ((window as any).debugPanel) {
                    (window as any).debugPanel.log('warn', 'Loader stuck at 0% - forcing hide', 'Home');
                }
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
                document.body.classList.remove('loading');
            }
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, []);

    // Scroll animation for 3D model - ENABLED
    const DEBUG_MODE = false;
    const scrollAnimation = useScrollAnimation({
        enabled: !DEBUG_MODE,
    });
    
    // State to force React updates when transform changes
    // The scroll animation uses refs internally, so we need to read it periodically
    const [modelTransform, setModelTransform] = useState(() => scrollAnimation.transform);
    
    useEffect(() => {
        let rafId: number;
        const updateTransform = () => {
            const current = scrollAnimation.transform;
            setModelTransform(prev => {
                // Only update if values actually changed (avoid unnecessary re-renders)
                if (
                    prev.position.x !== current.position.x ||
                    prev.position.y !== current.position.y ||
                    prev.position.z !== current.position.z ||
                    prev.rotation.x !== current.rotation.x ||
                    prev.rotation.y !== current.rotation.y ||
                    prev.rotation.z !== current.rotation.z ||
                    prev.scale !== current.scale
                ) {
                    return {
                        position: { ...current.position },
                        rotation: { ...current.rotation },
                        scale: current.scale,
                    };
                }
                return prev;
            });
            rafId = requestAnimationFrame(updateTransform);
        };
        rafId = requestAnimationFrame(updateTransform);
        return () => cancelAnimationFrame(rafId);
    }, [scrollAnimation]);
    
    // Rotate speed from settings
    const rotateSpeed = animationSettings.rotationSpeed;

    // Mission Text Cycling - ENABLED
    const missionMessages = [
        {
            title: "Our Mission",
            content: (
                <>
                    <span style={{ fontSize: '1.3em', fontWeight: 700 }}>Winspire RCM is a human-centric</span>
                    , AI-enabled partner that helps healthcare organizations engineer predictable financial outcomes.
                </>
            )
        },
        {
            title: "Authority Thought",
            content: "RCM doesn't fail at the bottom. It fails at the top."
        }
    ];
    const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    const [missionFade, setMissionFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setMissionFade(false);
            setTimeout(() => {
                setCurrentMissionIndex((prev) => (prev + 1) % missionMessages.length);
                setMissionFade(true);
            }, 300);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // ScrollTrigger for fade effect - ENABLED
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.to('.hero-text-fade', {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: '+=250',
                    scrub: true,
                }
            });
        });
        return () => ctx.revert();
    }, []);

    // COMMENTED OUT - ScrollTrigger fade effect
    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);
    //     const ctx = gsap.context(() => {
    //         gsap.to('.hero-text-fade', {
    //             opacity: 0,
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: 'body',
    //                 start: 'top top',
    //                 end: '+=250',
    //                 scrub: true,
    //             }
    //         });
    //     });
    //     return () => ctx.revert();
    // }, []);

    // COMMENTED OUT - Debug mode and 3D transform state
    // const DEBUG_MODE = false;
    // const [manualTransform, setManualTransform] = useState(DEFAULT_INITIAL_TRANSFORM);
    // const [rotateSpeed, setRotateSpeed] = useState(animationSettings.rotationSpeed);
    // useEffect(() => {
    //     getInitialTransform().then(transform => {
    //         setManualTransform(transform);
    //     });
    // }, []);

    // COMMENTED OUT - Scroll progress debug
    // const [scrollProgress, setScrollProgress] = useState(0);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    //         const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    //         setScrollProgress(progress);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     handleScroll();
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    // COMMENTED OUT - Mission Text Cycling (used with 3D overlay)
    // const missionMessages = [
    //     {
    //         title: "Our Mission",
    //         content: (
    //             <>
    //                 <span style={{ fontSize: '1.3em', fontWeight: 700 }}>Winspire RCM is a human-centric</span>
    //                 , AI-enabled partner that helps healthcare organizations engineer predictable financial outcomes.
    //             </>
    //         )
    //     },
    //     {
    //         title: "Authority Thought",
    //         content: "RCM doesn't fail at the bottom. It fails at the top."
    //     }
    // ];
    // const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    // const [missionFade, setMissionFade] = useState(true);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setMissionFade(false);
    //         setTimeout(() => {
    //             setCurrentMissionIndex((prev) => (prev + 1) % missionMessages.length);
    //             setMissionFade(true);
    //         }, 300);
    //     }, 8000);
    //     return () => clearInterval(interval);
    // }, []);


    // COMMENTED OUT - Scroll animation hook
    // const { transform: scrollTransform } = useScrollAnimation({
    //     enabled: !DEBUG_MODE,
    // });
    // const modelTransform = DEBUG_MODE ? manualTransform : scrollTransform;

    // COMMENTED OUT - Loader management
    // const SHOW_LOADER = true;
    // useEffect(() => {
    //     if (!SHOW_LOADER) {
    //         const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
    //         if (loaderOverlay) {
    //             loaderOverlay.style.opacity = '0';
    //             loaderOverlay.style.visibility = 'hidden';
    //         }
    //         document.body.classList.remove('loading');
    //         return;
    //     }
    //     resetLoaderToZero();
    //     is3DDisabled.current = shouldDisable3D();
    //     const safetyTimeout = setTimeout(() => {
    //         const progressEl = document.querySelector('.loader-progress');
    //         const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
    //         if (progressEl && progressEl.textContent === '0%' && loaderOverlay) {
    //             console.warn('Loader stuck at 0% - forcing hide');
    //             loaderOverlay.style.opacity = '0';
    //             loaderOverlay.style.visibility = 'hidden';
    //             document.body.classList.remove('loading');
    //         }
    //     }, 5000);
    //     return () => clearTimeout(safetyTimeout);
    // }, []);

    return (
        <Layout
            title="Home"
            description="Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance."
        >
            {/* Debug Panel */}
            <DebugPanel />
            {/* COMMENTED OUT - Debug Panel */}
            {/* {isDev && DEBUG_MODE && (
                <ModelDebugPanel
                    transform={manualTransform}
                    onTransformChange={setManualTransform}
                    rotateSpeed={rotateSpeed}
                    onRotateSpeedChange={setRotateSpeed}
                />
            )} */}

            {/* Debug Mode Indicator */}
            {/* {isDev && DEBUG_MODE && (
                <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg font-mono text-sm">
                    🔧 DEBUG MODE - Use Leva panel to adjust model
                </div>
            )} */}

            {/* Scroll Progress Debug - Always visible in dev */}
            {/* {isDev && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 9999,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        color: '#00ff00',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        pointerEvents: 'none',
                    }}
                >
                    <div>📜 Scroll Progress: <strong>{(scrollProgress * 100).toFixed(1)}%</strong></div>
                    <div style={{ marginTop: '4px', fontSize: '12px', color: '#888' }}>
                        Raw: {scrollProgress.toFixed(3)}
                    </div>
                </div>
            )} */}

            {/* ... rest of the component ... */}

            {/* Page wrapper with 3D model */}
            <div className="page-wrapper">
                {/* 3D Viewer - ENABLED */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        manualTransform={modelTransform}
                        rotateSpeed={rotateSpeed}
                        enableWobble={false}
                        className="!z-20"
                    />
                )}

                {/* Front-layer Marquee Text - Right Side (ON TOP of 3D model) */}
                {!is3DDisabled.current && (
                    <div className="hero !absolute !top-0 !left-0 w-full !min-h-screen z-30 pointer-events-none !bg-transparent">
                        <div className="w-full flex-1 relative">
                            <div
                                className="absolute left-0 right-0 flex items-center hero-text-fade"
                                style={{
                                    top: '46vh',
                                    transform: 'translateY(-50%)',
                                    height: 'fit-content',
                                    maskImage: 'linear-gradient(to right, transparent 55%, black 59%)',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent 55%, black 59%)'
                                }}
                            >
                                <MarqueeText
                                    text="Designing Revenue Cycles That Actually Work • "
                                    duration={45}
                                    fontSize="clamp(4rem, 14vw, 11rem)"
                                    color="#083151"
                                />
                            </div>

                            {/* === Bottom Left: Our Mission (Desktop only) === */}
                            {!isMobile && (
                                <div className="absolute left-15 bottom-10 pointer-events-auto z-10 max-w-md hero-text-fade">
                                    <h3
                                        className="font-bold tracking-widest uppercase mb-2 font-[Outfit]"
                                        style={{
                                            color: '#083151',
                                            fontSize: '12px',
                                            marginBottom: '1rem',
                                            opacity: missionFade ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out'
                                        }}
                                    >
                                        {missionMessages[currentMissionIndex].title}
                                    </h3>
                                    <div
                                        className="text-2xl font-bold leading-tight font-[Outfit] text-gradient-shimmer"
                                        style={{
                                            opacity: missionFade ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out'
                                        }}
                                    >
                                        {missionMessages[currentMissionIndex].content}
                                    </div>
                                </div>
                            )}

                            {/* === Bottom Right: Scroll Indicator (Desktop only) === */}
                            {!isMobile && (
                                <div
                                    className="absolute right-8 bottom-12 pointer-events-auto z-10 flex flex-row items-center gap-4 hero-text-fade cursor-pointer"
                                    onClick={() => {
                                        const aboutSection = document.querySelector('#about');
                                        if (aboutSection) {
                                            aboutSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <span className="text-xs right-8 font-bold tracking-widest uppercase text-gray-500 font-[Outfit]">
                                        Scroll
                                    </span>
                                    <div className="animate-scroll-arrow text-[#083151]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <polyline points="19 12 12 19 5 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* === CTA Button - Front Layer (Desktop only) === */}
                            {!isMobile && (
                                <div
                                    className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto hero-text-fade"
                                    style={{ zIndex: 50 }}
                                >
                                    <GradientButton
                                        onClick={() => {
                                            const contactBtn = document.querySelector('[data-contact-modal]') as HTMLElement;
                                            if (contactBtn) {
                                                contactBtn.click();
                                            } else {
                                                window.location.href = '#contact';
                                            }
                                        }}
                                        width="340px"
                                        height="56px"
                                    >
                                        Book a Strategic Conversation
                                    </GradientButton>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Hero Section with Mobile Overlay Container */}
                <div className="hero-section-container" style={{ position: 'relative' }}>
                    <HeroWrapper />

                    {/* Mobile Hero Overlay - Mission & Scroll Indicator */}
                    {isMobile && (
                        <div className="mobile-hero-overlay">
                            {/* Our Mission */}
                            <div className="mobile-mission">
                                <h3
                                    className="mobile-mission-label"
                                    style={{
                                        opacity: missionFade ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out'
                                    }}
                                >
                                    {missionMessages[currentMissionIndex].title}
                                </h3>
                                <div
                                    className="mobile-mission-text text-gradient-shimmer"
                                    style={{
                                        opacity: missionFade ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out'
                                    }}
                                >
                                    {missionMessages[currentMissionIndex].content}
                                </div>
                            </div>

                            {/* Mobile CTA Button */}
                            <div className="mobile-cta-container">
                                <GradientButton
                                    onClick={() => {
                                        const contactBtn = document.querySelector('[data-contact-modal]') as HTMLElement;
                                        if (contactBtn) {
                                            contactBtn.click();
                                        } else {
                                            window.location.href = '#contact';
                                        }
                                    }}
                                    width="280px"
                                    height="50px"
                                >
                                    Book a Strategic Conversation
                                </GradientButton>
                            </div>

                            {/* Scroll Indicator */}
                            <div
                                className="mobile-scroll-indicator"
                                onClick={() => {
                                    const aboutSection = document.querySelector('#about');
                                    if (aboutSection) {
                                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <span className="mobile-scroll-text">Scroll</span>
                                <div className="animate-scroll-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <SectionWrapper name="ValuePropsSection">
                    <ValuePropsSection />
                </SectionWrapper>
                
                <SectionWrapper name="AboutSection">
                    <AboutSection />
                </SectionWrapper>
                
                <SectionWrapper name="ServicesSection">
                    <ServicesSection />
                </SectionWrapper>
                
                <SectionWrapper name="ServiceCardSection">
                    <ServiceCardSection />
                </SectionWrapper>
                
                <SectionWrapper name="CenterTextSection">
                    <CenterTextSection />
                </SectionWrapper>
                
                <SectionWrapper name="SpecialtySection">
                    <SpecialtySection />
        