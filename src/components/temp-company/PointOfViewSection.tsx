/**
 * Our Point of View Section Component for Temp Company Page
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

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen z-20 flex bg-[#0f172a] !p-0"
        >
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                {/* Left: Image (Full Bleed, No Padding) */}
                <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen order-1">
                     <img 
                        src="/images/company-page/business-people-shaking-hands-congratulations-work-success.webp" 
                        alt="Leadership Design" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
                        loading="lazy"
                    />
                </div>

                {/* Right: Content (Fixed Layout with Inline Styles) */}
                <div className="w-full lg:w-1/2 flex flex-col bg-[#0f172a] lg:order-2 min-h-screen">
                    <div 
                        className="w-full flex flex-col justify-center"
                        style={{ 
                            padding: '50px', 
                            paddingTop: '200px',
                            paddingRight: '80px' // Extra space for large screens
                        }}
                    >
                        <div className="w-full max-w-2xl flex flex-col gap-12 mx-auto">
                            <span className="text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase opacity-60">
                                Our Point of View
                            </span>
                            
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
                                Leadership Design <br/> 
                                Comes Before Execution
                            </h2>
                            
                            <p className="text-slate-300 text-xl md:text-2xl leading-[1.6] font-light">
                                After years of managing and transforming complex revenue cycles, one truth became clear:
                            </p>
                            
                            <div className="relative">
                                <p className="text-white text-2xl md:text-3xl lg:text-4xl font-extralight italic border-l-4 border-cyan-400 pl-10 py-6 bg-white/[0.02] leading-relaxed">
                                    People do not fail. <br/>
                                    <span className="font-bold text-cyan-400 not-italic">Poorly designed systems do.</span>
                                </p>
                            </div>
                            
                            <div className="space-y-8">
                                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-4">
                                    The Sequence for Success:
                                </p>
                                
                                <ul className="space-y-6 text-white">
                                    <li className="flex items-center gap-6">
                                        <span className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xl font-black flex-shrink-0">1</span>
                                        <span className="text-xl md:text-2xl font-bold leading-tight tracking-tight">Defining the outcomes that truly matter</span>
                                    </li>
                                    <li className="flex items-center gap-6">
                                        <span className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xl font-black flex-shrink-0">2</span>
                                        <span className="text-xl md:text-2xl font-bold leading-tight tracking-tight">Designing the structure that supports those outcomes</span>
                                    </li>
                                    <li className="flex items-center gap-6">
                                        <span className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xl font-black flex-shrink-0">3</span>
                                        <span className="text-xl md:text-2xl font-bold leading-tight tracking-tight">Executing with clarity, discipline, and accountability</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="pt-10 border-t border-white/10 mt-4">
                                <p className="text-slate-500 text-xl font-light italic leading-relaxed">
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
