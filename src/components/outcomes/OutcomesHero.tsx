'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from '@/styles/OutcomesHero.module.css';

const OutcomesHero = () => {
    // We need to know dimensions to set viewBox correctly or just use 100%
    // Using simple responsive SVG approach
    
    return (
        <section id="outcomes-hero" className={styles.heroSection}>
            <svg 
                className={styles.heroSvg}
                viewBox="0 0 1920 1080" 
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
            >
                <defs>
                    <mask id="textMask">
                        {/* White = Opaque (Keep the Background), Black = Transparent (Show hole) */}
                        {/* Wait! For a "Mask" to SHOW the background image (3D), we need:
                            - The Overlay Layer (Blue).
                            - The Overlay must have HOLES where the text is.
                            - A Mask on a DOM Element defines opacity: White = Visible, Black = Invisible.
                            
                            If we put the MASK on the BLUE RECT:
                            - Where Mask is White, Blue Rect is Visible.
                            - Where Mask is Black, Blue Rect is Transparent (Showing 3D Model).
                            
                            So:
                            - Mask BG: White (Keep Blue Wall).
                            - Mask Text: Black (Cut Blue Wall).
                        */}
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className={styles.svgText}
                        >
                           OUTCOMES 
                        </text>
                    </mask>
                </defs>

                {/* The Solid Overlay Layer that hides everything except the text */}
                <rect 
                    x="0" 
                    y="0" 
                    width="100%" 
                    height="100%" 
                    className={styles.overlayRect}
                    mask="url(#textMask)" 
                />
            </svg>

            {/* Subheading Overlay */}
            <div className={styles.subheadingContainer}>
                <p className={styles.subheadingText}>
                    Outcomes Are Not Metrics. They Are the Result of Design.
                </p>
            </div>

            <div className={styles.scrollIndicator}>
                Scroll Down &darr;
            </div>
        </section>
    );
};

export default OutcomesHero;
