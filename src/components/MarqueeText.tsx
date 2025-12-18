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
    gradient = false,
}: MarqueeTextProps & { gradient?: boolean }) {
    // Repeat text 2 times per chunk, and use 2 chunks for the loop (Total 4 copies)
    // We animate -50% (width of one chunk), so we need 2 identical chunks.
    const chunkText = `${text}${text}`;

    return (
        <div
            className={`marquee-container ${className}`}
            style={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex', // Ensure clean layout
            }}
        >
            <div
                className="marquee-track"
                style={{
                    display: 'flex',
                    width: 'fit-content',
                    animation: `marquee ${duration}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {/* Chunk 1 */}
                <div
                    className={gradient ? 'text-gradient-shimmer' : ''}
                    style={{
                        whiteSpace: 'nowrap',
                        fontSize,
                        fontWeight: 600,
                        color: gradient ? 'transparent' : color,
                        // textTransform: 'uppercase', // Removed to allow natural casing
                        letterSpacing: '0.03em',
                        fontFamily: 'Poppins, sans-serif',
                        userSelect: 'none',
                        paddingRight: '0', // No gap
                    }}
                >
                    {chunkText}
                </div>

                {/* Chunk 2 (Identical Clone) */}
                <div
                    className={gradient ? 'text-gradient-shimmer' : ''}
                    style={{
                        whiteSpace: 'nowrap',
                        fontSize,
                        fontWeight: 600,
                        color: gradient ? 'transparent' : color,
                        // textTransform: 'uppercase', // Removed to allow natural casing
                        letterSpacing: '0.03em',
                        fontFamily: 'Poppins, sans-serif',
                        userSelect: 'none',
                        paddingRight: '0',
                    }}
                >
                    {chunkText}
                </div>
            </div>
        </div>
    );
}
