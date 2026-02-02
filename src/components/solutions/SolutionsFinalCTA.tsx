'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/SolutionsFinalCTA.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsFinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                glowRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 0.5,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            const elements = cardRef.current?.querySelectorAll(
                `.${styles.heading}, .${styles.subText}, .${styles.ctaButton}`
            );
            if (elements) {
                gsap.fromTo(
                    elements,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        delay: 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div ref={glowRef} className={styles.glowBackground} />
            <div 
                ref={cardRef} 
                className={styles.glassCard}
                onMouseMove={handleMouseMove}
            >
                <div className={styles.grainOverlay} aria-hidden="true" />
                <div className={styles.lightEffect} aria-hidden="true" />
                
                <div className={styles.cardContent}>
                    <span className={styles.eyebrow}>Final CTA</span>
                    <h2 className={styles.heading}>
                        Let&apos;s Design the Right Revenue Solution for You
                    </h2>
                    <p className={styles.subText}>
                        If you are looking for an RCM partner who understands healthcare
                        deeply, values transparency, and designs solutions around outcomes
                        rather than assumptions, we would welcome the conversation.
                    </p>
                    <Link href="/book-demo" className={styles.ctaButton}>
                        Book a Strategic Conversation
                        <FaArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
