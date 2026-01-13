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

            {/* Container Scroll with Side Content - Using Absolute Positioning */}
            <div style={{ position: 'relative', zIndex: 10 }}>

                {/* Left Side - Absolute Position */}
                <div style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '320px'
                }} className="hidden xl:block">
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '32px', lineHeight: 1.3 }}>
                        Information Collection <span style={{ color: 'white', opacity: 0.7 }}>→</span> Intelligent Action
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
                        In most RCM teams, time is lost to:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {['Calling payers', 'Logging into multiple portals', 'Waiting on handoffs', 'Reconciling delayed reports'].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '1.05rem',
                                marginBottom: '12px'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginTop: '28px' }}>
                        Neura eliminates this drag.
                    </p>
                </div>

                {/* Center - Tablet (Original Layout) */}
                <div className="relative z-10" style={{ width: 'calc(100% - 1.5rem)', margin: '0.6rem auto' }}>
                    <div className="flex flex-col items-center overflow-hidden rounded-3xl">
                        <ContainerScroll
                            titleComponent={
                                <>
                                    <h1 className="text-4xl font-semibold text-white text-center mx-auto">
                                        The Biggest Shift <br />
                                        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block">
                                            Neura Creates
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

                {/* Right Side - Absolute Position */}
                <div style={{
                    position: 'absolute',
                    right: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '320px'
                }} className="hidden xl:block">
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '20px', lineHeight: 1.5 }}>
                        With live connectivity to <span style={{ color: 'white', fontWeight: 700 }}>1,300+ payers</span>, Neura retrieves in seconds:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Claim status',
                            'Eligibility and benefits',
                            'Coverage discovery & COB',
                            'Authorization status',
                            'Payer response signals'
                        ].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '1.05rem',
                                marginBottom: '12px'
                            }}>
                                <svg style={{ width: '18px', height: '18px', color: 'white', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                            Clarifications happen within <span style={{ fontWeight: 700, color: 'white' }}>minutes</span>.
                        </p>
                        <p style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600 }}>
                            Claim velocity improves — without adding headcount.
                        </p>
                    </div>
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
