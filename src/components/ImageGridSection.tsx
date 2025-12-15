'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/ImageGridSection.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ImageGridSectionProps {
    images: {
        topLeft: string;
        topRight: string;
        bottomLeft: string;
        bottomRight: string;
    };
}

export default function ImageGridSection({ images }: ImageGridSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const centerCardRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current || !centerCardRef.current) return;

            // Pin the section while animating
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=80%',
                pin: true,
                pinSpacing: true,
            });

            // Create timeline for the animation sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=80%',
                    scrub: 1,
                }
            });

            // Phase 1: Center card shrinks from all corners inward (0% - 40%)
            // Using inset/margin approach for uniform shrinking
            tl.fromTo(centerCardRef.current,
                {
                    inset: '0',
                    borderRadius: '0px',
                },
                {
                    inset: '12.5vh 32.5vw',
                    borderRadius: '24px',
                    duration: 0.4,
                    ease: 'power2.inOut',
                },
                0
            );

            // Phase 2: Images fly in (40% - 100%)
            // Top Left - comes from left
            tl.fromTo(topLeftRef.current,
                { x: '-100vw', opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
                0.4
            );

            // Bottom Left - comes from left
            tl.fromTo(bottomLeftRef.current,
                { x: '-100vw', opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
                0.45
            );

            // Top Right - comes from right
            tl.fromTo(topRightRef.current,
                { x: '100vw', opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
                0.5
            );

            // Bottom Right - comes from right
            tl.fromTo(bottomRightRef.current,
                { x: '100vw', opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
                0.55
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={`${styles.section} image-grid-section`}>
            {/* Center Frosty Card - Contains 3D model area */}
            <div ref={centerCardRef} className={styles.centerCard}>
                <div className={styles.centerCardInner}>
                    {/* 3D model renders behind via z-index */}
                </div>
            </div>

            {/* Grid Container for side images */}
            <div className={styles.gridContainer}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <div ref={topLeftRef} className={styles.imageWrapper}>
                        <Image
                            src={images.topLeft}
                            alt="Grid image 1"
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div ref={bottomLeftRef} className={styles.imageWrapper}>
                        <Image
                            src={images.bottomLeft}
                            alt="Grid image 3"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>

                {/* Center Space - for the center card */}
                <div className={styles.centerSpace}></div>

                {/* Right Column */}
                <div className={styles.rightColumn}>
                    <div ref={topRightRef} className={styles.imageWrapper}>
                        <Image
                            src={images.topRight}
                            alt="Grid image 2"
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div ref={bottomRightRef} className={styles.imageWrapper}>
                        <Image
                            src={images.bottomRight}
                            alt="Grid image 4"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
