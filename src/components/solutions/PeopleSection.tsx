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

    // Card rendering logic
    const renderCards = () => cards.map((card, index) => {
        const total = cards.length;
        const offset = (index - activeCard + total) % total;
        const isActive = offset === 0;
        const isExiting = offset === total - 1;
        const isStacked = !isActive && !isExiting;
        const stackIndex = isStacked ? offset - 1 : 0;

        return (
            <div
                key={index}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                style={{
                    transform: isActive
                        ? 'translateY(-50%) translateX(0) rotate(2deg) scale(1)'
                        : isExiting
                            ? 'translateY(-50%) translateX(-150%) rotate(-10deg) scale(0.95)'
                            : `translateY(-50%) translateX(${-50 - stackIndex * 30}px) 
                               rotate(${-5 - stackIndex * 5}deg) 
                               scale(${0.9 - stackIndex * 0.1})`,
                    zIndex: isActive ? 100 : isExiting ? 90 : 50 - stackIndex,
                    opacity: isActive ? 1 : isExiting ? 0 : 0.9 - (stackIndex * 0.1),
                    transition: offset === total - 2 ? 'none' : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <img src={card.image} alt={card.alt} />
            </div>
        );
    });

    // Mobile card rendering (simpler transform for mobile)
    const renderMobileCards = () => cards.map((card, index) => {
        const total = cards.length;
        const offset = (index - activeCard + total) % total;
        const isActive = offset === 0;
        const isExiting = offset === total - 1;
        const isStacked = !isActive && !isExiting;
        const stackIndex = isStacked ? offset - 1 : 0;

        return (
            <div
                key={index}
                className={`${styles.mobileCard} ${isActive ? styles.cardActive : ''}`}
                style={{
                    transform: isActive
                        ? 'translate(-50%, -50%) rotate(2deg) scale(1)'
                        : isExiting
                            ? 'translate(-150%, -50%) rotate(-10deg) scale(0.95)'
                            : `translate(calc(-50% - ${stackIndex * 20}px), -50%) 
                               rotate(${-3 - stackIndex * 3}deg) 
                               scale(${0.95 - stackIndex * 0.05})`,
                    zIndex: isActive ? 100 : isExiting ? 90 : 50 - stackIndex,
                    opacity: isActive ? 1 : isExiting ? 0 : 0.9 - (stackIndex * 0.1),
                    transition: offset === total - 2 ? 'none' : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <img src={card.image} alt={card.alt} />
            </div>
        );
    });

    return (
        <section className={styles.section}>
            {/* ===== DESKTOP VIEW ===== */}
            <div className={styles.desktopView}>
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
                            {renderCards()}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE VIEW ===== */}
            <div className={styles.mobileView}>
                {/* Header */}
                <div className={styles.mobileHeader}>
                    <div className={styles.mobileDots}>
                        <span></span>
                        <span></span>
                    </div>
                    <h2 className={styles.mobileTitle}>People</h2>
                </div>
                <div className={styles.mobileSubtitle}>Members working at Winspire</div>

                {/* Stacked Cards */}
                <div className={styles.mobileCardsContainer}>
                    <div className={styles.mobileStackedCards}>
                        {renderMobileCards()}
                    </div>
                </div>

                {/* Description */}
                <p className={styles.mobileDescription}>
                    Winspire brings together talented members from diverse backgrounds, combining their knowledge, experience, and ideas to create an organization where everyone can contribute their unique value.
                </p>
            </div>
        </section>
    );
};

export default PeopleSection;
