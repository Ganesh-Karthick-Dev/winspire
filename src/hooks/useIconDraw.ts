
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export function useIconDraw(options: {
    start?: string;
    strokeColor?: string;
    duration?: number;
    stagger?: number;
} = {}) {
    // We type this as a generic HTMLElement or SVGSVGElement since it can be attached to a div wrapper or the SVG directly
    const ref = useRef<any>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Register ScrollTrigger within the effect to ensure it's available
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Select all possible drawing elements inside the container
            const targets = element.querySelectorAll("path, circle, rect, line, polyline, polygon");
            
            if (targets.length === 0) return;

            // Set initial state: fully hidden stroke
            gsap.set(targets, {
                strokeDasharray: (i: number, target: SVGGeometryElement) => {
                    try {
                        return target.getTotalLength();
                    } catch (e) {
                         // Fallback for shapes where getTotalLength might not work or if not rendered yet
                        return 1000;
                    }
                },
                strokeDashoffset: (i: number, target: SVGGeometryElement) => {
                     try {
                        return target.getTotalLength();
                    } catch (e) {
                        return 1000;
                    }
                },
                visibility: "visible", // Ensure they are visible so we can see the stroke
                fillOpacity: 0, // Should be 0 initially if we want to draw stroke first, or keep existing fill logic? 
                                // Ideally for "draw" effect, fill comes in AFTER draw or we just animate stroke.
                                // Let's keep fill as is for now, but maybe animate it in.
            });
            
             // Optional: If we want to hide fill initially and fade it in
            gsap.set(targets, { fillOpacity: 0 });


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: options.start || "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate stroke buffer
            tl.to(targets, {
                strokeDashoffset: 0,
                duration: options.duration || 0.8,
                ease: "power2.out",
                stagger: options.stagger || 0.05
            });
            
            // Fade in fill after stroke starts drawing (or overlaps slightly)
            tl.to(targets, {
                fillOpacity: 1, // Restore original fill (if any)
                duration: 0.4,
                ease: "power2.in"
            }, ">-0.6"); // Start slightly before stroke finishes

        }, element); // Scope to the element

        return () => ctx.revert();
    }, [options.duration, options.stagger, options.start]);

    return ref;
}
