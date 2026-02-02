"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlurTextAnimation from "./blur-text-animation";
import PointerHighlight from "./pointer-highlight";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  /** Main title text (e.g., "CORE INSIGHT") */
  title: string;
  /** Subtitle text with blur animation */
  subtitle?: string;
  /** Additional class for the container */
  className?: string;
  /** Title font size */
  titleSize?: string;
  /** Subtitle font size */
  subtitleSize?: string;
  /** Whether subtitle should loop animation */
  subtitleLoop?: boolean;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Text color class (default: "text-white") */
  textColor?: string;
  /** Shadow color for subtitle (default: "rgba(255,255,255,") */
  shadowColor?: string;
  /** Disable text shadow for subtitle */
  disableShadow?: boolean;
  /** Subtitle: white card reveal + gradient glow (no blur animation) */
  subtitleRevealWithGlow?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
  titleSize = "text-2xl md:text-4xl lg:text-5xl",
  subtitleSize = "text-2xl md:text-3xl lg:text-4xl",
  subtitleLoop = false,
  align = "left",
  textColor = "text-white",
  shadowColor = "rgba(255,255,255,",
  disableShadow = false,
  subtitleRevealWithGlow = false,
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // White overlay shrinks from left to right (revealing title only)
      tl.to(overlayRef.current, {
        width: "0%",
        duration: 1.2,
        ease: "power3.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  }[align];

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {/* Main Title with White Block Reveal Animation */}
      <div className="relative inline-block">
        {/* The text (always visible) */}
        <div
          ref={titleRef}
          className={`${titleSize} font-bold tracking-[0.1em] uppercase ${textColor} font-[Outfit]`}
        >
          {title}
        </div>

        {/* White overlay that covers text initially, then shrinks to reveal from left */}
        <div
          ref={overlayRef}
          className="absolute top-0 right-0 h-full"
          style={{
            width: "100%",
            backgroundColor: "white", // Keep overlay white as it matches the background usually, or maybe we should make this configurable too? 
            // Actually, if the background is white, a white overlay is invisible. 
            // But the animation is "reveal". If background is white, we don't need a white overlay to hide it?
            // Wait, if background is white and text is black, a white overlay works perfectly to hide the black text.
            // So keeping it white is correct for white backgrounds too.
          }}
        />
      </div>

      {/* Subtitle: PointerHighlight only (no text reveal), or blur animation */}
      {subtitle &&
        (subtitleRevealWithGlow ? (
          <div className="max-w-4xl">
            <div
              className={`${subtitleSize} font-[Outfit] font-light leading-relaxed text-white`}
            >
              {subtitle.includes("Designing It Right") ? (
                <>
                  It Is Improved by{" "}
                  <PointerHighlight
                    rectangleClassName="bg-white/15 border-white/40 rounded-sm"
                    pointerClassName="text-white/90"
                    containerClassName="inline-block"
                  >
                    <span style={{ color: "#000" }}>Designing It Right.</span>
                  </PointerHighlight>
                </>
              ) : (
                subtitle
              )}
            </div>
          </div>
        ) : (
          <BlurTextAnimation
            text={subtitle}
            fontSize={subtitleSize}
            textColor={textColor}
            shadowColor={shadowColor}
            disableShadow={disableShadow}
            loop={subtitleLoop}
            className="max-w-4xl"
          />
        ))}
    </div>
  );
}
