/**
 * ValuePropsSection Component
 * 
 * A section displaying 3 value proposition cards with CometCard 3D effects.
 * Positioned between Hero and About sections.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CometCard } from '@/components/ui/CometCard';
import { useIsMobile } from '@/hooks/useIsMobile';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Card data for the 3 value propositions
const valueProps = [
    {
        id: 'strategic',
        title: 'Leadership Design Framework',
        description: 'Human-centric approach that understands your unique challenges and goals.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop',
        tag: 'Framework'
    },
    {
        id: 'ai-powered',
        title: 'The 5 Efficiency Pillars + % Insights',
        description: 'Advanced automation that predicts issues before they become problems.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
        tag: 'Efficiency'
    },
    {
        id: 'outcomes',
        title: 'High-Level Outcomes Without Heavy Tables',
        description: 'Performance-based results you can measure and trust.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop',
        tag: 'Outcomes'
    }
];

export default function ValuePropsSection() {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Card 1 - slides in from left
            if (card1Ref.current) {
                gsap.fromTo(
                    card1Ref.current,
                    { x: -300, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 65%',
                            end: 'center 55%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Exit animation - slides out to left
                gsap.to(card1Ref.current, {
                    x: -300,
                    opacity: 0,
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'bottom 75%',
                        end: 'bottom 10%',
                        scrub: 1,
                    },
                });
            }

            // Card 2 - slides in from top
            if (card2Ref.current) {
                gsap.fromTo(
                    card2Ref.current,
                    { y: -300, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: 'power3.out',
                        delay: 0.15,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 65%',
                            end: 'center 55%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Exit animation - slides out to bottom
                gsap.to(card2Ref.current, {
                    y: 300,
                    opacity: 0,
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'bottom 75%',
                        end: 'bottom 10%',
                        scrub: 1,
                    },
                });
            }

            // Card 3 - slides in from right
            if (card3Ref.current) {
                gsap.fromTo(
                    card3Ref.current,
                    { x: 300, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: 'power3.out',
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 65%',
                            end: 'center 55%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Exit animation - slides out to right
                gsap.to(card3Ref.current, {
                    x: 300,
                    opacity: 0,
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'bottom 75%',
                        end: 'bottom 10%',
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Get ref for each card based on index
    const getCardRef = (index: number) => {
        if (index === 0) return card1Ref;
        if (index === 1) return card2Ref;
        return card3Ref;
    };

    return (
        <section
            ref={sectionRef}
            id="value-props"
            className="value-props-section"
            style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '80px 20px 60px' : '150px 48px 100px',
                background: 'transparent',
                zIndex: 25,
            }}
        >
            {/* Section Title */}
            <h2
                style={{
                    fontSize: isMobile ? '2rem' : '3rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: isMobile ? '48px' : '8rem',
                    textAlign: 'center',
                }}
            >
                Leadership Design & System Efficiency
            </h2>

            {/* Cards Container */}
            <div
                className="value-props-cards"
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '32px' : '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    width: '100%',
                }}
            >
                {valueProps.map((prop, index) => (
                    <div key={prop.id} ref={getCardRef(index)}>
                        <CometCard rotateDepth={12} translateDepth={15}>
                            <div
                                className="value-card"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    padding: '12px',
                                    width: isMobile ? '300px' : '340px',
                                    minHeight: isMobile ? 'auto' : '420px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                {/* Card Image */}
                                <div
                                    style={{
                                        position: 'relative',
                                        aspectRatio: '4/3',
                                        width: '100%',
                                        borderRadius: '14px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        loading="lazy"
                                        src={prop.image}
                                        alt={prop.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '14px',
                                        }}
                                    />
                                </div>

                                {/* Card Content */}
                                <div
                                    style={{
                                        padding: '20px 12px 12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            color: '#6366f1',
                                            fontFamily: 'Outfit, sans-serif',
                                        }}
                                    >
                                        {prop.tag}
                                    </span>
                                    <h3
                                        style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            fontFamily: 'Outfit, sans-serif',
                                            margin: 0,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {prop.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: '0.95rem',
                                            color: 'rgba(26, 26, 26, 0.7)',
                                            fontFamily: 'Outfit, sans-serif',
                                            margin: 0,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {prop.description}
                                    </p>
                                </div>
                            </div>
                        </CometCard>
                    </div>
                ))}
            </div>
        </section>
    );
}
