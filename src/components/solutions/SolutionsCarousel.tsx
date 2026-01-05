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
            {/* Static Header Pills */}
            <div className={styles.headerPills}>
                <div className={styles.pill}>AI-Driven RCM Solutions</div>
                <div className={styles.pill}>Built for the Challenges</div>
                <div className={styles.pill}>of 2026 and Beyond</div>
            </div>

            {/* Description */}
            <div className={styles.carouselWrapper}>
                <p className={styles.description}>
                    Winspire RCM delivers end-to-end revenue cycle management powered by top 1% talents, Neura AI's predictive intelligence, automated workflows, and real-time visibility. Every department becomes faster, cleaner, more accurate, and completely system-driven.
                </p>
            </div>
        </section>
    );
};

export default SolutionsCarousel;
