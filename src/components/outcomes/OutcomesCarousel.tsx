'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HiCog, HiCurrencyDollar, HiShieldCheck, HiCode, HiChartBar } from 'react-icons/hi';
import styles from '@/styles/OutcomesCarousel.module.css';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Slide data with images
const slides = [
    {
        id: 1,
        title: 'Operational',
        titleHighlight: 'Efficiency',
        description: 'Neura AI automates repetitive work, predicts bottlenecks, allocates tasks, and minimizes human dependency — giving teams the stability and clarity they never had before.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            '30% higher productivity',
            '24 hour turnaround times',
            'Elimination of backlog',
            'Streamlined workflows across all departments',
        ],
        icon: HiCog,
        image: '/images/careers/brainstorm.png',
    },
    {
        id: 2,
        title: 'Financial',
        titleHighlight: 'Acceleration',
        description: 'Your cash moves faster because your processes become intelligent.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            '20–50% reduction in AR days, 3 - 6 months',
            'Higher collectible revenue',
            'Real-time cash acceleration insights',
            'Reduced cost-to-collect',
        ],
        icon: HiCurrencyDollar,
        image: '/images/careers/presentation.png',
    },
    {
        id: 3,
        title: 'Denial Prevention &',
        titleHighlight: 'Appeals Intelligence',
        description: "Neura doesn't just fix denials — it predicts them before they happen.",
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Avoidable denials drop below 1%',
            'Appealed within 24 to 48 hrs of denial posting',
            'Auto-generated appeals increase success rates',
            'Compliance improves across payers',
        ],
        icon: HiShieldCheck,
        image: '/images/company-page/cloud-computing-cyber-security.webp',
    },
    {
        id: 4,
        title: 'Clinical & Coding',
        titleHighlight: 'Accuracy',
        description: 'Coded by the top 1% of talents and documentation insights deliver consistent accuracy.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Higher E&M coding accuracy',
            'Improved HCC capture',
            'Lower coding cost',
            'Near-zero coding backlog',
        ],
        icon: HiCode,
        image: '/images/company-page/ai-assistant-ai-chatbot-generate-images-write-code-writer-bot-translate-advertising-llm.webp',
    },
    {
        id: 5,
        title: 'Visibility &',
        titleHighlight: 'Control',
        description: 'Real-time dashboards allow leaders to see everything happening inside their revenue cycle.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Transparency across all departments',
            'Stronger provider satisfaction',
            'Clear KPIs for decision-making',
            'No surprises in reporting',
        ],
        icon: HiChartBar,
        image: '/images/careers/office-interior.png',
    },
];

export default function OutcomesCarousel() {
    const sectionRef = useRef<HTMLElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressFillsRef = useRef<(HTMLDivElement | null)[]>([]);
    const iconButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const imageCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Setup scroll animations
    useEffect(() => {
        const section = sectionRef.current;
        const slideElements = slidesRef.current;
        const progressFills = progressFillsRef.current;
        const iconButtons = iconButtonsRef.current;
        const imageCards = imageCardsRef.current;

        if (!section) return;

        const ctx = gsap.context(() => {
            // Main timeline with pinning
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=500%', // 5 slides worth of scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const totalSlides = slides.length;
                        const slideProgress = progress * totalSlides;
                        const activeSlide = Math.min(Math.floor(slideProgress), totalSlides - 1);
                        const withinSlideProgress = slideProgress - activeSlide;

                        // Update current slide state for image switching
                        setCurrentSlide(activeSlide);

                        // Update slides visibility
                        slideElements.forEach((slide, index) => {
                            if (!slide) return;
                            if (index === activeSlide) {
                                slide.classList.add(styles.active);
                            } else {
                                slide.classList.remove(styles.active);
                            }
                        });

                        // Update image cards visibility
                        imageCards.forEach((card, index) => {
                            if (!card) return;
                            if (index === activeSlide) {
                                card.classList.add(styles.active);
                            } else {
                                card.classList.remove(styles.active);
                            }
                        });

                        // Update progress bar fills
                        progressFills.forEach((fill, index) => {
                            if (!fill) return;
                            if (index < activeSlide) {
                                fill.style.width = '100%';
                            } else if (index === activeSlide) {
                                fill.style.width = `${withinSlideProgress * 100}%`;
                            } else {
                                fill.style.width = '0%';
                            }
                        });

                        // Update icon buttons
                        iconButtons.forEach((button, index) => {
                            if (!button) return;
                            button.classList.remove(styles.active, styles.completed);
                            if (index < activeSlide) {
                                button.classList.add(styles.completed);
                            } else if (index === activeSlide) {
                                button.classList.add(styles.active);
                            }
                        });
                    },
                },
            });

            // Ensure first slide is visible initially
            if (slideElements[0]) {
                slideElements[0].classList.add(styles.active);
            }
            if (imageCards[0]) {
                imageCards[0].classList.add(styles.active);
            }
            if (iconButtons[0]) {
                iconButtons[0].classList.add(styles.active);
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="outcomes-carousel" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Left Content Area */}
                <div className={styles.contentArea}>
                    <div className={styles.slidesWrapper}>
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                ref={(el) => { slidesRef.current[index] = el; }}
                                className={styles.slide}
                            >
                                <h2 className={styles.slideTitle}>
                                    {slide.title} <span>{slide.titleHighlight}</span>
                                </h2>
                                <p className={styles.slideDescription}>
                                    {slide.description}
                                </p>
                                <p className={styles.resultsHeading}>
                                    {slide.resultsHeading}
                                </p>
                                <ul className={styles.bulletList}>
                                    {slide.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} className={styles.bulletItem}>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image Area - Vertical Photo Cards */}
                <div className={styles.modelArea}>
                    <div className={styles.modelContainer}>
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                ref={(el) => { imageCardsRef.current[index] = el; }}
                                className={styles.imageCard}
                            >
                                <img
                                    src={slide.image}
                                    alt={`${slide.title} ${slide.titleHighlight}`}
                                    className={styles.cardImage}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    {slides.map((slide, index) => {
                        const IconComponent = slide.icon;
                        return (
                            <div key={slide.id} className={styles.progressSegment}>
                                <button
                                    ref={(el) => { iconButtonsRef.current[index] = el; }}
                                    className={styles.iconButton}
                                    aria-label={`${slide.title} ${slide.titleHighlight}`}
                                >
                                    <IconComponent />
                                </button>
                                <div className={styles.progressLine}>
                                    <div
                                        ref={(el) => { progressFillsRef.current[index] = el; }}
                                        className={styles.progressFill}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
