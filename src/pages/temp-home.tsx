/**
 * Temp Home Page (temp-home.tsx)
 * 
 * Simplified homepage with only:
 * - Navbar (via Layout)
 * - Hero section (with 3D model)
 * - Footer (via Layout)
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import CoreInsightSection from '@/components/CoreInsightSection';
import NewSection from '@/components/NewSection';
import MarketRealitySection from '@/components/MarketRealitySection';
import NeuraSection from '@/components/NeuraSection';
import OutcomesSection from '@/components/OutcomesSection';
import { SpecialtySection } from '@/components/ui/specialty-section';
import { EngagementModelsSection } from '@/components/ui/engagement-models-section';
import { useIsMobile } from '@/hooks/useIsMobile';
import MarqueeText from '@/components/MarqueeText';
import GradientButton from '@/components/ui/GradientButton';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { scrollKeyframes, animationSettings } from '@/lib/scrollAnimations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/**
 * Dynamically import GLTFViewer with SSR disabled.
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

/**
 * Dynamically import ModelDebugPanel (only in dev mode)
 */
const ModelDebugPanel = dynamic(() => import('@/components/ModelDebugPanel'), {
    ssr: false,
});

// Get initial transform from first keyframe (Hero)
const getInitialTransform = () => {
    const firstKeyframe = scrollKeyframes[0];
    return {
        position: { ...firstKeyframe.transform.position },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale,
    };
};

export default function TempHome() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);
    const isDev = process.env.NODE_ENV === 'development';

    const isMobile = useIsMobile();

    // ========================================
    // DEBUG MODE TOGGLE
    // ========================================
    const DEBUG_MODE = false;

    // === Manual Transform State (for Debug Mode) ===
    const [manualTransform, setManualTransform] = useState(getInitialTransform);
    const [rotateSpeed, setRotateSpeed] = useState(animationSettings.rotationSpeed);

    // === Scroll Animation (for Production Mode) ===
    const { transform: scrollTransform } = useScrollAnimation({
        enabled: !DEBUG_MODE,
    });

    // Choose which transform to use based on mode
    const modelTransform = DEBUG_MODE ? manualTransform : scrollTransform;

    // ========================================
    // LOADER TOGGLE
    // ========================================
    const SHOW_LOADER = true;

    useEffect(() => {
        if (!SHOW_LOADER) {
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
            return;
        }

        resetLoaderToZero();
        is3DDisabled.current = shouldDisable3D();

        const safetyTimeout = setTimeout(() => {
            const progressEl = document.querySelector('.loader-progress');
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (progressEl && progressEl.textContent === '0%' && loaderOverlay) {
                console.warn('Loader stuck at 0% - forcing hide');
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
                document.body.classList.remove('loading');
            }
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, []);

    // === Mission Text Cycling ===
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

    // Add ScrollTrigger for fade effect
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

    return (
        <Layout
            title="Temp Home"
            description="Temporary homepage with navbar, hero, and footer only."
        >
            {/* Leva Debug Panel - Only in dev mode AND debug mode enabled */}
            {isDev && DEBUG_MODE && (
                <ModelDebugPanel
                    transform={manualTransform}
                    onTransformChange={setManualTransform}
                    rotateSpeed={rotateSpeed}
                    onRotateSpeedChange={setRotateSpeed}
                />
            )}

            {/* Page wrapper for z-index stacking */}
            <div className="page-wrapper">
                {/* 3D Viewer - Now shown on all devices with mobile-optimized keyframes */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        manualTransform={modelTransform}
                        rotateSpeed={rotateSpeed}
                        enableWobble={false}
                        className="!z-20"
                    />
                )}

                {/* Front-layer Marquee Text */}
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

                {/* Hero Section with Mobile Overlay Container */}
                <div className="hero-section-container" style={{ position: 'relative' }}>
                    <Hero
                        title={`Designing Revenue Cycles That Actually Work`}
                        subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
                        ctaText="Explore Features"
                        ctaHref="#about"
                    />

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

                {/* Section 2 - Core Insight */}
                <CoreInsightSection />

                {/* New Section */}
                <NewSection />

                {/* Market Reality Section */}
                <MarketRealitySection />

                {/* Neura Intelligence Section */}
                <NeuraSection />

                {/* Outcomes & Proof Section */}
                <OutcomesSection />

                {/* Specialties Section */}
                <SpecialtySection />

                {/* Engagement Models Section */}
                <EngagementModelsSection />

            </div>

        </Layout>
    );
}
