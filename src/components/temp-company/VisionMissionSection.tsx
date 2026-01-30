/**
 * Vision Mission Section Component
 * 
 * Features:
 * - GSAP Native Pinning (Fixes gap issues)
 * - Restored Core Values logic
 * - Robust 50% scroll threshold for swapping slides
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/VisionMissionSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function VisionMissionSection() {
    const mainWrapperRef = useRef<HTMLDivElement>(null);
    const pinnedContentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            id: 'vision',
            title: 'Our Vision',
            text: 'To build the most trusted, human-centric, and intelligently designed Revenue Cycle Management organization in healthcare where clarity replaces chaos and outcomes are engineered, not chased.',
            image: '/images/company-page/business-people-shaking-hands-congratulations-work-success.webp',
            alt: 'Vision'
        },
        {
            id: 'mission',
            title: 'Our Mission',
            text: 'To help healthcare organizations design, operate, and sustain revenue cycles that are predictable, transparent, and scalable by combining experienced people, disciplined execution, and intelligent systems.',
            image: '/images/company-page/iso-standards-quality-control-businessman-hold-virtual-globe-with-quality-assurance-guarantee-product-iso-standard-certification-modern-iso-banner.webp',
            alt: 'Mission'
        }
    ];

    const values = [
         { name: 'Client Centric Partnership', desc: 'We place our clients goals at the center of every decision and work as true partners in achieving them.' },
         { name: 'Analytical Excellence', desc: 'We use data, insight, and experience to guide decisions and drive meaningful outcomes.' },
         { name: 'Continuous Innovation', desc: 'We evolve constantly to stay ahead of industry change and deliver better solutions.' },
         { name: 'Integrity and Transparency', desc: 'We operate with honesty, accountability, and clarity in all our interactions.' },
         { name: 'Results That Matter', desc: 'We focus on measurable outcomes that drive long-term financial stability.' }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            
            ScrollTrigger.create({
                trigger: pinnedContentRef.current,
                start: "top top",
                end: "+=250%", // Increased duration for smoother scroll
                pin: true,
                pinSpacing: true,
                scrub: 1.2,    // Slightly smoother scrub
                onUpdate: (self) => {
                    // Logic: Keep Vision active until 50% scroll progress is reached
                    const progress = self.progress;
                    if (progress > 0.5) {
                        setActiveIndex(1);
                    } else {
                        setActiveIndex(0);
                    }
                }
            });

            // 2. CORE VALUES ACCORDION
            gsap.utils.toArray(`.${styles.valueItem}`).forEach((item: any) => {
                 const title = item.querySelector(`.${styles.valueItemTitle}`);
                 const content = item.querySelector(`.${styles.valueContent}`);
                 
                 ScrollTrigger.create({
                     trigger: item,
                     start: 'top 70%', // Trigger when the top of the item is 70% down the screen
                     end: 'bottom 30%', // Until the bottom is 30% down
                     onToggle: (self) => {
                        if (self.isActive) {
                            expandItem(item, title, content);
                        } else {
                            collapseItem(item, title, content);
                        }
                     }
                 });
            });

            const expandItem = (item: any, title: any, content: any) => {
                gsap.to(item, { opacity: 1, duration: 0.5, ease: "power2.out" });
                gsap.to(title, { scale: 1.02, marginBottom: '1.5rem', color: '#ffffff', duration: 0.5, ease: "power2.out" });
                gsap.to(content, { height: 'auto', opacity: 1, duration: 0.6, ease: 'power2.out' });
            };

            const collapseItem = (item: any, title: any, content: any) => {
                gsap.to(item, { opacity: 0.4, duration: 0.5, ease: "power2.inOut" });
                gsap.to(title, { scale: 1, marginBottom: '0', color: '#94a3b8', duration: 0.5, ease: "power2.inOut" });
                gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: 'power1.in' });
            };

            // Force refresh to fix initial alignment errors
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);

        }, mainWrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainWrapperRef} className={styles.mainWrapper}>
            {/* PINNED SECTION: Vision & Mission */}
            <div ref={pinnedContentRef} className={styles.pinnedSection}>
                <div className={styles.cardsContainer}>
                    {/* LEFT CARD */}
                    <div className={styles.leftCard}>
                        <span className={styles.leftCardLabel}>Winspire Way</span>
                        <div className={styles.titleContainer}>
                            {slides.map((slide, i) => (
                                <h2 
                                    key={slide.id} 
                                    className={`${styles.title} ${i === activeIndex ? styles.titleActive : ''}`}
                                >
                                    {slide.title}
                                </h2>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className={styles.rightCard}>
                        {slides.map((slide, i) => (
                            <div 
                                key={slide.id} 
                                className={`${styles.slideContainer} ${i === activeIndex ? styles.slideActive : ''}`}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.alt}
                                    fill
                                    className={styles.slideImage}
                                    priority={i === 0}
                                />
                                <div className={styles.glassCard}>
                                    <span className={styles.cardHeading}>Winspire {slide.title.replace('Our ', '')}</span>
                                    <p className={styles.cardText}>{slide.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CORE VALUES SECTION */}
            <section className={styles.valuesSection}>
                <div className={styles.valuesContainer}>
                    <div className={styles.valuesHeaderWrapper}>
                        <div className={styles.valuesSticky}>
                            <h3 className={styles.valuesTitle}>Our Core<br/>Values</h3>
                            <div className={styles.separator}></div>
                            <p className={styles.valuesDescription}>The principles that guide every decision we make.</p>
                        </div>
                    </div>
                    <div className={styles.valuesList}> 
                        {values.map((val, i) => (
                            <div key={i} className={styles.valueItem}>
                                <span className={styles.valueMetric}>Metric 0{i+1}</span>
                                <h4 className={styles.valueItemTitle}>{val.name}</h4>
                                <div className={styles.valueContent}>
                                    <p className={styles.valueDescriptionText}>{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
