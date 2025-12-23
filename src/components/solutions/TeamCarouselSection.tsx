'use client';

import React, { useState } from 'react';
import styles from './TeamCarouselSection.module.css';
import Image from 'next/image';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    group: string; // The badge text (e.g., "Product Group")
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
    // Adding duplicates for loop simulation if needed, but for now just 4 cards as per request
];

const TeamCarouselSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    };

    // We only show 4 visible slots usually, handling the loop logic visually
    // Logic: Active is at index 0 (of display), Next 1, 2, 3.
    // We re-order the array based on activeIndex to simplify rendering logic
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

                    {/* Expanded Description Area (Below Image in Grid) */}
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

                {/* Floating Next Button (Positioned between Active and Next) */}
                <button className={styles.nextButton} onClick={handleNext}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Next Cards (3 items) */}
                <div className={styles.nextCardsList}>
                    {visibleMembers.slice(1, 4).map((member, idx) => (
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
        </section>
    );
};

export default TeamCarouselSection;
