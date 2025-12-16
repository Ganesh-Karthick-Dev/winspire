'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/PerformanceSection.module.css';

// Text slides data
const slides = [
    {
        id: 1,
        text: "After decades of manual revenue cycle management, one thing hasn't changed: collections remain unpredictable.",
        isGlow: false,
    },
    {
        id: 2,
        text: "It's time for AI-powered intelligence.",
        isGlow: true,
    },
];

export default function PerformanceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress within the section
            // When section top is at viewport top, progress starts
            const scrolledIntoSection = -rect.top;
            const scrollableDistance = sectionHeight - viewportHeight;

            if (scrollableDistance > 0) {
                const progress = Math.max(0, Math.min(1, scrolledIntoSection / scrollableDistance));
                const slideIndex = Math.min(Math.floor(progress * slides.length), slides.length - 1);
                setActiveSlide(slideIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="performance" className={styles.section}>
            {/* Sticky container - this stays fixed while scrolling through section */}
            <div className={styles.stickyContainer}>
                {/* Radial glow background */}
                <div className={styles.glowBackground} />

                {/* Text container */}
                <div className={styles.textContainer}>
                    <div className={styles.slidesWrapper}>
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`${styles.textSlide} ${index === activeSlide ? styles.active : ''}`}
                            >
                                <p className={`${styles.slideText} ${slide.isGlow ? styles.glow : ''}`}>
                                    {slide.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
