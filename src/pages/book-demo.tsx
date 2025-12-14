/**
 * Book a Demo Page
 * 
 * Layers:
 * 1. Body with AnimatedBackground SVG (handled by Layout)
 * 2. 3D Model (same GLTFViewer as home page)
 * 3. Blending text (canvas-based)
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import { shouldDisable3D } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';

// Same GLTFViewer as home page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

// Blend text component
const DemoBlendText = dynamic(() => import('@/components/DemoBlendText'), {
    ssr: false,
    loading: () => null,
});

import StackingCards from '@/components/StackingCards';
import PremiumButton from '@/components/PremiumButton';
import styles from '@/styles/book-demo.module.css';

export default function BookDemo() {
    const is3DDisabled = useRef(false);

    // Smoothly center model when ready
    const handleModelReady = useCallback(async (state: ThreeState) => {
        if (state.model) {
            // Import GSAP for smooth animation
            const { gsap } = await import('gsap');

            // Animate model to left side
            gsap.to(state.model.position, {
                x: -1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
            });

            // Make model bigger
            gsap.to(state.model.scale, {
                x: 180,
                y: 180,
                z: 180,
                duration: 1.2,
                ease: 'power2.out',
            });
        }
    }, []);

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        // Always hide loader on this page
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }

        // Hide grid transition
        const grid = document.querySelector('.grid-transition') as HTMLElement;
        if (grid) {
            grid.style.visibility = 'hidden';
        }

        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Book a Demo" description="Schedule a personalized demo">
            {/* Hero Section with Absolute Content */}
            <section className="demo-hero-full">
                {/* Layer 2: 3D Model (absolute inside relative section) */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        url="/models/Winspire Logo.glb"
                        onModelReady={handleModelReady}
                        className="absolute inset-0 w-full h-full"
                    />
                )}

                {/* Layer 3: Blending Text (absolute inside relative section) */}
                <DemoBlendText
                    text1="WINSPIRE"
                    text2="RCM"
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />

                {/* Hero Content */}
                <div className={styles.demoHeroContent}>
                    <div className={styles.demoHeroCard}>
                        {/* Headline */}
                        <h1 className={styles.demoHeroHeadline}>
                            See How AI Can Transform Your Revenue Cycle in Just 30 Minutes.
                        </h1>

                        {/* Subheadline */}
                        <p className={styles.demoHeroSubheadline}>
                            Experience Neura AI live. Watch how it predicts denials, automates workflows, checks live status, accelerates cash flow, and brings total visibility across your entire revenue cycle.
                        </p>

                        {/* Supporting Line */}
                        <p className={styles.demoHeroSupporting}>
                            No pressure. No obligations. No long presentations.<br />
                            Just clarity, insights, and real answers to your challenges.
                        </p>

                        {/* CTA Buttons */}
                        <div className={styles.demoHeroButtons}>
                            {/* Primary Button with Animations */}
                            <PremiumButton
                                text="Book My Demo"
                                variant="primary"
                            />

                            {/* Secondary Button with Animations */}
                            <PremiumButton
                                text="Talk to an RCM Expert"
                                variant="secondary"
                                showArrow
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stacking Cards Section */}
            <StackingCards />
        </Layout>
    );
}

