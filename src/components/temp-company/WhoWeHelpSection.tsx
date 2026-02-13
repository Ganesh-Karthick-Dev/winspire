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
        'Emergency & Urgent Care Providers',
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

            const animateTimeline = () => {
                const timelineWrapper = containerRef.current?.querySelector(`.${styles.timelineWrapper}`);
                const markers = containerRef.current?.querySelectorAll(`.${styles.marker}`);
                const firstMarker = markers?.[0] as HTMLElement;
                const lastMarker = markers?.[markers.length - 1] as HTMLElement;

                if (!timelineWrapper || !firstMarker || !lastMarker) return;

                const wrapperRect = timelineWrapper.getBoundingClientRect();
                const firstRect = firstMarker.getBoundingClientRect();
                const lastRect = lastMarker.getBoundingClientRect();

                const startY = firstRect.top - wrapperRect.top + (firstRect.height / 2);
                const endY = lastRect.top - wrapperRect.top + (lastRect.height / 2);

                // Set initial states relative to dynamic markers
                gsap.set(lineRef.current, { top: startY, height: endY - startY });
                gsap.set(ballRef.current, { top: startY });
                gsap.set(activeLineRef.current, { top: startY, height: 0 });

                mm.add({
                    isDesktop: "(min-width: 769px)",
                    isMobile: "(max-width: 768px)"
                }, (context) => {
                    const { isDesktop } = context.conditions as any;
                    
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: isDesktop ? 'top 30%' : 'top 35%',
                            end: isDesktop ? 'bottom 95%' : 'bottom 65%',
                            scrub: 1,
                            invalidateOnRefresh: true
                        }
                    });

                    tl.to(ballRef.current, { top: endY, ease: 'none' }, 0);
                    tl.to(activeLineRef.current, { height: endY - startY, ease: 'none' }, 0);
                });
            };

            animateTimeline();

            // Items light up as they enter viewport (Shared)
            itemsRef.current.forEach((item) => {
                if (!item) return;
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    onEnter: () => item.classList.add(styles.activeRow),
                    onLeaveBack: () => item.classList.remove(styles.activeRow),
                    invalidateOnRefresh: true
                });
            });

            // Footer Animation
            const footer = containerRef.current?.querySelector(`.${styles.footer}`);
            if (footer) {
                gsap.from(footer, {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

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
                <div ref={lineRef} className={styles.linePlane}></div>
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

                    {/* And More Center Item */}
                    <div 
                        ref={(el: HTMLDivElement | null) => { itemsRef.current[partners.length] = el; }}
                        className={`${styles.itemRow} ${styles.andMoreRow}`}
                    >
                        {/* Marker on the line */}
                        <div className={styles.marker}></div>

                        <div className={styles.andMoreContent}>
                            <div className={styles.andMoreWrapper}>
                                {/* Decorative Background Shape */}
                                <div className={styles.andMoreBg}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 3V21M3 12H21M5.635 5.635L18.365 18.365M18.365 5.635L5.635 18.365" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <span className={styles.andMoreLabel}>&</span>
                                <h3 className={styles.andMoreTitle}>More</h3>
                            </div>
                        </div>
                    </div>
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
