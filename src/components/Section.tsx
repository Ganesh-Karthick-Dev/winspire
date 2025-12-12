/**
 * Section Component
 * 
 * Reusable content section with GSAP entry animations.
 * SSR-rendered text content for SEO indexability.
 * 
 * Animation: opacity + translateY (CLS-safe, GPU-accelerated)
 * Trigger: ScrollTrigger at "top 80%"
 */

import { useRef, useEffect } from 'react';

interface SectionProps {
    /** Unique ID for the section (used for navigation) */
    id: string;
    /** Section heading (h2) */
    title: string;
    /** Section content */
    children: React.ReactNode;
    /** Additional CSS class */
    className?: string;
    /** Background variant */
    variant?: 'default' | 'dark' | 'transparent';
}

export default function Section({
    id,
    title,
    children,
    className = '',
    variant = 'default',
}: SectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Dynamically import GSAP to keep initial bundle small
        let cleanup: (() => void) | undefined;

        const setupAnimation = async () => {
            try {
                const { gsap } = await import('gsap');
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                gsap.registerPlugin(ScrollTrigger);

                if (!sectionRef.current || !contentRef.current) return;

                // Set initial state
                gsap.set(contentRef.current, {
                    opacity: 0,
                    y: 60,
                });

                // Create ScrollTrigger animation
                const animation = gsap.to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                });

                cleanup = () => {
                    animation.kill();
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.trigger === sectionRef.current) {
                            st.kill();
                        }
                    });
                };
            } catch (error) {
                console.error('Failed to load GSAP:', error);
                // Fallback: show content immediately
                if (contentRef.current) {
                    contentRef.current.style.opacity = '1';
                    contentRef.current.style.transform = 'translateY(0)';
                }
            }
        };

        setupAnimation();

        return () => {
            cleanup?.();
        };
    }, []);

    const variantClasses = {
        default: 'content-section',
        dark: 'content-section',
        transparent: '',
    };

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`${variantClasses[variant]} ${className}`}
            aria-labelledby={`${id}-title`}
        >
            <div ref={contentRef} className="section-inner section-animate">
                {/* SSR-rendered heading for SEO */}
                <h2 id={`${id}-title`} className="section-title">
                    {title}
                </h2>

                {/* SSR-rendered content */}
                <div className="section-content">
                    {children}
                </div>
            </div>
        </section>
    );
}
