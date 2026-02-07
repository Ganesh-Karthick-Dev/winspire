'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/IntelligenceSolutionsSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
    {
        id: '06',
        title: 'Intelligence and Transparency Built In',
        subtitle: 'Visibility Is Not an Add On',
        intro: 'One of the most valued aspects of working with Winspire is real-time clarity. Our solutions include:',
        bullets: [
            'AI-driven insights and proactive risk indicators',
            'AR dashboards by payer, aging, and priority',
            'Custom operational and financial reporting',
            'Compliance-ready and audit-ready visibility',
        ],
        closing: 'These insights are not generic outputs. They are intentionally designed to support your defined outcomes. Transparency is foundational to trust and performance.',
    },
    {
        id: '07',
        title: 'Neura Intelligence Embedded in Execution',
        subtitle: 'Intelligence That Supports Delivery',
        intro: 'Neura is our proprietary intelligence layer embedded into how solutions are executed. Within our solutions, Neura enables:',
        bullets: [
            'Real-time performance visibility',
            'Early identification of revenue leakage and risk',
            'Prioritization based on impact and urgency',
            'Leadership dashboards and alerts',
        ],
        closing: 'For organizations that require it, Neura can also be deployed as a standalone intelligence solution aligned to existing teams and workflows.',
    },
    {
        id: '08',
        title: 'Solutions That Grow With You',
        subtitle: 'Built for Today. Designed for What Comes Next.',
        intro: 'Whether you are addressing a specific revenue challenge or redesigning your entire revenue cycle, Winspire delivers solutions that scale with your organization. We believe long-term success is built on:',
        bullets: [
            'Transparency',
            'Open communication',
            'Shared accountability',
            'Continuous improvement',
        ],
        closing: 'We measure our success by how well our clients perform over time.',
    },
];

const IntelligenceSolutionsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const leftColumn = leftColumnRef.current;

        if (!section || !leftColumn) return;

        const isMobileOrTablet = window.innerWidth <= 1024;
        if (isMobileOrTablet) return;

        const ctx = gsap.context(() => {
            // 1. Pin the left column
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                pin: leftColumn,
                pinSpacing: true,
                anticipatePin: 1,
            });

            // 2. Title switching: next title appears when each right-side section FINISHES (scrolls past)
            // When block 1 bottom passes viewport top -> title 2 | When block 2 bottom passes -> title 3
            const titles = titleRefs.current.filter(Boolean);
            const contentBlocks = contentBlockRefs.current.filter(Boolean);
            if (titles.length >= 3 && contentBlocks.length >= 3) {
                gsap.set(titles[0], { opacity: 1, y: 0, scale: 1, zIndex: 3 });
                gsap.set(titles[1], { opacity: 0, y: 30, scale: 0.98, zIndex: 2, visibility: 'hidden' });
                gsap.set(titles[2], { opacity: 0, y: 30, scale: 0.98, zIndex: 1, visibility: 'hidden' });

                // Title 2: when block 1 finishes (bottom scrolls past viewport top)
                ScrollTrigger.create({
                    trigger: contentBlocks[0],
                    start: 'bottom top+=80',
                    end: 'bottom top',
                    scrub: 1,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(titles[0], { opacity: 1 - p, y: -20 * p, scale: 1 - 0.02 * p, visibility: p >= 0.99 ? 'hidden' : 'visible' });
                        gsap.set(titles[1], { opacity: p, y: 30 - 30 * p, scale: 0.98 + 0.02 * p, visibility: p <= 0.01 ? 'hidden' : 'visible' });
                    },
                });

                // Title 3: when block 2 finishes
                ScrollTrigger.create({
                    trigger: contentBlocks[1],
                    start: 'bottom top+=80',
                    end: 'bottom top',
                    scrub: 1,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(titles[1], { opacity: 1 - p, y: -20 * p, scale: 1 - 0.02 * p, visibility: p >= 0.99 ? 'hidden' : 'visible' });
                        gsap.set(titles[2], { opacity: p, y: 30 - 30 * p, scale: 0.98 + 0.02 * p, visibility: p <= 0.01 ? 'hidden' : 'visible' });
                    },
                });
            }

            // 3. Right content blocks: fade + y on scroll into view
            const blockElements = section.querySelectorAll(`.${styles.contentBlock}`);
            blockElements.forEach((block, index) => {
                gsap.fromTo(
                    block,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 85%',
                        },
                    }
                );

                const bullets = block.querySelectorAll(`.${styles.bulletItem}`);
                if (bullets.length) {
                    gsap.fromTo(
                        bullets,
                        { opacity: 0, x: -20 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            stagger: 0.08,
                            delay: 0.2,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: block,
                                start: 'top 80%',
                            },
                        }
                    );
                }
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                {/* LEFT COLUMN - Pinned: image holder above, titles below */}
                <div className={styles.leftColumn} ref={leftColumnRef}>
                    <div className={styles.imageHolder}>
                        <video
                            src="/video/sample/section2_video.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={styles.imageHolderImg}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.titleWrapper}>
                        {SECTIONS.map((sec, index) => (
                            <div
                                key={sec.id}
                                className={styles.titleBlock}
                                ref={(el) => {
                                    titleRefs.current[index] = el;
                                }}
                            >
                                <h2 className={styles.bigTitle}>{sec.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN - Scrollable content */}
                <div className={styles.rightColumn}>
                    {SECTIONS.map((sec, index) => (
                        <div
                            key={sec.id}
                            className={styles.contentBlock}
                            ref={(el) => { contentBlockRefs.current[index] = el; }}
                        >
                            <div className={styles.sectionLine} />
                            <h3 className={styles.blockTitle}>{sec.title}</h3>
                            <p className={styles.subtitle}>{sec.subtitle}</p>
                            <p className={styles.intro}>{sec.intro}</p>
                            <ul className={styles.bulletList}>
                                {sec.bullets.map((item, i) => (
                                    <li key={i} className={styles.bulletItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className={styles.closing}>{sec.closing}</p>
                        </div>
                    ))}
                    <div className={styles.bottomSpacer} />
                </div>
            </div>

            {/* MOBILE VIEW - stacked, no pin */}
            <div className={styles.mobileView}>
                <div className={styles.mobileImageHolder}>
                    <video
                        src="/video/sample/section2_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.mobileImageHolderImg}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                {SECTIONS.map((sec) => (
                    <div key={sec.id} className={styles.mobileBlock}>
                        <h3 className={styles.mobileBlockTitle}>{sec.title}</h3>
                        <p className={styles.mobileSubtitle}>{sec.subtitle}</p>
                        <p className={styles.mobileIntro}>{sec.intro}</p>
                        <ul className={styles.mobileBulletList}>
                            {sec.bullets.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className={styles.mobileClosing}>{sec.closing}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default IntelligenceSolutionsSection;
