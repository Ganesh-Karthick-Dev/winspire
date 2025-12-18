/**
 * Home Page (index.tsx)
 * 
 * Main single-page layout integrating:
 * - GLTFViewer (dynamically imported, SSR disabled)
 * - ModelDebugGUI for live 3D controls
 * - Lenis smooth scrolling
 * - GSAP ScrollTrigger animations
 * 
 * SEO Architecture:
 * - All text content is SSR-rendered
 * - 3D components load after hydration via requestIdleCallback
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { modelSettings } from '@/config/three-settings';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';

/**
 * Dynamically import GLTFViewer with SSR disabled.
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

/**
 * Dynamically import ModelDebugGUI (only in dev mode)
 */
const ModelDebugGUI = dynamic(() => import('@/components/ModelDebugGUI'), {
    ssr: false,
});

export default function Home() {
    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);

    // === LIVE 3D MODEL CONTROLS (State-based for real-time updates) ===
    const [modelTransform, setModelTransform] = useState<{
        scale: number;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
    }>({
        scale: modelSettings.manualTransform.scale,
        position: { ...modelSettings.manualTransform.position },
        rotation: { ...modelSettings.manualTransform.rotation },
    });

    const [rotateSpeed, setRotateSpeed] = useState<number>(modelSettings.animation.rotateSpeed);

    // Show debug GUI only in development
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
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
            {/* Debug GUI - Only visible in development */}
            {isDev && (
                <ModelDebugGUI
                    transform={modelTransform}
                    onTransformChange={setModelTransform}
                    rotateSpeed={rotateSpeed}
                    onRotateSpeedChange={setRotateSpeed}
                />
            )}

            {/* Page wrapper for z-index stacking */}
            <div className="page-wrapper">
                {/* 3D Viewer with LIVE state-based controls */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        manualTransform={modelTransform}
                        rotateSpeed={rotateSpeed}
                        className="!z-20"
                    />
                )}

                {/* Hero Section */}
                <Hero
                    title={`Welcome to the Future of Revenue Cycle`}
                    subtitle="AI-Powered. System-Driven. Outcome-Guaranteed"
                    ctaText="Explore Features"
                    ctaHref="#features"
                />
            </div>
        </Layout>
    );
}
