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
import { Sparkles } from 'lucide-react';
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
            tagline: 'Clarity replaces chaos. Outcomes are engineered, not chased.',
            text: 'To build the most trusted, human-centric, and intelligently designed Revenue Cycle Management organization in healthcare where clarity replaces chaos and outcomes are engineered, not chased.',
            image: '/temp/16457.jpg',
            alt: 'Vision'
        },
        {
            id: 'mission',
            title: 'Our Mission',
            tagline: 'Predictable, transparent, and scalable revenue cycles—powered by people and systems.',
            text: 'To help healthcare organizations design, operate, and sustain revenue cycles that are predictable, transparent, and scalable by combining experienced people, disciplined execution, and intelligent systems.',
            image: '/temp/17101.jpg',
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
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Pinning enabled
            mm.add("(min-width: 769px)", () => {
                ScrollTrigger.create({
                    trigger: pinnedContentRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.2,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (progress > 0.5) {
                            setActiveIndex(1);
                        } else {
                            setActiveIndex(0);
                        }
                    }
                });
            });

            // MOBILE: Short pin + scroll-driven slide switch so Vision/Mission animation works
            mm.add("(max-width: 768px)", () => {
                ScrollTrigger.create({
                    trigger: pinnedContentRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (progress > 0.5) {
                            setActiveIndex(1);
                        } else {
                            setActiveIndex(0);
                        }
                    }
                });
            });

            // Define before use (avoid "Cannot access before initialization" when ScrollTrigger fires onToggle)
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

            // 2. CORE VALUES ACCORDION (Keep enabled for both, it's nice)
            gsap.utils.toArray(`.${styles.valueItem}`).forEach((item: any) => {
                const title = item.querySelector(`.${styles.valueItemTitle}`);
                const content = item.querySelector(`.${styles.valueContent}`);

                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 85%', // Gentler trigger for mobile
                    end: 'bottom 15%',
                    onToggle: (self) => {
                        if (self.isActive) {
                            expandItem(item, title, content);
                        } else {
                            collapseItem(item, title, content);
                        }
                    }
                });
            });

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
                        <div className={styles.leftCardAccent} aria-hidden />
                        <span className={styles.leftCardLabel}>Winspire Way</span>
                        <div className={styles.leftCardContent}>
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
                            <div className={styles.taglineContainer}>
                                {slides.map((slide, i) => (
                                    <p
                                        key={slide.id}
                                        className={`${styles.tagline} ${i === activeIndex ? styles.taglineActive : ''}`}
                                    >
                                        {slide.tagline}
                                    </p>
                                ))}
                            </div>
                            <div className={styles.leftCardDots} aria-hidden>
                                {[0, 1].map((i) => (
                                    <span key={i} className={i === activeIndex ? styles.dotActive : ''} />
                                ))}
                            </div>
                        </div>
                        <div className={styles.leftCardIconWrap} aria-hidden>
                            <Sparkles className={styles.leftCardIcon} aria-hidden />
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
                                    {/* <span className={styles.cardHeading}>Winspire {slide.title.replace('Our ', '')}</span> */}
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
                            <h3 className={styles.valuesTitle}>Our Core<br />Values</h3>
                            <div className={styles.separator}></div>
                            <p className={styles.valuesDescription}>The principles that guide every decision we make.</p>
                        </div>
                    </div>
                    <div className={styles.valuesList}>
                        {values.map((val, i) => (
                            <div key={i} className={styles.valueItem}>
                                {/* <span className={styles.valueMetric}>Metric 0{i + 1}</span> */}
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
