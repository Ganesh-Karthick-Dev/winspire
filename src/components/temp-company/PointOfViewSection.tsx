/**
 * Our Point of View Section Component for Temp Company Page
 * Fixed: Explicit dark text colors using inline styles to override global white-text.
 * Performance: Optimized parallax for smooth scrolling.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PointOfViewSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax Effect
            if (containerRef.current && imageRef.current) {
                gsap.set(imageRef.current, { scale: 1.15, yPercent: -10 });
                
                gsap.to(imageRef.current, {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5 // Smoother scrubbing
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen z-20 flex bg-white !p-0 overflow-hidden"
        >
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                {/* Left: Image (Full Bleed, High Quality Color, Parallax) */}
                <div ref={containerRef} className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen order-1 overflow-hidden">
                     <img 
                        ref={imageRef}
                        src="/images/company-page/business-people-shaking-hands-congratulations-work-success.webp" 
                        alt="Leadership Design" 
                        className="absolute inset-0 w-full h-[120%] object-cover opacity-100 will-change-transform"
                        loading="lazy"
                    />
                </div>

                {/* Right: Content (High-Contrast Text via Inline Styles) */}
                <div className="w-full lg:w-1/2 flex flex-col bg-slate-50 lg:order-2 min-h-screen border-l border-slate-200">
                    <div 
                        className="w-full flex flex-col justify-center"
                        style={{ 
                            padding: '60px', 
                            paddingTop: '180px',
                            paddingRight: '80px' 
                        }}
                    >
                        <div className="w-full max-w-2xl flex flex-col gap-10 mx-auto">
                            <span 
                                className="text-xs font-black tracking-[0.4em] uppercase"
                                style={{ color: '#2563eb' }}
                            >
                                Our Point of View
                            </span>
                            
                            <h2 
                                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.1] tracking-tighter"
                                style={{ color: '#0f172a' }}
                            >
                                Leadership Design <br/> 
                                Comes Before <span style={{ color: '#2563eb' }}>Execution</span>
                            </h2>
                            
                            <p 
                                className="text-lg md:text-xl leading-relaxed font-semibold opacity-90"
                                style={{ color: '#334155' }}
                            >
                                After years of managing and transforming complex revenue cycles, one truth became clear:
                            </p>
                            
                            <div className="relative">
                                <p 
                                    className="text-xl md:text-2xl lg:text-3xl font-light italic border-l-8 border-blue-600 pl-10 py-8 bg-blue-100/40 leading-relaxed shadow-sm rounded-r-lg"
                                    style={{ color: '#0f172a' }}
                                >
                                    People do not fail. <br/>
                                    <span className="font-black not-italic" style={{ color: '#1d4ed8' }}>
                                        Poorly designed systems do.
                                    </span>
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                <p 
                                    className="text-[11px] font-black tracking-widest uppercase mb-2"
                                    style={{ color: '#64748b' }}
                                >
                                    The Sequence for Success:
                                </p>
                                
                                <ul className="space-y-4">
                                    {[
                                        "Defining the outcomes that truly matter",
                                        "Designing the structure that supports those outcomes",
                                        "Executing with clarity, discipline, and accountability"
                                    ].map((text, idx) => (
                                        <li key={idx} className="flex items-start gap-5">
                                            <span 
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black flex-shrink-0 shadow-md"
                                                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                                            >
                                                {idx + 1}
                                            </span>
                                            <span 
                                                className="text-xl font-bold pt-1.5"
                                                style={{ color: '#1e293b' }}
                                            >
                                                {text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="pt-8 border-t border-slate-300 mt-2">
                                <p 
                                    className="text-lg md:text-xl font-bold italic leading-relaxed"
                                    style={{ color: '#475569' }}
                                >
                                    When this sequence is respected, teams perform better, leaders regain control, and results follow naturally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
