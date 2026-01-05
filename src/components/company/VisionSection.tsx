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
    leftImage = '/images/company/left-side.webp',
    rightImage = '/images/company/rigth-side.webp',
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
                        <span className={styles.cardLabel}>Before</span>
                        <div className={styles.cardDivider}></div>
                    </div>

                    {/* Main Content Area */}
                    <div className={styles.cardContent}>
                        {/* Real Space Image */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={leftImage}
                                alt="Before Neura AI"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'center' }}
                            />
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
                        <span className={styles.badgeText}>Neura<br />AI</span>
                    </div>
                </div>

                {/* Right Card - Virtual Space */}
                <div className={`${styles.card} ${styles.cardRight}`}>
                    {/* Main Content Area */}
                    <div className={styles.cardContent}>
                        {/* Virtual Space Image */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={rightImage}
                                alt="After Neura AI"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'center' }}
                            />
                        </div>
                    </div>

                    {/* Sidebar with Label and Divider */}
                    <div className={styles.cardSidebar}>
                        <div className={styles.cardDivider}></div>
                        <span className={styles.cardLabel}>After</span>
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
