/**
 * Company Page
 * 
 * Hero section inspired by modern full-screen design
 * with bold typography at the bottom
 */

'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { shouldDisable3D } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';
import styles from '@/styles/company.module.css';

// 3D Model
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Company() {
    const is3DDisabled = useRef(false);
    const heroTextRef = useRef<HTMLHeadingElement>(null);

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

        // Animate hero text on load
        const animateHeroText = async () => {
            const { gsap } = await import('gsap');

            if (heroTextRef.current) {
                gsap.fromTo(heroTextRef.current,
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: 0.3,
                    }
                );
            }
        };

        animateHeroText();
    }, []);

    // Set up model animation
    const handleModelReady = async (state: ThreeState) => {
        if (!state.model) return;

        const { gsap } = await import('gsap');

        // Position model to center
        gsap.to(state.model.position, {
            x: 0,
            y: 0.2,
            duration: 1.5,
            ease: 'power2.out',
        });

        gsap.to(state.model.scale, {
            x: 190,
            y: 190,
            z: 190,
            duration: 1.5,
            ease: 'power2.out',
        });

        // Add subtle tilt for 3D perspective
        gsap.to(state.model.rotation, {
            x: 0.8,
            z: -0.08,
            duration: 1.5,
            ease: 'power2.out',
        });

        // Slow continuous rotation on Y axis
        const rotate = () => {
            if (state.model) {
                state.model.rotation.y += 0.002;
            }
            requestAnimationFrame(rotate);
        };
        rotate();
    };

    return (
        <Layout title="Company" description="About Winspire RCM">
            {/* Hero Section - Full Screen */}
            <section className={styles.heroSection}>
                {/* 3D Model Background */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        url="/models/Winspire Logo.glb"
                        onModelReady={handleModelReady}
                        className="absolute inset-0 w-full h-full"
                    />
                )}

                {/* Hero Content */}
                <div className={styles.heroContent}>
                    <h1 ref={heroTextRef} className={styles.heroTitle}>
                        Who We Are
                    </h1>
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>Scroll</span>
                    <div className={styles.scrollArrow}>↓</div>
                </div>
            </section>
        </Layout>
    );
}
