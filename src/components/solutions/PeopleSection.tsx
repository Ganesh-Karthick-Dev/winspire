'use client';

import React, { useEffect, useState } from 'react';
import styles from './PeopleSection.module.css';

const PeopleSection: React.FC = () => {
    const [activeCard, setActiveCard] = useState(0);


    const originalCards = [
        {
            image: '/images/careers/team-rooftop.png',
            alt: 'Team collaboration'
        },
        {
            image: '/images/careers/brainstorm.png',
            alt: 'Team meeting'
        },
        {
            image: '/images/careers/presentation.png',
            alt: 'Team discussion'
        }
    ];

    // Duplicate cards to create a smoother infinite stack effect
    const cards = [...originalCards, ...originalCards];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % cards.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side: Content */}
                <div className={styles.content}>
                    {/* Title with Dots */}
                    <div className={styles.titleWrapper}>
                        <div className={styles.dots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                        <h2 className={styles.title}>People</h2>
                    </div>
                    <div className={styles.subtitle}>Our Team Members</div>

                    {/* Main Description */}
                    <p className={styles.description}>
                        Winspire brings together talented members from diverse backgrounds, combining their knowledge, experience, and ideas to create an organization where everyone can contribute their unique value.
                    </p>

                    {/* Additional Description */}
                    <p className={styles.additionalText}>
                        Our team members work as experts in their respective domains, focusing on research, implementation, and validation in a balanced environment of stability and flexibility. We respect each person's diversity and leverage our collective intelligence as our greatest strength to drive company growth together.
                    </p>
                </div>

                {/* Right Side: Stacked Cards */}
                <div className={styles.cardsContainer}>
                    <div className={styles.stackedCards}>
                        {cards.map((card, index) => {
                            // Calculate relative position based on active card
                            const total = cards.length;
                            const offset = (index - activeCard + total) % total;

                            // Determine visual state
                            // offset 0: Active
                            // offset 1..N-2: Stacked behind
                            // offset N-1: Exiting

                            const isActive = offset === 0;
                            const isExiting = offset === total - 1;
                            const isStacked = !isActive && !isExiting;

                            // Stack index (0 for next card, 1 for next-next...)
                            const stackIndex = isStacked ? offset - 1 : 0;

                            return (
                                <div
                                    key={index}
                                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                                    style={{
                                        transform: isActive
                                            ? 'translateY(-50%) translateX(0) rotate(2deg) scale(1)'
                                            : isExiting
                                                ? 'translateY(-50%) translateX(-150%) rotate(-10deg) scale(0.95)' // Fly out left
                                                : `translateY(-50%) translateX(${-50 - stackIndex * 30}px) 
                                                   rotate(${-5 - stackIndex * 5}deg) 
                                                   scale(${0.9 - stackIndex * 0.1})`, // Stacked LEFT
                                        zIndex: isActive
                                            ? 100
                                            : isExiting
                                                ? 90
                                                : 50 - stackIndex,
                                        opacity: isActive
                                            ? 1
                                            : isExiting
                                                ? 0
                                                : 0.9 - (stackIndex * 0.1), // Fade deeper cards slightly
                                        // CRITICAL: Disable transition when snapping from Exiting (offset N-1) to Deepest Stack (offset N-2)
                                        // When offset changes from N-1 -> N-2? 
                                        // Wait: Active i -> i+1.
                                        // Card X: Offset k -> k-1.
                                        // 0 -> N-1 (Active -> Exiting). Smooth.
                                        // N-1 -> N-2 (Exiting -> Deep Stack). THIS IS THE SNAP.
                                        // So if we are currently at N-2 (Deepest Stack), we need transition: none ??
                                        // Wait, offset N-2 is the "bottom" of the visual stack.
                                        // Yes, we want 'transition: none' specifically when arriving at the bottom of the stack.
                                        transition: offset === total - 2 ? 'none' : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <img src={card.image} alt={card.alt} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PeopleSection;
