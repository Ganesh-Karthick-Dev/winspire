'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/StackingCards.module.css';
import { FaChartLine, FaRobot, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { MdDashboard, MdAutorenew, MdSpeed, MdWarning } from 'react-icons/md';
import { HiSparkles, HiLightningBolt, HiClock, HiExclamation } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: "What You Will Learn in Your Demo",
        icon: MdDashboard,
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
        panelGradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
    },
    {
        id: 2,
        title: "What to Expect After You Book",
        icon: HiSparkles,
        type: "steps",
        items: [
            { title: "Step 1 — We Prepare Your Personalized Insights", desc: "We review your specialty, payer mix, revenue structure, and workflow gaps." },
            { title: "Step 2 — Live Walkthrough of Neura AI", desc: "You'll see predictive models, automation flows, AR intelligence, and sample dashboards." },
            { title: "Step 3 — Real-Time Problem Solving", desc: "We show exactly how Neura solves your specific RCM challenges." },
            { title: "Step 4 — Customized Outcome Roadmap", desc: "You get a tailored 30–90 day improvement plan at no cost." }
        ],
        cta: "Schedule Your Demo",
        panelGradient: "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)"
    },
    {
        id: 3,
        title: "All We Need Is 30 Minutes",
        icon: HiClock,
        type: "simple-list",
        intro: "And These Three Details:",
        items: [
            "Your specialty or practice type",
            "Your top three RCM challenges",
            "Your preferred time slot"
        ],
        footer: "That's it. No heavy preparation. No reports needed. No contracts or commitments.",
        cta: "Book Now",
        panelGradient: "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)"
    },
    {
        id: 4,
        title: "The Cost of Waiting",
        icon: MdSpeed,
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
        cta: "Take Action Now",
        panelGradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
    },
];

export default function StackingCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const title = card.querySelector('.card-title-text');
                const starWipe = card.querySelector('.star-wipe');
                const starEnd = card.querySelector('.star-end');

                if (!title || !starWipe || !starEnd) return;

                // Query content elements
                const intro = card.querySelector('.card-intro');
                const headline = card.querySelector('.card-headline');
                const listItems = card.querySelectorAll('.list-item-animate');
                const stepCards = card.querySelectorAll('.step-card-animate');
                const simpleListItems = card.querySelectorAll('.simple-list-item-animate');
                const warningItems = card.querySelectorAll('.warning-item-animate');
                const cardFooter = card.querySelector('.card-footer');
                const warningFooter = card.querySelector('.warning-footer-animate');
                const ctaButton = card.querySelector('.cta-button-animate');

                // Create timeline for this card
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });

                // Calculate title animation
                const titleWidth = (title as HTMLElement).offsetWidth;
                const starWidth = 60;
                const endPosition = titleWidth + 10;

                // Set initial states for title
                gsap.set(starEnd, { opacity: 1, scale: 1 });
                gsap.set(starWipe, { x: -starWidth, opacity: 0, scale: 0.9, rotation: 0 });
                gsap.set(title, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });

                // Set initial states for content elements
                if (intro) gsap.set(intro, { opacity: 0, y: 15 });
                if (headline) gsap.set(headline, { opacity: 0, x: -20 });
                if (listItems.length) gsap.set(listItems, { opacity: 0, y: 20, scale: 0.95 });
                if (stepCards.length) gsap.set(stepCards, { opacity: 0, x: -20 });
                if (simpleListItems.length) gsap.set(simpleListItems, { opacity: 0, scale: 0.9 });
                if (warningItems.length) gsap.set(warningItems, { opacity: 0, x: -15 });
                if (cardFooter) gsap.set(cardFooter, { opacity: 0, y: 15 });
                if (warningFooter) gsap.set(warningFooter, { opacity: 0, y: 15 });
                if (ctaButton) gsap.set(ctaButton, { opacity: 0, y: 10 });

                // Title animation sequence
                tl.to(starWipe, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                tl.to(starWipe, {
                    x: endPosition,
                    rotation: 360,
                    duration: 1.8,
                    ease: "power1.inOut"
                }, "-=0.1");

                tl.to(title, {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.8,
                    ease: "power1.inOut"
                }, "-=1.8");

                // Content animations (after title)
                if (headline) {
                    tl.to(headline, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "-=1.2");
                }

                if (intro) {
                    tl.to(intro, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    }, "-=1.0");
                }

                // List items - stagger animation
                if (listItems.length) {
                    tl.to(listItems, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power2.out"
                    }, "-=0.6");
                }

                // Step cards - slide in
                if (stepCards.length) {
                    tl.to(stepCards, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, "-=0.6");
                }

                // Simple list items - scale in
                if (simpleListItems.length) {
                    tl.to(simpleListItems, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "back.out(1.2)"
                    }, "-=0.5");
                }

                // Warning items - slide from left
                if (warningItems.length) {
                    tl.to(warningItems, {
                        opacity: 1,
                        x: 0,
                        duration: 0.35,
                        stagger: 0.04,
                        ease: "power2.out"
                    }, "-=0.6");
                }

                // Footer animations
                if (cardFooter) {
                    tl.to(cardFooter, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    }, "-=0.3");
                }

                if (warningFooter) {
                    tl.to(warningFooter, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    }, "-=0.3");
                }

                // CTA button
                if (ctaButton) {
                    tl.to(ctaButton, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    }, "-=0.2");
                }
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
                        <div className={`${styles.cardInner} ${index % 2 === 1 ? styles.reversed : ''}`}>
                            {/* Left Side - Content */}
                            <div className={styles.contentSide}>
                                {/* Icon */}
                                <div className={styles.iconContainer}>
                                    <card.icon className={styles.cardIcon} />
                                </div>

                                {/* Title with Animation - DO NOT TOUCH */}
                                <div className={styles.cardHeader}>
                                    <div className={`title-container ${styles.titleContainer}`}>
                                        <img
                                            src="/svg/Group.svg"
                                            alt=""
                                            className={`star-end ${styles.starEnd}`}
                                        />
                                        <img
                                            src="/svg/Vector.svg"
                                            alt=""
                                            className={`star-wipe ${styles.starWipe}`}
                                        />
                                        <h2 className={`card-title-text ${styles.cardTitle}`}>
                                            {card.title}
                                        </h2>
                                    </div>
                                    {card.type === "warning" && card.headline && (
                                        <p className={`card-headline ${styles.cardHeadline}`}>
                                            {card.headline}
                                        </p>
                                    )}
                                </div>

                                {/* Content based on type */}
                                <div className={styles.contentArea}>
                                    {/* List Type */}
                                    {card.type === "list" && (
                                        <div>
                                            {card.intro && (
                                                <p className={`card-intro ${styles.intro}`}>
                                                    {card.intro}
                                                </p>
                                            )}
                                            <div className={styles.listGrid}>
                                                {(card.items as string[]).map((item, i) => (
                                                    <div key={i} className={`list-item-animate ${styles.listItem}`}>
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
                                                <div key={i} className={`step-card-animate ${styles.stepCard}`}>
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
                                                <p className={`card-intro ${styles.intro}`}>{card.intro}</p>
                                            )}
                                            <div className={styles.simpleList}>
                                                {(card.items as string[]).map((item, i) => (
                                                    <div key={i} className={`simple-list-item-animate ${styles.simpleListItem}`}>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            {card.footer && (
                                                <p className={`card-footer ${styles.footer}`}>
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
                                                    <div key={i} className={`warning-item-animate ${styles.warningItem}`}>
                                                        <svg className={styles.warningIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        <span className={styles.warningText}>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            {card.footer && (
                                                <p className={`warning-footer-animate ${styles.warningFooter}`}>
                                                    {card.footer}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                {card.cta && (
                                    <div className={styles.ctaContainer}>
                                        <button className={`cta-button-animate ${styles.ctaButton}`}>
                                            {card.cta}
                                            <svg className={styles.ctaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Right Side - Glossy Image Panel */}
                            <div
                                className={styles.imageSide}
                                style={{
                                    background: card.panelGradient,
                                }}
                            >
                                <div className={styles.glassPanel}>
                                    {/* Placeholder for images/illustrations */}
                                    <div className={styles.imagePlaceholder}>
                                        {/* Will add images here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
