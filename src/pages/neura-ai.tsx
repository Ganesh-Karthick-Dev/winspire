/**
 * Neura AI Page
 * 
 * Clean page with parallax hero section.
 * Old content available at: /old-neura-ai
 */

'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export default function NeuraAI() {
    useEffect(() => {
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
            {/* Parallax Hero Section - position absolute to overlay from top */}
            <ParallaxComponent title="Neura AI" />

            {/* Add more sections below */}
        </Layout>
    );
}
