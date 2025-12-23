'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './PeopleSection.module.css';

const PeopleSection: React.FC = () => {
    const [activeCard, setActiveCard] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const cards = [
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

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate scroll progress within section
                const scrollProgress = Math.max(0, Math.min(1,
                    (windowHeight - rect.top) / (windowHeight + rect.height)
                ));

                // Change card based on scroll progress
                const cardIndex = Math.min(
                    cards.length - 1,
                    Math.floor(scrollProgress * cards.length * 1.5)
                );

                setActiveCard(cardIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [cards.length]);

    return (
        <section ref={sectionRef} className={styles.section}>
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
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`${styles.card} ${index === activeCard ? styles.cardActive : ''
                                    } ${index < activeCard ? styles.cardPassed : ''}`}
                                style={{
                                    transform: `
                                        translateY(-50%) 
                                        translateX(${index < activeCard ? '-150%' : '0%'}) 
                                        rotate(${index === activeCard ? '2deg' : `${2 + (index - activeCard) * 3}deg`})
                                        scale(${index === activeCard ? 1 : 0.95 - (Math.abs(index - activeCard) * 0.03)})
                                    `,
                                    zIndex: cards.length - Math.abs(index - activeCard),
                                    opacity: index === activeCard ? 1 : index > activeCard ? 0.8 : 0
                                }}
                            >
                                <img src={card.image} alt={card.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PeopleSection;
