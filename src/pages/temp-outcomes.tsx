/**
 * Outcomes Page
 * 
 * Features:
 * - Hero section (redesigned)
 * - CTA Section
 */

'use client';

'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import OutcomesHero from '@/components/outcomes/OutcomesHero';
import OutcomesContent from '@/components/outcomes/OutcomesContent';
import OutcomesSystems from '@/components/outcomes/OutcomesSystems';
import OutcomesCTA from '@/components/outcomes/OutcomesCTA';
import pageStyles from '@/styles/temp-outcomes.module.css'; 
import styles from '@/styles/company.module.css'; // Reusing Company styles for Hero

import { shouldDisable3D } from '@/lib/threeUtils';
import { outcomesScrollKeyframes } from '@/lib/outcomesScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as other pages
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Outcomes() {
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
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Layout title="Outcomes" description="Measurable results with Winspire RCM">
            {/* 3D Model - FIXED behind everything */}
            {!is3DDisabled.current && (
                <div className={`${styles.modelContainer} ${pageStyles.modelWrapper}`} style={{ zIndex: -1 }}>
                    <GLTFViewer
                        manualTransform={transform}
                        rotateSpeed={rotateSpeed}
                        enableWobble={enableWobble}
                        className="w-full h-full"
                    />
                </div>
            )}

            <div className={pageStyles.outcomesPageContent}>
                <OutcomesHero />
                <OutcomesContent />
                <OutcomesSystems />
                <OutcomesCTA />
            </div>
        </Layout>
    );
}
