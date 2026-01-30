/**
 * Temp Neura AI Page
 *
 * Hero section with 3D model (centered, no spin), navbar and footer.
 * Sections will be added one by one.
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '@/components/Layout';
import NeuraHeroSection from '@/components/neura/NeuraHeroSection';
import ProblemCardsSection from '@/components/neura/ProblemCardsSection';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ScrollKeyframe } from '@/lib/scrollAnimations';

/** Hero: model centered, tilted (rotation transform), no constant spin (rotateSpeed=0). After hero: usual footer. */
const tempNeuraHeroKeyframes: ScrollKeyframe[] = [
    { scrollProgress: 0, label: 'Hero Center', transform: { position: { x: 0, y: -0.08, z: 0 }, rotation: { x: 22.177, y: -27.456, z: -23.23 }, scale: 7.5 } },
    { scrollProgress: 0.75, label: 'Hold', transform: { position: { x: 0, y: -0.08, z: 0 }, rotation: { x: 22.177, y: -37.456, z: -23.23 }, scale: 7.5 } },
    { scrollProgress: 1.0, label: 'Footer', transform: { position: { x: 0, y: -0.34, z: 0.6 }, rotation: { x: -82.177, y: 180, z: 8.23 }, scale: 15 } },
];

const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export async function getStaticProps() {
    return { props: {} };
}

export default function TempNeuraAI() {
    const is3DDisabled = useRef(false);
    const secondSectionRef = useRef<HTMLElement>(null);
    const whiteSectionRef = useRef<HTMLDivElement>(null);
    const secondTitleRef = useRef<HTMLHeadingElement>(null);
    const { transform } = useScrollAnimation({
        keyframes: tempNeuraHeroKeyframes,
    });
    const enableWobble = false;
    const rotateSpeed = 0; /* no constant spin on this page only */

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

    useEffect(() => {
        if (typeof window === 'undefined' || !secondSectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: secondSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: true,
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <Layout
            title="Neura AI (Temp)"
            description="Neura AI - The Intelligence That Makes Revenue Cycles Predictable"
        >
            <div className="temp-neura-page-wrapper">
                <div className="temp-neura-hero-viewport">
                    <div className="temp-neura-hero-bg" aria-hidden="true" />
                    {!is3DDisabled.current && (
                        <div className="temp-neura-model-layer">
                            <GLTFViewer
                                manualTransform={transform}
                                rotateSpeed={rotateSpeed}
                                enableWobble={enableWobble}
                                className="w-full h-full"
                            />
                        </div>
                    )}

                    <div className="temp-neura-hero-layer">
                        <NeuraHeroSection />
                    </div>
                </div>

                <section ref={secondSectionRef} className="temp-neura-second-section" aria-label="The Problem Neura Solves">
                    <div ref={whiteSectionRef} className="temp-neura-second-white">
                        <h2 ref={secondTitleRef} className="temp-neura-second-title">The Problem Neura Solves</h2>
                        <ProblemCardsSection pinTriggerRef={secondSectionRef} />
                    </div>
                </section>
            </div>
        </Layout>
    );
}
