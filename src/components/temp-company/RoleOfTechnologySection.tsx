'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/RoleOfTechnologySection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const RoleOfTechnologySection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const leftTextRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Pin, scrub timeline, feature highlights
            mm.add("(min-width: 769px)", () => {
                gsap.set(leftTextRef.current, { opacity: 1 });
                gsap.set(imageRef.current, { opacity: 0 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: `.${styles.leftColumn}`,
                    pinSpacing: true,
                    anticipatePin: 1,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    }
                });

                tl.to({}, { duration: 5 })
                  .to(leftTextRef.current, { opacity: 0, duration: 2, ease: "power2.inOut" })
                  .to(imageRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, "-=1");

                const features = gsap.utils.toArray(`.${styles.featureItem}`);
                features.forEach((feat: any) => {
                    gsap.to(feat, {
                        scrollTrigger: {
                            trigger: feat,
                            start: "top 60%",
                            end: "bottom 40%",
                            toggleClass: styles.active,
                            scrub: true
                        }
                    });
                });
            });

            // MOBILE: No pin/scrub – show text + image stacked, ensure content visible
            mm.add("(max-width: 768px)", () => {
                gsap.set(leftTextRef.current, { opacity: 1 });
                gsap.set(imageRef.current, { opacity: 1 });
                // Feature items: simple scroll-in active state
                const features = gsap.utils.toArray(`.${styles.featureItem}`);
                features.forEach((feat: any) => {
                    ScrollTrigger.create({
                        trigger: feat,
                        start: "top 85%",
                        onEnter: () => (feat as HTMLElement).classList.add(styles.active),
                    });
                });
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                
                {/* LEFT COLUMN - Sticky & Transforming */}
                <div className={styles.leftColumn}>
                    <div className={styles.cardLeft}>
                        {/* STATE 1: Text Content */}
                        <div className={styles.textState} ref={leftTextRef}>
                            <h2 className={styles.heading}>
                                Intelligence That Supports People, <br />
                                <span className={styles.highlight}>Not Replaces Them</span>
                            </h2>
                            <p className={styles.subText}>
                                Winspire is deeply technology-enabled but never technology-led.<br /><br />
                                Our proprietary intelligence layer, <strong>Neura</strong>, is embedded directly into how work gets done. It removes friction from execution and supports smarter, faster decisions without adding complexity.
                            </p>
                        </div>

                        {/* STATE 2: Image Reveal */}
                        <div className={styles.imageState} ref={imageRef}>
                            <img 
                                src="/images/company-page/cloud-computing-cyber-security.webp" 
                                alt="Role of Technology Interface" 
                                className={styles.revealImg} 
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Scrolling Content */}
                <div className={styles.rightColumn} ref={rightColRef}>
                    <div className={styles.sectionTitleWrapper}>
                        <span className={styles.sectionTitle}>The Role of Technology</span>
                        <h2 className={styles.mainTitle}>
                            Technology at Winspire is quiet, explainable, and trusted.
                        </h2>
                    </div>

                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>Identify risk early</h3>
                            <p className={styles.featureDesc}>Neura scans data patterns to flag potential issues before they become critical problems.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>Prioritize work based on impact</h3>
                            <p className={styles.featureDesc}>Smart algorithms sort tasks by value and urgency, ensuring high-impact work is done first.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>Reduce repetitive manual effort</h3>
                            <p className={styles.featureDesc}>Automating routine data entry and validation frees up human talent for complex problem solving.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>Improve quality without micromanagement</h3>
                            <p className={styles.featureDesc}>Built-in guardrails and real-time feedback ensuring high standards are met autonomously.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>Give leadership real-time visibility</h3>
                            <p className={styles.featureDesc}>Instant insights into operational health and team performance without manual reporting.</p>
                        </div>
                         {/* Additional Spacer to ensure scrolling past the last item completes animations if needed */}
                         <div style={{ height: '200px' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoleOfTechnologySection;
