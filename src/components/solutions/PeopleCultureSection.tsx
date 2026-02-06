'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Award, Zap, Lightbulb, Users, Target } from 'lucide-react'; 
import Image from 'next/image';
import styles from '../../styles/PeopleCultureSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const PeopleCultureSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // DESKTOP: Horizontal Scroll
            mm.add("(min-width: 769px)", () => {
                const trackWidth = track.scrollWidth;
                const windowWidth = window.innerWidth;
                const xMovement = -(trackWidth - windowWidth + windowWidth * 0.1);

                gsap.to(track, {
                    x: xMovement,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section, 
                        pin: true,
                        scrub: 1,
                        start: 'center center',
                        end: () => `+=${Math.abs(xMovement) + 150}`, 
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
                });
            });

            // MOBILE: Vertical Fade Up
            mm.add("(max-width: 768px)", () => {
                const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
                cards.forEach((card) => {
                    gsap.fromTo(card, 
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.pinContainer}>
                <header className={styles.header}>
                    <h2 className={styles.title}>People and Culture Behind the Solutions</h2>
                    <p className={styles.subtitle}>
                        This culture of ownership and innovation directly benefits our clients.
                    </p>
                </header>
                
                <div className={styles.trackContainer} ref={trackRef}>
                    {/* SMAART HIRE Section - BLUE THEME */}
                    <div 
                        className={`${styles.card} ${styles.cardBlue}`}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.cardTag}>SMAART HIRE</span>
                            <h3 className={styles.cardTitle}>Performance Delivered by the Right Teams</h3>
                            <p className={styles.cardDescription}>
                                Even the strongest systems depend on the people who operate them. Through our AI-enabled SMAART HIRE framework.
                            </p>
                        </div>
                        
                        <div className={styles.gratifyContainer}>
                            <div className={`${styles.visualContainer} ${styles.visualContainerBlue}`}>
                                <Image 
                                    src="/images/careers/team-rooftop.png"
                                    alt="Smaart Hire Team" 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={`${styles.floatingPoint} ${styles.point1}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberBlue}`}>01</span>
                                    <span className={styles.pointText}>Deep domain expertise</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point2}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberBlue}`}>02</span>
                                    <span className={styles.pointText}>Ownership and accountability</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point3}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberBlue}`}>03</span>
                                    <span className={styles.pointText}>Consistent quality at scale</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gratify AI Section - GREEN THEME */}
                    <div 
                        className={`${styles.card} ${styles.cardGreen}`}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.cardTag}>Gratify AI</span>
                            <h3 className={styles.cardTitle}>Recognition That Reflects Real Impact</h3>
                            <p className={styles.cardDescription}>
                                Gratify is our proprietary appreciation platform designed to recognize meaningful contribution.
                            </p>
                        </div>

                        <div className={styles.gratifyContainer}>
                            <div className={`${styles.visualContainer} ${styles.visualContainerGreen}`}>
                                {/* Image Background */}
                                <Image 
                                    src="/temp/13071.jpg" 
                                    alt="Team Recognition" 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={`${styles.floatingPoint} ${styles.point1}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberGreen}`}>01</span>
                                    <span className={styles.pointText}>Celebrates impact created for clients and teams</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point2}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberGreen}`}>02</span>
                                    <span className={styles.pointText}>Recognizes quality, ownership, collaboration, innovation, and integrity</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point3}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberGreen}`}>03</span>
                                    <span className={styles.pointText}>Operates in real time with transparent recognition</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point4}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberGreen}`}>04</span>
                                    <span className={styles.pointText}>Encourages peer, leadership, and client-driven appreciation</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Innovation Hub Section - PURPLE THEME */}
                    <div 
                        className={`${styles.card} ${styles.cardPurple}`}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.cardTag}>Innovation Hub</span>
                            <h3 className={styles.cardTitle}>Turning Ideas Into Measurable Progress</h3>
                            <p className={styles.cardDescription}>
                                Our Innovation Hub captures, evaluates, and scales ideas from across the organization.
                            </p>
                        </div>

                        <div className={styles.gratifyContainer}>
                            <div className={`${styles.visualContainer} ${styles.visualContainerPurple}`}>
                                <Image 
                                    src="/images/careers/brainstorm.png" 
                                    alt="Innovation Hub" 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={`${styles.floatingPoint} ${styles.point1}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberPurple}`}>01</span>
                                    <span className={styles.pointText}>Team-Led Innovation: Empowering teams closest to the work</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point2}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberPurple}`}>02</span>
                                    <span className={styles.pointText}>Value-Based Filtering: Evaluates ideas based on efficiency</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point3}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberPurple}`}>03</span>
                                    <span className={styles.pointText}>Actionable Improvements: Converts strong ideas into progress</span>
                                </div>
                                <div className={`${styles.floatingPoint} ${styles.point4}`}>
                                    <span className={`${styles.pointNumber} ${styles.pointNumberPurple}`}>04</span>
                                    <span className={styles.pointText}>Continuous Growth: Reinforces improvement as a daily practice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PeopleCultureSection;
