/**
 * Animated Background Component
 * 
 * Uses external SVG background for better performance.
 */

import { memo } from 'react';

function AnimatedBackground() {
    return (
        <div className="animated-bg-container" aria-hidden="true">
            <img
                src="/svg/landing_hero/Neura Bg.svg"
                alt=""
                className="animated-gradient-svg"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            />
        </div>
    );
}

export default memo(AnimatedBackground);
