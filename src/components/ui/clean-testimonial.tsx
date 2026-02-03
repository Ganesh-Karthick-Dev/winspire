"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote: "For the first time, our revenue cycle feels predictable and under control.",
    author: "CFO",
    company: "Specialty Practice",
  },
  {
    quote: "Winspire redesigned how we operate—not just our numbers.",
    author: "CEO",
    company: "Healthcare Network",
  },
  {
    quote: "Our denial rates dropped significantly within the first quarter of implementation.",
    author: "VP Revenue Cycle",
    company: "Multi-Specialty Clinic",
  },
  {
    quote: "The transparency and real-time insights transformed how we make decisions.",
    author: "COO",
    company: "Regional Medical Center",
  },
  {
    quote: "We finally have a partner who understands the complexity of healthcare billing.",
    author: "Director of Finance",
    company: "Physician Group",
  },
]

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
          margin-right: 0.3em;
        }
      `}</style>
    </span>
  )
}

export function CleanTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Auto-slide every 3 seconds, pause on hover
  useEffect(() => {
    if (isHovered) {
      // Clear interval when hovered
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
      return
    }

    // Start auto-slide
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isHovered])

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
  const initials = currentTestimonial.author.charAt(0)

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

      {/* Top row with avatar stack and index indicator */}
      <div className="top-row">
        {/* Stacked initial circles for all testimonials */}
        <motion.div
          className="avatar-stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className={`avatar-preview ${i === activeIndex ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
            >
              <span className="avatar-initial">{t.author.charAt(0)}</span>
            </motion.div>
          ))}
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
      </div>

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
            {/* Initial circle instead of avatar */}
            <div className="initial-circle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  className="initial-letter"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {initials}
                </motion.span>
              </AnimatePresence>
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
                  {currentTestimonial.company}
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
        animate={{ opacity: isHovered ? 0.5 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <span>{isHovered ? "Click to change" : "Auto-playing..."}</span>
      </motion.div>

      <style jsx>{`
        .testimonial-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 4rem 0;
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

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        :global(.avatar-stack) {
          display: flex;
        }

        :global(.avatar-preview) {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          margin-left: -0.5rem;
          opacity: 0.4;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
        }

        :global(.avatar-preview:first-child) {
          margin-left: 0;
        }

        :global(.avatar-preview.active) {
          opacity: 1;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.1);
        }

        .avatar-initial {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        :global(.index-indicator) {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          font-family: monospace;
          font-size: 0.75rem;
        }

        :global(.current-index) {
          font-size: 1.5rem;
          font-weight: 300;
          color: white;
        }

        .separator, .total {
          color: rgba(255, 255, 255, 0.4);
        }

        .testimonial-content {
          position: relative;
        }

        :global(.quote-text) {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 300;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: white;
        }

        @media (min-width: 768px) {
          :global(.quote-text) {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          :global(.quote-text) {
            font-size: 3rem;
          }
        }

        :global(.author-section) {
          margin-top: 3rem;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .initial-circle {
          position: relative;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
        }

        :global(.initial-letter) {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        :global(.author-info) {
          position: relative;
          padding-left: 1.25rem;
        }

        :global(.accent-line) {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255, 255, 255, 0.5);
          transform-origin: top;
        }

        .author-name {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          letter-spacing: 0.05em;
        }

        .author-role {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.25rem;
          letter-spacing: 0.05em;
        }

        .progress-track {
          margin-top: 3rem;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        :global(.progress-fill) {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.6);
        }

        :global(.click-hint) {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
        }

        :global(.click-hint span) {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
    </div>
  )
}
