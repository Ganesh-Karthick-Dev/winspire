"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  imageSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  maxScale?: number; // Added maxScale
  children?: React.ReactNode;
}

export function VideoScrollHero({
  videoSrc,
  imageSrc = "/poster/qefqe.webp",
  enableAnimations = true,
  className = "",
  startScale = 0.4,
  maxScale = 0.8, // Default max scale 80%
  children,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on container position
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      // Scale from startScale to maxScale
      const newScale = startScale + (progress * (maxScale - startScale));
      setScrollScale(newScale);

      // Fade out overlay content as we scale
      setOpacity(1 - progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Hero Section with Video/Image */}
      <div
        ref={containerRef}
        className="relative h-[200vh]"
      >
        {/* Fixed Container */}
        <div className="sticky top-0 w-full h-screen flex items-center justify-center z-10">
          <div
            className="relative flex items-center justify-center will-change-transform translate-y-35"
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : 'scale(1)',
              width: '100vw',
              height: '100vh',
              transformOrigin: "center center",
            }}
          >
            {videoSrc ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover shadow-2xl rounded-3xl"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(26,90,140,0.4)] bg-gradient-to-br from-[#5aa5e8] via-[#3d8bd4] to-[#2a6eb8]">
                    <img 
                        src={imageSrc} 
                        alt="Hero"
                        className="w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                    {/* Premium Label Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="mb-6 scale-150">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 5C11.7 5 5 11.7 5 20C5 28.3 11.7 35 20 35C28.3 35 35 28.3 35 20C35 11.7 28.3 5 20 5ZM20 32C13.4 32 8 26.6 8 20C8 13.4 13.4 8 20 8C26.6 8 32 13.4 32 20C32 26.6 26.6 32 20 32Z" fill="white"/>
                                <path d="M20 12C15.6 12 12 15.6 12 20C12 24.4 15.6 28 20 28C24.4 28 28 24.4 28 20C28 15.6 24.4 12 20 12ZM20 25C17.2 25 15 22.8 15 20C15 17.2 17.2 15 20 15C22.8 15 25 17.2 25 20C25 22.8 22.8 25 20 25Z" fill="white"/>
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Winspire RCM</h2>
                    </div>
                </div>
            )}

            {/* Video Overlay Content */}
            {children && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl pointer-events-none"
                    style={{ opacity }}
                >
                    {children}
                </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
