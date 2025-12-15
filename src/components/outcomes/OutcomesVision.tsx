'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OutcomesVision() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const finalTextRef = useRef<HTMLDivElement>(null);
    const topLeftTextRef = useRef<HTMLDivElement>(null);
    const topRightTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const textContainer = textContainerRef.current;
        const words = wordsRef.current;
        const finalText = finalTextRef.current;
        const topLeftText = topLeftTextRef.current;
        const topRightText = topRightTextRef.current;

        if (!section || !image || !textContainer || !finalText || !topLeftText || !topRightText) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=600%', // Longer scroll for multiple text changes
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // 1. Image Expansion (Runs concurrently with text changes)
            // Expands slowly over most of the timeline (0 to 8)
            tl.to(image, {
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                ease: 'power1.inOut',
                duration: 8,
            }, 0);

            // Fade out outer text as image expands (so they don't appear inside)
            tl.to([topLeftText, topRightText], { opacity: 0, duration: 1, ease: 'power1.inOut' }, 0.5);

            // 2. Text Cycling (Happens DURING image expansion)
            // Initial state: Word 0 (workflow) is visible

            // Word 0 -> Word 1 (individual) at t=2
            tl.to(words[0], { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 2)
                .to(words[1], { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 2.5);

            // Word 1 -> Word 2 (claim) at t=4
            tl.to(words[1], { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 4)
                .to(words[2], { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 4.5);

            // Word 2 -> Word 3 (dollar) at t=6
            tl.to(words[2], { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 6)
                .to(words[3], { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 6.5);

            // 3. Final Transition (After image is fully expanded)
            // Fade out "Every..." container
            tl.to(textContainer, { opacity: 0, duration: 1, ease: 'power1.inOut' }, 8);

            // Fade in Final Text
            tl.to(finalText, { opacity: 1, duration: 1, ease: 'power1.inOut' }, 8.5);

            // Ensure timeline covers the full scroll distance
            tl.duration(10);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const wordList = ['workflow', 'individual', 'claim', 'dollar'];

    return (
        <section ref={sectionRef} className="relative h-screen bg-[#FDFBF7] overflow-hidden">
            <div className="relative w-full h-full flex flex-col items-center justify-center">

                {/* Top Left Text */}
                <div ref={topLeftTextRef} className="absolute top-8 left-8 z-20">
                    <span className="text-xl md:text-2xl font-semibold tracking-wide !text-black" style={{ color: 'black' }}>Winspire RCM + Neura AI</span>
                </div>

                {/* Top Right Text */}
                <div ref={topRightTextRef} className="absolute top-8 right-8 z-20 max-w-xl text-right">
                    <h2 className="text-4xl md:text-6xl font-sans font-bold leading-tight !text-black" style={{ color: 'black' }}>
                        Measurable Outcomes That <br />
                        <span className="">Redefine Revenue</span> Performance.
                    </h2>
                </div>

                {/* Central Image Container */}
                <div
                    ref={imageRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32vw] h-[37vh] rounded-3xl overflow-hidden shadow-2xl z-10"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                        alt="Outcomes Vision"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay for text readability when full screen */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Center Text Overlay (Changing) */}
                <div
                    ref={textContainerRef}
                    className="absolute z-30 text-center text-white mix-blend-difference flex flex-col items-center justify-center"
                >
                    <h3 className="text-6xl md:text-8xl font-bold tracking-tighter flex items-center gap-4">
                        Every
                        <span className="relative inline-block w-[400px] text-left">
                            {wordList.map((word, index) => (
                                <span
                                    key={word}
                                    ref={(el) => { wordsRef.current[index] = el; }}
                                    className={`absolute top-1/2 -translate-y-1/2 left-0 font-sans transition-opacity duration-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>
                    </h3>
                </div>

                {/* Final Text (Initially Hidden) */}
                <div ref={finalTextRef} className="absolute z-30 text-center text-white opacity-0 max-w-4xl px-4">
                    <h3 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        So here you reach every dollar
                    </h3>
                    <p className="text-2xl md:text-3xl font-light tracking-wide text-blue-200">
                        moves faster and cleaner with neura ai
                    </p>
                </div>

            </div>
        </section>
    );
}
