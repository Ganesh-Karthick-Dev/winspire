'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import gsap from 'gsap';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    // { label: 'Neura AI', href: '#neura-ai' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Outcomes', href: '/outcomes' },
    { label: 'Company', href: '/company' },
    { label: 'Book a Demo', href: '/book-demo' },
];

export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSingleDot, setShowSingleDot] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const menuBoxRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<HTMLUListElement>(null);
    const gridDotsRef = useRef<HTMLSpanElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuBoxRef.current && !menuBoxRef.current.contains(event.target as Node)) {
                if (!isAnimating) closeMenu();
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, isAnimating]);

    // Close menu on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape' && !isAnimating) {
                closeMenu();
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isAnimating]);

    const openMenu = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Step 1: Animate dots collapsing to center
        if (gridDotsRef.current) {
            const dots = gridDotsRef.current.querySelectorAll('.grid-dot');
            const tl = gsap.timeline({
                onComplete: () => {
                    // Step 2: Switch to single dot and open menu
                    setShowSingleDot(true);
                    setIsMenuOpen(true);

                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            animateMenuOpen();
                        }, 50);
                    });
                }
            });

            // Animate all dots to center with stagger
            tl.to(dots[0], { x: 7, y: 7, opacity: 0.5, duration: 0.35, ease: 'power2.inOut' }, 0);
            tl.to(dots[1], { x: -7, y: 7, opacity: 0.5, duration: 0.35, ease: 'power2.inOut' }, 0);
            tl.to(dots[2], { x: 7, y: -7, opacity: 0.5, duration: 0.35, ease: 'power2.inOut' }, 0);
            tl.to(dots[3], { x: -7, y: -7, opacity: 0.5, duration: 0.35, ease: 'power2.inOut' }, 0);

            // Fade out completely
            tl.to(dots, { opacity: 0, duration: 0.15, ease: 'power2.in' });
        } else {
            setShowSingleDot(true);
            setIsMenuOpen(true);
            requestAnimationFrame(() => {
                animateMenuOpen();
            });
        }
    }, [isAnimating]);

    const animateMenuOpen = useCallback(() => {
        if (!menuContentRef.current || !dividerRef.current || !menuItemsRef.current) {
            setIsAnimating(false);
            return;
        }

        // Kill any existing animation
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const menuItems = menuItemsRef.current.querySelectorAll('li');

        // Create timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
            }
        });
        timelineRef.current = tl;

        // Set initial states
        gsap.set(menuContentRef.current, { height: 0, opacity: 0 });
        gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
        gsap.set(menuItems, { x: 50, opacity: 0 });

        // Animate box height expanding
        tl.to(menuContentRef.current, {
            height: 'auto',
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
        });

        // Animate divider
        tl.to(dividerRef.current, {
            scaleX: 1,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
        }, '-=0.15');

        // Animate menu items one by one from right
        tl.to(menuItems, {
            x: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.08,
            ease: 'power2.out',
        }, '-=0.1');
    }, []);

    const closeMenu = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (!menuContentRef.current || !dividerRef.current || !menuItemsRef.current) {
            animateDotsExpand();
            return;
        }

        // Kill any existing animation
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const menuItems = menuItemsRef.current.querySelectorAll('li');

        // Create close timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setIsMenuOpen(false);
                setShowSingleDot(false);

                // After menu closes, animate dots expanding
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        animateDotsExpand();
                    }, 50);
                });
            }
        });
        timelineRef.current = tl;

        // Animate menu items out (reverse order)
        tl.to(menuItems, {
            x: 50,
            opacity: 0,
            duration: 0.2,
            stagger: -0.04,
            ease: 'power2.in',
        });

        // Animate divider
        tl.to(dividerRef.current, {
            scaleX: 0,
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
        }, '-=0.1');

        // Animate box height collapsing
        tl.to(menuContentRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
        }, '-=0.1');
    }, [isAnimating]);

    const animateDotsExpand = useCallback(() => {
        // Wait for React to render the dots
        requestAnimationFrame(() => {
            if (gridDotsRef.current) {
                const dots = gridDotsRef.current.querySelectorAll('.grid-dot');

                // Set initial state - all dots at center, invisible
                gsap.set(dots[0], { x: 7, y: 7, opacity: 0 });
                gsap.set(dots[1], { x: -7, y: 7, opacity: 0 });
                gsap.set(dots[2], { x: 7, y: -7, opacity: 0 });
                gsap.set(dots[3], { x: -7, y: -7, opacity: 0 });

                // Animate dots expanding from center
                const tl = gsap.timeline({
                    onComplete: () => {
                        setIsAnimating(false);
                    }
                });

                // Fade in first
                tl.to(dots, { opacity: 1, duration: 0.15, ease: 'power2.out' });

                // Then expand to original positions
                tl.to(dots[0], { x: 0, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.05');
                tl.to(dots[1], { x: 0, y: 0, duration: 0.35, ease: 'power2.out' }, '<');
                tl.to(dots[2], { x: 0, y: 0, duration: 0.35, ease: 'power2.out' }, '<');
                tl.to(dots[3], { x: 0, y: 0, duration: 0.35, ease: 'power2.out' }, '<');
            } else {
                setIsAnimating(false);
            }
        });
    }, []);

    const handleMenuToggle = () => {
        if (isAnimating) return;

        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const handleNavClick = (href: string, label: string) => {
        if (isAnimating) return;
        setActiveItem(label);
        closeMenu();

        // Handle page routes vs anchor links
        setTimeout(() => {
            if (href.startsWith('/')) {
                // It's a page route - use Next.js router for SPA navigation
                router.push(href);
            } else {
                // It's an anchor link - smooth scroll
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 800);
    };

    const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark'); // Default to dark (black text) for Hero

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'performance') {
                        setNavTheme('light');
                    } else {
                        // Hero, Features, Vision, etc. -> Dark Theme (Black Text)
                        setNavTheme('dark');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-10% 0px -90% 0px', // Trigger near top
            threshold: 0
        });

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const isDarkTheme = navTheme === 'dark';
    // If menu is open, force white text (because background is dark).
    // Otherwise use theme color (black for Hero, white for others).
    const effectiveTextColor = isMenuOpen ? '#ffffff' : (isDarkTheme ? '#1a1a1a' : '#ffffff');
    const logoFilter = isDarkTheme ? 'invert(1) brightness(0)' : 'none';

    return (
        <nav className="navbar" style={{ transition: 'color 0.3s ease' }}>
            {/* Logo */}
            <a href="/" className="navbar-logo">
                <Image
                    src="/images/Logo-White.svg"
                    alt="Winspire Logo"
                    width={140}
                    height={40}
                    priority
                    style={{
                        filter: logoFilter,
                        transition: 'filter 0.3s ease'
                    }}
                />
            </a>

            {/* Menu Box */}
            <div
                className={`navbar-menu-box ${isMenuOpen ? 'open' : ''}`}
                ref={menuBoxRef}
            >
                {/* Menu Button - MENU text + dots */}
                <button
                    className="navbar-menu-btn"
                    onClick={handleMenuToggle}
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                    disabled={isAnimating}
                    style={{ color: effectiveTextColor }}
                >
                    <span className="navbar-menu-text">MENU</span>
                    {/* 4 dots or 1 dot */}
                    {showSingleDot ? (
                        <span className="navbar-single-dot" style={{ backgroundColor: effectiveTextColor }}></span>
                    ) : (
                        <span className="navbar-menu-icon" ref={gridDotsRef}>
                            <span className="grid-dot" style={{ backgroundColor: effectiveTextColor }}></span>
                            <span className="grid-dot" style={{ backgroundColor: effectiveTextColor }}></span>
                            <span className="grid-dot" style={{ backgroundColor: effectiveTextColor }}></span>
                            <span className="grid-dot" style={{ backgroundColor: effectiveTextColor }}></span>
                        </span>
                    )}
                </button>

                {/* Menu Content - animated with GSAP */}
                {isMenuOpen && (
                    <div className="navbar-menu-content" ref={menuContentRef}>
                        <div className="navbar-menu-divider" ref={dividerRef} style={{ backgroundColor: effectiveTextColor }}></div>
                        <ul className="navbar-menu-list" ref={menuItemsRef}>
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={`navbar-menu-link ${activeItem === item.label ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href, item.label);
                                        }}
                                        style={{ color: effectiveTextColor }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
