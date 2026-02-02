/**
 * Solutions Hero – Bold asymmetric hero: headline + CTA left, glass card right.
 * GSAP entrance with reduced-motion support.
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from '../../styles/SolutionsHero.module.css';

const HEADLINE_LINE1 = 'Revenue Solutions';
const HEADLINE_LINE2 = 'Designed Around Your Outcomes';
const TAGLINE = 'Intentional systems. Your outcomes. End-to-end and targeted RCM.';

const DESCRIPTION_PARAS = [
    'At Winspire RCM, solutions are not predefined packages or fixed service lists.',
    'They are intentionally designed systems, aligned to the outcomes your organization needs to achieve.',
    'We deliver end-to-end and targeted Revenue Cycle Management solutions for healthcare organizations that seek clarity, control, and predictable financial performance.',
];

function useReducedMotion(): boolean {
    const [reduce, setReduce] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduce(mq.matches);
        const handler = () => setReduce(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return reduce;
}

export default function SolutionsHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const glassCardRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const eyebrow = section.querySelector(`.${styles.eyebrow}`);
        const line1 = section.querySelector(`.${styles.headlineLine1}`);
        const line2 = section.querySelector(`.${styles.headlineLine2}`);
        const tagline = section.querySelector(`.${styles.tagline}`);
        const ctaWrap = section.querySelector(`.${styles.ctaWrap}`);
        const scrollIndicator = section.querySelector(`.${styles.scrollIndicator}`);
        const glassCard = section.querySelector(`.${styles.glassCard}`);
        const bodyParagraphs = section.querySelectorAll('[data-animate="body-p"]');

        if (reduceMotion) {
            gsap.set([eyebrow, line1, line2, tagline, ctaWrap, scrollIndicator, glassCard, ...(bodyParagraphs || [])], { opacity: 1, y: 0, filter: 'blur(0)', clearProps: 'all' });
            return;
        }

        gsap.set(eyebrow, { opacity: 0, y: 14 });
        gsap.set(line1, { opacity: 0, y: 36, filter: 'blur(12px)' });
        gsap.set(line2, { opacity: 0, y: 36, filter: 'blur(12px)' });
        gsap.set(tagline, { opacity: 0, y: 18 });
        gsap.set(ctaWrap, { opacity: 0, y: 20 });
        gsap.set(scrollIndicator, { opacity: 0, y: 10 });
        gsap.set(glassCard, { opacity: 0, x: 24 });
        if (bodyParagraphs?.length) gsap.set(bodyParagraphs, { opacity: 0, y: 12 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
            .to(line1, { opacity: 1, y: 0, filter: 'blur(0)', duration: 0.9 }, 0.35)
            .to(line2, { opacity: 1, y: 0, filter: 'blur(0)', duration: 0.9 }, 0.45)
            .to(tagline, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
            .to(ctaWrap, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
            .to(scrollIndicator, { opacity: 1, y: 0, duration: 0.4 }, 0.9)
            .to(glassCard, { opacity: 1, x: 0, duration: 0.7 }, 0.5)
            .to(bodyParagraphs || [], { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.75);

        return () => {
            tl.kill();
        };
    }, [reduceMotion]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!glassCardRef.current) return;
        const rect = glassCardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glassCardRef.current.style.setProperty('--mouse-x', `${x}px`);
        glassCardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const scrollToContent = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('solutions-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section ref={sectionRef} className={styles.heroSection} aria-labelledby="solutions-hero-title">
            <div className={styles.gradientLayer} aria-hidden="true" />
            <div className={styles.accentLine} aria-hidden="true" />
            <div className={styles.heroInner}>
                <div className={styles.leftCol}>
                    <div className={styles.eyebrow}>
                        SOLUTIONS AT WINSPIRE RCM
                    </div>
                    <h1 id="solutions-hero-title" className={styles.headline}>
                        <span className={styles.headlineLine1}>{HEADLINE_LINE1}</span>
                        <span className={styles.headlineLine2}>{HEADLINE_LINE2}</span>
                    </h1>
                    <p className={styles.tagline}>{TAGLINE}</p>
                    <div className={styles.ctaWrap}>
                        <button
                            type="button"
                            className={styles.ctaButton}
                            onClick={scrollToContent}
                            aria-label="Explore solutions"
                        >
                            <span className={styles.ctaText}>Explore solutions</span>
                            <span className={styles.ctaArrow} aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 10h12M16 6l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </div>
                    {/* <a
                        href="#solutions-content"
                        className={styles.scrollIndicator}
                        onClick={scrollToContent}
                        aria-label="Scroll to content"
                    >
                        <span className={styles.scrollLabel}>Scroll</span>
                        <span className={styles.scrollChevron} aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </a> */}
                </div>
                <div className={styles.rightCol}>
                    <div 
                        ref={glassCardRef} 
                        className={styles.glassCard}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={styles.grainOverlay} aria-hidden="true" />
                        <div className={styles.lightEffect} aria-hidden="true" />
                        
                        {DESCRIPTION_PARAS.map((para, i) => (
                            <p key={i} data-animate="body-p" className={styles.description}>
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
