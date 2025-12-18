/**
 * MarqueeText Component
 * 
 * Creates a smooth infinite scrolling text marquee using CSS animation.
 * Positioned BEHIND the 3D canvas so the model appears on top.
 * Uses CSS for crisp text rendering and smooth animation.
 */

import { useRef } from 'react';

interface MarqueeTextProps {
    /** Text to scroll (will be repeated for seamless loop) */
    text?: string;
    /** Animation duration in seconds (higher = slower) */
    duration?: number;
    /** Font size CSS value */
    fontSize?: string;
    /** Text color */
    color?: string;
    /** Additional className */
    className?: string;
}

export default function MarqueeText({
    text = 'Revenue Cycle • AI-Powered • Winspire • ',
    duration = 40,
    fontSize = 'clamp(4rem, 14vw, 11rem)',
    color = '#000000',
    className = '',
}: MarqueeTextProps) {
    // Repeat text 4 times for seamless loop (matching the -25% CSS keyframe)
    const repeatedText = `${text}${text}${text}${text}`;

    return (
        <div
            className={`marquee-container ${className}`}
            style={{
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'relative',
            }}
        >
            <div
                className="marquee-text"
                style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    fontSize,
                    fontWeight: 800,
                    color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    userSelect: 'none',
                    animation: `marquee ${duration}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {repeatedText}
            </div>
        </div>
    );
}
