import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        container.innerHTML = '';

        const ctx = gsap.context(() => {
            // REDUCED COUNT for performance (400 -> 100)
            // 100 is plenty with good visibility
            const particleCount = 100;
            const containerWidth = container.offsetWidth || window.innerWidth;

            // Pre-defined SVG Star Data URI (Lightweight, no clip-path calc)
            // Simple white star
            const starSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E")`;

            for (let i = 0; i < particleCount; i++) {
                const star = document.createElement('div');

                const size = Math.random() * 8 + 4; // Slightly larger to compensate for no glow (4-12px)
                const startX = Math.random() * containerWidth;

                Object.assign(star.style, {
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: '0px',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundImage: starSvg,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    opacity: Math.random() * 0.6 + 0.2 + '', // 0.2 - 0.8
                    zIndex: 0,
                    pointerEvents: 'none',
                    willChange: 'transform', // Performance hint
                    // Slight blur for soft "glow" look without heavy drop-shadow
                    filter: 'blur(1.5px)',
                });

                gsap.set(star, { x: startX });
                container.appendChild(star);

                const duration = Math.random() * 30 + 30; // 30-60s

                gsap.to(star, {
                    x: `+=${containerWidth}`,
                    rotation: `+=${Math.random() * 360}`,
                    duration: duration,
                    repeat: -1,
                    ease: "none",
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % containerWidth)
                    }
                });

                // Subtle y-axis movement
                gsap.to(star, {
                    y: '+=10',
                    duration: Math.random() * 3 + 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="hero-particles"
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                zIndex: 0
            }}
            aria-hidden="true"
        />
    );
}
