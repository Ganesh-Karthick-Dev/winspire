/**
 * Why We Exist Section Component for Temp Company Page
 * 
 * Redesigned: Clean split layout with structured typography.
 * Professional, high-contrast, no visual noise.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWeExistSection() {
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
                    },
                }
            );
            
            gsap.utils.toArray('.stat-line').forEach((line: any) => {
                 gsap.fromTo(line,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                 );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { num: '01', title: "Define Outcomes", desc: "Identify what truly matters." },
        { num: '02', title: "Structure Design", desc: "Build the support framework." },
        { num: '03', title: "Disciplined Execution", desc: "Operate with clarity." },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 z-20"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left: Heading & Context */}
                    <div className="space-y-12">
                        <div>
                           <span className="text-xs font-bold tracking-[0.2em] text-sky-500 uppercase mb-4 block">Why We Exist</span>
                           <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-8">
                               Because RCM Was Never Meant to Be <br/>
                               <span className="text-slate-400 font-light">Reactive.</span>
                           </h2>
                           <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                               In many healthcare organizations, revenue problems only become visible after damage is done—when denials increase, AR ages, or cash flow tightens.
                           </p>
                        </div>
                        
                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
                            <h4 className="text-white font-medium mb-2">The Reality</h4>
                            <p className="text-sm text-slate-400">
                                From experience, we know this reactive approach creates pressure, not stability.
                            </p>
                        </div>
                    </div>

                    {/* Right: The Method */}
                    <div className="flex flex-col justify-center space-y-8">
                        <h3 className="text-lg font-medium text-white">Intentional Design</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            True revenue performance is shaped long before claims are submitted. It is determined by how leadership designs structure, accountability, and intelligence at the top.
                        </p>
                        <div className="p-8 bg-sky-500/10 border border-sky-500/20 rounded-sm mt-8">
                            <p className="text-white font-medium">
                                Winspire was created to help organizations move from reactive execution to intentional design so revenue performance becomes predictable instead of stressful.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
