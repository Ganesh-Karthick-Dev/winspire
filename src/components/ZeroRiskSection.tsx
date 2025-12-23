'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumButton from './PremiumButton';
import styles from '@/styles/ZeroRiskSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ZeroRiskSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const line3Ref = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = [line1Ref.current, line2Ref.current, line3Ref.current, buttonRef.current];

            // Animate each line individually on scroll
            lines.forEach((line, index) => {
                if (!line) return;

                gsap.fromTo(line,
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `top+=${index * 60} 75%`,
                            end: `top+=${index * 60 + 150} 40%`,
                            scrub: 1,
                            toggleActions: 'play none none none',
                        }
                    }
                );

                // Add text stroke animation separately
                if (line.classList.contains(styles.textLine) || line.tagName === 'P') {
                    gsap.fromTo(line,
                        {
                            webkitTextStroke: '0px transparent',
                        },
                        {
                            webkitTextStroke: '1px rgba(0,0,0,0.15)',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: `top+=${index * 60} 75%`,
                                end: `top+=${index * 60 + 150} 40%`,
                                scrub: 1,
                            }
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={`${styles.zeroRiskSection} zero-risk-section`}>
            <div className={styles.zeroRiskContent}>
                <h2 className={styles.zeroRiskHeadline}>
                    <span ref={line1Ref} className={styles.textLine}>
                        This Is a Zero-Risk Demo.
                    </span>
                    <span ref={line2Ref} className={styles.textLine}>
                        No Contracts. No Pressure. Just Clarity.
                    </span>
                </h2>
                <p ref={line3Ref} className={styles.zeroRiskSubheadline}>
                    Healthcare leaders consistently tell us this is the most insightful 30 minutes they spend on their revenue cycle all year.
                </p>
                <div ref={buttonRef} className={styles.buttonWrapper}>
                    <PremiumButton
                        text="Let's Transform Your Revenue Cycle → Reserve My Demo"
                        variant="primary"
                    />
                </div>
            </div>
        </section>
    );
}
