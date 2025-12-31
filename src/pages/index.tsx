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
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ServiceCardSection from '@/components/ServiceCardSection';
import CenterTextSection from '@/components/CenterTextSection';
import CareersScrollSection from '@/components/CareersScrollSection';
import NewsSection from '@/components/NewsSection';
import CareersContactLinks from '@/components/CareersContactLinks';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/useIsMobile';
import MarqueeText from '@/components/MarqueeText';
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

/**
 * Animation Tuner Component
 * Only renders in Dev mode to tweak animation settings live.
 */
function AnimationTuner({ onSettingsChange }: { onSettingsChange: (key: string, value: any) => void }) {
    // We dynamically import useControls to avoid SSR issues if Leva isn't SSR friendly (it usually is but safe side)
    // Actually Leva hooks must be used at top level. We'll assume Leva is safe or this component is only mounted client-side.
    // Since Home is a page, we might need to be careful. But let's try standard usage.
    const { useControls } = require('leva');

    useControls('Animation Tuner', {
        dampingFactor: {
            value: animationSettings.dampingFactor,
            min: 0.01,
            max: 0.3,
            step: 0.01,
            label: 'Damping (Lower=Smoother)',
            onChange: (v: number) => onSettingsChange('dampingFactor', v)
        },
        scrubSmoothness: {
            value: animationSettings.scrubSmoothness,
            min: 0,
            max: 10,
            step: 0.1,
            label: 'Scrub Lag (Higher=Smoother)',
            onChange: (v: number) => onSettingsChange('scrubSmoothness', v)
        },
        useEasing: {
            value: false,
            label: 'Use Easing (Smoothstep)',
            onChange: (v: boolean) => onSettingsChange('useEasing', v)
        },
    });
    return null;
}

export default function Home() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);
    const isDev = process.env.NODE_ENV === 'development';

    // Mobile detection - uses window.matchMedia which works with DevTools
    const isMobile = useIsMobile();

    // === Animation Tuning State ===
    const [animSettings, setAnimSettings] = useState({
        dampingFactor: animationSettings.dampingFactor,
        scrubSmoothness: animationSettings.scrubSmoothness,
        useEasing: false, // Default to Linear as per latest fix
    });

    const handleAnimSettingChange = (key: string, value: any) => {
        setAnimSettings(prev => ({ ...prev, [key]: value }));
    };

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
                    end: '+=250', // Immediate fast fade out
                    scrub: true,
                }
            });
        });
        return () => ctx.revert();
    }, []);

    // ========================================
    // DEBUG MODE TOGGLE
    // Set to true to use Leva controls for finding coordinates
    // Set to false to use scroll-based animation
    // ========================================
    const DEBUG_MODE = false; // 🎯 Toggle this to switch modes

    // === Manual Transform State (for Debug Mode) ===
    // Initial values come from first keyframe in scrollAnimations.ts
    const [manualTransform, setManualTransform] = useState(getInitialTransform);
    const [rotateSpeed, setRotateSpeed] = useState(animationSettings.rotationSpeed);

    // === Scroll Progress Debug ===
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // === Mission Text Cycling ===
    const missionMessages = [
        "Healthcare revenue cycle management AI",
        "Intelligent healthcare revenue cycle management",
        "Smarter revenue cycles for healthcare"
    ];
    const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    const [missionFade, setMissionFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            setMissionFade(false);

            // After fade out, change text and fade in
            setTimeout(() => {
                setCurrentMissionIndex((prev) => (prev + 1) % missionMessages.length);
                setMissionFade(true);
            }, 300); // 300ms for fade out
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, []);


    // === Scroll Animation (for Production Mode) ===
    const { transform: scrollTransform } = useScrollAnimation({
        enabled: !DEBUG_MODE, // Only enable when not in debug mode
        dampingFactor: animSettings.dampingFactor,
        scrub: animSettings.scrubSmoothness,
        useEasing: animSettings.useEasing,
    });

    // Choose which transform to use based on mode
    const modelTransform = DEBUG_MODE ? manualTransform : scrollTransform;

    // ========================================
    // LOADER TOGGLE
    // ========================================
    const SHOW_LOADER = true; // Set to true to show loader animation

    useEffect(() => {
        // Skip loader if disabled
        if (!SHOW_LOADER) {
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
            return;
        }

        // Always show loader on page load - let the 3D model loading control progress
        resetLoaderToZero();

        is3DDisabled.current = shouldDisable3D();
    }, []);

    return (
        <Layout
            title="Home"
            description="Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance."
        >
            {/* Animation Tuner - Only in Dev Mode */}
            {isDev && !DEBUG_MODE && (
                <AnimationTuner onSettingsChange={handleAnimSettingChange} />
            )}

            {/* Leva Debug Panel - Only in dev mode AND debug mode enabled */}
            {isDev && DEBUG_MODE && (
                <ModelDebugPanel
                    transform={manualTransform}
                    onTransformChange={setManualTransform}
                    rotateSpeed={rotateSpeed}
                    onRotateSpeedChange={setRotateSpeed}
                />
            )}

            {/* Debug Mode Indicator */}
            {/* {isDev && DEBUG_MODE && (
                <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg font-mono text-sm">
                    🔧 DEBUG MODE - Use Leva panel to adjust model
                </div>
            )} */}

            {/* Scroll Progress Debug - Always visible in dev */}
            {isDev && (
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
                    <div style={{ marginTop: '4px', fontSize: '12px', color: '#aaa' }}>
                        Damping: {animSettings.dampingFactor} | Scrub: {animSettings.scrubSmoothness} | Easing: {animSettings.useEasing ? 'ON' : 'OFF'}
                    </div>
                </div>
            )}

            {/* ... rest of the component ... */}

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

                {/* 
                  Front-layer Marquee Text - ON TOP of 3D model (right side only)
                  Must be absolute so it scrolls with the page.
                  Uses .hero class to inherit exact same responsive padding as the real Hero section.
                  This ensures the text aligns perfectly with the back layer.
                */}
                {!is3DDisabled.current && (
                    <div className="hero !absolute !top-0 !left-0 w-full !min-h-screen z-30 pointer-events-none !bg-transparent">
                        {/* 
                            Inner wrapper mimics .hero-content area.
                            The .hero class handles the responsive padding around this wrapper.
                        */}
                        <div className="w-full flex-1 relative">
                            <div
                                className="absolute left-0 right-0 flex items-center hero-text-fade"
                                style={{
                                    top: '46%',
                                    transform: 'translateY(-50%)',
                                    height: 'fit-content',
                                    maskImage: 'linear-gradient(to right, transparent 55%, black 59%)',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent 55%, black 59%)'
                                }}
                            >
                                <MarqueeText
                                    text="Revenue Cycle • AI-Powered • Winspire • "
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
                                        style={{ color: '#083151', fontSize: '12px', marginBottom: '1rem' }}
                                    >
                                        Our Mission
                                    </h3>
                                    <div
                                        className="text-2xl font-bold leading-tight font-[Outfit] text-gradient-shimmer"
                                        style={{
                                            opacity: missionFade ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out'
                                        }}
                                    >
                                        {missionMessages[currentMissionIndex]}
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

                        </div>
                    </div>
                )}

                {/* Hero Section with Mobile Overlay Container */}
                <div className="hero-section-container" style={{ position: 'relative' }}>
                    <Hero
                        title={`Welcome to the Future of Revenue Cycle`}
                        subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
                        ctaText="Explore Features"
                        ctaHref="#about"
                    />

                    {/* Mobile Hero Overlay - Mission & Scroll Indicator */}
                    {isMobile && (
                        <div className="mobile-hero-overlay">
                            {/* Our Mission */}
                            <div className="mobile-mission">
                                <h3 className="mobile-mission-label">Our Mission</h3>
                                <div
                                    className="mobile-mission-text text-gradient-shimmer"
                                    style={{
                                        opacity: missionFade ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out'
                                    }}
                                >
                                    {missionMessages[currentMissionIndex]}
                                </div>
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

                {/* About Section with Transition Zone */}
                <AboutSection />

                {/* Services Section - Sticky Left + Scrollable Right */}
                <ServicesSection />

                {/* Service Card Section - Sticky with animated sphere */}
                <ServiceCardSection />

                {/* Center Text Section - Simple 100vh centered text */}
                <CenterTextSection />

                {/* Careers Scroll Section - Frosted glass with animated image columns */}
                <CareersScrollSection />

                {/* News Section - Sticky title with scrollable news list */}
                <NewsSection />

            </div>

            {/* Careers & Contact Links - Large gradient cards (outside wrapper for full-width) */}
            <CareersContactLinks />

        </Layout>
    );
}
