'use client';

import React from 'react';
import styles from './GroupsSection.module.css';

const GroupsSection: React.FC = () => {
    return (
        <section className={styles.section}>
            {/* Row 1: Header Grid */}
            <div className={styles.headerGrid}>
                {/* Left: Title with Dots */}
                <div>
                    <div className={styles.titleWrapper}>
                        <div className={styles.dots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                        <h2 className={styles.title}>Job Categories</h2>
                    </div>
                    <div className={styles.subtitle}>Job Openings</div>
                </div>

                {/* Right: Description */}
                <div>
                    <p className={styles.description}>
                        Styleport's organization is made up of four groups. Each group plays its role in developing and providing products that will have a greater impact on society.
                    </p>
                </div>
            </div>

            {/* Row 2: 4 Cards Grid */}
            <div className={styles.cardsGrid}>
                {/* Card 1: Product Group */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                            <h3>Product Group</h3>
                            <p>Product Group</p>
                        </div>
                        <button className={styles.entryButton}>
                            Entry
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={styles.cardText}>
                        This group is responsible for service development, which will drive greater growth for the entire product.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Product Manager</span>
                        <span className={styles.tag}>UX Designer</span>
                        <span className={styles.tag}>Engineering Manager</span>
                        <span className={styles.tag}>Front-End/Full Engineer</span>
                        <span className={styles.tag}>Back Engineer (Full Stack)</span>
                        <span className={styles.tag}>Platform Engineer</span>
                        <span className={styles.tag}>UI/Engineer</span>
                    </div>
                    {/* Mobile Entry Button */}
                    <button className={styles.entryButtonMobile}>
                        Entry
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Card 2: Marketing Group */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                            <h3>Marketing Group</h3>
                            <p>Marketing Group</p>
                        </div>
                        <button className={styles.entryButton}>
                            Entry
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={styles.cardText}>
                        This group understands the sales processes and challenges of clients and creates successful experiences such as business improvement and efficiency through products.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Senior Sales (Kansai)</span>
                        <span className={styles.tag}>Senior Sales (Kansai)</span>
                        <span className={styles.tag}>Sales (Kansai)</span>
                        <span className={styles.tag}>Sales (Branch)</span>
                        <span className={styles.tag}>Customer Success (Manager candidate)</span>
                        <span className={styles.tag}>Customer Success (Member)</span>
                        <span className={styles.tag}>Sales Assistant</span>
                    </div>
                    {/* Mobile Entry Button */}
                    <button className={styles.entryButtonMobile}>
                        Entry
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Card 3: Modeling Group */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                            <h3>Modeling Group</h3>
                            <p>Modeling Group</p>
                        </div>
                        <button className={styles.entryButton}>
                            Entry
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={styles.cardText}>
                        This group is responsible for providing new value to CG content through the production of diverse CG content and the pursuit of better image creation.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Architectural 3d Production Manager</span>
                        <span className={styles.tag}>Architectural 3D VR Director</span>
                        <span className={styles.tag}>Architectural 3D Creator</span>
                        <span className={styles.tag}>Architectural CG Perspective Creator</span>
                        <span className={styles.tag}>Architectural ML quality control (basic seeking available)</span>
                        <span className={styles.tag}>Various Artist</span>
                        <span className={styles.tag}>Technical Artist</span>
                        <span className={styles.tag}>VR Interior Coordinator</span>
                    </div>
                    {/* Mobile Entry Button */}
                    <button className={styles.entryButtonMobile}>
                        Entry
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Card 4: Administration Group */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                            <h3>Administration Group</h3>
                            <p>Business Management Group</p>
                        </div>
                        <button className={styles.entryButton}>
                            Entry
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={styles.cardText}>
                        Through organizational development and business management, this group supports each group in achieving results and drives corporate growth from the management perspective.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Accounting and Corporate Planning</span>
                        <span className={styles.tag}>Accounting (Leader candidate)</span>
                        <span className={styles.tag}>Accounting</span>
                        <span className={styles.tag}>Labor and General Affairs (Manager)</span>
                        <span className={styles.tag}>Legal Affairs</span>
                        <span className={styles.tag}>Backoffice IT Architect</span>
                    </div>
                    {/* Mobile Entry Button */}
                    <button className={styles.entryButtonMobile}>
                        Entry
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Row 3: Full Width Card */}
                <div className={styles.fullWidthCard}>
                    <div className={styles.fullWidthCardContent}>
                        <h3>Open Position</h3>
                        <p>Open Positions</p>
                        <p>We will propose positions based on your experience and aptitude.</p>
                    </div>
                    <button className={styles.entryButton}>
                        Entry
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Row 4: Center Button */}
            <div className={styles.centerButton}>
                <button className={styles.entryPageButton}>
                    Entry Page
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default GroupsSection;
