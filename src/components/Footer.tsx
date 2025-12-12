/**
 * Footer Component
 * 
 * Site footer with company info, contact, links and social icons
 */

import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { label: 'terms', href: '/terms' },
        { label: 'privacy', href: '/privacy' },
        { label: 'imprint', href: '/imprint' },
        { label: 'career', href: '/career' },
        { label: 'subscribe to newsletter', href: '/newsletter' },
    ];

    const socialLinks = [
        { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
        { label: 'Twitter', icon: '𝕏', href: 'https://twitter.com' },
        { label: 'GitHub', icon: 'G', href: 'https://github.com' },
        { label: 'Discord', icon: 'D', href: 'https://discord.com' },
        { label: 'Facebook', icon: 'f', href: 'https://facebook.com' },
    ];

    return (
        <footer className="site-footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-left">
                    <div className="footer-office">
                        <h4 className="footer-label">Regional Office:</h4>
                        <address className="footer-address">
                            Regus - UB City, Level 14 & 15,<br />
                            Concorde Towers 1, Ashok Nagar,<br />
                            Bangalore, India - 560001
                        </address>
                    </div>
                    <div className="footer-office">
                        <h4 className="footer-label">Headquarters:</h4>
                        <address className="footer-address">
                            2810 N Church St,<br />
                            Wilmington, Delaware,<br />
                            USA. 19802-4447
                        </address>
                    </div>
                </div>
                <div className="footer-right">
                    <a href="mailto:contact@winspirercm.com" className="footer-email">
                        contact@winspirercm.com
                    </a>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-left">
                    <div className="footer-logo-icon">
                        <span className="play-icon">▶</span>
                    </div>
                    <span className="footer-copyright">
                        © {currentYear} winspire RCM. All rights reserved.
                    </span>
                </div>

                <nav className="footer-links">
                    {footerLinks.map((link, index) => (
                        <React.Fragment key={link.label}>
                            <a href={link.href} className="footer-link">
                                {link.label}
                            </a>
                            {index < footerLinks.length - 1 && (
                                <span className="footer-divider">|</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                <div className="footer-social">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="footer-social-link"
                            aria-label={social.label}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
