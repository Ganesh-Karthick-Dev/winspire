import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NeuraScrollMorphSection.module.css';

// Dynamically import ScrollMorphHero (no SSR)
const ScrollMorphHero = dynamic(() => import('@/components/ui/scroll-morph-hero'), {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading...</div>,
});

const NeuraScrollMorphSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=3500",
                pin: true,
                scrub: 0.1,
                onUpdate: (self) => {
                    setProgress(self.progress);
                },
                invalidateOnRefresh: true, // Important for resize
            });

            // Refresh after mount/layout (fix for dynamic content shifts)
            setTimeout(() => ScrollTrigger.refresh(), 1000);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="scroll-morph"
            className={styles.section}
            aria-label="Interactive Showcase"
        >
            <div ref={contentRef} className={styles.stickyContainer}>
                <div className={styles.content}>
                    <ScrollMorphHero scrollProgress={progress} />
                </div>
            </div>
        </section>
    );
};

export default NeuraScrollMorphSection;
