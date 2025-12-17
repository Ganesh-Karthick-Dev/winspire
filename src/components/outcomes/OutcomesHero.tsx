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

        // Calculate visible width at z=0
        const camera = state.camera;
        const vFOV = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;

        // Calculate positions for "half visible" (center at screen edge)
        const startX = -visibleWidth / 2; // Start from Left
        const endX = visibleWidth / 2;    // End at Right

        // Initial position: Start from left side (half visible)
        gsap.set(state.model.position, { x: startX, y: 0 });
        gsap.set(state.model.scale, { x: 180, y: 180, z: 180 });

        // Animate to right side (half visible)
        gsap.to(state.model.position, {
            x: endX,
            y: 0,
            duration: 7, // Balanced duration
            ease: 'power1.inOut', // Smooth start and end
        });

        // Continuous rotation is handled by GLTFViewer internally
    }, []);

    return (
        <section
            id="outcomes-hero"
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

                    onModelReady={handleModelReady}
                    className="w-full h-full"
                />
            </div>

            {/* Blended Text Layer */}
            <DemoBlendText
                text1="OUTCOMES"
                text2=""
                yPosition={0.8}
                textColor="#ffffff"
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
