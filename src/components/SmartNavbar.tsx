'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'News', href: '/news' },
];

export default function SmartNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const heroHeight = window.innerHeight * 0.8; // 80% of viewport

                    // Check if at top (hero section)
                    setIsAtTop(currentScrollY < 50);

                    if (currentScrollY < heroHeight) {
                        // In hero section - always visible, transparent
                        setIsVisible(true);
                    } else if (currentScrollY > lastScrollY.current) {
                        // Scrolling DOWN - hide navbar
                        setIsVisible(false);
                    } else {
                        // Scrolling UP - show navbar with white bg
                        setIsVisible(true);
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine navbar style based on state
    const navbarClasses = `smart-navbar ${isVisible ? 'visible' : 'hidden'} ${!isAtTop ? 'scrolled' : ''}`;

    return (
        <nav className={navbarClasses}>
            <div className="smart-navbar-container">
                {/* Logo */}
                <Link href="/" className="smart-navbar-logo">
                    <div
                        style={{
                            width: '140px',
                            height: '40px',
                            backgroundColor: isAtTop ? '#1a1a5e' : '#1a1a5e',
                            maskImage: 'url("/images/Logo-White.svg")',
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'left center',
                            WebkitMaskImage: 'url("/images/Logo-White.svg")',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'left center',
                            transition: 'background-color 0.3s ease'
                        }}
                    />
                </Link>

                {/* Center Navigation Links */}
                <div className="smart-navbar-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="smart-navbar-link"
                        >
                            <span className="link-dot">•</span>
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Contact Button */}
                <Link href="/contact" className="smart-navbar-contact">
                    <span className="contact-dot"></span>
                    Contact
                </Link>
            </div>
        </nav>
    );
}
