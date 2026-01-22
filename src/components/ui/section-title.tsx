"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlurTextAnimation from "./blur-text-animation";

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
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
  titleSize = "text-2xl md:text-4xl lg:text-5xl",
  subtitleSize = "text-2xl md:text-3xl lg:text-4xl",
  subtitleLoop = false,
  align = "left"
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

      // White overlay shrinks from left to right (revealing white text)
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
        {/* The white text (always visible) */}
        <div
          ref={titleRef}
          className={`${titleSize} font-bold tracking-[0.1em] uppercase text-white font-[Outfit]`}
        >
          {title}
        </div>

        {/* White overlay that covers text initially, then shrinks to reveal from left */}
        <div
          ref={overlayRef}
          className="absolute top-0 right-0 h-full"
          style={{
            width: "100%",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* Subtitle with Blur Animation */}
      {subtitle && (
        <BlurTextAnimation
          text={subtitle}
          fontSize={subtitleSize}
          textColor="text-white"
          loop={subtitleLoop}
          className="max-w-4xl"
        />
      )}
    </div>
  );
}
