'use client';

import React from 'react';
import styles from './CultureSection.module.css';
import Image from 'next/image';

interface CultureItem {
    id: number;
    title: string;
    image: string;
    isTextOnly?: boolean;
}

const pickupItems: CultureItem[] = [
    {
        id: 1,
        title: "Taking on the challenge of DX in the real estate industry with ROOV, a digital twin of living spaces. The history of Styleport's birth and its future",
        image: "/images/company/hero-main.png"
    },
    {
        id: 2,
        title: "What Winspire values during the recruitment process",
        image: "/images/news/news_vr_meeting_1766073638780.png"
    },
    {
        id: 3,
        title: "The reason for joining is entirely \"people.\" The appeal of the Styleport development team, which has overwhelming technological assets in the 3D field",
        image: "/images/links/links_team_meeting_1766075227437.png"
    }
];

const recentItems: CultureItem[] = [
    {
        id: 4,
        title: "The reason I joined the company was because I was convinced that I could truly love the product.",
        image: "/images/links/links_workspace_laptop_1766075249577.png"
    },
    {
        id: 5,
        title: "Why did we open up our design system to other companies? Real lessons learned from a designer networking event with Visasq and the next step",
        image: "/images/news/news_vr_interior_1766073601174.png"
    },
    {
        id: 6,
        title: "Reason for joining: innovative products utilizing cutting-edge technology",
        image: "/images/company-page/cloud-computing-cyber-security.webp"
    }
];

const CultureSection: React.FC = () => {
    return (
        <section className={styles.section}>
            {/* ===== DESKTOP VIEW ===== */}
            <div className={styles.desktopView}>
                <div className={styles.container}>
                    {/* Header */}
                    <div className={styles.headerRow}>
                        <div className={styles.titleBlock}>
                            <div className={styles.headerDots}>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                            </div>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.mainTitle}>Culture Note</h2>
                                <p className={styles.subTitle}>Styleport Culture Note</p>
                            </div>
                        </div>
                        <a href="#" className={styles.viewAllBtn}>
                            <span>View All</span>
                            <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Pickup Row */}
                    <div className={styles.contentRow}>
                        <div className={styles.rowLabel}>
                            <span className={styles.labelText}>Pickup</span>
                        </div>
                        <div className={styles.cardsGrid}>
                            {pickupItems.map((item) => (
                                <div key={item.id} className={styles.card}>
                                    <div className={`${styles.imageWrapper} ${item.isTextOnly ? styles.textCardBg : ''}`}>
                                        {item.isTextOnly ? (
                                            <div className={styles.textCardContent}>
                                                <span className={styles.minsLabel}>[Read in 3 mins]</span>
                                                <h3 className={styles.textCardTitle}>What Winspire values<br />during the<br />recruitment process</h3>
                                                <span className={styles.logoSmall}>WINSPIRE</span>
                                            </div>
                                        ) : (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className={styles.placeholderImg}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                    </div>
                                    <p className={styles.cardTitle}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider}></div>

                    {/* Recent Row */}
                    <div className={styles.contentRow}>
                        <div className={styles.rowLabel}>
                            <span className={styles.labelText}>Recent</span>
                        </div>
                        <div className={styles.cardsGrid}>
                            {recentItems.map((item) => (
                                <div key={item.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={styles.placeholderImg}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <p className={styles.cardTitle}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE VIEW ===== */}
            <div className={styles.mobileView}>
                {/* Mobile Header */}
                <div className={styles.mobileHeader}>
                    <div className={styles.mobileDots}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.mobileTitleBlock}>
                        <h2 className={styles.mobileTitle}>Culture Note</h2>
                        <p className={styles.mobileSubtitle}>Styleport Culture Note</p>
                    </div>
                </div>

                {/* Mobile Pickup Section */}
                <div className={styles.mobileSection}>
                    <span className={styles.mobileSectionLabel}>Pickup</span>
                    <div className={styles.mobileScrollContainer}>
                        <div className={styles.mobileCardsTrack}>
                            {pickupItems.map((item) => (
                                <div key={item.id} className={styles.mobileCard}>
                                    <div className={styles.mobileCardImage}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={styles.placeholderImg}
                                            sizes="70vw"
                                        />
                                    </div>
                                    <p className={styles.mobileCardTitle}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Recent Section */}
                <div className={styles.mobileSection}>
                    <span className={styles.mobileSectionLabel}>Recent</span>
                    <div className={styles.mobileScrollContainer}>
                        <div className={styles.mobileCardsTrack}>
                            {recentItems.map((item) => (
                                <div key={item.id} className={styles.mobileCard}>
                                    <div className={styles.mobileCardImage}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={styles.placeholderImg}
                                            sizes="70vw"
                                        />
                                    </div>
                                    <p className={styles.mobileCardTitle}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className={styles.mobileButtonWrapper}>
                    <a href="#" className={styles.mobileViewAllBtn}>
                        <span>View All</span>
                        <div className={styles.mobileArrowCircle}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CultureSection;
