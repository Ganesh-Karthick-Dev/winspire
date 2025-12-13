/**
 * Hero Component
 * 
 * The main hero section with title, subtitle, and CTA.
 * SSR-rendered for SEO - all text content is indexable.
 * 
 * Acts as the trigger area for the initial ScrollTrigger animation.
 * Features premium CTA button and text animations with GSAP.
 */

import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';

interface HeroProps {
    /** Main heading (h1) */
    title?: string;
    /** Subtitle text */
    subtitle?: string;
    /** CTA button text */
    ctaText?: string;
    /** CTA button href or onClick handler */
    ctaHref?: string;
    /** Callback when CTA is clicked */
    onCtaClick?: () => void;
}

export default function Hero({
    title = 'Welcome to the Future of Revenue Cycle',
    subtitle = 'AI-Powered. System-Driven. Outcome-Guaranteed.',
    ctaText = 'Get Started',
    ctaHref = '#features',
    onCtaClick,
}: HeroProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const shimmerRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    // Split title into lines, then words for animation
    const titleLines = useMemo(() =>
        title.split('\n').map(line => line.split(' ')),
        [title]
    );

    useEffect(() => {
        const button = buttonRef.current;
        const shimmer = shimmerRef.current;
        const content = contentRef.current;
        const arrow = arrowRef.current;
        const glow = glowRef.current;
        const titleEl = titleRef.current;
        const subtitleEl = subtitleRef.current;
        const heroContent = heroContentRef.current;

        if (!button || !shimmer || !content || !arrow || !glow || !titleEl || !subtitleEl || !heroContent) return;

        // Create master timeline for coordinated animations
        const masterTimeline = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        // Get all word spans in the title
        const words = titleEl.querySelectorAll('.hero-word');
        const wordInners = titleEl.querySelectorAll('.hero-word-inner');

        // Get subtitle characters/words
        const subtitleWords = subtitleEl.querySelectorAll('.subtitle-word');

        // Initial states
        gsap.set(wordInners, {
            yPercent: 110,
            opacity: 0,
            rotateX: -45
        });

        gsap.set(subtitleWords, {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)'
        });

        gsap.set(button, {
            opacity: 0,
            y: 40,
            scale: 0.9
        });

        // Animate title words with stagger
        masterTimeline.to(wordInners, {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: {
                each: 0.08,
                ease: 'power2.out'
            },
            ease: 'power4.out'
        }, 0.3);

        // Animate subtitle words with blur reveal
        masterTimeline.to(subtitleWords, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: {
                each: 0.03,
                ease: 'power2.out'
            }
        }, 0.8);

        // Animate button entry
        masterTimeline.to(button, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        }, 1.2);

        // === Letter Hover Animations ===
        const letters = titleEl.querySelectorAll('.hero-letter');

        letters.forEach((letter) => {
            const letterEl = letter as HTMLElement;

            const handleLetterEnter = () => {
                gsap.to(letterEl, {
                    scale: 1.3,
                    y: -8,
                    color: '#00d9ff',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            const handleLetterLeave = () => {
                gsap.to(letterEl, {
                    scale: 1,
                    y: 0,
                    color: '#fff',
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.4)'
                });
            };

            letterEl.addEventListener('mouseenter', handleLetterEnter);
            letterEl.addEventListener('mouseleave', handleLetterLeave);
        });

        // === Button Hover Animations ===

        // Magnetic hover effect
        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull effect
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Move glow with cursor
            gsap.to(glow, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseEnter = () => {
            // Scale up button
            gsap.to(button, {
                scale: 1.05,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Shimmer effect - sweeping highlight
            gsap.fromTo(shimmer,
                { x: '-100%', opacity: 0.7 },
                {
                    x: '200%',
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }
            );

            // Arrow animation
            gsap.to(arrow, {
                x: 6,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Glow effect
            gsap.to(glow, {
                opacity: 1,
                scale: 1.2,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Text subtle lift
            gsap.to(content, {
                y: -2,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            // Reset all transforms
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });

            // Arrow reset
            gsap.to(arrow, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Hide glow
            gsap.to(glow, {
                opacity: 0,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Reset text
            gsap.to(content, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        // Continuous subtle pulse animation
        const pulseAnimation = gsap.to(glow, {
            scale: 1.15,
            opacity: 0.3,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            paused: true
        });

        pulseAnimation.play();

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
            pulseAnimation.kill();
            masterTimeline.kill();
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const button = buttonRef.current;
        if (button) {
            // Click ripple effect
            gsap.fromTo(button,
                { scale: 0.95 },
                { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
            );
        }

        if (onCtaClick) {
            e.preventDefault();
            onCtaClick();
        }
    };

    // Split subtitle into words
    const subtitleWords = useMemo(() => subtitle.split(' '), [subtitle]);

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content" ref={heroContentRef}>
                {/* Animated H1 - letters with hover effect */}
                <h1 id="hero-title" className="hero-title hero-title-animated" ref={titleRef}>
                    {titleLines.map((lineWords, lineIndex) => (
                        <span key={lineIndex} className="hero-line">
                            {lineWords.map((word, wordIndex) => (
                                <span key={wordIndex} className="hero-word">
                                    <span className="hero-word-inner">
                                        {word.split('').map((letter, letterIndex) => (
                                            <span
                                                key={letterIndex}
                                                className="hero-letter"
                                                data-letter={letter}
                                            >
                                                {letter}
                                            </span>
                                        ))}
                                    </span>
                                    {wordIndex < lineWords.length - 1 && <span className="hero-word-space">&nbsp;</span>}
                                </span>
                            ))}
                            {lineIndex < titleLines.length - 1 && <br />}
                        </span>
                    ))}
                </h1>

                {/* Animated subtitle - blur reveal */}
                <p className="hero-subtitle hero-subtitle-animated" ref={subtitleRef}>
                    {subtitleWords.map((word, index) => (
                        <span key={index} className="subtitle-word">
                            {word}
                            {index < subtitleWords.length - 1 && ' '}
                        </span>
                    ))}
                </p>

                {/* Premium CTA with GSAP animations */}
                <a
                    ref={buttonRef}
                    href={ctaHref}
                    className="cta-button-premium"
                    onClick={handleClick}
                    aria-label={ctaText}
                >
                    {/* Background glow effect */}
                    <span ref={glowRef} className="cta-glow" aria-hidden="true" />

                    {/* Shimmer overlay */}
                    <span ref={shimmerRef} className="cta-shimmer" aria-hidden="true" />

                    {/* Button border gradient */}
                    <span className="cta-border" aria-hidden="true" />

                    {/* Button content */}
                    <span ref={contentRef} className="cta-content">
                        <span className="cta-text">{ctaText}</span>
                        <span ref={arrowRef} className="cta-arrow">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 10H16M16 10L11 5M16 10L11 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </span>
                </a>
            </div>
        </section>
    );
}

