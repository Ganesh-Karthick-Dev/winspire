import React, { useState, TouchEvent } from 'react';
import Image from 'next/image';
import styles from './BoardSection.module.css';

// Board Member Data
const boardMembers = [
    {
        id: 7,
        name: 'Suresh H. Nish',
        role: 'Founder & Chief Executive Officer',
        image: '', // No photo provided
        bio: 'Suresh built Winspire RCM on the belief that revenue outcomes improve when intelligence enters the cycle early. With over two decades of experience in healthcare revenue cycle operations, he has led and scaled large RCM operations. Under his leadership, Winspire focuses on sustainable revenue improvement, transparent performance measurement, and responsible automation.'
    },
    {
        id: 1,
        name: 'Shravan Kumar',
        role: 'Vice President of Operations',
        image: '/images/team/shravan-kumar.png',
        bio: 'Shravan Kumar leads operations at Winspire RCM with a single focus: building systems, teams, and workflows that perform reliably in the real world. He has led end-to-end RCM delivery across complex client environments, large multi-layered operational teams, and high-volume, high-precision workflows. At Winspire, he shapes how Neura AI translates into clear work prioritization, fewer handoffs, faster decision cycles, and measurable productivity gains.'
    },
    {
        id: 2,
        name: 'Steve Kang',
        role: 'Strategic Technology Advisor',
        image: '/images/team/steve-kang.png',
        bio: 'Steve Kang is a strategic technology advisor with over two decades of experience helping leaders translate technology into measurable business outcomes. His work spans healthcare, government, and regulated environments where security and compliance are critical. At Winspire RCM, Steve supports infrastructure strategy, security posture, and technology alignment as the platform scales.'
    },
    {
        id: 3,
        name: 'John Kostic, CFP®, CEPA',
        role: 'Strategic Growth Advisor',
        image: '/images/team/john-kostic.png',
        bio: 'John Kostic is a seasoned strategic advisor with over 25 years of experience guiding business owners, executives, and high-net-worth families through complex growth and transition decisions. A Certified Financial Planner™ and Certified Exit Planning Advisor, he supports Winspire RCM with executive relationships, market entry, and long-term partnership development.'
    },
    {
        id: 4,
        name: 'Curtis Cates',
        role: 'Chief Marketing & Sales Officer',
        image: '/images/team/curtis-cates.png',
        bio: 'Curtis Cates leads growth at Winspire RCM with strategic depth, healthcare domain expertise, and modern AI-driven go-to-market execution. He has spent his career at the intersection of healthcare transformation and enterprise growth, advising Fortune 500 executives and driving multi-million-dollar client relationships. Curtis ensures Neura AI\'s value is communicated with clarity and credibility.'
    },
    {
        id: 5,
        name: 'Philip Leone',
        role: 'Chief Advisor',
        image: '/images/team/philip-leone.png',
        bio: 'Philip Leone is a seasoned healthcare executive with over two decades of experience guiding organizations through growth, reimbursement complexity, and market expansion. He has secured CPT codes, structured payer contracting strategies, and supported FDA-cleared technology launches. As Chief Advisor, he brings critical perspective on reimbursement strategy, regulatory risk, and sustainable commercialization.'
    },
    {
        id: 6,
        name: 'Dan Schulte, MBA, CHFP',
        role: 'Principal Consultant',
        image: '/images/team/dan-schulte.png',
        bio: 'Dan Schulte has worked in healthcare provider and RCM vendor arena for over 40 years. He has helped large and small organizations find weak spots, change processes, and realize immediate returns. Previously held senior RCM positions at HGS, The Outsource Group, Parallon, Apollo Health Street, and Siemens Health Services. Dan holds an MBA from Southern Illinois University and CHFP certification from HFMA.'
    }
];

const BoardSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % boardMembers.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + boardMembers.length) % boardMembers.length);
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
        for (let i = 0; i < boardMembers.length; i++) {
            visible.push(boardMembers[(activeIndex + i) % boardMembers.length]);
        }
        return visible;
    };

    const visibleMembers = getVisibleMembers();
    const activeMember = visibleMembers[0];

    return (
        <section className={styles.boardSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Board Members</h2>
                </div>
                <div className={styles.subtitle}>Executive Introduction</div>
            </div>

            {/* ===== DESKTOP VIEW ===== */}
            <div className={styles.desktopView}>
                <div className={styles.carouselContainer}>
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
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '6rem', color: 'rgba(15, 23, 42, 0.1)', fontWeight: 700 }}>{activeMember.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>

                        {/* Expanded Description Area */}
                        <div className={styles.activeDetails}>
                            <div className={styles.nameBlock}>
                                <p className={styles.roleLabel}>{activeMember.role}</p>
                                <h3 className={styles.nameLabel}>{activeMember.name}</h3>
                            </div>
                            
                            {/* Navigation Buttons */}
                             <div className={styles.navigationButtons}>
                                <button className={styles.navButton} onClick={handlePrev} aria-label="Previous">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className={styles.navButton} onClick={handleNext} aria-label="Next">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            <p className={styles.description}>
                                {activeMember.bio}
                            </p>
                        </div>
                    </div>

                    {/* Next Cards List */}
                    <div className={styles.nextCardsList}>
                        {visibleMembers.slice(1, 4).map((member, index) => (
                            <div 
                                key={member.id} 
                                className={styles.smallCard} 
                                onClick={() => goToSlide((activeIndex + index + 1) % boardMembers.length)}
                            >
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
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '4rem', color: 'rgba(15, 23, 42, 0.1)', fontWeight: 700 }}>{member.name.charAt(0)}</span>
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
                        {boardMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className={`${styles.mobileCard} ${index === activeIndex ? styles.mobileCardActive : ''}`}
                            >
                                {/* Profile Image */}
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
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '5rem', color: 'rgba(15, 23, 42, 0.1)', fontWeight: 700 }}>{member.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Info Section */}
                                <div className={styles.mobileCardInfo}>
                                    <div className={styles.mobileNameRow}>
                                        <div>
                                            <p className={styles.mobileRole}>{member.role}</p>
                                            <h3 className={styles.mobileName}>{member.name}</h3>
                                        </div>
                                    </div>

                                    <p className={styles.mobileDescription}>
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className={styles.mobileDots}>
                    {boardMembers.map((_, index) => (
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

export default BoardSection;
