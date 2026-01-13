/**
 * Neura AI Page
 * 
 * Clean page with parallax hero section.
 * Old content available at: /old-neura-ai
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';
import { ParallaxContentSection } from '@/components/ui/parallax-content-section';
import { shouldDisable3D } from '@/lib/threeUtils';
import { bookDemoScrollKeyframes } from '@/lib/bookDemoScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/neura.module.css';
import NeuraCapabilitiesSection from '@/components/neura/NeuraCapabilitiesSection';

// 3D Model
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

// Why Neura Section - needs SSR disabled for React Flow
const WhyNeuraSection = dynamic(() => import('@/components/WhyNeuraSection'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '100vh', background: '#0a1628' }} />,
});

export default function NeuraAI() {
    const is3DDisabled = useRef(false);

    // Use scroll animation for 3D model (same as book-demo page)
    const { transform, scrollProgress } = useScrollAnimation({
        keyframes: bookDemoScrollKeyframes
    });

    const enableWobble = scrollProgress <= 0.95;
    const rotateSpeed = 0.003;

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        // Hide the loader immediately
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Neura AI" description="Discover Winspire's Neura AI - intelligent automation for healthcare">
            {/* 3D Model - FIXED behind everything (like book-demo page) */}
            {!is3DDisabled.current && (
                <div className={styles.modelContainer}>
                    <GLTFViewer
                        manualTransform={transform}
                        rotateSpeed={rotateSpeed}
                        enableWobble={enableWobble}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Parallax Hero Section */}
            <ParallaxComponent title="Neura AI" />

            {/* Content Section - Related to Hero */}
            <ParallaxContentSection />

            {/* Why Neura AI Is Fundamentally Different Section */}
            <WhyNeuraSection />

            {/* Neura Capabilities Section - from old page */}
            <div id="capabilities" style={{ scrollMarginTop: '100px' }}>
                <NeuraCapabilitiesSection />
            </div>

        </Layout>
    );
}

