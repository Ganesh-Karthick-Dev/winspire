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
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
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

export default function Home() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);
    const isDev = process.env.NODE_ENV === 'development';

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
    const DEBUG_MODE = true; // 🎯 Toggle this to switch modes

    // === Manual Transform State (for Debug Mode) ===
    // Initial values come from first keyframe in scrollAnimations.ts
    const [manualTransform, setManualTransform] = useState(getInitialTransform);
    const [rotateSpeed, setRotateSpeed] = useState(animationSettings.rotationSpeed);

    // === Scroll Animation (for Production Mode) ===
    const { transform: scrollTransform } = useScrollAnimation({
        enabled: !DEBUG_MODE, // Only enable when not in debug mode
    });

    // Choose which transform to use based on mode
    const modelTransform = DEBUG_MODE ? manualTransform : scrollTransform;

    // ========================================
    // LOADER TOGGLE
    // ========================================
    const SHOW_LOADER = false; // Set to true to show loader animation

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

        const hasInitialized = sessionStorage.getItem('3d-initialized');

        if (!hasInitialized) {
            resetLoaderToZero();
        } else {
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
        }

        is3DDisabled.current = shouldDisable3D();
    }, []);

    return (
        <Layout
            title="Home"
            description="Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance."
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

            {/* Debug Mode Indicator */}
            {/* {isDev && DEBUG_MODE && (
                <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg font-mono text-sm">
                    🔧 DEBUG MODE - Use Leva panel to adjust model
                </div>
            )} */}

            {/* Page wrapper for z-index stacking */}
            <div className="page-wrapper">
                {/* 3D Viewer */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        manualTransform={modelTransform}
                        rotateSpeed={rotateSpeed}
                        className="!z-20"
                    />
                )}

                {/* Front-layer Marquee Text - ON TOP of 3D model (right side only) */}
                {/* 
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
                                    maskImage: 'linear-gradient(to right, transparent 48%, black 52%)',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent 48%, black 52%)'
                                }}
                            >
                                <MarqueeText
                                    text="Revenue Cycle • AI-Powered • Winspire • "
                                    duration={45}
                                    fontSize="clamp(4rem, 14vw, 11rem)"
                                    color="#083151"
                                />
                            </div>

                            {/* === Bottom Left: Our Mission === */}
                            <div className="absolute left-15 bottom-10 pointer-events-auto z-10 max-w-md hero-text-fade">
                                <h3
                                    className="font-bold tracking-widest uppercase mb-2 font-[Outfit]"
                                    style={{ color: '#083151', fontSize: '12px' , marginBottom: '1rem' }}
                                >
                                    Our Mission
                                </h3>
                                <div className="text-2xl font-bold leading-tight font-[Outfit] text-gradient-shimmer">
                                    Revolutionizing Revenue Cycle with AI-Driven Precision.
                                </div>
                            </div>

                            {/* === Bottom Right: Scroll Indicator === */}
                            <div className="absolute right-8 bottom-12 pointer-events-auto z-10 flex flex-row items-center gap-4 hero-text-fade">
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

                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <Hero
                    title={`Welcome to the Future of Revenue Cycle`}
                    subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
                    ctaText="Explore Features"
                    ctaHref="#features"
                />

                {/* Placeholder sections for scroll testing */}
                <section id="features" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-blue-900/20">
                    <div className="text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                        <p className="text-xl opacity-70">Scroll to see 3D animation</p>
                    </div>
                </section>

                <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-purple-900/20">
                    <div className="text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">About Us</h2>
                        <p className="text-xl opacity-70">More scroll content here</p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
