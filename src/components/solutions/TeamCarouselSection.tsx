'use client';

import React, { useState, useRef, TouchEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
        description: "Shravan Kumar leads operations at Winspire RCM with a single focus: building systems, teams, and workflows that perform reliably in the real world. He has led end-to-end RCM delivery across complex client environments, large multi-layered operational teams, and high-volume, high-precision workflows. At Winspire, he shapes how Neura AI translates into clear work prioritization, fewer handoffs, faster decision cycles, and measurable productivity gains.",
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
        description: "John Kostic is a seasoned strategic advisor with over 25 years of experience guiding business owners, executives, and high-net-worth families through complex growth and transition decisions. A Certified Financial Planner™ and Certified Exit Planning Advisor, he supports Winspire RCM with executive relationships, market entry, and long-term partnership development.",
        image: "/images/team/john-kostic.png"
    },
    {
        id: 4,
        name: "Curtis Cates",
        role: "Chief Marketing & Sales Officer",
        group: "Growth",
        description: "Curtis Cates leads growth at Winspire RCM with strategic depth, healthcare domain expertise, and modern AI-driven go-to-market execution. He has spent his career at the intersection of healthcare transformation and enterprise growth, advising Fortune 500 executives and driving multi-million-dollar client relationships. Curtis ensures Neura AI's value is communicated with clarity and credibility.",
        image: "/images/team/curtis-cates.png"
    },
    {
        id: 5,
        name: "Philip Leone",
        role: "Chief Advisor",
        group: "Advisory",
        description: "Philip Leone is a seasoned healthcare executive with over two decades of experience guiding organizations through growth, reimbursement complexity, and market expansion. He has secured CPT codes, structured payer contracting strategies, and supported FDA-cleared technology launches. As Chief Advisor, he brings critical perspective on reimbursement strategy, regulatory risk, and sustainable commercialization.",
        image: "/images/team/philip-leone.png"
    },
    {
        id: 6,
        name: "Dan Schulte, MBA, CHFP",
        role: "Principal Consultant",
        group: "Consulting",
        description: "Dan Schulte has worked in healthcare provider and RCM vendor arena for over 40 years. He has helped large and small organizations find weak spots, change processes, and realize immediate returns. Previously held senior RCM positions at HGS, The Outsource Group, Parallon, Apollo Health Street, and Siemens Health Services.",
        image: "/images/team/dan-schulte.png"
    },
    {
        id: 7,
        name: "Suresh H. Nish",
        role: "Founder & Chief Executive Officer",
        group: "Leadership",
        description: "Suresh built Winspire RCM on the belief that revenue outcomes improve when intelligence enters the cycle early. With over two decades of experience in healthcare revenue cycle operations, he has led and scaled large RCM operations. Under his leadership, Winspire focuses on sustainable revenue improvement, transparent performance measurement, and responsible automation.",
        image: "/images/team/CEO.png"
    },
];

const TeamCarouselSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
 
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedMember) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            
            // Mobile specific scroll lock (iOS Safari)
            const preventDefault = (e: TouchEvent) => e.preventDefault();
            document.addEventListener('touchmove', preventDefault as unknown as EventListener, { passive: false });
            
            return () => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.removeEventListener('touchmove', preventDefault as unknown as EventListener);
            };
        }
    }, [selectedMember]);


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

    const openModal = (member: TeamMember) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

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
                        <div className={styles.activeCardImage} onClick={() => openModal(activeMember)}>
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
                            <div className={styles.activeClickOverlay}>
                                <span>Read Full Bio</span>
                            </div>
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

                            <button className={styles.arrowButton} onClick={() => openModal(activeMember)}>
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
                            <div key={member.id} className={styles.smallCard} onClick={() => openModal(member)}>
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
                                <div className={styles.mobileCardImage} onClick={() => openModal(member)}>
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

                                <div className={styles.mobileCardInfo}>
                                    <div className={styles.mobileNameRow}>
                                        <div>
                                            <p className={styles.mobileRole}>{member.role}</p>
                                            <h3 className={styles.mobileName}>{member.name}</h3>
                                        </div>
                                        <button className={styles.mobileArrowBtn} onClick={() => openModal(member)}>
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

            {/* Modal Popup - Rendered via Portal for global screen centering */}
            {selectedMember && typeof document !== 'undefined' && createPortal(
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        
                        <div className={styles.modalBody}>
                            <div className={styles.modalImageWrapper}>
                                {selectedMember.image ? (
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        fill
                                        className={styles.modalImage}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        priority
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{selectedMember.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.modalInfo}>
                                <div className={styles.modalHeader}>
                                    <p className={styles.modalRole}>{selectedMember.role}</p>
                                    <h2 className={styles.modalName}>{selectedMember.name}</h2>
                                    <span className={styles.modalGroupBadge}>{selectedMember.group}</span>
                                </div>
                                <div className={styles.modalBio}>
                                    {selectedMember.description.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default TeamCarouselSection;
