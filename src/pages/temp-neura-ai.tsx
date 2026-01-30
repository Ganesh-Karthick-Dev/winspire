/**
 * Temp Neura AI Page
 *
 * Hero section with 3D model behind, navbar and footer.
 * Sections will be added one by one.
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import NeuraHeroSection from '@/components/neura/NeuraHeroSection';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { bookDemoScrollKeyframes } from '@/lib/bookDemoScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/neura.module.css';

const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export async function getStaticProps() {
    return { props: {} };
}

export default function TempNeuraAI() {
    const is3DDisabled = useRef(false);
    const { transform, scrollProgress } = useScrollAnimation({
        keyframes: bookDemoScrollKeyframes,
    });
    const enableWobble = scrollProgress <= 0.95;
    const rotateSpeed = 0.003;

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();
        resetLoaderToZero();

        const safetyTimeout = setTimeout(() => {
            const progressEl = document.querySelector('.loader-progress');
            const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
            if (progressEl && progressEl.textContent === '0%' && loaderOverlay) {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.visibility = 'hidden';
                document.body.classList.remove('loading');
            }
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, []);

    return (
        <Layout
            title="Neura AI (Temp)"
            description="Neura AI - The Intelligence That Makes Revenue Cycles Predictable"
        >
            {/* 3D model - fixed behind hero */}
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

            <NeuraHeroSection />
        </Layout>
    );
}
