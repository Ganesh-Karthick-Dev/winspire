/**
 * How We Work Section Component for Temp Company Page
 * Fixed: Explicit dark text colors using inline styles to override global white-text.
 * Performance: Optimized parallax for smooth scrolling.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHandshake, FaChartPie, FaCheck } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeWorkSection() {
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
                 {/* Left: Content (Fixed Dark Text Color) */}
                <div className="w-full lg:w-1/2 flex flex-col bg-slate-50 lg:order-1 min-h-screen border-r border-slate-200">
                    <div 
                        className="w-full flex flex-col justify-center"
                        style={{ 
                            padding: '60px', 
                            paddingTop: '180px',
                            paddingLeft: '80px' 
                        }}
                    >
                        <div className="w-full max-w-2xl flex flex-col gap-10 mx-auto">
                            <div>
                                <span 
                                    className="text-xs font-black tracking-[0.4em] uppercase"
                                    style={{ color: '#2563eb' }}
                                >
                                    How We Work
                                </span>
                                 <h2 
                                    className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter mt-4"
                                    style={{ color: '#0f172a' }}
                                >
                                    An Internal <br/> Revenue Function <br/>
                                    <span style={{ color: '#2563eb' }}>by Design.</span>
                                </h2>
                            </div>

                            {/* Integration */}
                            <div className="group">
                                <h3 
                                    className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-5"
                                    style={{ color: '#0f172a' }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all shadow-sm">
                                        <FaHandshake className="text-3xl" />
                                    </div>
                                    Not an external vendor.
                                </h3>
                                <p 
                                    className="text-lg md:text-xl leading-relaxed font-semibold max-w-2xl"
                                    style={{ color: '#334155' }}
                                >
                                    We do not operate like an external vendor. We work as an extension of your organization—integrating into your workflows and taking full ownership of outcomes.
                                </p>
                            </div>

                            {/* Ownership */}
                            <div className="group">
                                 <h3 
                                    className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-5"
                                    style={{ color: '#0f172a' }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all shadow-sm">
                                        <FaChartPie className="text-3xl" />
                                    </div>
                                    Outcome Ownership
                                 </h3>
                                <p 
                                    className="text-lg md:text-xl leading-relaxed font-semibold max-w-2xl"
                                    style={{ color: '#334155' }}
                                >
                                    We do not just run processes. We help organizations regain confidence in their revenue cycle through accountability and transparency.
                                </p>
                            </div>

                            {/* Checklist */}
                            <div className="pt-10 border-t border-slate-300">
                                <h3 
                                    className="text-sm font-black uppercase tracking-widest mb-8"
                                    style={{ color: '#64748b' }}
                                >
                                    What clients experience:
                                </h3>
                                
                                <div className="space-y-5">
                                    {[
                                        'Clear accountability at every level', 
                                        'Real-time visibility into performance', 
                                        'Calm, structured execution'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-5">
                                            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 shadow-md">
                                                 <FaCheck className="text-white text-sm" />
                                            </div>
                                            <span 
                                                className="text-xl md:text-2xl font-black"
                                                style={{ color: '#1e293b' }}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-8 mt-2">
                                 <p 
                                    className="text-lg md:text-xl italic font-bold leading-relaxed"
                                    style={{ color: '#475569' }}
                                >
                                    No surprises and no guesswork.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Image (Full Bleed, High Quality Color, Parallax) */}
                 <div ref={containerRef} className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen lg:order-2 overflow-hidden">
                     <img 
                        ref={imageRef}
                        src="/images/company-page/iso-standards-quality-control-businessman-hold-virtual-globe-with-quality-assurance-guarantee-product-iso-standard-certification-modern-iso-banner.webp" 
                        alt="How We Work" 
                        className="absolute inset-0 w-full h-[120%] object-cover opacity-100 will-change-transform"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
