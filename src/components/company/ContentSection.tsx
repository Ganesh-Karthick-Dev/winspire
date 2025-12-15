'use client';

import { useRef, useEffect } from 'react';
import styles from './ContentSection.module.css';

export default function ContentSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const desc1Ref = useRef<HTMLHeadingElement>(null);
    const desc2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let ctx: gsap.Context;

        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Header Animation
                const headerLines = headerRef.current?.querySelectorAll('.header-line');

                if (headerLines && headerLines.length > 0) {
                    gsap.fromTo(headerLines,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            stagger: 0.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: headerRef.current,
                                start: 'top 60%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }

                // Title Animation
                const titleChars = titleRef.current?.querySelectorAll('.title-char');
                if (titleChars && titleChars.length > 0) {
                    gsap.fromTo(titleChars,
                        {
                            opacity: 0,
                            rotateY: 90,
                            y: 50,
                            transformOrigin: "50% 50% -50px"
                        },
                        {
                            opacity: 1,
                            rotateY: 0,
                            y: 0,
                            duration: 1,
                            stagger: 0.05,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: 'top 75%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }

                // Simple swap: Show section 1, then swap to section 2 on scroll
                if (desc1Ref.current && desc2Ref.current) {
                    // Initially show first, hide second below
                    gsap.set(desc1Ref.current, { opacity: 1, y: 0 });
                    gsap.set(desc2Ref.current, { opacity: 0, y: 50 });

                    // Create timeline for swap
                    const swapTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: desc2Ref.current,
                            start: 'top bottom-=900px',
                            end: 'top top+=600px',
                            scrub: 1
                        }
                    });

                    swapTimeline
                        .to(desc1Ref.current, { opacity: 0, y: -50, duration: 0.5 })
                        .to(desc2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, '<');
                }

                // Animate stacking cards in from bottom - AFTER swap completes
                const stackCards = sectionRef.current?.querySelectorAll(`.${styles.stackCard}`);
                const stackContainer = sectionRef.current?.querySelector(`.${styles.stackingContainer}`);

                if (stackCards && stackCards.length > 0 && stackContainer) {
                    gsap.set(stackCards, { opacity: 0, y: 100 }); // Set initial state

                    // First card appears after swap sections
                    gsap.to(stackCards[0], {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: stackContainer,
                            start: 'top bottom-=200px',
                            end: 'top center',
                            scrub: 1
                        }
                    });

                    // Remaining cards appear sequentially
                    for (let i = 1; i < stackCards.length; i++) {
                        gsap.to(stackCards[i], {
                            opacity: 1,
                            y: 0,
                            scrollTrigger: {
                                trigger: stackCards[i - 1],
                                start: 'top top+=300px',
                                end: 'top top+=100px',
                                scrub: 1
                            }
                        });
                    }
                }
            }, sectionRef);
        };

        initAnimations();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    const titleText = "Winspire RCM .";

    return (
        <section ref={sectionRef} className={styles.contentSection}>
            <div className={styles.contentInner}>
                <h3 ref={headerRef} className={styles.topHeader}>
                    <span className="header-line" style={{ display: 'block' }}>A New Kind of RCM Company.</span>
                    <span className="header-line" style={{ display: 'block' }}>AI-Driven. People-Focused.</span>
                    <span className="header-line" style={{ display: 'block' }}>Outcome-Obsessed.</span>
                </h3>

                <h2 ref={titleRef} className={styles.mainTitle}>
                    {titleText.split('').map((char, index) => (
                        <span
                            key={index}
                            className="title-char"
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'pre'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h2>

                <div className={styles.descriptionContainer}>
                    <h3 ref={desc1Ref} className={`${styles.topHeader2} ${styles.descriptionSection}`}>
                        <span className="header-line" style={{ display: 'block' }}>is built on a simple belief — healthcare</span>
                        <span className="header-line" style={{ display: 'block' }}>organizations deserve a revenue cycle that is</span>
                        <span className="header-line" style={{ display: 'block' }}>intelligent, predictable, transparent, and built to scale.</span>
                    </h3>

                    <h3 ref={desc2Ref} className={`${styles.topHeader2} ${styles.descriptionSection}`}>
                        <span className="header-line" style={{ display: 'block' }}> combine advanced AI, automation, and</span>
                        <span className="header-line" style={{ display: 'block' }}>ooperational expertise to create a system-driven</span>
                        <span className="header-line" style={{ display: 'block' }}>RCM model that delivers measurable results</span>
                        <span className="header-line" style={{ display: 'block' }}>Revery single time.</span>
                    </h3>
                </div>

                {/* Stacking Cards */}
                <div className={styles.stackingContainer}>
                    {[
                        { title: "AI-Enabled RCM Ecosystem", description: "An intelligent revenue cycle framework that automates workflows, reduces inefficiencies, and drives smarter financial outcomes." },
                        { title: "Zero Client Attrition", description: "Building lasting partnerships through exceptional service delivery and consistent results that exceed expectations." },
                        { title: "Zero Employee Attrition", description: "Creating a workplace culture that values growth, innovation, and employee satisfaction for long-term success." },
                        { title: "ISO 27001 + ISO 9001 Standards", description: "Maintaining the highest standards of information security and quality management across all operations." },
                        { title: "100% Cloud-Based & Secure", description: "Leveraging modern cloud infrastructure to ensure scalability, reliability, and enterprise-grade security." },
                        { title: "24-Hour TAT Culture", description: "Committed to rapid turnaround times that keep your revenue cycle moving efficiently and effectively." },
                        { title: "Transparent Dashboards for Every Client", description: "Real-time visibility into performance metrics and outcomes through intuitive, customizable dashboards." }
                    ].map((card, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={styles.stackCard}>
                                <div className={styles.stackCardContent}>
                                    {/* Text on left for even index */}
                                    {isEven && (
                                        <div className={styles.stackTextContent}>
                                            <h4 className={styles.stackCardTitle}>{card.title}</h4>
                                            <p className={styles.stackCardDescription}>{card.description}</p>
                                        </div>
                                    )}

                                    {/* Image always in center */}
                                    <div className={styles.stackImageContent}>
                                        <div className={styles.stackImagePlaceholder}></div>
                                    </div>

                                    {/* Text on right for odd index */}
                                    {!isEven && (
                                        <div className={styles.stackTextContent}>
                                            <h4 className={styles.stackCardTitle}>{card.title}</h4>
                                            <p className={styles.stackCardDescription}>{card.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
