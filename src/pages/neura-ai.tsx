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
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';
import Image from 'next/image';

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

            {/* Container Scroll Animation Section - Matching Hero Card Design */}
            <div className="relative z-10" style={{ width: 'calc(100% - 1.5rem)', margin: '0.6rem auto' }}>
                <div className="flex flex-col items-center overflow-hidden rounded-3xl">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <h1 className="text-4xl font-semibold text-white text-center mx-auto">
                                    Experience the Future of <br />
                                    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block">
                                        Healthcare RCM
                                    </span>
                                </h1>
                            </>
                        }
                    >
                        <Image
                            src="/poster/dashboard_new.jpg"
                            alt="Neura AI Dashboard"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-center"
                            draggable={false}
                        />
                    </ContainerScroll>
                </div>
            </div>

            {/* Interactive Bento Gallery Section */}
            <div className="py-20 relative z-10 w-full flex justify-center">
                <InteractiveBentoGallery
                    mediaItems={[
                        { id: 1, type: "image", title: "Quality Dashboard", desc: "Quality metrics and performance tracking", url: "/bento/img1.jpg", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
                        { id: 2, type: "image", title: "Production Analytics", desc: "Real-time production monitoring", url: "/bento/img2.jpg", span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2" },
                        { id: 3, type: "image", title: "Learning Module", desc: "Training completion progress", url: "/bento/img3.jpg", span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2" },
                        { id: 4, type: "image", title: "Denial Management", desc: "Claims denial analytics and trends", url: "/bento/img4.jpg", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
                        { id: 5, type: "image", title: "Compliance Dashboard", desc: "Audit outcomes and compliance tracking", url: "/bento/img5.jpg", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
                        { id: 6, type: "image", title: "Team Performance", desc: "Team analytics and KPIs", url: "/bento/img6.jpg", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
                        { id: 7, type: "image", title: "Eligibility & Benefits", desc: "Patient eligibility verification", url: "/bento/img7.jpg", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
                        { id: 8, type: "image", title: "Account Receivables", desc: "AR aging and financial tracking", url: "/bento/img8.jpg", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
                        { id: 9, type: "image", title: "AR Health Dashboard", desc: "Client health and revenue insights", url: "/bento/img9.jpg", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
                    ]}
                    title=""
                    description=""
                />
            </div>

        </Layout>
    );
}

