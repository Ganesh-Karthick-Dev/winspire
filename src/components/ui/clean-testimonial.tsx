"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote: "For the first time, our revenue cycle feels predictable and under control.",
    author: "Sarah Chen",
    role: "CFO",
    company: "Specialty Practice",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Winspire redesigned how we operate—not just our numbers.",
    author: "Marcus Webb",
    role: "CEO",
    company: "Healthcare Network",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "The attention to detail is unmatched. Every interaction feels intentional.",
    author: "Elena Frost",
    role: "Head of Operations",
    company: "Regional Hospital",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
]

function usePreloadImages(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])
}

function SplitText({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <span className="split-text-container">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="split-word"
        >
          {word}
        </motion.span>
      ))}
      <style jsx>{`
        .split-text-container {
          display: inline;
        }
        :global(.split-word) {
          display: inline-block;
          margin-right: 0.25em;
        }
      `}</style>
    </span>
  )
}

export function CleanTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  usePreloadImages(testimonials.map((t) => t.avatar))

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <div
      ref={containerRef}
      className="testimonial-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNext}
    >
      {/* Custom magnetic cursor */}
      <motion.div
        className="testimonial-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="cursor-circle"
          animate={{
            width: isHovered ? 80 : 0,
            height: isHovered ? 80 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          <motion.span
            className="cursor-text"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            Next
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Floating index indicator */}
      <motion.div
        className="index-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="current-index"
          key={activeIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
        <span className="separator">/</span>
        <span className="total">{String(testimonials.length).padStart(2, "0")}</span>
      </motion.div>

      {/* Stacked avatar previews for other testimonials */}
      <motion.div
        className="avatar-stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6 }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`avatar-preview ${i === activeIndex ? 'active' : ''}`}
            whileHover={{ scale: 1.1, opacity: 1 }}
          >
            <img src={t.avatar} alt={t.author} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="testimonial-content">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="quote-text"
          >
            <SplitText text={`"${currentTestimonial.quote}"`} />
          </motion.blockquote>
        </AnimatePresence>

        {/* Author with reveal line */}
        <motion.div className="author-section" layout>
          <div className="author-row">
            {/* Avatar container with all images stacked */}
            <div className="avatar-main">
              <motion.div
                className="avatar-ring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {testimonials.map((t, i) => (
                <motion.img
                  key={t.avatar}
                  src={t.avatar}
                  alt={t.author}
                  className="avatar-image"
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    zIndex: i === activeIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Author info with accent line */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="author-info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="accent-line"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="author-name">
                  {currentTestimonial.author}
                </span>
                <span className="author-role">
                  {currentTestimonial.role} — {currentTestimonial.company}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Keyboard hint */}
      <motion.div
        className="click-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <span>Click anywhere</span>
      </motion.div>

      <style jsx>{`
        .testimonial-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 5rem 2rem;
          cursor: none;
        }

        :global(.testimonial-cursor) {
          pointer-events: none;
          position: absolute;
          z-index: 50;
          mix-blend-mode: difference;
        }

        :global(.cursor-circle) {
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.cursor-text) {
          color: #0f172a;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        :global(.index-indicator) {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          font-family: monospace;
          font-size: 0.75rem;
        }

        :global(.current-index) {
          font-size: 1.5rem;
          font-weight: 300;
          color: #60a5fa;
        }

        .separator, .total {
          color: rgba(255, 255, 255, 0.4);
        }

        :global(.avatar-stack) {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
        }

        :global(.avatar-preview) {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 2px solid rgba(15, 23, 42, 0.8);
          overflow: hidden;
          margin-left: -0.5rem;
          filter: grayscale(1);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        :global(.avatar-preview:first-child) {
          margin-left: 0;
        }

        :global(.avatar-preview.active) {
          filter: grayscale(0);
          opacity: 1;
          box-shadow: 0 0 0 2px #60a5fa;
        }

        :global(.avatar-preview img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-content {
          position: relative;
        }

        :global(.quote-text) {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: white;
        }

        @media (min-width: 768px) {
          :global(.quote-text) {
            font-size: 1.75rem;
          }
        }

        :global(.author-section) {
          margin-top: 3rem;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar-main {
          position: relative;
          width: 3rem;
          height: 3rem;
        }

        :global(.avatar-ring) {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(96, 165, 250, 0.4);
        }

        :global(.avatar-image) {
          position: absolute;
          inset: 0;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(0.3);
          transition: filter 0.5s ease;
        }

        :global(.avatar-image:hover) {
          filter: grayscale(0);
        }

        :global(.author-info) {
          position: relative;
          padding-left: 1rem;
        }

        :global(.accent-line) {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: #60a5fa;
          transform-origin: top;
        }

        .author-name {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          letter-spacing: 0.05em;
        }

        .author-role {
          display: block;
          font-family: monospace;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .progress-track {
          margin-top: 4rem;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        :global(.progress-fill) {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: #60a5fa;
        }

        :global(.click-hint) {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        :global(.click-hint span) {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: monospace;
        }
      `}</style>
    </div>
  )
}
