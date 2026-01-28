/**
 * How We Work Section Component for Temp Company Page
 * 
 * Redesigned: Bento Grid style.
 * clean glass panels, icon-centric, minimal.
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

            gsap.utils.toArray('.bento-card').forEach((card: any, i) => {
                 gsap.fromTo(card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                 );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen z-20 flex bg-[#0f172a] !p-0"
        >
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                 {/* Left: Content (Full Bleed, Guaranteed Gutter Wrapper) */}
                <div className="w-full lg:w-1/2 flex flex-col bg-[#0f172a] lg:order-1 min-h-screen">
                    <div 
                        className="w-full flex flex-col justify-center"
                        style={{ 
                            padding: '50px', 
                            paddingTop: '200px',
                            paddingLeft: '80px' // Extra space for large screens
                        }}
                    >
                        <div className="w-full max-w-2xl flex flex-col gap-12 mx-auto">
                            <div>
                                <span className="text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase opacity-60">How We Work</span>
                                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter mt-4">
                                    An Internal <br/> Revenue Function <br/>
                                    <span className="text-slate-500 font-light">by Design.</span>
                                </h2>
                            </div>

                            {/* Integration */}
                            <div className="group">
                                <h3 className="text-2xl md:text-3xl text-white font-bold mb-4 flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                                        <FaHandshake className="text-2xl" />
                                    </div>
                                    Not an external vendor.
                                </h3>
                                <p className="text-slate-300 text-xl md:text-2xl leading-[1.6] pl-1 lg:pl-18 font-light max-w-3xl">
                                    We do not operate like an external vendor. We work as an extension of your organization.
                                    Our teams integrate into your workflows, align with leadership priorities, and take ownership of revenue outcomes from end to end.
                                </p>
                            </div>

                            {/* Ownership */}
                            <div className="group">
                                 <h3 className="text-2xl md:text-3xl text-white font-bold mb-4 flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                                        <FaChartPie className="text-2xl" />
                                    </div>
                                    Outcome Ownership
                                 </h3>
                                <p className="text-slate-300 text-xl md:text-2xl leading-[1.6] pl-1 lg:pl-18 font-light max-w-3xl">
                                    We do not just run processes. We help organizations regain confidence in their revenue cycle.
                                </p>
                            </div>

                            {/* Checklist */}
                            <div className="pt-10 border-t border-white/10">
                                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-6">What clients experience:</h3>
                                
                                <div className="space-y-6">
                                    {[
                                        'Clear accountability at every level', 
                                        'Real-time visibility into performance', 
                                        'Calm, structured execution'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6">
                                            <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                                                 <FaCheck className="text-black text-xs" />
                                            </div>
                                            <span className="text-white text-xl md:text-2xl font-medium tracking-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-6 mt-4">
                                 <p className="text-slate-500 text-xl italic font-light leading-relaxed">
                                    No surprises and no guesswork.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Image (Full Bleed, No Padding) */}
                 <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen lg:order-2">
                     <img 
                        src="/images/company-page/iso-standards-quality-control-businessman-hold-virtual-globe-with-quality-assurance-guarantee-product-iso-standard-certification-modern-iso-banner.webp" 
                        alt="How We Work" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
