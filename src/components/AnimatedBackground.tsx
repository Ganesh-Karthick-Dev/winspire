/**
 * Animated Background Component
 * 
 * Soft blue gradient with color animation
 * Pure CSS, GPU-friendly, performance-optimized
 */

import { memo } from 'react';

function AnimatedBackground() {
    return (
        <>
            <div className="animated-bg" aria-hidden="true">
                {/* Two gradient layers for color morphing */}
                <div className="gradient-layer layer-1" />
                <div className="gradient-layer layer-2" />
            </div>

            <style jsx>{`
                /* ============================================
                   Main Container
                   ============================================ */
                .animated-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                    overflow: hidden;
                }

                /* ============================================
                   Gradient Layers - Stacked for color morph
                   ============================================ */
                .gradient-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    will-change: opacity;
                }

                /* Layer 1: Sky blue tones */
                .layer-1 {
                    background: radial-gradient(
                        ellipse 90% 70% at 50% 40%,
                        #a8d4f5 0%,
                        #6ba3d6 45%,
                        #2c5282 100%
                    );
                    animation: colorPulse1 12s ease-in-out infinite;
                }

                /* Layer 2: Warmer blue tones (shifts to purple hints) */
                .layer-2 {
                    background: radial-gradient(
                        ellipse 85% 75% at 55% 45%,
                        #b8d8f8 0%,
                        #5a8fc4 40%,
                        #1e3a5f 100%
                    );
                    animation: colorPulse2 12s ease-in-out infinite;
                }

                /* ============================================
                   Color Animation - Opacity crossfade (GPU-only)
                   ============================================ */
                @keyframes colorPulse1 {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }

                @keyframes colorPulse2 {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                /* ============================================
                   Reduced Motion - Accessibility
                   ============================================ */
                @media (prefers-reduced-motion: reduce) {
                    .layer-1, .layer-2 {
                        animation: none;
                    }
                    .layer-1 {
                        opacity: 1;
                    }
                    .layer-2 {
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}

export default memo(AnimatedBackground);
