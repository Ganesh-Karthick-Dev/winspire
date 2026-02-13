/**
 * Our Story Section - Redesigned (Dapper Style)
 * Three distinct aesthetic parts: Serif Intro, Editorial Pattern, Scrapbook Journey.
 * Refactored to use CSS Modules (Standard CSS).
 */

'use client';

import { useRef } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/OurStorySection.module.css';
import BoardSection from '@/components/company/BoardSection';

gsap.registerPlugin(ScrollTrigger);

export default function OurStorySection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current, // Trigger specifically when the journey text enters
                start: 'top 85%', // Start earlier in the scroll
                toggleActions: 'play none none reverse',
            }
        });

        // Animate the text first (slower duration)
        tl.fromTo(textRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );

        // Animate the cards with stagger
        const cardRotations = [-3, 2, 1, -4, 3]; // Matches the CSS scrapbook rotations

        tl.fromTo('[data-animate-card]',
            { opacity: 0, y: 100, scale: 0.7, rotate: (i) => i % 2 === 0 ? -15 : 15 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotate: (i) => cardRotations[i] || 0,
                duration: 1.8, 
                stagger: 0.3, 
                ease: 'back.out(1.5)' 
            },
            "-=0.8"
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.sectionContainer}>
             
             {/* Part 1: Who We Are (Serif Intro) */}
             <div className={styles.introSection}>
                <div className={styles.introGrid}>
                    {/* Label */}
                    <div className={styles.introLabelWrapper}>
                         <span className={styles.introLine}></span>
                         <span className={styles.introLabel}>Our Story</span>
                    </div>
                    
                    {/* Content */}
                    <div className={styles.introContent}>
                        <h2 className={styles.introHeadline}>
                            Built Inside Healthcareeeee.<br/>
                            <span className={styles.introSubtitle}>Shaped by Real Revenue Challenges.</span>
                        </h2>
                        <div className={styles.introTextWrapper}>
                            <p className={styles.introText}>
                                Winspire RCM was built by leaders who have spent decades inside real healthcare operations—not observing from the outside, but living the pressure of denials, delayed payments, staffing constraints, and unpredictable cash flow.
                            </p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Board Members Section Embedded */}
             <div className="w-full">
                 <BoardSection />
             </div>

             {/* Part 2: The Pattern (Large Editorial Text) */}
             <div className={styles.patternSection}>
                <div className={styles.patternContainer}>
                    <h3 className={styles.patternHeadline}>
                        Over the years, we saw the same <span className={styles.patternHighlight}>pattern repeat.</span>
                    </h3>
                    
                    <div className={styles.patternGrid}>
                        <div className={styles.patternItem}>
                            <span className={styles.patternNumber}>01</span>
                            <p className={styles.patternText}>Teams worked harder.</p>
                        </div>
                        <div className={styles.patternItem}>
                            <span className={styles.patternNumber}>02</span>
                            <p className={styles.patternText}>Processes became more complex.</p>
                        </div>
                        <div className={styles.patternItem}>
                            <span className={styles.patternNumber}>03</span>
                            <p className={styles.patternText}>Technology was added.</p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Part 3: The Journey (Scrapbook / Diary Style) */}
             <div className={styles.journeySection}>
                <div className={styles.journeyContainer}>

                    {/* New Transition Text */}
                    <div ref={textRef} className={styles.journeyIntro}>
                        <h3 className={styles.journeyHeadline}>
                            Yet revenue cycles remained unstable.<br/>
                            <span>That experience shaped the belief that defines Winspire today.</span>
                        </h3>
                    </div>
                    
                    {/* Decoration: Date Stamp */}
                     <div className={styles.dateStamp}>
                         <span className={styles.dateText}>WINSPIRE</span>
                    </div>

                    {/* Card 1: Image (Top Left) */}
                    <div className={`${styles.card} ${styles.card1} data-animate-card`} data-animate-card>
                        <div className={styles.imageWrapper}>
                             <img 
                                src="/temp/117735.jpg" 
                                alt="Founding moment" 
                                className={styles.sepiaImage}
                            />
                        </div>
                    </div>

                     {/* Card 2: Belief Part 1 (Top Right) */}
                    <div className={`${styles.card} ${styles.card2} data-animate-card`} data-animate-card>
                         {/* Tape effect */}
                         <div className={styles.tape}></div>
                        
                        <div className={styles.quoteIcon}><FaQuoteLeft /></div>
                        <p className={styles.cardText}>
                            Revenue cycles do not fail because people are not working hard enough.
                        </p>
                    </div>

                    {/* Card 3: Main Image (Center) */}
                    <div className={`${styles.card} ${styles.card3} data-animate-card`} data-animate-card>
                         <div className={styles.imageWrapper}>
                             <img 
                                src="/temp/13071.jpg" 
                                alt="Growth phase" 
                                className={styles.centerImage}
                            />
                        </div>
                    </div>

                    {/* Card 4: Belief Part 2 (Bottom Left) */}
                    <div className={`${styles.card} ${styles.card4} data-animate-card`} data-animate-card>
                         <p className={styles.missionText}>
                            They fail because the system was never designed to succeed.
                         </p>
                    </div>

                     {/* Card 5: Final Goal (Bottom Right) */}
                     <div className={`${styles.card} ${styles.card5} data-animate-card`} data-animate-card>
                         <p className={styles.cardText} style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Winspire exists to help healthcare organizations design revenue cycles that work consistently, calmly, and predictably by fixing the system, not exhausting the people inside it.
                         </p>
                    </div>

                </div>
             </div>
        </section>
    );
}
