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
import DemoForm from '@/components/DemoForm';
import ZeroRiskSection from '@/components/ZeroRiskSection';
import PremiumButton from '@/components/PremiumButton';
import styles from '@/styles/book-demo.module.css';

export default function BookDemo() {
    const is3DDisabled = useRef(false);

    // Set up model and scroll animation
    const handleModelReady = useCallback(async (state: ThreeState) => {
        if (!state.model) return;

        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Smooth initial entry: animate to left side
        gsap.to(state.model.position, {
            x: -1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
        });

        gsap.to(state.model.scale, {
            x: 140,
            y: 140,
            z: 140,
            duration: 1.2,
            ease: 'power2.out',
        });

        // When form section comes into view, move model to right side and scale down
        ScrollTrigger.create({
            trigger: '.form-section',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            onUpdate: (self) => {
                // Move from left (-1) to right (1.2)
                state.model!.position.x = -1 + (self.progress * 2.2);

                // Scale from 140 to 100
                const newScale = 140 - (self.progress * 40);
                state.model!.scale.set(newScale, newScale, newScale);
            }
        });

        // When ZeroRisk section comes into view, move to center with flip and scale up
        ScrollTrigger.create({
            trigger: '.zero-risk-section',
            start: 'top 90%',
            end: 'top 20%',
            scrub: 1.5,
            onUpdate: (self) => {
                // Move from right (1.2) to center (0)
                state.model!.position.x = 1.2 - (self.progress * 1.2);

                // Move up slightly
                state.model!.position.y = self.progress * 0.3;

                // Side flip effect - rotate on Z axis (like tilting side to side)
                // Use a subtle tilt + full Y rotation for a nice effect
                state.model!.rotation.z = Math.sin(self.progress * Math.PI) * 0.3;
                state.model!.rotation.y = self.progress * Math.PI * 2;

                // Scale from 100 to 180
                const newScale = 100 + (self.progress * 80);
                state.model!.scale.set(newScale, newScale, newScale);
            }
        });
    }, []);

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        // Hide loader
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }

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

            {/* Demo Form Section */}
            <section className={`${styles.formSection} form-section`}>
                <DemoForm />
            </section>

            {/* Zero-Risk Demo Section */}
            <ZeroRiskSection />
        </Layout>
    );
}

