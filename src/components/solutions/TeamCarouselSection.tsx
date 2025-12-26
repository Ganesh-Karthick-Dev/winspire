'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import styles from './TeamCarouselSection.module.css';
import Image from 'next/image';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    group: string;
    description: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Takumi Yoshida",
        role: "Product Manager / Group Manager",
        group: "Product Group",
        description: "As a senior interaction designer at Experientia srl (Italy), he worked on design solutions for web, apps, services, etc. In 2015, he joined BULB Inc. as a front-end developer and designer, responsible for the UI design and implementation of web services and smartphone apps. In December 2017, he joined Styleport.",
        image: "/images/company/grid-1.png"
    },
    {
        id: 2,
        name: "Masaru Kimura",
        role: "CTO",
        group: "Engineering Group",
        description: "Leading the technical strategy and development of our core 3D engine. Passionate about bringing immersive experiences to the web.",
        image: "/images/company/grid-2.png"
    },
    {
        id: 3,
        name: "Kyohei Ueda",
        role: "UI/UX Designer",
        group: "Design Group",
        description: "Focusing on creating intuitive and beautiful user interfaces that bridge the gap between complex technology and user needs.",
        image: "/images/company/grid-3.png"
    },
    {
        id: 4,
        name: "Shigeto Miura",
        role: "Group Manager",
        group: "Sales Group",
        description: "Driving business growth through strategic partnerships and client success initiatives across the real estate sector.",
        image: "/images/company/grid-4.png"
    },
];

const TeamCarouselSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    // Touch handlers for mobile swipe
    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
    };

    const onTouchMove = (e: TouchEvent) => {
        if (!touchStart) return;
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);
        setDragOffset(currentTouch - touchStart);
    };

    const onTouchEnd = () => {
        setIsDragging(false);
        setDragOffset(0);

        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    // Desktop: Get visible members
    const getVisibleMembers = () => {
        const visible = [];
        for (let i = 0; i < teamMembers.length; i++) {
            visible.push(teamMembers[(activeIndex + i) % teamMembers.length]);
        }
        return visible;
    };

    const visibleMembers = getVisibleMembers();
    const activeMember = visibleMembers[0];
    const prevMember = teamMembers[(activeIndex - 1 + teamMembers.length) % teamMembers.length];

    return (
        <section className={styles.section}>
            {/* ===== DESKTOP VIEW ===== */}
            <div className={styles.desktopView}>
                <div className={styles.carouselContainer}>
                    {/* Previous Card (Partially Visible) */}
                    <div className={styles.prevCard} key={`prev-${prevMember.id}`}>
                        <div className={styles.smallCardImage}>
                            <Image
                                src={prevMember.image}
                                alt={prevMember.name}
                                fill
                                className={styles.memberImage}
                                sizes="25vw"
                            />
                        </div>
                    </div>

                    {/* Active Card (Expanded Key Visual) */}
                    <div className={styles.activeCardWrapper} key={activeMember.id}>
                        <div className={styles.activeCardImage}>
                            <Image
                                src={activeMember.image}
                                alt={activeMember.name}
                                fill
                                className={styles.memberImage}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className={styles.badge}>{activeMember.group}</div>
                        </div>

                        {/* Expanded Description Area */}
                        <div className={styles.activeDetails}>
                            <div className={styles.nameBlock}>
                                <p className={styles.roleLabel}>{activeMember.role}</p>
                                <h3 className={styles.nameLabel}>{activeMember.name}</h3>
                            </div>

                            <div className={styles.divider}></div>

                            <p className={styles.description}>
                                {activeMember.description}
                            </p>

                            <button className={styles.arrowButton}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Floating Next Button */}
                    <button className={styles.nextButton} onClick={handleNext}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Next Cards List */}
                    <div className={styles.nextCardsList}>
                        {visibleMembers.slice(1, 4).map((member) => (
                            <div key={member.id} className={styles.smallCard}>
                                <div className={styles.smallCardImage}>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className={styles.memberImage}
                                        sizes="25vw"
                                    />
                                </div>
                                <div className={styles.smallInfo}>
                                    <p className={styles.smallRole}>{member.role}</p>
                                    <h4 className={styles.smallName}>{member.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== MOBILE VIEW ===== */}
            <div className={styles.mobileView}>
                {/* Swipeable Cards Container */}
                <div
                    className={styles.mobileCarousel}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className={styles.mobileCardsTrack}
                        style={{
                            transform: `translateX(calc(-${activeIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
                        }}
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className={`${styles.mobileCard} ${index === activeIndex ? styles.mobileCardActive : ''}`}
                            >
                                {/* Profile Image with Badge */}
                                <div className={styles.mobileCardImage}>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className={styles.memberImage}
                                        sizes="80vw"
                                    />
                                    <div className={styles.mobileBadge}>{member.group}</div>
                                </div>

                                {/* Info Section */}
                                <div className={styles.mobileCardInfo}>
                                    <div className={styles.mobileNameRow}>
                                        <div>
                                            <p className={styles.mobileRole}>{member.role}</p>
                                            <h3 className={styles.mobileName}>{member.name}</h3>
                                        </div>
                                        <button className={styles.mobileArrowBtn}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>

                                    <p className={styles.mobileDescription}>
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className={styles.mobileDots}>
                    {teamMembers.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.mobileDot} ${index === activeIndex ? styles.mobileDotActive : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamCarouselSection;
