/**
 * FeaturesSection Component
 * 
 * Two-column layout with content on left and glossy box on right.
 * The 3D model smoothly moves into the glossy box on scroll.
 */

import { useRef, useEffect } from 'react';

interface FeaturesSectionProps {
    /** Section title */
    title?: string;
    /** Section subtitle/description */
    subtitle?: string;
    /** Feature list items */
    features?: string[];
}

export default function FeaturesSection({
    title = 'Why Choose Us',
    subtitle = 'We deliver exceptional results through innovative technology and dedicated expertise.',
    features = [
        'AI-Powered Revenue Optimization',
        'Real-time Analytics Dashboard',
        'Automated Claim Processing',
        'Compliance & Security Built-in'
    ],
}: FeaturesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let cleanup: (() => void) | undefined;

        const setupAnimation = async () => {
            try {
                const { gsap } = await import('gsap');
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                gsap.registerPlugin(ScrollTrigger);

                if (!sectionRef.current || !contentRef.current || !boxRef.current) return;

                // Set initial states
                gsap.set(contentRef.current, {
                    opacity: 0,
                    x: -60,
                });

                gsap.set(boxRef.current, {
                    opacity: 0,
                    x: 60,
                    scale: 0.95,
                });

                // Animate content in from left
                const contentAnim = gsap.to(contentRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 30%',
                        toggleActions: 'play none none reverse',
                    },
                });

                // Animate box in from right
                const boxAnim = gsap.to(boxRef.current, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 30%',
                        toggleActions: 'play none none reverse',
                    },
                });

                cleanup = () => {
                    contentAnim.kill();
                    boxAnim.kill();
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.trigger === sectionRef.current) {
                            st.kill();
                        }
                    });
                };
            } catch (error) {
                console.error('Failed to load GSAP:', error);
                if (contentRef.current) {
                    contentRef.current.style.opacity = '1';
                    contentRef.current.style.transform = 'translateX(0)';
                }
                if (boxRef.current) {
                    boxRef.current.style.opacity = '1';
                    boxRef.current.style.transform = 'translateX(0)';
                }
            }
        };

        setupAnimation();

        return () => {
            cleanup?.();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="features"
            className="features-section"
            aria-labelledby="features-title"
        >
            <div className="features-container">
                {/* Left side - Content */}
                <div ref={contentRef} className="features-content">
                    <h2 id="features-title" className="features-title">
                        {title}
                    </h2>
                    <p className="features-subtitle">
                        {subtitle}
                    </p>
                    <ul className="features-list">
                        {features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <span className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="feature-text">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side - Empty space for 3D model */}
                <div ref={boxRef} className="features-model-area" id="features-model-box" />
            </div>
        </section>
    );
}
