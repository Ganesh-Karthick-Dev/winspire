// src/components/ui/parallax-scrolling.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxComponentProps {
    title?: string;
    backgroundImage?: string;
    middleImage?: string;
    foregroundImage?: string;
}

export function ParallaxComponent({
    title = "Neura AI",
    // Blue sky with clouds - clean background
    backgroundImage = "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2940&auto=format&fit=crop",
    // Clean mountain range
    middleImage = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2940&auto=format&fit=crop",
    // Mountain foreground silhouette
    foregroundImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
}: ParallaxComponentProps) {
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

        if (!triggerElement) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 0%",
                    end: "100% 0%",
                    scrub: 0
                }
            });

            const layers = [
                { layer: "1", yPercent: 70 },
                { layer: "2", yPercent: 55 },
                { layer: "3", yPercent: 40 },
                { layer: "4", yPercent: 10 }
            ];

            layers.forEach((layerObj, idx) => {
                tl.to(
                    triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                    {
                        yPercent: layerObj.yPercent,
                        ease: "none"
                    },
                    idx === 0 ? undefined : "<"
                );
            });
        }, parallaxRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Full viewport parallax hero - matches .hero section structure */}
            <section className="parallax-hero" ref={parallaxRef}>
                <div className="parallax-content">
                    <div data-parallax-layers className="parallax__layers">
                        {/* Layer 1 - Background */}
                        <img
                            src={backgroundImage}
                            loading="eager"
                            data-parallax-layer="1"
                            alt=""
                            className="parallax__layer-img parallax__layer-1"
                        />

                        {/* Layer 2 - Middle */}
                        <img
                            src={middleImage}
                            loading="eager"
                            data-parallax-layer="2"
                            alt=""
                            className="parallax__layer-img parallax__layer-2"
                        />

                        {/* Layer 3 - Title */}
                        <div data-parallax-layer="3" className="parallax__layer-title">
                            <h1 className="parallax__title">{title}</h1>
                        </div>

                        {/* Layer 4 - Foreground */}
                        <img
                            src={foregroundImage}
                            loading="eager"
                            data-parallax-layer="4"
                            alt=""
                            className="parallax__layer-img parallax__layer-4"
                        />
                    </div>
                    <div className="parallax__fade"></div>
                </div>
            </section>

            {/* Scroll space for parallax effect */}
            <div className="parallax-scroll-space"></div>

            <style jsx>{`
                /* Match .hero structure - 16px padding with content inside */
                .parallax-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    padding: 16px;
                    z-index: 10;
                }

                /* Content area - like .hero-content but for parallax */
                .parallax-content {
                    flex: 1;
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                }

                .parallax__layers {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .parallax__layer-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 120%;
                    object-fit: cover;
                    object-position: center;
                }

                .parallax__layer-1 {
                    z-index: 1;
                }

                .parallax__layer-2 {
                    z-index: 2;
                    mask-image: linear-gradient(to top, transparent 0%, black 30%, black 100%);
                    -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%, black 100%);
                }

                .parallax__layer-title {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* Dark overlay behind text for visibility */
                    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%);
                }

                .parallax__title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(5rem, 18vw, 16rem);
                    font-weight: 800;
                    color: white;
                    line-height: 1;
                    margin: 0;
                    text-align: center;
                    letter-spacing: -0.02em;
                    /* Stronger shadow for visibility */
                    text-shadow: 
                        0 4px 30px rgba(0, 0, 0, 0.8),
                        0 2px 10px rgba(0, 0, 0, 0.6),
                        0 0 60px rgba(0, 0, 0, 0.4);
                }

                .parallax__layer-4 {
                    z-index: 4;
                    mask-image: linear-gradient(to top, black 0%, black 40%, transparent 70%);
                    -webkit-mask-image: linear-gradient(to top, black 0%, black 40%, transparent 70%);
                }

                .parallax__fade {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 150px;
                    background: linear-gradient(to top, rgba(10, 10, 26, 1) 0%, transparent 100%);
                    pointer-events: none;
                    z-index: 10;
                }

                /* Extra scroll space for parallax scroll effect */
                .parallax-scroll-space {
                    height: 100vh;
                    position: relative;
                }

                @media (max-width: 1024px) {
                    .parallax-hero {
                        padding: 12px;
                    }
                }

                @media (max-width: 768px) {
                    .parallax-hero {
                        padding: 8px;
                    }

                    .parallax-content {
                        border-radius: 18px;
                    }

                    .parallax__title {
                        font-size: clamp(3rem, 15vw, 6rem);
                    }
                }

                @media (max-width: 480px) {
                    .parallax-hero {
                        padding: 6px;
                    }

                    .parallax-content {
                        border-radius: 16px;
                    }
                }
            `}</style>
        </>
    );
}
