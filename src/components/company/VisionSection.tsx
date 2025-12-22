/**
 * Vision Section Component
 * 
 * Dark card section with Vision label, statement text with white background,
 * dual image cards showing Real Space and Virtual Space with Digital Twin badge,
 * and description paragraphs.
 */

import styles from './VisionSection.module.css';
import Image from 'next/image';

interface VisionSectionProps {
    /** Section label */
    label?: string;
    /** Subtitle under label */
    subtitle?: string;
    /** Statement lines (each line gets white background) */
    statementLines?: string[];
    /** Left card image (Real Space) */
    leftImage?: string;
    /** Right card image (Virtual Space) */
    rightImage?: string;
    /** Description paragraphs */
    descriptions?: string[];
}

export default function VisionSection({
    label = 'Vision',
    subtitle = 'Vision',
    statementLines = ['Used globally', 'Build a 3D communication platform.'],
    leftImage = '/images/company/real-space.png',
    rightImage = '/images/company/virtual-space.png',
    descriptions = [
        'By recreating a digital twin in a virtual space, users can easily share their spatial image with anyone, anywhere, anytime, expanding communication. This frees users from the constraints of time, place, and experience that previously hindered spatial understanding.',
        'At the same time, we will visualize communication and build an information platform that correlates and records information on the digital twin.',
    ],
}: VisionSectionProps) {
    return (
        <section className={styles.visionSection}>
            {/* Header - Label with dots */}
            <div className={styles.visionHeader}>
                <div className={styles.visionLabel}>
                    <div className={styles.visionDots}>
                        <span className={styles.visionDot}></span>
                        <span className={styles.visionDot}></span>
                    </div>
                    <span>{label}</span>
                </div>
                <p className={styles.visionSubtitle}>{subtitle}</p>
            </div>

            {/* Statement with white background */}
            <div className={styles.visionStatement}>
                <h2>
                    {statementLines.map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < statementLines.length - 1 && <br />}
                        </span>
                    ))}
                </h2>
            </div>

            {/* Dual Cards with Digital Twin badge */}
            <div className={styles.cardsContainer}>
                {/* Left Card - Real Space */}
                <div className={`${styles.card} ${styles.cardLeft}`}>
                    {/* Sidebar with Label and Divider */}
                    <div className={styles.cardSidebar}>
                        <span className={styles.cardLabel}>Real Space</span>
                        <div className={styles.cardDivider}></div>
                    </div>

                    {/* Main Content Area */}
                    <div className={styles.cardContent}>
                        {/* Real Space Icon (Building/Architecture) */}
                        <div className={styles.iconWrapper}>
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(100, 116, 139, 0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                                <path d="M9 22v-4h6v4"></path>
                                <path d="M8 6h.01"></path>
                                <path d="M16 6h.01"></path>
                                <path d="M12 6h.01"></path>
                                <path d="M12 10h.01"></path>
                                <path d="M12 14h.01"></path>
                                <path d="M16 10h.01"></path>
                                <path d="M16 14h.01"></path>
                                <path d="M8 10h.01"></path>
                                <path d="M8 14h.01"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Digital Twin Badge with Circular Arrows */}
                <div className={styles.digitalTwinBadge}>
                    {/* Circular arrows around badge - thickened and white */}
                    <svg className={styles.circularArrows} viewBox="0 0 200 200" fill="none">
                        <defs>
                            <linearGradient id="arrowWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>

                        {/* Right Arrow (Curved Down) - Tighter Radius (85) */}
                        <path
                            d="M160 40 A85 85 0 0 1 160 160"
                            stroke="url(#arrowWhite)"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <polygon points="145,150 160,175 175,150" fill="#ffffff" transform="rotate(45, 160, 160)" />

                        {/* Left Arrow (Curved Up) - Tighter Radius (85) */}
                        <path
                            d="M40 160 A85 85 0 0 1 40 40"
                            stroke="url(#arrowWhite)"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <polygon points="55,50 40,25 25,50" fill="#ffffff" transform="rotate(45, 40, 40)" />


                    </svg>

                    {/* Badge center */}
                    <div className={styles.badgeCenter}>
                        <span className={styles.badgeText}>Digital<br />Twin</span>
                    </div>
                </div>

                {/* Right Card - Virtual Space */}
                <div className={`${styles.card} ${styles.cardRight}`}>
                    {/* Main Content Area */}
                    <div className={styles.cardContent}>
                        {/* Virtual Space Icon (Digital Cube/Wireframe) */}
                        <div className={styles.iconWrapper}>
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Sidebar with Label and Divider */}
                    <div className={styles.cardSidebar}>
                        <div className={styles.cardDivider}></div>
                        <span className={styles.cardLabel}>Virtual Space</span>
                    </div>
                </div>
            </div>

            {/* Description Paragraphs */}
            <div className={styles.visionDescription}>
                {descriptions.map((desc, index) => (
                    <p key={index}>{desc}</p>
                ))}
            </div>
        </section>
    );
}
