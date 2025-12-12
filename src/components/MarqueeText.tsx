/**
 * MarqueeText Component
 * 
 * Full-width horizontal scrolling text that animates on scroll.
 * Uses GSAP ScrollTrigger for smooth scroll-driven motion.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeTextProps {
    /** Text to display */
    text?: string;
    /** Optional className for custom styling */
    className?: string;
}

export default function MarqueeText({
    text = 'Get Results. Not Just Promise.',
    className = '',
}: MarqueeTextProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const textEl = textRef.current;

        if (!section || !textEl) return;

        // Set initial position off-screen to the right
        gsap.set(textEl, { xPercent: 100 });

        // Create scroll-triggered animation
        const animation = gsap.to(textEl, {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`marquee-section ${className}`}
            aria-label="Featured tagline"
        >
            <div className="marquee-container">
                <div ref={textRef} className="marquee-text">
                    <span className="marquee-content">
                        {text}
                    </span>
                </div>
            </div>
        </section>
    );
}
