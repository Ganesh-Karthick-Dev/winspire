/**
 * Book a Demo Page
 * 
 * Layers:
 * 1. Body with AnimatedBackground SVG (handled by Layout)
 * 2. 3D Model (same GLTFViewer as home page)
 * 3. Page content section
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';

// Same GLTFViewer as home page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function BookDemo() {
    const is3DDisabled = useRef(false);

    // Center model when ready
    const handleModelReady = useCallback((state: ThreeState) => {
        if (state.model) {
            state.model.position.x = 0;
            state.model.position.y = 0;
        }
    }, []);

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        const hasInitialized = sessionStorage.getItem('3d-initialized');
        if (!hasInitialized) {
            resetLoaderToZero();
        } else {
            // Already initialized - hide loader
            const loader = document.querySelector('.loader-overlay') as HTMLElement;
            if (loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
        }
    }, []);

    return (
        <Layout title="Book a Demo" description="Schedule a personalized demo">
            {/* Layer 2: 3D Model (fixed canvas at z-index: 2) */}
            {!is3DDisabled.current && (
                <GLTFViewer
                    url="/models/Winspire Logo.glb"
                    onModelReady={handleModelReady}
                />
            )}

            {/* Layer 3: Page content (z-index: 10) */}
            <section className="demo-hero-full">
                <div className="demo-hero-text-content">
                    <h1 className="demo-big-title">
                        WINSPIRE<br />
                        <span className="demo-title-accent">RCM</span>
                    </h1>
                </div>
            </section>
        </Layout>
    );
}
