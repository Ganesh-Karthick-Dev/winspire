'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

import styles from '@/styles/OutcomesTeam.module.css';

export default function OutcomesTeam() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const textsRef = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;
        const texts = textsRef.current;

        if (!section || !leftCol || !rightCol) return;

        // Check if mobile - skip complex animations
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        const ctx = gsap.context(() => {
            // Pin the left column while scrolling through the right column
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                pin: leftCol,
                pinSpacing: false,
            });

            // Animate text opacity on scroll - Word by Word
            texts.forEach((text, index) => {
                if (!text) return;

                const words = text.querySelectorAll(`.${styles.word}`);

                gsap.fromTo(words,
                    { opacity: 0.3, color: '#6b7280', y: 20 },
                    {
                        opacity: 1,
                        color: '#ffffff',
                        y: 0,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 95%',
                            end: 'top 50%',
                            scrub: 1,
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const paragraphs = [
        "Our team of architects, urban planners, and design thinkers came together to build something bold: a modern village where people, experiences, and convenience converge.",
        "We believe that true innovation happens at the intersection of disciplines."
    ];

    return (
        <section
            id="outcomes-team"
            ref={sectionRef}
            className={styles.section}
        >
            {/* ===== DESKTOP VIEW ===== */}
            <div className={styles.desktopView}>
                <div className={styles.grid}>

                    {/* Left Column - Sticky */}
                    <div ref={leftColRef} className={styles.leftColumn}>
                        <p className={styles.stickyLabel}>
                            Every square foot has been thoughtfully considered
                        </p>
                    </div>

                    {/* Right Column - Scrollable Content */}
                    <div ref={rightColRef} className={styles.rightColumn}>
                        {paragraphs.map((text, index) => (
                            <div
                                key={index}
                                className={styles.paragraphContainer}
                            >
                                <p
                                    ref={(el) => { textsRef.current[index] = el; }}
                                    className={styles.paragraph}
                                >
                                    {text.split(' ').map((word, i) => (
                                        <span key={i} className={styles.word}>
                                            {word}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ===== MOBILE VIEW ===== */}
            <div className={styles.mobileView}>
                {/* Mobile Label */}
                <p className={styles.mobileLabel}>
                    Every square foot has been thoughtfully considered
                </p>

                {/* Mobile Paragraphs - Static */}
                <div className={styles.mobileParagraphs}>
                    {paragraphs.map((text, index) => (
                        <p key={index} className={styles.mobileParagraph}>
                            {text}
                        </p>
                    ))}
                </div>
            </div>

        </section>
    );
}
