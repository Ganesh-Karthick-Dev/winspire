/**
 * Hero Component
 * 
 * The main hero section with title, subtitle, and CTA.
 * SSR-rendered for SEO - all text content is indexable.
 * 
 * Acts as the trigger area for the initial ScrollTrigger animation.
 * Features premium CTA button with GSAP animations.
 */

import { useRef, useEffect } from 'react';
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
    title = 'Immersive 3D Experience',
    subtitle = 'Explore stunning visuals with smooth scroll animations. Built for performance and accessibility.',
    ctaText = 'Get Started',
    ctaHref = '#features',
    onCtaClick,
}: HeroProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const shimmerRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const shimmer = shimmerRef.current;
        const content = contentRef.current;
        const arrow = arrowRef.current;
        const glow = glowRef.current;

        if (!button || !shimmer || !content || !arrow || !glow) return;

        // Initial animation - button entry
        gsap.fromTo(button,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            }
        );

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

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
                {/* SSR-rendered H1 - critical for SEO */}
                <h1 id="hero-title" className="hero-title">
                    {title}
                </h1>

                {/* SSR-rendered subtitle - indexable content */}
                <p className="hero-subtitle">
                    {subtitle}
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
