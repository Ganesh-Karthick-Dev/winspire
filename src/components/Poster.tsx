/**
 * Poster Component
 * 
 * Static fallback image displayed while the 3D model loads.
 * This is the LCP (Largest Contentful Paint) target.
 * 
 * Features:
 * - next/image with priority for fast LCP
 * - LQIP (Low Quality Image Placeholder) blur-up effect
 * - Stays visible under loader during load sequence
 * - Fades out after loader and before canvas appears
 */

import Image from 'next/image';
import { useState } from 'react';

interface PosterProps {
    /** Path to the main poster image */
    src?: string;
    /** Path to the LQIP blur image */
    lqipSrc?: string;
    /** Alt text for accessibility */
    alt?: string;
    /** Additional CSS class */
    className?: string;
}

export default function Poster({
    src = '/poster/hero-poster.webp',
    lqipSrc = '/lqip/hero-blur.jpg',
    alt = 'Hero background showing 3D experience preview',
    className = '',
}: PosterProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`poster-layer ${className}`} aria-hidden="true">
            {/* LQIP blur placeholder - fades out when main image loads */}
            <div className={`poster-lqip ${isLoaded ? 'loaded' : ''}`}>
                <Image
                    src={lqipSrc}
                    alt=""
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    aria-hidden="true"
                />
            </div>

            {/* Main poster image - LCP target */}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority // Critical for LCP
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}
