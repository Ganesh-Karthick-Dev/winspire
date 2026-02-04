/**
 * Footer Component - Clean Minimal Design
 * 
 * Layout:
 * - Light gray background with white card
 * - Left: Logo, tagline, social icons
 * - Right: 3 link columns
 * - Bottom bar: Copyright + legal links
 * - Watermark: Large faded "WINSPIRE" text
 */

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            {/* Main Footer Card */}
            <div className="footer-card">
                {/* Top Section */}
                <div className="footer-top">
                    {/* Left - Brand Section */}
                    <div className="footer-brand">
                        {/* Logo */}
                        <div className="footer-logo">
                            <img
                                src="/images/Logo-White.svg"
                                alt="Winspire"
                                className="logo-image"
                            />
                        </div>

                        {/* Tagline */}
                        <p className="footer-tagline">
                            Winspire partners with healthcare providers to optimize revenue cycles —
                            making billing efficient, predictable, and transparent.
                        </p>

                        {/* Social Icons */}
                        <div className="footer-socials">
                            <a
                                href="https://www.linkedin.com/company/winspire-rcm-private-limited/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="LinkedIn"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right - Link Columns */}
                    <div className="footer-links">
                        {/* Solutions Column */}
                        <div className="footer-column">
                            <h4 className="column-title">Solutions</h4>
                            <ul className="column-links">
                                <li><Link href="/solutions#rcm">Revenue Cycle</Link></li>
                                <li><Link href="/solutions#billing">Medical Billing</Link></li>
                                <li><Link href="/solutions#coding">Coding Services</Link></li>
                                <li><Link href="/solutions#ar">AR Management</Link></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div className="footer-column">
                            <h4 className="column-title">Resources</h4>
                            <ul className="column-links">
                                <li><Link href="/resources">Blog</Link></li>
                                <li><Link href="/resources#cases">Case Studies</Link></li>
                                <li><Link href="/neura-ai">Neura AI</Link></li>
                                <li><Link href="/book-demo">Book a Demo</Link></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="footer-column">
                            <h4 className="column-title">Company</h4>
                            <ul className="column-links">
                                <li><Link href="/company">About</Link></li>
                                <li><Link href="/company#values">Values</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <span className="copyright">
                        © {new Date().getFullYear()} Winspire RCM Inc. All rights reserved.
                    </span>
                    <div className="legal-links">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>

                {/* Watermark - Inside card as background */}
                <div className="footer-watermark" aria-hidden="true">
                    WINSPIRE
                </div>
            </div>

            <style jsx>{`
                .footer-wrapper {
                    position: relative;
                    background: transparent;
                    padding: 60px 24px 40px;
                    overflow: hidden;
                    border-radius: 32px 32px 0 0;
                }

                .footer-card {
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 32px;
                    padding: 48px;
                    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                }

                .footer-top {
                    display: flex;
                    justify-content: space-between;
                    gap: 48px;
                    padding-bottom: 40px;
                    border-bottom: 1px solid #eee;
                }

                /* Brand Section */
                .footer-brand {
                    flex: 0 0 320px;
                    max-width: 320px;
                }

                .footer-logo {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .logo-image {
                    height: 32px;
                    width: auto;
                    filter: invert(1);
                }

                .footer-tagline {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    line-height: 1.6;
                    color: #666;
                    margin: 0 0 24px 0;
                }

                .footer-socials {
                    display: flex;
                    gap: 16px;
                }

                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    color: #1a1a1a;
                    transition: all 0.2s ease;
                }

                .social-icon:hover {
                    color: #3b82f6;
                    transform: translateY(-2px);
                }

                /* Link Columns */
                .footer-links {
                    display: flex;
                    gap: 64px;
                }

                .footer-column {
                    min-width: 120px;
                }

                .column-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                }

                .column-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .column-links li {
                    margin-bottom: 12px;
                }

                .column-links :global(a) {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.8rem;
                    color: #666;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .column-links :global(a:hover) {
                    color: #1a1a1a;
                }

                /* Bottom Bar */
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 24px;
                }

                .copyright {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.75rem;
                    color: #999;
                }

                .legal-links {
                    display: flex;
                    gap: 24px;
                }

                .legal-links :global(a) {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.75rem;
                    color: #666;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    transition: color 0.2s ease;
                }

                .legal-links :global(a:hover) {
                    color: #1a1a1a;
                }

                /* Watermark */
                .footer-watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 0;
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(80px, 14vw, 180px);
                    font-weight: 800;
                    text-align: center;
                    color: rgba(0, 0, 0, 0.05);
                    letter-spacing: 0.02em;
                    white-space: nowrap;
                    user-select: none;
                    pointer-events: none;
                    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
                    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
                }

                /* ========== RESPONSIVE ========== */

                /* Tablet */
                @media (max-width: 1024px) {
                    .footer-card {
                        padding: 40px 32px;
                    }

                    .footer-top {
                        flex-direction: column;
                        gap: 40px;
                    }

                    .footer-brand {
                        flex: none;
                        max-width: 100%;
                    }

                    .footer-links {
                        justify-content: flex-start;
                        gap: 48px;
                    }
                }

                /* Mobile Large */
                @media (max-width: 768px) {
                    .footer-wrapper {
                        padding: 40px 16px 0;
                    }

                    .footer-card {
                        padding: 32px 24px;
                        border-radius: 16px;
                    }

                    .footer-top {
                        gap: 32px;
                        padding-bottom: 32px;
                    }

                    .footer-links {
                        flex-wrap: wrap;
                        gap: 32px;
                    }

                    .footer-column {
                        flex: 1 1 calc(50% - 16px);
                        min-width: 140px;
                    }

                    .footer-bottom {
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                    }

                    .legal-links {
                        justify-content: center;
                    }

                    .footer-watermark {
                        margin-top: -24px;
                    }
                }

                /* Mobile Small */
                @media (max-width: 480px) {
                    .footer-wrapper {
                        padding: 32px 12px 0;
                    }

                    .footer-card {
                        padding: 24px 20px;
                        border-radius: 12px;
                    }

                    .footer-logo {
                        gap: 8px;
                    }

                    .logo-icon {
                        width: 28px;
                        height: 28px;
                    }

                    .logo-text {
                        font-size: 1.25rem;
                    }

                    .footer-tagline {
                        font-size: 0.8rem;
                    }

                    .footer-links {
                        gap: 24px;
                    }

                    .footer-column {
                        flex: 1 1 100%;
                    }

                    .column-title {
                        font-size: 0.8rem;
                        margin-bottom: 16px;
                    }

                    .column-links li {
                        margin-bottom: 10px;
                    }

                    .column-links :global(a) {
                        font-size: 0.75rem;
                    }

                    .legal-links {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .footer-watermark {
                        font-size: 60px;
                        margin-top: -16px;
                    }
                }

                /* Very Small Devices */
                @media (max-width: 360px) {
                    .footer-card {
                        padding: 20px 16px;
                    }

                    .footer-watermark {
                        font-size: 48px;
                    }
                }
            `}</style>
        </footer>
    );
}
