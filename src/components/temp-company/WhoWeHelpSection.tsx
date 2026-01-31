/**
 * Who We Help Section Component
 * 
 * Features a scroll-triggered timeline animation where a 'ball' moves down a central line.
 * As the ball passes each item, the item lights up and reveals its content.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/WhoWeHelpSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeHelpSection() {
    const containerRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const activeLineRef = useRef<HTMLDivElement>(null);
    const ballRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const partners = [
        'Specialty physician practices',
        'Multispecialty groups',
        'Hospitals and health systems',
        'Ambulatory surgery centers',
        'Behavioral and mental health providers',
        'Home health and hospice organizations',
        'Tribal and community health networks',
    ];

    useEffect(() => {
        let refreshTimer: ReturnType<typeof setTimeout> | undefined;
        let ctx: ReturnType<typeof gsap.context> | undefined;

        if (!containerRef.current || !activeLineRef.current || !ballRef.current) {
            return () => {
                if (refreshTimer != null) clearTimeout(refreshTimer);
                ctx?.revert();
            };
        }

        ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Full timeline scrub animation
            mm.add("(min-width: 769px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 40%',
                        end: 'bottom 80%',
                        scrub: 1,
                    }
                });

                const timelineWrapper = containerRef.current?.querySelector(`.${styles.timelineWrapper}`);

                if (timelineWrapper) {
                    tl.to(ballRef.current, {
                        top: '100%',
                        ease: 'none',
                    }, 0);

                    tl.to(activeLineRef.current, {
                        height: '100%',
                        ease: 'none',
                    }, 0);

                    itemsRef.current.forEach((item, index) => {
                        if (!item) return;
                        ScrollTrigger.create({
                            trigger: item,
                            start: 'top 60%',
                            end: 'bottom 40%',
                            onEnter: () => item.classList.add(styles.activeRow),
                            onLeaveBack: () => item.classList.remove(styles.activeRow)
                        });
                    });
                }
            });

            // MOBILE: Scroll-linked ball + line animation (same idea as desktop, different bounds)
            mm.add("(max-width: 768px)", () => {
                const timelineWrapper = containerRef.current?.querySelector(`.${styles.timelineWrapper}`);
                if (timelineWrapper && ballRef.current && activeLineRef.current) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 35%',
                            end: 'bottom 65%',
                            scrub: 1,
                        }
                    });
                    tl.to(ballRef.current, { top: '100%', ease: 'none' }, 0);
                    tl.to(activeLineRef.current, { height: '100%', ease: 'none' }, 0);
                }

                // Items light up as they enter viewport
                itemsRef.current.forEach((item) => {
                    if (!item) return;
                    ScrollTrigger.create({
                        trigger: item,
                        start: 'top 82%',
                        end: 'bottom 18%',
                        onEnter: () => item.classList.add(styles.activeRow),
                        onLeaveBack: () => item.classList.remove(styles.activeRow),
                    });
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

        return () => {
            if (refreshTimer != null) clearTimeout(refreshTimer);
            ctx?.revert();
        };
    }, []);

    return (
        <section ref={containerRef} className={styles.section}>

            {/* Header */}
            <div className={styles.titleContainer}>
                <span className={styles.label}>Who We Help</span>
                <h2 className={styles.heading}>
                    Healthcare Organizations That <br />
                    Expect Stability
                </h2>
                <p className={styles.description}>
                    We partner with healthcare organizations that want clarity, control, and long-term stability rather than short-term fixes.
                </p>
            </div>

            {/* Timeline */}
            <div className={styles.timelineWrapper}>
                {/* Lines */}
                <div className={styles.linePlane}></div>
                <div ref={activeLineRef} className={styles.activeLine}></div>

                {/* The Ball */}
                <div ref={ballRef} className={styles.ball}></div>

                {/* Items */}
                <div className={styles.itemsContainer}>
                    {partners.map((partner, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                ref={(el: HTMLDivElement | null) => { itemsRef.current[i] = el; }}
                                className={styles.itemRow}
                            >
                                {/* Marker/Node on the line */}
                                <div className={styles.marker}></div>

                                <div className={styles.rowContent}>
                                    {/* Left Side */}
                                    <div className={styles.leftSide}>
                                        {isEven ? (
                                            <div>
                                                <span className={styles.itemIndex}>0{i + 1}</span>
                                                <h3 className={styles.itemTitle}>{partner}</h3>
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Right Side */}
                                    <div className={styles.rightSide}>
                                        {!isEven ? (
                                            <div>
                                                <span className={styles.itemIndex}>0{i + 1}</span>
                                                <h3 className={styles.itemTitle}>{partner}</h3>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer / Closing */}
            <div className={styles.footer}>
                <p className={styles.footerText}>
                    "Each environment brings different payer behavior, risk, and operational complexity.<br />
                    <span className={styles.footerAccent}>Our approach adapts. Our discipline remains constant."</span>
                </p>
            </div>

        </section>
    );
}
