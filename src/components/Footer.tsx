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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const FOOTER_LINKS = [
    {
        title: 'Solutions',
        items: [
            { label: 'Overview', href: '/solutions' },
            { label: 'Revenue Cycle', href: '/solutions#revenue-cycle' },
            { label: 'Targeted Solutions', href: '/solutions#targeted' },
            { label: 'Intelligence', href: '/solutions#intelligence' },
        ]
    },
    {
        title: 'Company',
        items: [
            { label: 'Our Story', href: '/company#our-story' },
            { label: 'Leadership', href: '/company#leadership' },
            { label: 'Culture', href: '/company#culture' },
            { label: 'Contact', href: '/company#contact' },
        ]
    },
    {
        title: 'Outcomes',
        items: [
            { label: 'Overview', href: '/outcomes' },
            { label: 'Systems', href: '/outcomes#systems' },
            { label: 'Human Centric', href: '/outcomes#human-centric' },
            { label: 'Future Proofing', href: '/outcomes#future' },
        ]
    },
    {
        title: 'Neura AI',
        items: [
            { label: 'Overview', href: '/neura-ai' },
            { label: 'Capabilities', href: '/neura-ai#capabilities' },
            { label: 'Integration', href: '/neura-ai#integration' },
            { label: 'Security', href: '/neura-ai#security' },
        ]
    }
];

export default function Footer() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (title: string) => {
        if (window.innerWidth > 768) return; // Disable toggle on desktop
        setOpenSection(openSection === title ? null : title);
    };

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

                        {/* Middle Row - Socials + Addresses */}
                        <div className="footer-contact-row">
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

                            <div className="contact-info">
                                <div className="contact-item">
                                    <h5>Regional Office:</h5>
                                    <p>
                                        Regus - UB City, Level 14 & 15, Concorde Towers 1,<br />
                                        Ashok Nagar, Bangalore, India - 560001
                                    </p>
                                </div>
                                <div className="contact-item">
                                    <h5>Headquarters:</h5>
                                    <p>
                                        2810 N Church St, Wilmington,<br />
                                        Delaware, USA. 19802-4447
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right - Link Columns - Mapped */}
                    <div className="footer-links">
                        {FOOTER_LINKS.map((section) => (
                            <div className="footer-column" key={section.title}>
                                <div
                                    className={`column-header ${openSection === section.title ? 'active' : ''}`}
                                    onClick={() => toggleSection(section.title)}
                                >
                                    <h4 className="column-title">{section.title}</h4>
                                    <span className="accordion-icon">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <ul className={`column-links ${openSection === section.title ? 'open' : ''}`}>
                                    {section.items.map((item) => (
                                        <li key={item.label}>
                                            <Link href={item.href}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Row - Dedicated Section */}
                <div className="footer-trust-section">
                    <div className="azure-badge">
                        <img src="/images/certifications/azure-icon.png" alt="Azure" className="azure-icon" />
                        <p className="azure-text">
                            Built on Microsoft Azure for Unmatched <br />
                            Security and Reliability
                        </p>
                    </div>
                    <div className="footer-certs">
                        <img src="/images/certifications/aicpa-soc.png" alt="AICPA SOC" />
                        <img src="/images/certifications/soc2-type2.png" alt="SOC 2 Type II" />
                        <img src="/images/certifications/soc1-type2.png" alt="SOC 1 Type II" />
                        <img src="/images/certifications/iso-27001.png" alt="ISO 27001" />
                        <img src="/images/certifications/iso-9001.png" alt="ISO 9001" />
                        <img src="/images/certifications/hipaa-compliant.png" alt="HIPAA Compliant" />
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
                    max-width: 1100px;
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
                    gap: 60px;
                    padding-bottom: 40px;
                    border-bottom: 1px solid #eee;
                }

                .footer-brand {
                    flex: 1;
                    min-width: 0;
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
                    font-size: 1rem; /* Increased from 0.875rem */
                    line-height: 1.6;
                    color: #666;
                    margin: 0 0 32px 0;
                    max-width: 400px;
                }

                .footer-contact-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 32px;
                    margin-bottom: 32px;
                }

                .footer-socials {
                    display: flex;
                    flex-shrink: 0;
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

                .contact-info {
                    display: flex;
                    gap: 40px;
                }

                .contact-item {
                    text-align: left;
                }

                .contact-item h5 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05rem;
                    color: #999;
                    margin: 0 0 8px 0;
                }

                .contact-item p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.8125rem;
                    line-height: 1.5;
                    color: #444;
                    margin: 0;
                    text-align: left;
                }

                /* Trust Section */
                .footer-trust-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    // padding-top: 5px;
                    // margin-top: 5px;
                    border-top: 1px solid #f0f0f0;
                }

                .azure-badge {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .azure-icon {
                    height: 40px;
                    width: auto;
                    object-fit: contain;
                }

                .azure-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 400;
                    line-height: 1.6;
                    color: #666;
                    max-width: 400px;
                    margin: 0;
                }

                .footer-certs {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                }

                .footer-certs img {
                    height: 64px;
                    width: auto;
                    filter: none;
                    opacity: 1;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .footer-certs img:hover {
                    transform: scale(1.1) translateY(-4px);
                }

                .footer-links {
                    display: flex;
                    gap: 32px;
                    flex-wrap: nowrap; 
                    justify-content: flex-end;
                    flex-shrink: 0;
                }

                .footer-column {
                    min-width: 120px;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .column-header {
                    width: 100%;
                }

                .column-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                }

                .accordion-icon {
                    display: none; /* Hidden on desktop */
                }

                /* Links List */
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
                    font-size: 1rem; /* Increased from 0.8rem */
                    color: #666;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 6px 12px;
                    border-radius: 8px;
                    display: inline-block;
                    margin-left: -12px;
                }

                .column-links :global(a:hover) {
                    color: #ffffff;
                    background: #000000;
                    transform: translateX(4px);
                }

                /* Bottom Bar */
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px;
                    background: #000000;
                    border-radius: 16px;
                    margin-top: 40px;
                }

                .copyright {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.7);
                }

                .legal-links {
                    display: flex;
                    gap: 24px;
                }

                .legal-links :global(a) {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.75rem;
                    color: #ffffff;
                    text-decoration: none;
                    opacity: 0.9;
                    transition: opacity 0.2s ease;
                }

                .legal-links :global(a:hover) {
                    opacity: 1;
                    text-decoration: underline;
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

                /* Tablet & Mobile Layout Shifts */
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
                        flex-wrap: wrap; /* Allow wrapping on tablet */
                    }

                    .footer-contact-row {
                        gap: 24px;
                    }

                    .contact-info {
                        gap: 32px;
                    }
                }

                /* Mobile Large - Accordion Trigger */
                @media (max-width: 768px) {
                    .footer-links {
                        flex-direction: column;
                        gap: 0;
                        width: 100%;
                    }

                    .footer-column {
                        width: 100%;
                        border-bottom: 1px solid #f0f0f0;
                        padding-bottom: 0;
                    }

                    .footer-column:last-child {
                        border-bottom: none;
                    }

                    .column-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px 0;
                        cursor: pointer;
                        user-select: none;
                    }

                    .column-title {
                        margin: 0;
                        font-size: 1rem;
                    }

                    .accordion-icon {
                        display: block;
                        transition: transform 0.3s ease;
                        color: #1a1a1a;
                    }

                    .column-header.active .accordion-icon {
                        transform: rotate(180deg);
                    }

                    .column-links {
                        max-height: 0;
                        opacity: 0;
                        overflow: hidden;
                        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, margin-bottom 0.4s ease;
                        margin-bottom: 0;
                    }

                    .column-links.open {
                        max-height: 300px;
                        opacity: 1;
                        margin-bottom: 20px;
                    }

                    /* New Mobile Styles */
                    .footer-contact-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                    }

                    .contact-info {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 24px;
                    }

                    .footer-trust-section {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 24px;
                        padding-top: 24px;
                    }

                    .azure-text {
                        max-width: 100%;
                    }

                    .footer-certs {
                        justify-content: flex-start;
                        gap: 16px;
                    }

                    .footer-certs img {
                        height: 48px; /* Slightly smaller on mobile */
                    }

                    .footer-bottom {
                        flex-direction: column;
                        gap: 16px;
                        text-align: left;
                        align-items: flex-start;
                    }

                    .legal-links {
                        justify-content: flex-start;
                        flex-wrap: wrap;
                    }
                }

                /* Mobile Small */
                @media (max-width: 480px) {
                    .footer-wrapper {
                        padding: 32px 12px 0;
                    }

                    .footer-card {
                        padding: 24px 20px;
                    }
                    
                    /* Adjust watermark */            
                    .footer-watermark {
                        font-size: 60px;
                        margin-top: -16px;
                    }
                }
            `}</style>
        </footer>
    );
}
