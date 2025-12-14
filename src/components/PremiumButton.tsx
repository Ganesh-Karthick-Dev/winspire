'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PremiumButtonProps {
    text: string;
    variant?: 'primary' | 'secondary';
    showArrow?: boolean;
    onClick?: () => void;
}

export default function PremiumButton({
    text,
    variant = 'primary',
    showArrow = false,
    onClick
}: PremiumButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
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

        if (!button || !shimmer || !content || !glow) return;

        // Magnetic hover effect
        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(glow, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Shimmer effect
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
            if (arrow) {
                gsap.to(arrow, {
                    x: 6,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Glow effect
            gsap.to(glow, {
                opacity: variant === 'primary' ? 0.6 : 0.4,
                scale: 1.2,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Text lift
            gsap.to(content, {
                y: -2,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });

            if (arrow) {
                gsap.to(arrow, {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            gsap.to(glow, {
                opacity: 0,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(content, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        // Continuous pulse
        const pulseAnimation = gsap.to(glow, {
            scale: 1.15,
            opacity: variant === 'primary' ? 0.3 : 0.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
            pulseAnimation.kill();
        };
    }, [variant]);

    const isPrimary = variant === 'primary';

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            style={{
                position: 'relative',
                padding: '1rem 2rem',
                background: isPrimary
                    ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '50px',
                border: isPrimary ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                backdropFilter: isPrimary ? 'none' : 'blur(10px)',
                WebkitBackdropFilter: isPrimary ? 'none' : 'blur(10px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                boxShadow: isPrimary
                    ? '0 4px 20px rgba(37, 99, 235, 0.4)'
                    : '0 4px 15px rgba(255, 255, 255, 0.1)'
            }}
        >
            {/* Background glow */}
            <span
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: '-10px',
                    background: isPrimary
                        ? 'radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Shimmer overlay */}
            <span
                ref={shimmerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transform: 'translateX(-100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Content */}
            <span
                ref={contentRef}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <span>{text}</span>
                {showArrow && (
                    <span ref={arrowRef} style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                )}
            </span>
        </button>
    );
}
