'use client';

import React from 'react';
import styles from './MaterialsSection.module.css';

const MaterialsSection: React.FC = () => {
    return (
        <section className={styles.section}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.dots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                        <h2 className={styles.title}>Recruitment Materials</h2>
                    </div>
                    <div className={styles.subtitle}>Company Introduction</div>
                </div>
                <h2 className={styles.mainDescription}>
                    We will deliver recruitment-related information through ROOV compass, a communication platform developed in-house by Styleport.
                </h2>
            </div>

            {/* Split Card */}
            <div className={styles.cardContainer}>
                <a href="#" className={styles.splitCard}>
                    {/* Left Side - Blue */}
                    <div className={styles.cardLeft}>
                        <span className={styles.stylePortText}>WINSPIRE</span>
                    </div>

                    {/* Right Side - White */}
                    <div className={styles.cardRight}>
                        <p className={styles.cardLabel}>Recruitment information site<br />By</p>
                        <div className={styles.logoWrapper}>
                            {/* Logo using Mask to match Navbar style */}
                            <div className={styles.logoMask}></div>

                           
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default MaterialsSection;
