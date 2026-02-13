/**
 * Our Point of View Section Component for Temp Company Page
 * 
 * Migrated to CSS Modules for consistent styling.
 * Performance: Optimized parallax for smooth scrolling.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/PointOfViewSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PointOfViewSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax Effect
            if (containerRef.current && imageRef.current) {
                gsap.set(imageRef.current, { scale: 1.15, yPercent: -10 });
                
                gsap.to(imageRef.current, {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5 // Smoother scrubbing
                    }
                });
            }
            if (sectionRef.current) {
                // List Items Animation
                const listItems = sectionRef.current.querySelectorAll(`.${styles.listItem}`);
                if (listItems.length > 0) {
                    gsap.from(listItems, {
                    x: -30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: listItems[0],
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Extra pop for the numbers
                const bubbles = sectionRef.current.querySelectorAll(`.${styles.listNumber}`);
                gsap.from(bubbles, {
                    scale: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: listItems[0],
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Left: Image (Full Bleed, High Quality Color, Parallax) */}
                <div ref={containerRef} className={styles.imageSide}>
                     <img 
                        ref={imageRef}
                        src="/company/Our Point of View.webp" 
                        alt="Leadership Design" 
                        className={styles.parallaxImage}
                        loading="lazy"
                    />
                </div>

                {/* Right: Content (High-Contrast Text via CSS Modules) */}
                <div className={styles.contentSide}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.innerContent}>
                            <span className={styles.label}>
                                Our Point of View
                            </span>
                            
                            <h2 className={styles.heading}>
                                Leadership Design <br/> 
                                Comes Before <span className={styles.headingHighlight}>Execution</span>
                            </h2>
                            
                            <p className={styles.subText}>
                                After years of managing and transforming complex revenue cycles, one truth became clear:
                            </p>
                            
                            <div className={styles.quoteContainer}>
                                <p className={styles.quoteBox}>
                                    <span className={styles.redHighlight}>People do not fail.</span> <br/>
                                    <span className={styles.quoteHighlight}>
                                        Poorly designed systems do.
                                    </span>
                                </p>
                            </div>
                            
                            <div className={styles.listSection}>
                                <p className={styles.listTitle}>
                                    The Sequence for Success:
                                </p>
                                
                                <ul className={styles.list}>
                                    {[
                                        "Defining the outcomes that truly matter",
                                        "Designing the structure that supports those outcomes",
                                        "Executing with clarity, discipline, and accountability"
                                    ].map((text, idx) => (
                                        <li key={idx} className={styles.listItem}>
                                            <span className={styles.listNumber}>
                                                {idx + 1}
                                            </span>
                                            <span className={styles.listText}>
                                                {text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className={styles.footerSection}>
                                <p className={styles.footerText}>
                                    When this sequence is respected, teams perform better, leaders regain control, and results follow naturally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
