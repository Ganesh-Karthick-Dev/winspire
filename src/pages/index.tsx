/**
 * Home Page (index.tsx)
 * 
 * Main single-page layout integrating:
 * - GLTFViewer (dynamically imported, SSR disabled)
 * - Poster (LCP target)
 * - Lenis smooth scrolling
 * - GSAP ScrollTrigger animations
 * 
 * SEO Architecture:
 * - All text content is SSR-rendered
 * - 3D components load after hydration via requestIdleCallback
 * - Poster image is the LCP target (not 3D)
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { modelSettings } from '@/config/three-settings';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MarqueeText from '@/components/MarqueeText';
import Section from '@/components/Section';
import FeaturesSection from '@/components/FeaturesSection';
import VisionSection from '@/components/VisionSection';
import PerformanceSection from '@/components/PerformanceSection';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D, prefersReducedMotion } from '@/lib/threeUtils';

/**
 * Dynamically import GLTFViewer with SSR disabled.
 * Shows Poster as fallback while loading.
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Home() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);

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
                        // Use Manual Config from three-settings.ts ONLY for Home Page
                        manualTransform={modelSettings.manualTransform}
                        rotateSpeed={modelSettings.animation.rotateSpeed}
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
