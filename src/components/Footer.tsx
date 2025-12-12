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
                    <h3 className="footer-brand">winspire RCM</h3>
                    <address className="footer-address">
                        123 Innovation Street, Tech Park,<br />
                        Bangalore, India
                    </address>
                </div>
                <div className="footer-right">
                    <a href="mailto:hello@winspire.com" className="footer-email">
                        hello@winspire.com
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
