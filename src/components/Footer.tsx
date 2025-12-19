/**
 * Footer Component - Precise Match to Reference
 * 
 * Layout:
 * - Center aligned container
 * - Service card (purple gradient top + white bottom)
 * - Three link columns with vertical dividers
 * - Bottom bar with privacy policy and copyright
 */

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="ref-footer">
            {/* Top Row - Logo, Social Links, PageTop */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '40px 60px',
                // borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Logo */}
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    color: 'white',
                    fontFamily: '"Outfit", sans-serif'
                }}>
                    WINSPIRE
                </div>

                {/* Social Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Social</span>
                    <a href="https://note.com" target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '1rem', color: 'white' }}>
                        Note
                    </a>
                    <a href="https://wantedly.com" target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '1rem', color: 'white' }}>
                        Wantedly
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
                gap: '60px',
                padding: '60px',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
            }}>
                {/* Left - Service Card */}
                <div style={{
                    width: '320px',
                    flexShrink: 0,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                }}>
                    {/* Card Image */}
                    <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden' }}>
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
                        <div>
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>Winspire RCM</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Service Site</div>
                        </div>
                        <span style={{ fontSize: '1.2rem', color: '#333' }}>↗</span>
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
                        <div>
                            <div style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.05em' }}>HEALTHCARE EXCELLENCE</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e53935' }}>2024 Award</div>
                        </div>
                    </div>
                </div>

                {/* Right - Link Columns */}
                <div style={{ display: 'flex', gap: '0' }}>
                    {/* About Us Column */}
                    <div style={{ display: 'flex', width: '300px' }}>
                        {/* Vertical Divider */}
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)', marginRight: '30px' }}></div>
                        <div style={{ paddingTop: '10px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white', marginBottom: '40px' }}>
                                <span style={{ color: 'white', marginRight: '8px' }}>•</span>About Us
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                                <li><a href="/about#mission" style={{ color: 'white', fontSize: '0.9rem' }}>Mission</a></li>
                                <li><a href="/about#vision" style={{ color: 'white', fontSize: '0.9rem' }}>Vision</a></li>
                                <li><a href="/about#values" style={{ color: 'white', fontSize: '0.9rem' }}>Values</a></li>
                                <li><a href="/about#team" style={{ color: 'white', fontSize: '0.9rem' }}>Board Members</a></li>
                                <li><a href="/about#awards" style={{ color: 'white', fontSize: '0.9rem' }}>Award</a></li>
                                <li><a href="/about#profile" style={{ color: 'white', fontSize: '0.9rem' }}>Corporate Profile</a></li>
                                <li><a href="/contact" style={{ color: 'white', fontSize: '0.9rem' }}>Access</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Careers Column */}
                    <div style={{ display: 'flex', width: '300px' }}>
                        {/* Vertical Divider */}
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)', marginRight: '30px' }}></div>
                        <div style={{ paddingTop: '10px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white', marginBottom: '40px' }}>
                                <span style={{ color: 'white', marginRight: '8px' }}>•</span>Careers
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                                <li><a href="/careers#message" style={{ color: 'white', fontSize: '0.9rem' }}>Message</a></li>
                                <li><a href="/careers#jobs" style={{ color: 'white', fontSize: '0.9rem' }}>Job Categories</a></li>
                                <li><a href="/careers#people" style={{ color: 'white', fontSize: '0.9rem' }}>People</a></li>
                                <li><a href="/careers#environment" style={{ color: 'white', fontSize: '0.9rem' }}>Work Environment</a></li>
                                <li><a href="/careers#materials" style={{ color: 'white', fontSize: '0.9rem' }}>Recruitment Materials</a></li>
                                <li><a href="/careers#faq" style={{ color: 'white', fontSize: '0.9rem' }}>FAQ</a></li>
                                <li><a href="/careers#culture" style={{ color: 'white', fontSize: '0.9rem' }}>Culture Note</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* News Column */}
                    <div style={{ display: 'flex', width: '350px' }}>
                        {/* Vertical Divider */}
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)', marginRight: '30px' }}></div>
                        <div style={{ paddingTop: '10px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white', marginBottom: '40px' }}>
                                <span style={{ color: 'white', marginRight: '8px' }}>•</span>News
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                                <li><a href="/news#media" style={{ color: 'white', fontSize: '0.9rem' }}>Media</a></li>
                                <li><a href="/news#events" style={{ color: 'white', fontSize: '0.9rem' }}>Event</a></li>
                                <li><a href="/news#company" style={{ color: 'white', fontSize: '0.9rem' }}>Company</a></li>
                                <li><a href="/news#releases" style={{ color: 'white', fontSize: '0.9rem' }}>Release</a></li>
                                <li><a href="/news#case-studies" style={{ color: 'white', fontSize: '0.9rem' }}>Case Study</a></li>
                            </ul>
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
                borderTop: '1px solid rgba(255,255,255,0.1)',
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
                    <a href="/privacy" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}>
                        Privacy Policy
                    </a>
                </div>

                {/* Right - Copyright */}
                <span style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.85rem'
                }}>
                    © Winspire RCM Inc. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
