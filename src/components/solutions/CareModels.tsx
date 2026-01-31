import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/CareModels.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CareModels: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            title: "Accurate Coding & Billing Alignment",
            description: "Precision in coding ensures that every service delivered is captured and billed correctly from day one."
        },
        {
            title: "Compliance & Regulatory Support",
            description: "Navigate the complex landscape of payer requirements and regulatory standards with confidence."
        },
        {
            title: "Clean Claim Submission",
            description: "Automated checks and balances to minimize denials and ensure faster reimbursement cycles."
        },
        {
            title: "Clear Revenue Visibility",
            description: "Real-time analytics and reporting to track the financial health of your RPM programs."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            const isMobile = window.innerWidth <= 768;
            if (isMobile) return;

            // Awards-style: Scroll-scrubbed timeline - animations tied to scroll progress
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "bottom 25%",
                    scrub: 1.2,
                }
            });

            // 1. Eyebrow: fade + slide up
            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
                0
            );

            // 2. Title: clip-path reveal (awards-style wipe)
            const titleLines = titleRef.current?.querySelectorAll(`.${styles.titleLine}`);
            if (titleLines?.length) {
                gsap.set(titleLines, { clipPath: "inset(0 100% 0 0)" });
                tl.to(titleLines, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power3.inOut"
                }, 0.08);
            }

            // 3. Subtitle: fade in
            tl.fromTo(subtitleRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
                0.25
            );

            // 4. Featured card: scale + fade (awards-style entrance)
            tl.fromTo(cardRef.current,
                { opacity: 0, scale: 0.88, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.2)" },
                0.35
            );

            // 5. Image: mask reveal
            if (visualRef.current) {
                gsap.set(visualRef.current, { clipPath: "inset(0 0 100% 0)" });
                tl.to(visualRef.current, {
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.3,
                    ease: "power3.inOut"
                }, 0.55);
            }

            // 6. Service cards: sequential reveal (each card wipes in from left)
            const items = listRef.current?.children;
            if (items) {
                Array.from(items).forEach((item, i) => {
                    gsap.set(item, { clipPath: "inset(0 100% 0 0)" });
                    tl.to(item, {
                        clipPath: "inset(0 0% 0 0)",
                        duration: 0.2,
                        ease: "power3.out"
                    }, 0.6 + i * 0.1);
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.bgGlow} />
            
            <div className={styles.container}>
                <div className={styles.header} ref={headerRef}>
                    <span className={styles.eyebrow} ref={eyebrowRef}>5. Supporting New Care Models</span>
                    <h2 className={styles.title} ref={titleRef}>
                        <span className={styles.titleLine}>Revenue Enablement for</span>
                        <span className={styles.titleLine}>Remote Patient Monitoring</span>
                    </h2>
                    <p className={styles.subtitle} ref={subtitleRef}>
                        As virtual care models expand, revenue operations must evolve. We ensure your RPM programs scale confidently with compliant and efficient financial workflows.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.featuredCard} ref={cardRef}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Scale Confidently</h3>
                            <p className={styles.cardDescription}>
                                Launch and grow your remote patient monitoring programs without being held back by operational inefficiencies or compliance risks.
                            </p>
                        </div>
                        <div className={styles.visualElement} ref={visualRef}>
                            <img
                                src="/images/company-page/cloud-computing-cyber-security.webp"
                                alt="Scale confidently"
                                className={styles.visualImage}
                            />
                        </div>
                    </div>

                    <div className={styles.servicesList} ref={listRef}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceItem}>
                                <div className={styles.iconWrapper}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div className={styles.serviceContent}>
                                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                                    <p className={styles.serviceDesc}>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareModels;
