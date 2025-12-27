import React from 'react';
import styles from './AwardSection.module.css';

const awards = [
    {
        id: 1,
        title: "Selected as one of Nikkei Cross Trend's \"100 Companies Creating the Market of the Future\"",
        logoText: "New Text"
    },
    {
        id: 2,
        title: "Selected as Forbes Japan's \"Japanese Startup Encyclopedia\"",
        logoText: "Forbes JAPAN"
    },
    {
        id: 3,
        title: "PropTech&ConTech Startup Conference 2022 \"BEST OF PCSC 2022\" award",
        logoText: "PROPTECH & CONTECH STARTUP CONFERENCE 2022"
    },
    {
        id: 4,
        title: "Deloitte Tohmatsu \"Technology Fast 50 2022 Japan\" ranked 6th",
        logoText: "Technology Fast 50"
    },
    {
        id: 5,
        title: "Winner of the 2023 Good Design Award from the Japan Institute of Design Promotion",
        logoText: "GOOD DESIGN AWARD 2023"
    },
    {
        id: 6,
        title: "Selected as a \"Great Place to Work\" by Great Place to Work Institute Japan",
        logoText: "Great Place To Work Certified"
    }
];

const AwardSection: React.FC = () => {
    
    return (
        <section className={styles.awardSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Award</h2>
                </div>
                <div className={styles.subtitle}>Achievements</div>
            </div>

            <div className={styles.grid}>
                {awards.map((award) => (
                    <div key={award.id} className={styles.awardItem}>
                        <div className={styles.card}>
                            {/* Placeholder for Logo - In real app, this would be an <Image /> */}
                            <div className={styles.logoPlaceholder}>
                                {award.logoText}
                            </div>
                        </div>
                        <p className={styles.description}>
                            {award.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AwardSection;
