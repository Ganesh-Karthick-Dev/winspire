'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef } from 'react';
import type { ThreeState } from '@/lib/threeManager';

import Navbar from '@/components/Navbar';

// Dynamic imports for heavy components
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

const DemoBlendText = dynamic(() => import('@/components/DemoBlendText'), {
    ssr: false,
    loading: () => null,
});

export default function OutcomesHero() {
    // Handle 3D model ready state and initial animation
    const handleModelReady = useCallback(async (state: ThreeState) => {
        if (!state.model) return;

        const { gsap } = await import('gsap');

        // Initial position: Start from right side (off-screen or edge)
        gsap.set(state.model.position, { x: 5, y: 0 });
        gsap.set(state.model.scale, { x: 120, y: 120, z: 120 });

        // Animate to center-left
        gsap.to(state.model.position, {
            x: 0,
            y: 0,
            duration: 2,
            ease: 'power3.out',
        });

        // Continuous rotation is handled by GLTFViewer internally
    }, []);

    return (
        <section
            className="relative mx-auto overflow-hidden bg-[#0F172A]"
            style={{
                width: '98%',
                height: '90vh',
                minHeight: 'unset',
                marginTop: '1vh',
                marginBottom: '1vh',
                marginLeft: '2vh',
                borderRadius: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                zIndex: 1
            }}
        >
            {/* Navbar inside the card */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* 3D Model Layer */}
            <div className="absolute inset-0 z-10">
                <GLTFViewer
                    url="/models/Winspire Logo.glb"
                    onModelReady={handleModelReady}
                    className="w-full h-full"
                />
            </div>

            {/* Blended Text Layer */}
            <DemoBlendText
                text1="OUTCOMES"
                text2=""
                yPosition={0.8}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 20,
                    pointerEvents: 'none'
                }}
            />


        </section>
    );
}
