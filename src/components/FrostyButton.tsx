import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface FrostyButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function FrostyButton({ text, href, onClick, className = '' }: FrostyButtonProps) {
    const buttonRef = useRef<any>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const circle = circleRef.current;
        const arrow = arrowRef.current;
        const bg = bgRef.current;

        if (!button || !circle || !arrow || !bg) return;

        // Hover Animation
        const handleMouseEnter = () => {
            // Circle turns Blue and Arrow White
            gsap.to(circle, {
                backgroundColor: '#3b82f6', // Vivid Blue
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(arrow, {
                color: 'white',
                duration: 0.3
            });

            // Background slight darken
            gsap.to(bg, {
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                duration: 0.4
            });
        };

        const handleMouseLeave = () => {
            // Circle back to White
            gsap.to(circle, {
                backgroundColor: '#ffffff',
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            // Arrow back to Black
            gsap.to(arrow, {
                color: '#1a1a1a',
                duration: 0.3
            });

            // Background back to Frosty
            gsap.to(bg, {
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                duration: 0.4
            });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (button) {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const Component = href ? 'a' : 'button';

    return (
        <Component
            ref={buttonRef}
            href={href}
            onClick={onClick}
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px', // Reduced gap since space-between handles it
                minWidth: '260px', // Ensure enough width for "sides" effect
                padding: '20px 35px 20px 56px', /* Matches news-index-btn */
                borderRadius: '50px',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                border: 'none',
                background: 'transparent',
                width: 'fit-content' // Restored as per user request
            }}
        >
            {/* Frosty Background Layer */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Frosty base
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    zIndex: 0,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'background-color 0.3s'
                }}
            />

            {/* Text */}
            <span
                style={{
                    position: 'relative',
                    zIndex: 10,
                    color: 'white',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                }}
            >
                {text}
            </span>

            {/* Circle Icon */}
            <div
                ref={circleRef}
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff', // White default
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
            >
                <span
                    ref={arrowRef}
                    style={{
                        color: '#1a1a1a', // Black default
                        display: 'block'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
        </Component>
    );
}
