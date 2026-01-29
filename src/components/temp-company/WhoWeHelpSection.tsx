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
        if (!containerRef.current || !activeLineRef.current || !ballRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center', // Start when section hits center of viewport
                    end: 'bottom bottom',   // End when section leaves
                    scrub: 0.5,
                }
            });

            // Animate the ball and the active line height together
            // We want the ball to travel from 0% to 100% of the timelineWrapper height
            // But actually we are inside .timelineWrapper, so we can just use height 100%
            
            // The timeline container height is defined by content. 
            // We want the ball to move down relative to the scroll.
            
            const timelineWrapper = containerRef.current?.querySelector(`.${styles.timelineWrapper}`);
            
            if (timelineWrapper) {
                // Ball movement
                tl.to(ballRef.current, {
                    top: '100%', 
                    ease: 'none',
                }, 0);

                // Active line growth (follows ball)
                tl.to(activeLineRef.current, {
                    height: '100%',
                    ease: 'none',
                }, 0);

                // Items activation
                itemsRef.current.forEach((item, index) => {
                    if (!item) return;

                    // Calculate trigger point relative to the progress
                    ScrollTrigger.create({
                        trigger: item,
                        start: 'top 60%', // When item acts as trigger
                        end: 'bottom 40%',
                        onEnter: () => {
                            item.classList.add(styles.activeRow);
                        },
                        onLeaveBack: () => {
                            item.classList.remove(styles.activeRow);
                        }
                    });
                });
            }

        }, containerRef);

        return () => ctx.revert();
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
                    "Each environment brings different payer behavior, risk, and operational complexity.<br/>
                    <span className={styles.footerAccent}>Our approach adapts. Our discipline remains constant."</span>
                </p>
            </div>

        </section>
    );
}
