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
import NeuraDifferentSection from '@/components/neura/NeuraDifferentSection';
import NeuraEfficiencySection from '@/components/neura/NeuraEfficiencySection';
import NeuraCapabilitiesSection from '@/components/neura/NeuraCapabilitiesSection';
import NeuraLivingSystemsSection from '@/components/neura/NeuraLivingSystemsSection';
import NeuraGeminiEffectSection from '@/components/neura/NeuraGeminiEffectSection';
import NeuraStaySecureSection from '@/components/neura/NeuraStaySecureSection';

import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ScrollKeyframe } from '@/lib/scrollAnimations';

/** Hero: model centered, tilted (rotation transform), no constant spin (rotateSpeed=0). After hero: usual footer. */
const tempNeuraHeroKeyframes: ScrollKeyframe[] = [
    // Hero section - model centered
    { scrollProgress: 0, label: 'Hero Center', transform: { position: { x: 0, y: -0.08, z: 0 }, rotation: { x: 22.177, y: -27.456, z: -23.23 }, scale: 7.5 } },
    // Hold position through middle sections
    { scrollProgress: 0.50, label: 'Hold Mid', transform: { position: { x: 0, y: -0.08, z: 0 }, rotation: { x: 22.177, y: -35, z: -23.23 }, scale: 7.5 } },
    { scrollProgress: 0.70, label: 'Hold', transform: { position: { x: 0, y: -0.08, z: 0 }, rotation: { x: 22.177, y: -42, z: -23.23 }, scale: 7.5 } },
    // Living Systems section (near end) - model moves to right side
    { scrollProgress: 0.80, label: 'Living Systems Trans', transform: { position: { x: 0.35, y: -0.05, z: 0 }, rotation: { x: 18, y: -30, z: -18 }, scale: 6 } },
    { scrollProgress: 0.88, label: 'Living Systems', transform: { position: { x: 0.6, y: 0, z: 0 }, rotation: { x: 12, y: -15, z: -12 }, scale: 5 } },
    { scrollProgress: 0.94, label: 'Living Systems Hold', transform: { position: { x: 0.6, y: 0, z: 0 }, rotation: { x: 12, y: -8, z: -12 }, scale: 5 } },
    // Footer transition
    { scrollProgress: 1.0, label: 'Footer', transform: { position: { x: 0, y: -0.34, z: 0.6 }, rotation: { x: -82.177, y: 180, z: 8.23 }, scale: 15 } },
];

const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export async function getStaticProps() {
    return { props: {} };
}

import NeuraCTASection from '@/components/neura/NeuraCTASection';
import NeuraBentoSection from '@/components/neura/NeuraBentoSection';
import NeuraIntegrationSection from '@/components/neura/NeuraIntegrationSection';
import NeuraClosingPerspectiveSection from '@/components/neura/NeuraClosingPerspectiveSection';

export default function TempNeuraAI() {
    const is3DDisabled = useRef(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const secondSectionRef = useRef<HTMLElement>(null);
    const whiteSectionRef = useRef<HTMLDivElement>(null);
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

    // Use Layout Effect for hero height if needed, but pinning is now handled by child components

    // Simple refresh to handle initial load variance
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh();
        // Small delay to allow any layout shifts to settle
        const timer = setTimeout(refresh, 500);
        window.addEventListener('load', refresh);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', refresh);
        };
    }, []);

    return (
        <Layout
            title="Neura AI (Temp)"
            description="Neura AI - The Intelligence That Makes Revenue Cycles Predictable"
        >
            <div className="temp-neura-page-wrapper">

                {/* Scroll Group: Hero + Second Section. 
                    Hero is sticky relative to THIS container. 
                    When this container scrolls away, Hero goes with it. */}
                <div className="temp-neura-hero-scroll-group">
                    <div ref={heroRef} className="temp-neura-hero-viewport">
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
                            {/* Text Layer - CSS mix-blend-mode cutout (production-reliable) */}
                            <div className="temp-neura-text-layer">
                                <div className="temp-neura-white-overlay">
                                    <div className="temp-neura-cutout-text">
                                        <h2 className="temp-neura-cutout-title">The Problem Neura Solves</h2>
                                        <p className="temp-neura-cutout-subtitle">
                                            Modern healthcare revenue cycles operate<br />
                                            in a constantly shifting environment:
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cards Layer - On Top */}
                            <div className="temp-neura-cards-layer">
                                <ProblemCardsSection pinTriggerRef={secondSectionRef} />
                            </div>
                        </div>
                    </section>
                </div>

                <NeuraDifferentSection />
                <NeuraEfficiencySection />
                <NeuraCapabilitiesSection />
                <NeuraLivingSystemsSection />
                <NeuraGeminiEffectSection />
                {/* <NeuraStaySecureSection /> - merged into GeminiEffectSection */}
                <NeuraCTASection />
                <NeuraBentoSection />
                <NeuraIntegrationSection />
                <NeuraClosingPerspectiveSection />

            </div>
        </Layout>
    );
}
