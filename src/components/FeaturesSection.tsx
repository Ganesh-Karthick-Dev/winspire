/**
 * FeaturesSection Component
 * 
 * Premium two-column layout with animated content and 3D model area.
 * Features beautiful GSAP animations with staggered reveals.
 */

import { useRef, useEffect } from 'react';

interface FeaturesSectionProps {
    /** Section title */
    title?: string;
    /** Section tagline */
    tagline?: string;
    /** Section subtitle/description */
    subtitle?: string;
}

export default function FeaturesSection({
    title = 'Welcome to the Future of Revenue Cycle.',
    tagline = 'AI-Powered. System-Driven. Outcome-Guaranteed.',
    subtitle = 'Winspire RCM combines intelligent automation, predictive insights, and human expertise to deliver measurable financial improvement in weeks, not years.',
}: FeaturesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const modelAreaRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);

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

                if (!sectionRef.current || !contentRef.current) return;

                const titleEl = titleRef.current;
                const taglineEl = taglineRef.current;
                const subtitleEl = subtitleRef.current;
                const decorEl = decorRef.current;

                // Split title into words for animation
                const titleWords = titleEl?.querySelectorAll('.word');
                const taglineWords = taglineEl?.querySelectorAll('.tagline-word');
                const subtitleWords = subtitleEl?.querySelectorAll('.subtitle-word');

                // Early return if elements not found
                if (!titleWords || !taglineWords || !subtitleWords || !decorEl) return;

                // Set initial states
                gsap.set(titleWords, {
                    opacity: 0,
                    y: 60,
                    rotateX: -30,
                });

                gsap.set(taglineWords, {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                });

                gsap.set(subtitleWords, {
                    opacity: 0,
                    y: 20,
                    filter: 'blur(8px)',
                });

                gsap.set(decorEl, {
                    scaleX: 0,
                    opacity: 0,
                });

                // Create master timeline
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                });

                // Animate title words with stagger
                masterTl.to(titleWords, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: {
                        each: 0.08,
                        ease: 'power2.out',
                    },
                    ease: 'power4.out',
                }, 0);

                // Animate decorative line
                masterTl.to(decorEl, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.inOut',
                }, 0.3);

                // Animate tagline words with scale effect
                masterTl.to(taglineWords, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: {
                        each: 0.1,
                        ease: 'power2.out',
                    },
                    ease: 'back.out(1.2)',
                }, 0.4);

                // Animate subtitle words with blur reveal
                masterTl.to(subtitleWords, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.5,
                    stagger: {
                        each: 0.02,
                        ease: 'power2.out',
                    },
                }, 0.8);

                cleanup = () => {
                    masterTl.kill();
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
                }
            }
        };

        setupAnimation();

        return () => {
            cleanup?.();
        };
    }, []);

    // Split text into words for animation
    const titleWords = title.split(' ');
    const taglineWords = tagline.split(' ');
    const subtitleWords = subtitle.split(' ');

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
                    {/* Main Title */}
                    <h2
                        id="features-title"
                        className="features-title-main"
                        ref={titleRef}
                    >
                        {titleWords.map((word, index) => (
                            <span key={index} className="word-wrapper">
                                <span className="word">{word}</span>
                                {index < titleWords.length - 1 && ' '}
                            </span>
                        ))}
                    </h2>

                    {/* Decorative Line */}
                    <div ref={decorRef} className="features-decor-line" aria-hidden="true" />

                    {/* Tagline */}
                    <div ref={taglineRef} className="features-tagline">
                        {taglineWords.map((word, index) => (
                            <span key={index} className="tagline-word">
                                {word}
                                {index < taglineWords.length - 1 && ' '}
                            </span>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <p ref={subtitleRef} className="features-subtitle-main">
                        {subtitleWords.map((word, index) => (
                            <span key={index} className="subtitle-word">
                                {word}
                                {index < subtitleWords.length - 1 && ' '}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Right side - Empty space for 3D model */}
                <div ref={modelAreaRef} className="features-model-area" id="features-model-box" />
            </div>
        </section>
    );
}
