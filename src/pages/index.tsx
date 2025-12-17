/**
 * Home Page (index.tsx)
 * 
 * Main single-page layout integrating:
 * - GLTFViewer (dynamically imported, SSR disabled)
 * - Poster (LCP target)
 * - Lenis smooth scrolling
 * - GSAP ScrollTrigger animations
 * - 3D model scroll-driven transforms
 * 
 * SEO Architecture:
 * - All text content is SSR-rendered
 * - 3D components load after hydration via requestIdleCallback
 * - Poster image is the LCP target (not 3D)
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MarqueeText from '@/components/MarqueeText';
import Section from '@/components/Section';
import FeaturesSection from '@/components/FeaturesSection';
import VisionSection from '@/components/VisionSection';
import PerformanceSection from '@/components/PerformanceSection';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D, prefersReducedMotion } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';

/**
 * Dynamically import GLTFViewer with SSR disabled.
 * Shows Poster as fallback while loading.
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Home() {
    // Ref to store Three.js state for GSAP animations
    const threeStateRef = useRef<ThreeState | null>(null);

    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);

    /**
     * Handle model ready callback
     * Sets up GSAP scroll-driven animations for the 3D model
     */
    const handleModelReady = useCallback((state: ThreeState) => {
        threeStateRef.current = state;

        // Set up scroll-driven 3D animations if motion is allowed
        if (!prefersReducedMotion()) {
            setupScrollAnimations(state);
        }
    }, []);

    /**
     * Set up Lenis smooth scroll and GSAP ScrollTrigger
     */
    useEffect(() => {
        // Check if 3D viewer was already initialized this session
        // (avoids showing loader on client-side navigation back to home)
        const hasInitialized = sessionStorage.getItem('3d-initialized');

        if (!hasInitialized) {
            // First visit - show and reset loader
            resetLoaderToZero();
        } else {
            // Returning via client-side navigation - hide loader immediately
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
        }

        // Check if 3D should be disabled
        is3DDisabled.current = shouldDisable3D();

        // Skip animations if reduced motion preferred
        if (prefersReducedMotion()) {
            return;
        }

        let lenis: import('lenis').default | undefined;
        let rafId: number;

        const setupScrolling = async () => {
            try {
                // Dynamically import Lenis and GSAP
                const [LenisModule, { gsap }, { ScrollTrigger }] = await Promise.all([
                    import('lenis'),
                    import('gsap'),
                    import('gsap/ScrollTrigger'),
                ]);

                gsap.registerPlugin(ScrollTrigger);

                // Apply ScrollTrigger defaults for SEO-friendly animations
                ScrollTrigger.defaults({
                    anticipatePin: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                });

                // Initialize Lenis smooth scroll
                lenis = new LenisModule.default({
                    lerp: 0.08,
                    smoothWheel: true,
                });

                // RAF loop for Lenis
                const raf = (time: number) => {
                    lenis?.raf(time);
                    rafId = requestAnimationFrame(raf);
                };
                rafId = requestAnimationFrame(raf);

                // Sync Lenis with ScrollTrigger
                lenis.on('scroll', ScrollTrigger.update);

                // ScrollerProxy for Lenis
                ScrollTrigger.scrollerProxy(document.body, {
                    scrollTop(value?: number) {
                        if (typeof value === 'number') {
                            lenis?.scrollTo(value);
                        }
                        return lenis?.scroll ?? 0;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        };
                    },
                });

                // Refresh ScrollTrigger after setup
                ScrollTrigger.refresh();

            } catch (error) {
                console.error('Failed to initialize scroll system:', error);
            }
        };

        setupScrolling();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            lenis?.destroy();
        };
    }, []);

    return (
        <Layout
            title="Home"
            description="Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance."
        >
            {/* Page wrapper for z-index stacking */}
            <div className="page-wrapper">
                {/* 
          3D Viewer - loaded dynamically after hydration
          Uses requestIdleCallback for non-blocking initialization
        */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        url="/models/Winspire glossy Logo.glb"
                        onModelReady={handleModelReady}
                        className="!z-20"
                    />
                )}

                {/* 
          Hero Section
          - SSR-rendered content for SEO
          - Trigger area for initial 3D animation
        */}
                <Hero
                    title={`Welcome to the Future of Revenue Cycle`}
                    subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
                    ctaText="Explore Features"
                    ctaHref="#features"
                />

                {/* Marquee Text - scroll-driven horizontal animation */}
                <MarqueeText text="Get Results. Not Just Promise." />

                {/* Features Section - Two column with animated content */}
                <FeaturesSection />

                {/* Performance Section - Scroll-driven text transition */}
                <PerformanceSection />

                {/* Vision Section - before footer */}
                <VisionSection />
            </div>
        </Layout>
    );
}

/**
 * Set up scroll-driven animations for the 3D model
 * Uses GSAP to animate camera and model based on scroll position
 */
async function setupScrollAnimations(state: ThreeState) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const { model, camera } = state;
    if (!model) return;

    // Use MatchMedia for responsive animations
    const mm = gsap.matchMedia();

    // Desktop Animations (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
        // Hero section: animate camera zoom
        gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        }).to(camera.position, {
            z: 2.5,
            ease: 'none',
        });

        // Features section: move model into glossy box on right side
        gsap.timeline({
            scrollTrigger: {
                trigger: '#features',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
            },
        })
            .to(model.position, {
                x: 0.55,  // Center in the glossy box
                y: 0,     // Center vertically
                z: 0,
                ease: 'power2.out',
            }, 0)
            .to(model.rotation, {
                x: 1,
                y: Math.PI * 0.25,  // Gentle rotation
                ease: 'none',
            }, 0);

        // Pin the features section to hold model in place while scrolling
        ScrollTrigger.create({
            trigger: '#features',
            start: 'top top',
            end: '+=100%',  // Pin for one full viewport scroll
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
        });

        // When leaving features section (after pin), restore model position
        gsap.timeline({
            scrollTrigger: {
                trigger: '#features',
                start: 'bottom bottom',
                end: '+=50%',
                scrub: true,
            },
        })
            .to(model.position, {
                x: 0.8,   // Back to original position
                y: 0,
                z: 0,
                ease: 'power2.out',
            }, 0);
    });

    // Mobile Animations (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
        // Hero: No pinning on mobile to avoid scroll jank

        // Features section: Move model to BOTTOM (y negative)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#features',
                start: 'top center',
                end: 'center center',
                scrub: true,
            },
        })
            .to(model.position, {
                x: 0,     // Center horizontally
                y: -0.2,  // Move to bottom (closer to center)
                z: 0.5,   // Bring slightly closer
                ease: 'power2.out',
            }, 0)
            .to(model.rotation, {
                x: 0.5,
                y: Math.PI * 0.1,
                ease: 'none',
            }, 0);

        // No pinning for Features on mobile - lets content flow naturally
    });

    // Performance section: continue rotation (Common)
    gsap.timeline({
        scrollTrigger: {
            trigger: '#performance',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    }).to(model.rotation, {
        y: Math.PI * 0.75,  // 135 degrees total
        ease: 'none',
    });

    // Vision section: move model to left and scale down (Common logic)
    // Note: Starts from whatever position previous timeline left it
    gsap.timeline({
        scrollTrigger: {
            trigger: '#vision',
            start: 'top bottom',
            end: 'center center',
            scrub: true,
        },
    })
        .to(model.position, {
            x: -0.9,
            y: 0.3,
            ease: 'power2.out',
        }, 0)
        .to(model.scale, {
            x: -50.9,
            y: -50.9,
            z: -50.9,
            ease: 'power2.out',
        }, 0)
        .to(model.rotation, {
            x: Math.PI * 1.003,
            y: Math.PI * 2,
            ease: 'none',
        }, 0);
}
