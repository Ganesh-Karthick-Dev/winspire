'use client';

import React, { useState } from 'react';
import styles from './SolutionsCarousel.module.css';

const carouselData = [
    {
        id: 1,
        description: "The construction and real estate industries, which Styleport supports in promoting DX, were previously left behind by the digitalization trend, resulting in low productivity and poor customer experience. This was because the need to understand real-world spaces meant significant location and time constraints."
    },
    {
        id: 2,
        description: "However, advances in digital technologies such as XR and digital twins are now beginning to dramatically change the landscape. StylePort uses cutting-edge 3D technology to develop its own services, enabling companies that provide housing to streamline and automate their operations."
    },
    {
        id: 3,
        description: "StylePort's solutions have already been adopted by approximately 100 companies and over 500 projects across Japan, and StylePort's services continue to expand."
    }
];

const SolutionsCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % carouselData.length);
    };

    const getSlideClass = (index: number) => {
        if (index === activeIndex) return `${styles.slide} ${styles.active}`;

        const prevIndex = (activeIndex - 1 + carouselData.length) % carouselData.length;
        const nextIndex = (activeIndex + 1) % carouselData.length;

        if (index === prevIndex) return `${styles.slide} ${styles.prev}`;
        if (index === nextIndex) return `${styles.slide} ${styles.next}`;

        return styles.slide;
    };

    return (
        <section className={styles.section}>
            {/* Section Header */}
            <div className={styles.sectionHeader}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.sectionTitle}>Mandssagand</h2>
                </div>
                <div className={styles.sectionSubtitle}>Recruitment Message</div>
            </div>

            {/* Static Header Pills */}
            <div className={styles.headerPills}>
                <div className={styles.pill}>In the construction and real estate industries</div>
                <div className={styles.pill}>Innovative services</div>
                <div className={styles.pill}>Be part of the creative team.</div>
            </div>

            {/* Full-Width Carousel */}
            <div className={styles.carouselWrapper}>
                {/* Counter - Fixed position, doesn't move with slides */}
                <div className={styles.counter}>
                    {activeIndex + 1} - {carouselData.length}
                </div>

                <div className={styles.carouselTrack}>
                    {carouselData.map((item, index) => (
                        <div key={item.id} className={getSlideClass(index)}>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Button */}
                <button className={styles.navButton} onClick={handleNext} aria-label="Next">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default SolutionsCarousel;
