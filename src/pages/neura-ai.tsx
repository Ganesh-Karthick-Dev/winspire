/**
 * Neura AI Page
 * 
 * Clean page with only navbar and footer.
 * Old content available at: /old-neura-ai
 */

'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';

export default function NeuraAI() {
    useEffect(() => {
        // Hide the loader immediately since this is a simple page
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Neura AI" description="Discover Winspire's Neura AI - intelligent automation for healthcare">
            {/* Add new sections here */}
        </Layout>
    );
}
