/**
 * How We Work Section Component for Temp Company Page
 * 
 * Migrated to CSS Modules for consistent styling.
 * Performance: Optimized parallax for smooth scrolling.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHandshake, FaChartPie, FaCheck } from 'react-icons/fa';
import styles from '@/styles/HowWeWorkSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeWorkSection() {
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
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                 {/* Left: Content */}
                <div className={styles.contentSide}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.innerContent}>
                            <div>
                                <span className={styles.label}>
                                    How We Work
                                </span>
                                 <h2 className={styles.heading}>
                                    An Internal <br/> Revenue Function <br/>
                                    <span className={styles.headingHighlight}>by Design.</span>
                                </h2>
                            </div>

                            {/* Integration */}
                            <div className={styles.featureGroup}>
                                <h3 className={styles.featureTitle}>
                                    <div className={styles.iconBox}>
                                        <FaHandshake className={styles.icon} />
                                    </div>
                                    Not an external vendor.
                                </h3>
                                <p className={styles.featureText}>
                                    We do not operate like an external vendor. We work as an extension of your organization—integrating into your workflows and taking full ownership of outcomes.
                                </p>
                            </div>

                            {/* Ownership */}
                            <div className={styles.featureGroup}>
                                 <h3 className={styles.featureTitle}>
                                    <div className={styles.iconBox}>
                                        <FaChartPie className={styles.icon} />
                                    </div>
                                    Outcome Ownership
                                 </h3>
                                <p className={styles.featureText}>
                                    We do not just run processes. We help organizations regain confidence in their revenue cycle through accountability and transparency.
                                </p>
                            </div>

                            {/* Checklist */}
                            <div className={styles.checklistSection}>
                                <h3 className={styles.checklistTitle}>
                                    What clients experience:
                                </h3>
                                
                                <div className={styles.checkList}>
                                    {[
                                        'Clear accountability at every level', 
                                        'Real-time visibility into performance', 
                                        'Calm, structured execution'
                                    ].map((item, i) => (
                                        <div key={i} className={styles.checkItem}>
                                            <div className={styles.checkIconCircle}>
                                                 <FaCheck className={styles.checkIcon} />
                                            </div>
                                            <span className={styles.checkText}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className={styles.footerQuote}>
                                 <p className={styles.quoteText}>
                                    No surprises and no guesswork.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                 <div ref={containerRef} className={styles.imageSide}>
                     <img 
                        ref={imageRef}
                        src="/images/company-page/iso-standards-quality-control-businessman-hold-virtual-globe-with-quality-assurance-guarantee-product-iso-standard-certification-modern-iso-banner.webp" 
                        alt="How We Work" 
                        className={styles.parallaxImage}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
