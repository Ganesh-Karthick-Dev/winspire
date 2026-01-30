import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import SolutionsHero from '../components/solutions/SolutionsHero';
import SolutionsContent from '../components/solutions/SolutionsContent';
import { solutionsScrollKeyframes } from '@/lib/solutionsScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css';

const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function TempSolutions() {
    const is3DDisabled = useRef(false);
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: solutionsScrollKeyframes
    });

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();
        // Hide the global loader that is injected in _document.tsx
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Solutions" description="Revenue Solutions Designed Around Your Outcomes">
            {/* 3D Model - FIXED behind everything */}
            {!is3DDisabled.current && (
                <div className={styles.modelContainer}>
                    <GLTFViewer
                        manualTransform={transform}
                        rotateSpeed={0.003}
                        enableWobble={scrollProgress <= 0.95}
                        className="w-full h-full"
                    />
                </div>
            )}
            <SolutionsHero />
            <SolutionsContent />
        </Layout>
    );
}
