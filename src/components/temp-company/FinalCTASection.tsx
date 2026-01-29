/**
 * Final CTA Section Component
 * 
 * Re-designed with a premium "Glass Card" aesthetic.
 * Features a glowing ambient background and smooth GSAP entrance animations.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/FinalCTASection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Ambient Background Pulse (Continuous)
            // (Handled via CSS keyframes in module, but we can enhance entrance here)
            gsap.fromTo(glowRef.current, 
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 0.6,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // 2. Glass Card Entrance (Scale Up + Fade In)
            gsap.fromTo(cardRef.current,
                { opacity: 0, scale: 0.9, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%", // Triggers slightly later for dramatic effect
                    }
                }
            );

            // 3. Staggered Text Entrance
            const elements = cardRef.current?.querySelectorAll(`.${styles.heading}, .${styles.subText}, .${styles.buttonGroup}`);
            if (elements) {
                gsap.fromTo(elements, 
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        delay: 0.3, // Wait for card to start appearing
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Ambient Glow Background */}
            <div ref={glowRef} className={styles.glowBackground}></div>

            {/* Glass Card Container */}
            <div ref={cardRef} className={styles.glassCard}>
                <h2 className={styles.heading}>
                    Let’s Design a Revenue Cycle That <br/>
                    Works for the <span className={styles.headingHighlight}>Long Term.</span>
                </h2>
                
                <p className={styles.subText}>
                    If you are looking for an RCM partner who understands healthcare deeply, values people, and builds systems that last, we would welcome the conversation.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/book-demo" className={styles.primaryButton}>
                        Book a Strategic Conversation
                        <FaArrowRight size={12} />
                    </Link>
                    
                    <Link href="#how-we-work" className={styles.secondaryButton}>
                        Explore How We Work
                    </Link>
                </div>
            </div>
        </section>
    );
}
