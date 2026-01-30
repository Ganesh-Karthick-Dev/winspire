/**
 * Temp Neura AI Page
 *
 * Stub page with navbar and footer only.
 * Sections will be added one by one.
 */

import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { resetLoaderToZero } from '@/lib/loaderManager';

export default function TempNeuraAI() {
    useEffect(() => {
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
            description="Neura AI - sections in progress"
        >
            {/* Main content - sections to be added here */}
            <div style={{ minHeight: '50vh' }} />
        </Layout>
    );
}
