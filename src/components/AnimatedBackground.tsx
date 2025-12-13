/**
 * Animated Background Component
 * 
 * Soft blue gradient with gentle floating animation
 * Pure CSS, GPU-friendly, performance-optimized
 */

import { memo } from 'react';

function AnimatedBackground() {
    return (
        <>
            <div className="animated-bg" aria-hidden="true" />

            <style jsx>{`
                /* ============================================
                   CSS Variables for easy customization
                   ============================================ */
                .animated-bg {
                    --bg-light: #a8d4f5;      /* Sky blue center */
                    --bg-mid: #6ba3d6;        /* Mid blue */
                    --bg-dark: #2c5282;       /* Darker blue edges */
                    --animation-duration: 20s;
                }

                /* ============================================
                   Main Background Layer
                   ============================================ */
                .animated-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                    
                    /* Base gradient - darker edges, lighter center */
                    background: 
                        radial-gradient(
                            ellipse 80% 60% at 50% 40%,
                            var(--bg-light) 0%,
                            var(--bg-mid) 50%,
                            var(--bg-dark) 100%
                        );
                    
                    /* GPU acceleration */
                    will-change: transform;
                    transform: translateZ(0);
                }

                /* ============================================
                   Floating Glow Overlay (using pseudo-element)
                   ============================================ */
                .animated-bg::before {
                    content: '';
                    position: absolute;
                    top: -20%;
                    left: -20%;
                    width: 140%;
                    height: 140%;
                    
                    /* Soft glow gradient */
                    background: 
                        radial-gradient(
                            ellipse 50% 40% at 30% 30%,
                            rgba(168, 212, 245, 0.4) 0%,
                            transparent 60%
                        ),
                        radial-gradient(
                            ellipse 40% 50% at 70% 60%,
                            rgba(107, 163, 214, 0.3) 0%,
                            transparent 50%
                        );
                    
                    /* GPU-friendly animation */
                    animation: drift var(--animation-duration) ease-in-out infinite;
                    will-change: transform;
                    transform: translateZ(0);
                }

                /* ============================================
                   Keyframe Animation - Transform only for GPU
                   ============================================ */
                @keyframes drift {
                    0%, 100% {
                        transform: translate(0%, 0%) scale(1);
                    }
                    25% {
                        transform: translate(3%, 2%) scale(1.02);
                    }
                    50% {
                        transform: translate(-2%, 4%) scale(1);
                    }
                    75% {
                        transform: translate(-3%, -2%) scale(1.01);
                    }
                }

                /* ============================================
                   Reduced Motion - Accessibility
                   ============================================ */
                @media (prefers-reduced-motion: reduce) {
                    .animated-bg::before {
                        animation: none;
                    }
                }
            `}</style>
        </>
    );
}

/* Memoize to prevent unnecessary re-renders */
export default memo(AnimatedBackground);
