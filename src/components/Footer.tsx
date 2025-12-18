/**
 * Footer Component (Matching Reference Exactly)
 * 
 * Features:
 * - Service card with purple gradient (left side)
 * - Three link columns (About Us, Careers, News)
 * - Bottom bar with Privacy Policy and Copyright
 * - Transparent background
 */

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="new-footer">
            {/* Main Content */}
            <div className="footer-main-content">
                {/* Service Card - Purple Gradient */}
                <div className="footer-service-card">
                    <div className="service-card-logo">
                        <div className="logo-icon">
                            <Image 
                                src="/images/links/links_workspace_laptop_1766075249577.png" 
                                alt="Winspire RCM"
                                width={260}
                                height={140}
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>
                    </div>
                    <div className="service-card-bottom">
                        <div className="service-card-info">
                            <span className="service-card-title">Winspire RCM</span>
                            <span className="service-card-subtitle">Service Site</span>
                        </div>
                        <span className="service-card-arrow">↗</span>
                    </div>
                    <div className="service-card-badge">
                        <div className="badge-icon">🏆</div>
                        <div className="badge-text-wrap">
                            <span className="badge-label">HEALTHCARE RCM</span>
                            <span className="badge-year">2024 Excellence</span>
                        </div>
                    </div>
                </div>

                {/* Link Columns */}
                <div className="footer-link-columns">
                    {/* About Us Column */}
                    <div className="footer-link-column">
                        <h3 className="footer-column-title">About Us</h3>
                        <ul className="footer-column-links">
                            <li><a href="/about#mission">Mission</a></li>
                            <li><a href="/about#vision">Vision</a></li>
                            <li><a href="/about#values">Values</a></li>
                            <li><a href="/about#team">Board Members</a></li>
                            <li><a href="/about#awards">Award</a></li>
                            <li><a href="/about#profile">Corporate Profile</a></li>
                            <li><a href="/contact">Access</a></li>
                        </ul>
                    </div>

                    {/* Careers Column */}
                    <div className="footer-link-column">
                        <h3 className="footer-column-title">Careers</h3>
                        <ul className="footer-column-links">
                            <li><a href="/careers#message">Message</a></li>
                            <li><a href="/careers#jobs">Job Categories</a></li>
                            <li><a href="/careers#people">People</a></li>
                            <li><a href="/careers#environment">Work Environment</a></li>
                            <li><a href="/careers#materials">Recruitment<br/>Materials</a></li>
                            <li><a href="/careers#faq">FAQ</a></li>
                            <li><a href="/careers#culture">Culture Note</a></li>
                        </ul>
                    </div>

                    {/* News Column */}
                    <div className="footer-link-column">
                        <h3 className="footer-column-title">News</h3>
                        <ul className="footer-column-links">
                            <li><a href="/news#media">Media</a></li>
                            <li><a href="/news#events">Event</a></li>
                            <li><a href="/news#company">Company</a></li>
                            <li><a href="/news#releases">Release</a></li>
                            <li><a href="/news#case-studies">Case Study</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom-bar">
                <div className="footer-bottom-left">
                    <div className="privacy-icon">🔒</div>
                    <a href="/privacy" className="privacy-link">Privacy Policy</a>
                </div>
                <div className="footer-bottom-right">
                    <span className="copyright">© Winspire RCM Inc. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}
