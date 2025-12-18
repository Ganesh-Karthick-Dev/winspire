/**
 * AboutSection Component
 * 
 * Matches the "Style Port" reference design:
 * - Empty transition space at the top (for 3D model focus)
 * - "About Us" label pinned top-left
 * - Large headline reveals from bottom on scroll
 * - All text on left side, leaving right side for 3D model
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // "About Us" label fades in when entering the section
            gsap.fromTo(labelRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Headline slides up and fades in (like the reference)
            gsap.fromTo(headlineRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 40%', // Headline appears later in scroll
                        toggleActions: 'play none none reverse',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* === TRANSITION SPACER === */}
            {/* Empty space where only the 3D model is visible (user adjusts manually) */}
            <section
                id="transition-zone"
                className="h-[100vh] relative"
                aria-hidden="true"
            >
                {/* This is intentionally empty - just scroll space for 3D animation */}
            </section>

            {/* === ABOUT US SECTION === */}
            <section
                id="about"
                ref={sectionRef}
                className="min-h-screen relative flex flex-col justify-between py-20 px-8 md:px-16 lg:px-24"
            >
                {/* Top Left: "About Us" Label */}
                <div ref={labelRef} className="flex flex-col gap-1 max-w-md">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/60 rounded-full" />
                        <h2 className="text-white text-lg md:text-xl font-bold tracking-[0.15em] font-[Outfit]">
                            About Us
                        </h2>
                    </div>
                    <span className="text-white/50 text-xs md:text-sm font-[Outfit] tracking-wider ml-5">
                        Establish New Standards
                    </span>
                </div>

                {/* Bottom Center: Large Headline */}
                <div ref={headlineRef} className="mt-auto w-full text-center">
                    <h3 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1.15] font-[Outfit]">
                        Rebuilding the Society
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
                            through Digital Twins
                        </span>
                    </h3>
                </div>

                {/* Right side remains empty for 3D model space */}
            </section>
        </>
    );
}
