"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PulseButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function PulseButton({ text, href, onClick, className = '' }: PulseButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!glowRef.current) return;

        // Continuous glow pulse animation
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(glowRef.current, {
            opacity: 0.8,
            scale: 1.1,
            duration: 1.5,
            ease: 'power2.inOut',
        }).to(glowRef.current, {
            opacity: 0.4,
            scale: 1,
            duration: 1.5,
            ease: 'power2.inOut',
        });

        return () => {
            tl.kill();
        };
    }, []);

    const buttonContent = (
        <>
            {/* Animated glow effect */}
            <span
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(135deg, #18CCFC 0%, #6344F5 50%, #AE48FF 100%)',
                    borderRadius: '60px',
                    opacity: 0.4,
                    filter: 'blur(15px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Gradient border */}
            <span
                style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '2px',
                    borderRadius: '60px',
                    background: 'linear-gradient(135deg, #18CCFC 0%, #6344F5 50%, #AE48FF 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            {/* Shimmer effect */}
            <span
                className="pulse-button-shimmer"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    borderRadius: '60px',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Button inner background */}
            <span
                style={{
                    position: 'absolute',
                    inset: '2px',
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
                    borderRadius: '58px',
                    zIndex: 1,
                }}
            />

            {/* Radial highlight on hover */}
            <span
                className="pulse-button-highlight"
                style={{
                    position: 'absolute',
                    inset: '2px',
                    background: 'radial-gradient(75% 100% at 50% 0%, rgba(56, 189, 248, 0.15) 0%, transparent 75%)',
                    borderRadius: '58px',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Text content */}
            <span
                style={{
                    position: 'relative',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '18px 40px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    background: 'linear-gradient(90deg, #f0f9ff 0%, #e0e7ff 50%, #f0f9ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textDecoration: 'none',
                }}
            >
                {text}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#arrow-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'transform 0.3s ease' }}
                    className="pulse-button-arrow"
                >
                    <defs>
                        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#18CCFC" />
                            <stop offset="100%" stopColor="#AE48FF" />
                        </linearGradient>
                    </defs>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </span>
        </>
    );

    const commonStyles: React.CSSProperties = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.3s ease',
        isolation: 'isolate',
    };

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={`pulse-button ${className}`}
                style={commonStyles}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={`pulse-button ${className}`}
            style={commonStyles}
            type="button"
        >
            {buttonContent}
        </button>
    );
}
