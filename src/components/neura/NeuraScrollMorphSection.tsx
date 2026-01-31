import React from 'react';
import dynamic from 'next/dynamic';
import styles from './NeuraScrollMorphSection.module.css';

// Dynamically import ScrollMorphHero (no SSR)
const ScrollMorphHero = dynamic(() => import('@/components/ui/scroll-morph-hero'), {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading...</div>,
});

const NeuraScrollMorphSection = () => {
    return (
        <section
            id="scroll-morph"
            className={styles.section}
            aria-label="Interactive Showcase"
        >
            {/* Sticky container that pins the content while scrolling through the section */}
            <div className={styles.stickyContainer}>
                <div className={styles.content}>
                    <ScrollMorphHero />
                </div>
            </div>
        </section>
    );
};

export default NeuraScrollMorphSection;
