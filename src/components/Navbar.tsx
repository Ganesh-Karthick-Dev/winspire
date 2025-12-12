'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'WHAT', href: '#features' },
    { label: 'HOW', href: '#performance' },
    { label: 'GAME ECOSYSTEM', href: '#technology' },
    { label: 'ATHLETES SECTION', href: '#cta' },
    { label: 'INVESTORS & PARTNERS', href: '#contact' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSingleDot, setShowSingleDot] = useState(false);
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
                closeMenu();
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const openMenu = useCallback(() => {
        setIsMenuOpen(true);

        // Animate dots collapsing to center
        if (gridDotsRef.current) {
            const dots = gridDotsRef.current.querySelectorAll('.grid-dot');

            gsap.to(dots[0], { x: 5, y: 5, duration: 0.2, ease: 'power2.in' }); // top-left
            gsap.to(dots[1], { x: -5, y: 5, duration: 0.2, ease: 'power2.in' }); // top-right
            gsap.to(dots[2], { x: 5, y: -5, duration: 0.2, ease: 'power2.in' }); // bottom-left
            gsap.to(dots[3], {
                x: -5, y: -5, duration: 0.2, ease: 'power2.in', onComplete: () => {
                    setShowSingleDot(true);

                    // Now animate the menu content
                    requestAnimationFrame(() => {
                        animateMenuOpen();
                    });
                }
            });
        } else {
            setShowSingleDot(true);
            requestAnimationFrame(() => {
                animateMenuOpen();
            });
        }
    }, []);

    const animateMenuOpen = useCallback(() => {
        if (!menuContentRef.current || !dividerRef.current || !menuItemsRef.current) return;

        // Kill any existing animation
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const menuItems = menuItemsRef.current.querySelectorAll('li');

        // Create timeline
        const tl = gsap.timeline();
        timelineRef.current = tl;

        // Set initial states
        gsap.set(menuContentRef.current, { height: 0, opacity: 0 });
        gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
        gsap.set(menuItems, { x: 50, opacity: 0 });

        // Animate box height expanding
        tl.to(menuContentRef.current, {
            height: 'auto',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
        });

        // Animate divider
        tl.to(dividerRef.current, {
            scaleX: 1,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
        }, '-=0.1');

        // Animate menu items one by one from right
        tl.to(menuItems, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out',
        }, '-=0.1');
    }, []);

    const closeMenu = useCallback(() => {
        if (!menuContentRef.current || !dividerRef.current || !menuItemsRef.current) {
            setIsMenuOpen(false);
            setShowSingleDot(false);
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
                setShowSingleDot(false);
                setIsMenuOpen(false);

                // After state changes, animate dots expanding from center
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (gridDotsRef.current) {
                            const dots = gridDotsRef.current.querySelectorAll('.grid-dot');

                            // First set them at center
                            gsap.set(dots[0], { x: 5, y: 5 });
                            gsap.set(dots[1], { x: -5, y: 5 });
                            gsap.set(dots[2], { x: 5, y: -5 });
                            gsap.set(dots[3], { x: -5, y: -5 });

                            // Then animate to original positions
                            gsap.to(dots, { x: 0, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.03 });
                        }
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
            stagger: -0.05,
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
    }, []);

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const handleNavClick = (href: string, label: string) => {
        setActiveItem(label);
        closeMenu();

        // Smooth scroll to section after menu closes
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 600);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <a href="/" className="navbar-logo">
                <Image
                    src="/images/Logo-White.svg"
                    alt="Winspire Logo"
                    width={140}
                    height={40}
                    priority
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
                >
                    <span className="navbar-menu-text">MENU</span>
                    {/* 4 dots when closed/animating, 1 dot when fully open */}
                    {showSingleDot ? (
                        <span className="navbar-single-dot"></span>
                    ) : (
                        <span className="navbar-menu-icon" ref={gridDotsRef}>
                            <span className="grid-dot"></span>
                            <span className="grid-dot"></span>
                            <span className="grid-dot"></span>
                            <span className="grid-dot"></span>
                        </span>
                    )}
                </button>

                {/* Menu Content - animated with GSAP */}
                {isMenuOpen && (
                    <div className="navbar-menu-content" ref={menuContentRef}>
                        <div className="navbar-menu-divider" ref={dividerRef}></div>
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
