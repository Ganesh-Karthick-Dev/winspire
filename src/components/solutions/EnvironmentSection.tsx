'use client';

import React, { useState } from 'react';
import styles from './EnvironmentSection.module.css';

const EnvironmentSection: React.FC = () => {
    // Accordion state - for now, just simple toggle logic if needed, or static for visual
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        <h2 className={styles.title}>Environment</h2>
                    </div>
                    <div className={styles.subtitle}>Work style and environment that realizes our vision</div>
                </div>
                <h2 className={styles.mainDescription}>
                    We provide flexible and efficient work styles and environments to maximize your performance.
                </h2>
            </div>

            {/* Cards Grid */}
            <div className={styles.cardsGrid}>
                {/* Card 1 */}
                <div className={styles.card}>
                    <div className={styles.pointLabel}>Point <span className={styles.pointNumber}>01</span></div>
                    <h3 className={styles.cardTitle}>Remote work</h3>
                    <p className={styles.cardText}>
                        Styleport has implemented remote work since its founding. Employees can work from a variety of locations to perform better. Employees can also freely choose a hybrid work style that combines office attendance and remote work.
                    </p>
                </div>

                {/* Card 2 */}
                <div className={styles.card}>
                    <div className={styles.pointLabel}>Point <span className={styles.pointNumber}>02</span></div>
                    <h3 className={styles.cardTitle}>Full flex system</h3>
                    <p className={styles.cardText}>
                        We have implemented a full-flex system with no core time, allowing you to work in a way that suits you and maximize your output.
                    </p>
                </div>

                {/* Card 3 */}
                <div className={styles.card}>
                    <div className={styles.pointLabel}>Point <span className={styles.pointNumber}>03</span></div>
                    <h3 className={styles.cardTitle}>Providing appropriate devices</h3>
                    <p className={styles.cardText}>
                        We provide you with the devices you need to perform at your best, such as laptops and displays, depending on the job you are doing.
                    </p>
                </div>
            </div>

            {/* Accordion List */}
            <div className={styles.accordionList}>
                {/* Item 1 */}
                <div className={styles.accordionItem}>
                    <div
                        className={styles.accordionHeader}
                        onClick={() => toggleAccordion(0)}
                    >
                        <span className={styles.accordionTitle}>
                            <span className={styles.dot} style={{ marginRight: '1rem', width: '6px', height: '6px' }}></span>
                            Development environment and culture
                        </span>
                        <div className={`${styles.iconWrapper} ${openIndex === 0 ? styles.iconOpen : ''}`}>
                            <div className={`${styles.iconLine} ${styles.iconHorizontal}`}></div>
                            <div className={`${styles.iconLine} ${styles.iconVertical}`}></div>
                        </div>
                    </div>
                    {/* Expanded Content */}
                    <div className={`${styles.accordionContent} ${openIndex === 0 ? styles.contentOpen : ''}`}>
                        <div className={styles.contentInner}>
                            <p className={styles.contentText}>
                                We are working on various aspects of development with an awareness of DX (developer experience) so that our development team can perform more efficiently and with more enjoyment.
                            </p>

                            {/* Section 1 */}
                            <div className={styles.contentBlock}>
                                <h4 className={styles.contentHeader}>Balancing organizational control with respect for individual development styles</h4>
                                <ul className={styles.contentList}>
                                    <li>You will be provided with your desired device and will be able to develop using your preferred OS and editor.</li>
                                    <li>All development activities, such as ticket updates, code pushes, Figma comments, PR review requests, and deployments, are notified and aggregated on Slack, minimizing the need for business communication.</li>
                                    <li>Established coding standards and git branching strategies, with periodic review</li>
                                    <li>Structured, documented and centralized development information</li>
                                    <li>A high-frequency, high-efficiency development environment utilizing Amplify and GitHub Actions, and a deployment system linked with SlackBot</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div className={styles.contentBlock}>
                                <h4 className={styles.contentHeader}>communication</h4>
                                <ul className={styles.contentList}>
                                    <li>The principle of using public channels to reduce information asymmetry and a thorough documentation culture</li>
                                    <li>An environment that encourages asynchronous communication that respects the efficiency of each member, while also allowing for easy synchronous communication to align understanding and solve problems.</li>
                                    <li>An organization that encourages independent proposals and initiatives for services and processes, and is proactive in introducing, changing, reviewing, and abolishing them</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className={styles.accordionItem}>
                    <div
                        className={styles.accordionHeader}
                        onClick={() => toggleAccordion(1)}
                    >
                        <span className={styles.accordionTitle}>
                            <span className={styles.dot} style={{ marginRight: '1rem', width: '6px', height: '6px' }}></span>
                            Development languages, tools, etc.
                        </span>
                        <div className={`${styles.iconWrapper} ${openIndex === 1 ? styles.iconOpen : ''}`}>
                            <div className={`${styles.iconLine} ${styles.iconHorizontal}`}></div>
                            <div className={`${styles.iconLine} ${styles.iconVertical}`}></div>
                        </div>
                    </div>
                    <div className={`${styles.accordionContent} ${openIndex === 1 ? styles.contentOpen : ''}`}>
                        <div className={styles.contentInner}>
                            <p className={styles.contentText}>
                                Detailed information about our development stack, languages, and tools will be provided here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnvironmentSection;
