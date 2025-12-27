/**
 * Footer Component - Updated to Match Site Structure
 * 
 * Layout:
 * - Center aligned container
 * - Service card (purple gradient top + white bottom)
 * - Four link columns with vertical dividers (Company, Outcomes, Solutions, Neura AI)
 * - Bottom bar with privacy policy and copyright
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="ref-footer">
            {/* ================= DESKTOP VIEW ================= */}
            <div className="footer-desktop-view">
                {/* Top Row - Logo, Social Links, PageTop */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '40px 60px',
                    // borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {/* Logo */}
                    {/* Logo */}
                    <div style={{
                        width: '180px',
                        height: '50px',
                        backgroundColor: 'white',
                        maskImage: 'url("/images/Logo-White.svg")',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'left center',
                        WebkitMaskImage: 'url("/images/Logo-White.svg")',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'left center'
                    }} />

                    {/* Social Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Social</span>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: '1rem', color: 'white' }}>
                            LinkedIn
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: '1rem', color: 'white' }}>
                            Twitter
                        </a>
                    </div>

                    {/* PageTop Button */}
                    <button
                        onClick={scrollToTop}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            padding: 0
                        }}
                    >
                        PageTop
                        <span style={{ fontSize: '1rem' }}>↑</span>
                    </button>
                </div>

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    padding: '40px 60px',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    {/* Left - Service Card */}
                    <div style={{
                        width: '300px',
                        flexShrink: 0,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'white',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                    }}>
                        {/* Card Image */}
                        <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden' }}>
                            <Image
                                src="/images/links/links_workspace_laptop_1766075249577.png"
                                alt="Winspire RCM Service"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Card Bottom - White */}
                        <div style={{
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'white'
                        }}>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>Winspire RCM</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Service Site</div>
                            </div>
                            <span style={{ fontSize: '1.2rem', color: '#333', fontWeight: 'bold' }}>↗</span>
                        </div>

                        {/* Award Badge */}
                        <div style={{
                            padding: '15px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderTop: '1px solid #eee',
                            background: 'white'
                        }}>
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: '#e53935',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 700
                            }}>★</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.05em' }}>HEALTHCARE EXCELLENCE</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e53935' }}>2024 Award</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Link Columns */}
                    <div style={{ display: 'flex', gap: '40px', flex: 1, justifyContent: 'flex-end' }}>

                        {/* Company Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '180px' }}>
                            <Link href="/company" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{
                                    color: 'white',
                                    marginRight: '12px',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                    position: 'relative',
                                    left: '-5px' // Adjusted for thicker line
                                }}>•</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', margin: 0, cursor: 'pointer' }}>
                                    Company
                                </h3>
                            </Link>
                            <div style={{
                                borderLeft: '2px solid rgba(255,255,255,0.3)', // Thicker line
                                paddingLeft: '24px',
                                marginLeft: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                alignItems: 'flex-start',
                                textAlign: 'left'
                            }}>
                                <Link href="/company#mission" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Mission</Link>
                                <Link href="/company#vision" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Vision</Link>
                                <Link href="/company#values" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Values</Link>
                                <Link href="/company#board" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Board Members</Link>
                                <Link href="/company#profile" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Profile</Link>
                                <Link href="/company#access" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Access</Link>
                            </div>
                        </div>

                        {/* Outcomes Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '180px' }}>
                            <Link href="/outcomes" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{
                                    color: 'white',
                                    marginRight: '12px',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                    position: 'relative',
                                    left: '-5px'
                                }}>•</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', margin: 0, cursor: 'pointer' }}>
                                    Outcomes
                                </h3>
                            </Link>
                            <div style={{
                                borderLeft: '2px solid rgba(255,255,255,0.3)',
                                paddingLeft: '24px',
                                marginLeft: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                alignItems: 'flex-start',
                                textAlign: 'left'
                            }}>
                                <Link href="/outcomes#vision" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Vision</Link>
                                <Link href="/outcomes#team" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Team</Link>
                                <Link href="/outcomes#cases" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Case Studies</Link>
                            </div>
                        </div>

                        {/* Solutions Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '180px' }}>
                            <Link href="/solutions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{
                                    color: 'white',
                                    marginRight: '12px',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                    position: 'relative',
                                    left: '-5px'
                                }}>•</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', margin: 0, cursor: 'pointer' }}>
                                    Solutions
                                </h3>
                            </Link>
                            <div style={{
                                borderLeft: '2px solid rgba(255,255,255,0.3)',
                                paddingLeft: '24px',
                                marginLeft: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                alignItems: 'flex-start',
                                textAlign: 'left'
                            }}>
                                <Link href="/solutions#culture" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Culture</Link>
                                <Link href="/solutions#people" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>People</Link>
                                <Link href="/solutions#environment" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Environment</Link>
                                <Link href="/solutions#faq" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>FAQ</Link>
                            </div>
                        </div>

                        {/* Neura AI Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '180px' }}>
                            <Link href="/neura-ai" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{
                                    color: 'white',
                                    marginRight: '12px',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                    position: 'relative',
                                    left: '-5px'
                                }}>•</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', margin: 0, cursor: 'pointer' }}>
                                    Neura AI
                                </h3>
                            </Link>
                            <div style={{
                                borderLeft: '2px solid rgba(255,255,255,0.3)',
                                paddingLeft: '24px',
                                marginLeft: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                alignItems: 'flex-start',
                                textAlign: 'left'
                            }}>
                                <Link href="/neura-ai#mission" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Mission</Link>
                                <Link href="/neura-ai#services" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Services</Link>
                                <Link href="/neura-ai#technology" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none' }}>Technology</Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar - Matching Reference */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '40px 60px',
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    marginTop: '60px'
                }}>
                    {/* Left - Privacy Badge + Link */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Privacy Badge - White circle with blue P */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '10px',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                <text x="12" y="16" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">P</text>
                            </svg>
                        </div>
                        <Link href="/privacy" style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 500
                        }}>
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Right - Copyright */}
                    <span style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.85rem'
                    }}>
                        © Winspire RCM Inc. All Rights Reserved.
                    </span>
                </div>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="footer-mobile-view">
                {/* 1. Header Logo */}
                <div className="footer-mobile-header">
                    <h2 className="footer-mobile-logo">WINSPIRE</h2>
                </div>

                {/* 2. Links Section (2 Columns) */}
                <div className="footer-mobile-links">
                    {/* Left Col: Main Links */}
                    <div className="footer-links-left">
                        <Link href="/company" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link-item"><span className="bullet">•</span> Company</Link>
                        <Link href="/outcomes" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link-item"><span className="bullet">•</span> Outcomes</Link>
                        <Link href="/solutions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link-item"><span className="bullet">•</span> Solutions</Link>
                        <Link href="/neura-ai" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link-item"><span className="bullet">•</span> Neura AI</Link>
                        <Link href="/book-demo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link-item"><span className="bullet">•</span> Book a Demo</Link>
                    </div>

                    {/* Right Col: Social (Smaller) */}
                    <div className="footer-links-right">
                        <div className="social-label">Social</div>
                        <a href="https://linkedin.com" className="social-link">LinkedIn</a>
                        <a href="https://twitter.com" className="social-link">Twitter</a>
                    </div>
                </div>

                {/* 3. Service Card (Horizontal) */}
                <div className="footer-mobile-card">
                    <div className="footer-card-image">
                        <Image
                            src="/images/links/links_workspace_laptop_1766075249577.png"
                            alt="Service"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="footer-card-content">
                        <div className="footer-card-text">
                            <div className="service-title">Winspire<br />Service<br />Site</div>
                            <span className="card-arrow-icon">↗</span>
                        </div>
                        <div className="footer-award-badge">
                            <span className="award-icon-red">★</span>
                            <div className="award-text">
                                <span className="award-year">2024 Award</span>
                                <span className="award-name">HEALTHCARE EXCELLENCE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Bottom Section */}
                <div className="footer-mobile-bottom">
                    <div className="footer-divider-line"></div>
                    <div className="footer-bottom-row">
                        <div className="footer-policy-copyright">
                            <Link href="/privacy" className="footer-privacy">Privacy Policy</Link>
                            <span className="footer-copyright">© Winspire RCM Inc.<br />All Rights Reserved.</span>
                        </div>
                        {/* P-Mark Logo */}
                        <div className="footer-p-mark">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                <text x="12" y="16" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">P</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
