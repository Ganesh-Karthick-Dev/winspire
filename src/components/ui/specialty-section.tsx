"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight, Stethoscope, Building2, Brain, Home, Users } from "lucide-react"

interface Specialty {
    icon: React.ReactNode
    title: string
    image: string
}

const specialties: Specialty[] = [
    {
        icon: <Stethoscope style={{ width: 22, height: 22 }} />,
        title: "Specialty and multispecialty practices",
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2691&auto=format&fit=crop",
    },
    {
        icon: <Building2 style={{ width: 22, height: 22 }} />,
        title: "Hospitals and surgery centers",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    },
    {
        icon: <Brain style={{ width: 22, height: 22 }} />,
        title: "Behavioral and mental health providers",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop",
    },
    {
        icon: <Home style={{ width: 22, height: 22 }} />,
        title: "Home health and hospice organizations",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop",
    },
    {
        icon: <Users style={{ width: 22, height: 22 }} />,
        title: "Tribal and community health networks",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop",
    },
]

export function SpecialtySection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)

    // Smooth cursor following animation
    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.12),
                y: lerp(prev.y, mousePosition.y, 0.12),
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (listRef.current) {
            const rect = listRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index)
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
        setIsVisible(false)
    }

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                padding: '100px 40px',
                background: 'transparent',
                zIndex: 30,
            }}
        >
            {/* Frosted Glass Card */}
            <div
                style={{
                    position: 'relative',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '70px 80px',
                    borderRadius: '32px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '80px',
                    alignItems: 'center', // Changed to center
                }}
            >
                {/* Left Content - Text Info */}
                <div style={{ flex: '1', minWidth: '320px' }}>
                    {/* Accent Label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <span style={{ width: '10px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }} />
                            <span style={{ width: '10px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }} />
                        </div>
                        <h3 style={{
                            margin: 0,
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: '#1a1a2e',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            Specialties
                        </h3>
                    </div>

                    {/* Main Title */}
                    <h2
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                            fontWeight: 700,
                            color: '#0a0a1a',
                            lineHeight: 1.15,
                            marginBottom: '28px',
                        }}
                    >
                        Built for Every Specialty
                    </h2>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                            color: '#1a1a2e',
                            lineHeight: 1.6,
                            marginBottom: '28px',
                        }}
                    >
                        Healthcare is not one-size-fits-all.<br />
                        Neither is our approach.
                    </p>

                    {/* Intro Line */}
                    <p
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                            color: 'rgba(10, 10, 30, 0.7)',
                            marginBottom: '36px',
                        }}
                    >
                        Winspire adapts to your workflows across:
                    </p>

                    {/* Divider */}
                    <div style={{
                        width: '70px',
                        height: '4px',
                        background: '#38bdf8',
                        borderRadius: '2px',
                        marginBottom: '36px'
                    }} />

                    {/* Closing Statement */}
                    <p
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                            color: 'rgba(10, 10, 30, 0.75)',
                            lineHeight: 1.6,
                            marginBottom: '18px',
                        }}
                    >
                        Each specialty brings different denial patterns, payer behavior, and operational risk.
                    </p>

                    {/* Bold Statement - No gradient, professional dark text */}
                    <p
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                            color: '#0a0a1a',
                            fontWeight: 600,
                            marginBottom: '44px',
                        }}
                    >
                        Our system adapts and discipline remains.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="/solutions"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '22px',
                            padding: '16px 16px 16px 36px',
                            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                            backgroundSize: '200% 200%',
                            borderRadius: '50px',
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            transition: 'background-position 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundPosition = '100% 0'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(79, 156, 249, 0.2)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundPosition = '0% 0'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        Explore Specialty Workflows
                        <span
                            style={{
                                width: '44px',
                                height: '44px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1a1a1a',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <ArrowUpRight style={{ width: 20, height: 20 }} />
                        </span>
                    </a>
                </div>

                {/* Right Content - Specialty List with Hover Images - Vertically Centered */}
                <div
                    ref={listRef}
                    onMouseMove={handleMouseMove}
                    style={{
                        flex: '1',
                        minWidth: '380px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Vertically center
                    }}
                >
                    {/* Floating Image Preview */}
                    <div
                        style={{
                            position: 'fixed',
                            zIndex: 100,
                            pointerEvents: 'none',
                            overflow: 'hidden',
                            borderRadius: '16px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            left: listRef.current?.getBoundingClientRect().left ?? 0,
                            top: listRef.current?.getBoundingClientRect().top ?? 0,
                            transform: `translate3d(${smoothPosition.x - 320}px, ${smoothPosition.y - 100}px, 0)`,
                            opacity: isVisible ? 1 : 0,
                            scale: isVisible ? '1' : '0.8',
                            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '280px',
                                height: '180px',
                                background: '#1a1a2e',
                                borderRadius: '16px',
                                overflow: 'hidden',
                            }}
                        >
                            {specialties.map((specialty, index) => (
                                <img
                                    key={specialty.title}
                                    src={specialty.image}
                                    alt={specialty.title}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: hoveredIndex === index ? 1 : 0,
                                        scale: hoveredIndex === index ? '1' : '1.1',
                                        filter: hoveredIndex === index ? 'none' : 'blur(10px)',
                                        transition: 'all 0.5s ease-out',
                                    }}
                                />
                            ))}
                            {/* Gradient overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(10, 10, 30, 0.4) 0%, transparent 100%)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Specialty List */}
                    <div>
                        {specialties.map((specialty, index) => (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    padding: '20px 18px',
                                    borderTop: '1px solid rgba(10, 10, 30, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Background highlight on hover */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '12px',
                                        background: hoveredIndex === index
                                            ? 'rgba(56, 189, 248, 0.12)'
                                            : 'transparent',
                                        opacity: hoveredIndex === index ? 1 : 0,
                                        transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.95)',
                                        transition: 'all 0.3s ease-out',
                                    }}
                                />

                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '18px',
                                    }}
                                >
                                    {/* Icon */}
                                    <span
                                        style={{
                                            color: hoveredIndex === index ? '#0284c7' : 'rgba(10, 10, 30, 0.5)',
                                            transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
                                            transition: 'all 0.3s ease-out',
                                            display: 'flex',
                                        }}
                                    >
                                        {specialty.icon}
                                    </span>

                                    {/* Title */}
                                    <span
                                        style={{
                                            fontFamily: 'Outfit, sans-serif',
                                            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                                            fontWeight: 500,
                                            color: hoveredIndex === index ? '#0a0a1a' : 'rgba(10, 10, 30, 0.75)',
                                            transition: 'all 0.3s ease-out',
                                        }}
                                    >
                                        {specialty.title}
                                    </span>

                                    {/* Arrow that slides in on hover */}
                                    <ArrowUpRight
                                        style={{
                                            width: 18,
                                            height: 18,
                                            marginLeft: 'auto',
                                            color: '#0284c7',
                                            opacity: hoveredIndex === index ? 1 : 0,
                                            transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-8px)',
                                            transition: 'all 0.3s ease-out',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* Bottom border */}
                        <div style={{ borderTop: '1px solid rgba(10, 10, 30, 0.1)' }} />
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style jsx>{`
        @media (max-width: 900px) {
          section > div:first-child {
            flex-direction: column !important;
            padding: 50px 40px !important;
          }
        }
      `}</style>
        </section>
    )
}
