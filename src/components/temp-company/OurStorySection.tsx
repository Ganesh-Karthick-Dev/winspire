/**
 * Our Story Section - Redesigned (Dapper Style)
 * Three distinct aesthetic parts: Serif Intro, Editorial Pattern, Scrapbook Journey.
 * Refactored to use CSS Modules (Standard CSS).
 */

'use client';

import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import styles from '@/styles/OurStorySection.module.css';

export default function OurStorySection() {
    return (
        <section className={styles.sectionContainer}>
             
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
                            Built Inside Healthcare.<br/>
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
                    <div className={styles.journeyIntro}>
                        <h3 className={styles.journeyHeadline}>
                            Yet revenue cycles remained unstable.<br/>
                            <span>That experience shaped the belief that defines Winspire today.</span>
                        </h3>
                    </div>
                    
                    {/* Decoration: Date Stamp */}
                     <div className={styles.dateStamp}>
                         <span className={styles.dateText}>2019</span>
                    </div>

                    {/* Card 1: Image (Top Left) */}
                    <div className={`${styles.card} ${styles.card1}`}>
                        <div className={styles.imageWrapper}>
                             <img 
                                src="/images/company-page/business-people-shaking-hands-congratulations-work-success.webp" 
                                alt="Founding moment" 
                                className={styles.sepiaImage}
                            />
                        </div>
                    </div>

                     {/* Card 2: Belief Part 1 (Top Right) */}
                    <div className={`${styles.card} ${styles.card2}`}>
                         {/* Tape effect */}
                         <div className={styles.tape}></div>
                        
                        <div className={styles.quoteIcon}><FaQuoteLeft /></div>
                        <p className={styles.cardText}>
                            Revenue cycles do not fail because people are not working hard enough.
                        </p>
                    </div>

                    {/* Card 3: Main Image (Center) */}
                    <div className={`${styles.card} ${styles.card3}`}>
                         <div className={styles.imageWrapper}>
                             <img 
                                src="/poster/qefqe.webp" 
                                alt="Growth phase" 
                                className={styles.centerImage}
                            />
                        </div>
                    </div>

                    {/* Card 4: Belief Part 2 (Bottom Left) */}
                    <div className={`${styles.card} ${styles.card4}`}>
                         <p className={styles.missionText}>
                            They fail because the system was never designed to succeed.
                         </p>
                    </div>

                     {/* Card 5: Final Goal (Bottom Right) */}
                     <div className={`${styles.card} ${styles.card5}`}>
                         <p className={styles.cardText} style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Winspire exists to help healthcare organizations design revenue cycles that work consistently, calmly, and predictably by fixing the system, not exhausting the people inside it.
                         </p>
                    </div>

                </div>
             </div>
        </section>
    );
}
