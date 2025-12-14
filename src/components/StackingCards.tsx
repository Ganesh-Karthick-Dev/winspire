'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/StackingCards.module.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: "What You Will Learn in Your Demo",
        subtitle: "Framing Effect",
        type: "list",
        intro: "During your personalized session, you will see how to:",
        items: [
            "View live dashboards with full transparency",
            "Bulk Denial Process Analysis",
            "Improve collections with real-time payer insights - Claim status, Eligibility, Benefits & Authorizations",
            "Reduce AR days using intelligent prioritization",
            "Automate repetitive RCM tasks using AI",
            "Eliminate manual errors and rework",
            "Increase operational efficiency by 30% within 90 days",
            "Achieve 24-hour TAT across departments",
            "Reduce dependency on staff turnover",
            "Scale your organization without scaling your team"
        ],
        cta: "Schedule Your Session Now",
        color: "bg-white"
    },
    {
        id: 2,
        title: "What to Expect After You Book",
        subtitle: "The Experience",
        type: "steps",
        items: [
            { title: "Step 1 — We Prepare Your Personalized Insights", desc: "We review your specialty, payer mix, revenue structure, and workflow gaps." },
            { title: "Step 2 — Live Walkthrough of Neura AI", desc: "You'll see predictive models, automation flows, AR intelligence, and sample dashboards." },
            { title: "Step 3 — Real-Time Problem Solving", desc: "We show exactly how Neura solves your specific RCM challenges." },
            { title: "Step 4 — Customized Outcome Roadmap", desc: "You get a tailored 30–90 day improvement plan at no cost." }
        ],
        cta: "Schedule Your Demo",
        color: "bg-white"
    },
    {
        id: 3,
        title: "All We Need Is 30 Minutes",
        subtitle: "Clarity + Ease",
        type: "simple-list",
        intro: "And These Three Details:",
        items: [
            "Your specialty or practice type",
            "Your top three RCM challenges",
            "Your preferred time slot"
        ],
        footer: "That's it. No heavy preparation. No reports needed. No contracts or commitments.",
        color: "bg-white"
    },
    {
        id: 4,
        title: "The Cost of Waiting",
        subtitle: "Loss Aversion",
        type: "warning",
        headline: "Every Month Without a partner like Winspire RCM Costs You Thousands.",
        items: [
            "Avoidable denials accumulate",
            "AR continues to age",
            "Claims move slower",
            "Appeals are missed",
            "Providers become frustrated",
            "Cash flow becomes unpredictable"
        ],
        footer: "Your revenue cycle deserves intelligence today — not someday.",
        color: "bg-white"
    },
];

export default function StackingCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Animations temporarily disabled to debug content visibility
    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         cardsRef.current.forEach((card, index) => {
    //             if (!card) return;

    //             // Get all animated elements
    //             const title = card.querySelector('.animate-title');
    //             const subtitle = card.querySelector('.animate-subtitle');
    //             const intro = card.querySelector('.animate-intro');
    //             const items = card.querySelectorAll('.animate-item');
    //             const footer = card.querySelector('.animate-footer');
    //             const cta = card.querySelector('.animate-cta');

    //             // Create timeline for this card
    //             const tl = gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: card,
    //                     start: "top center+=100",
    //                     toggleActions: "play none none reverse"
    //                 }
    //             });

    //             // Animate subtitle badge
    //             if (subtitle) {
    //                 tl.from(subtitle, {
    //                     y: -20,
    //                     opacity: 0,
    //                     duration: 0.6,
    //                     ease: "power3.out"
    //                 });
    //             }

    //             // Animate title with split text effect
    //             if (title) {
    //                 tl.from(title, {
    //                     y: 30,
    //                     opacity: 0,
    //                     duration: 0.8,
    //                     ease: "power3.out"
    //                 }, "-=0.3");
    //             }

    //             // Animate intro text
    //             if (intro) {
    //                 tl.from(intro, {
    //                     y: 20,
    //                     opacity: 0,
    //                     duration: 0.6,
    //                     ease: "power2.out"
    //                 }, "-=0.4");
    //             }

    //             // Animate items with stagger
    //             if (items.length > 0) {
    //                 tl.from(items, {
    //                     y: 20,
    //                     opacity: 0,
    //                     duration: 0.5,
    //                     stagger: 0.08,
    //                     ease: "power2.out"
    //                 }, "-=0.3");
    //             }

    //             // Animate footer
    //             if (footer) {
    //                 tl.from(footer, {
    //                     y: 20,
    //                     opacity: 0,
    //                     duration: 0.6,
    //                     ease: "power2.out"
    //                 }, "-=0.2");
    //             }

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const title = card.querySelector('.card-title-text');
                const starWipe = card.querySelector('.star-wipe'); // 6-pointed (Vector.svg)
                const starEnd = card.querySelector('.star-end'); // 4-pointed (Group.svg)

                if (!title || !starWipe || !starEnd) return;

                // Create timeline for this card
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });

                // Calculate the distance the star needs to travel based on TITLE width
                const titleWidth = (title as HTMLElement).offsetWidth;
                const starWidth = 60; // Width of the star
                const endPosition = titleWidth + 10; // End just after the title text

                // Set initial states
                gsap.set(starEnd, { opacity: 1, scale: 1 }); // 4-pointed stays at end
                gsap.set(starWipe, { x: -starWidth, opacity: 0, scale: 0.9, rotation: 0 }); // 6-pointed starts from left
                gsap.set(title, {
                    clipPath: 'inset(0 100% 0 0)', // Hide title initially (clip from right)
                    opacity: 1
                });

                // Fade in the 6-pointed star
                tl.to(starWipe, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Animate 6-pointed star wiping across the TITLE with rotation
                // AND reveal title progressively using clip-path
                tl.to(starWipe, {
                    x: endPosition, // Travel to the end of the title text
                    rotation: 360, // Smooth full rotation
                    duration: 1.8,
                    ease: "power1.inOut"
                }, "-=0.1");

                // Reveal title progressively as star moves (clip-path animation)
                tl.to(title, {
                    clipPath: 'inset(0 0% 0 0)', // Reveal from left to right
                    duration: 1.8,
                    ease: "power1.inOut"
                }, "-=1.8"); // Start at the same time as star movement
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={styles.stackingSection}>
            <div className={styles.cardsContainer}>
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => { cardsRef.current[index] = el }}
                        className={styles.card}
                        style={{
                            zIndex: index + 1,
                            transformOrigin: 'center top',
                        }}
                    >
                        <div className={styles.cardInner}>
                            {/* Card Header */}
                            <div className={styles.cardHeader}>
                                <div className={`title-container ${styles.titleContainer}`}>
                                    {/* 4-pointed star at the end (stays there) */}
                                    <img
                                        src="/svg/Group.svg"
                                        alt=""
                                        className={`star-end ${styles.starEnd}`}
                                    />
                                    {/* 6-pointed star that wipes from left to right */}
                                    <img
                                        src="/svg/Vector.svg"
                                        alt=""
                                        className={`star-wipe ${styles.starWipe}`}
                                    />
                                    {/* Title text */}
                                    <h2 className={`card-title-text ${styles.cardTitle}`}>
                                        {card.title}
                                    </h2>
                                </div>
                                {card.type === "warning" && card.headline && (
                                    <p className={styles.cardHeadline}>
                                        {card.headline}
                                    </p>
                                )}
                            </div>

                            {/* Card Content */}
                            <div>
                                {/* List Type */}
                                {card.type === "list" && (
                                    <div>
                                        {card.intro && (
                                            <p className={styles.intro} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                                {card.intro}
                                            </p>
                                        )}
                                        <div className={styles.listGrid}>
                                            {(card.items as string[]).map((item, i) => (
                                                <div key={i} className={styles.listItem}>
                                                    <svg className={styles.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className={styles.listText}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Steps Type */}
                                {card.type === "steps" && (
                                    <div className={styles.stepsGrid}>
                                        {(card.items as { title: string, desc: string }[]).map((item, i) => (
                                            <div key={i} className={styles.stepCard}>
                                                <h3 className={styles.stepTitle}>{item.title}</h3>
                                                <p className={styles.stepDesc}>{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Simple List Type */}
                                {card.type === "simple-list" && (
                                    <div className={styles.simpleListContainer}>
                                        {card.intro && (
                                            <p className={styles.intro}>{card.intro}</p>
                                        )}
                                        <div className={styles.simpleList}>
                                            {(card.items as string[]).map((item, i) => (
                                                <div key={i} className={styles.simpleListItem}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        {card.footer && (
                                            <p className={styles.footer}>
                                                {card.footer}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Warning Type */}
                                {card.type === "warning" && (
                                    <div className={styles.warningContainer}>
                                        <div className={styles.warningGrid}>
                                            {(card.items as string[]).map((item, i) => (
                                                <div key={i} className={styles.warningItem}>
                                                    <svg className={styles.warningIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className={styles.warningText}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {card.footer && (
                                            <p className={styles.warningFooter}>
                                                {card.footer}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* CTA Button */}
                            {card.cta && (
                                <div className={styles.ctaContainer}>
                                    <button className={styles.ctaButton}>
                                        {card.cta}
                                        <svg className={styles.ctaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
