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
        name: "Shravan Kumar",
        role: "Vice President of Operations",
        group: "Operations",
        description: "Shravan Kumar leads operations at Winspire RCM with a single focus: building systems, teams, and workflows that perform reliably in the real world. He shapes how Neura AI translates into clear work prioritization, fewer handoffs, faster decision cycles, and measurable productivity gains.",
        image: "/images/team/shravan-kumar.png"
    },
    {
        id: 2,
        name: "Steve Kang",
        role: "Strategic Technology Advisor",
        group: "Technology",
        description: "Steve Kang is a strategic technology advisor with over two decades of experience helping leaders translate technology into measurable business outcomes. At Winspire RCM, Steve supports infrastructure strategy, security posture, and technology alignment as the platform scales.",
        image: "/images/team/steve-kang.png"
    },
    {
        id: 3,
        name: "John Kostic, CFP®, CEPA",
        role: "Strategic Growth Advisor",
        group: "Growth",
        description: "John Kostic is a seasoned strategic advisor with over 25 years of experience guiding business owners, executives, and high-net-worth families through complex growth and transition decisions. He supports Winspire RCM with executive relationships, market entry, and long-term partnership development.",
        image: "/images/team/john-kostic.png"
    },
    {
        id: 4,
        name: "Curtis Cates",
        role: "Chief Marketing & Sales Officer",
        group: "Growth",
        description: "Curtis Cates leads growth at Winspire RCM with strategic depth, healthcare domain expertise, and modern AI-driven go-to-market execution. He ensures Neura AI's value is communicated with clarity and credibility to healthcare leaders.",
        image: "/images/team/curtis-cates.png"
    },
    {
        id: 5,
        name: "Philip Leone",
        role: "Chief Advisor",
        group: "Advisory",
        description: "Philip Leone is a seasoned healthcare executive with over two decades of experience guiding organizations through growth, reimbursement complexity, and market expansion. As Chief Advisor, he brings critical perspective on reimbursement strategy and sustainable commercialization.",
        image: "/images/team/philip-leone.png"
    },
    {
        id: 6,
        name: "Dan Schulte, MBA, CHFP",
        role: "Principal Consultant",
        group: "Consulting",
        description: "Dan Schulte has worked in healthcare provider and RCM vendor arena for over 40 years. He has helped large and small organizations find weak spots, change processes, and realize immediate returns in bottom-line cash.",
        image: "/images/team/dan-schulte.png"
    },
    {
        id: 7,
        name: "Suresh H. Nish",
        role: "Founder & Chief Executive Officer",
        group: "Leadership",
        description: "Suresh built Winspire RCM on the belief that revenue outcomes improve when intelligence enters the cycle early. Under his leadership, Winspire focuses on sustainable revenue improvement, transparent performance measurement, and responsible automation.",
        image: ""
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
                            {prevMember.image ? (
                                <Image
                                    src={prevMember.image}
                                    alt={prevMember.name}
                                    fill
                                    className={styles.memberImage}
                                    sizes="25vw"
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{prevMember.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Card (Expanded Key Visual) */}
                    <div className={styles.activeCardWrapper} key={activeMember.id}>
                        <div className={styles.activeCardImage}>
                            {activeMember.image ? (
                                <Image
                                    src={activeMember.image}
                                    alt={activeMember.name}
                                    fill
                                    className={styles.memberImage}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{activeMember.name.charAt(0)}</span>
                                </div>
                            )}
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
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className={styles.memberImage}
                                            sizes="25vw"
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{member.name.charAt(0)}</span>
                                        </div>
                                    )}
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
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className={styles.memberImage}
                                            sizes="80vw"
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{member.name.charAt(0)}</span>
                                        </div>
                                    )}
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
