/**
 * Outcomes Page
 * 
 * Features:
 * - Same Hero section as Company/Solutions pages
 * - 3D Model with scroll animation
 * - Existing Outcomes content sections
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import OutcomesContent from '@/components/outcomes/OutcomesContent';
import OutcomesHero from '@/components/outcomes/OutcomesHero';

import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css'; // Reusing Company styles for Hero

import { outcomesScrollKeyframes } from '@/lib/outcomesScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as other pages
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Outcomes() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Outcomes page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: outcomesScrollKeyframes
    });

    // Keep rotation active, disable wobble at the end
    const enableWobble = scrollProgress <= 0.95;
    const rotateSpeed = 0.003;

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');

        // Note: Hero animations are now handled within OutcomesHero (if any) or are static CSS
        // The 3D model animation is handled by useScrollAnimation hook above

    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Layout title="Outcomes" description="Measurable results with Winspire RCM">
            {/* 3D Model - FIXED behind everything */}
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

            {/* Hero Section */}
            <OutcomesHero />



            {/* New Outcomes Content */}
            <div id="outcomes-content" style={{ marginTop: '0' }}>
                <OutcomesContent />
            </div>


        </Layout>
    );
}
