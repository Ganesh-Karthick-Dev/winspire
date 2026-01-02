'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ContactModal from './ContactModal';

interface NavItem {
    label: string;
    href: string;
}

// Updated menu items
const navItems: NavItem[] = [
    { label: 'Company', href: '/company' },
    { label: 'Outcomes', href: '/outcomes' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Neura AI', href: '/neura-ai' },
    { label: 'Book a Demo', href: '/book-demo' },
];

export default function SmartNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const SCROLL_THRESHOLD = 50; // Larger threshold = waits longer before showing

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const heroHeight = window.innerHeight * 0.8;
                    const scrollDelta = currentScrollY - lastScrollY.current;

                    // Check if still in hero section (for transparent bg)
                    setIsAtTop(currentScrollY < heroHeight);

                    // Only change visibility if scroll delta exceeds threshold
                    if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
                        if (currentScrollY < heroHeight) {
                            // In hero section - always visible
                            setIsVisible(true);
                        } else if (scrollDelta > 0) {
                            // Scrolling DOWN - hide navbar
                            setIsVisible(false);
                        } else {
                            // Scrolling UP - show navbar
                            setIsVisible(true);
                        }
                        lastScrollY.current = currentScrollY;
                    }

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
        <>
            <nav className={navbarClasses}>
                <div className="smart-navbar-container">
                    {/* Logo */}
                    <Link href="/" className="smart-navbar-logo">
                        <div
                            style={{
                                width: '170px',
                                height: '45px',
                                backgroundColor: '#1a1a5e',
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

                    {/* Center Navigation Links - Desktop only */}
                    <div className="smart-navbar-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="smart-navbar-link"
                            >
                                <span className="link-dot"></span>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side: Contact button + Mobile Hamburger */}
                    <div className="smart-navbar-right">
                        {/* Contact Button - opens modal */}
                        <button
                            className="smart-navbar-contact"
                            onClick={() => setIsContactModalOpen(true)}
                        >
                            <span className="contact-dot"></span>
                            Contact
                        </button>

                        {/* Mobile Menu Button - only visible on mobile */}
                        <button
                            className="smart-navbar-hamburger"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`smart-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="smart-mobile-menu-content">
                    <ul className="smart-mobile-nav-list">
                        {navItems.map((item, index) => (
                            <li
                                key={item.label}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Link
                                    href={item.href}
                                    className="smart-mobile-nav-link"
                                    onClick={closeMobileMenu}
                                >
                                    <span className="mobile-link-dot"></span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Contact Modal */}
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </>
    );
}

