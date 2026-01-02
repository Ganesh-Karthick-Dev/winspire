/**
 * Privacy Policy Page - Simple Layout
 */

'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Privacy() {
    useEffect(() => {
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Privacy Policy" description="Winspire RCM Privacy Policy">
            <div style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
                <article className="privacy-article">
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <h1>Privacy Policy</h1>
                        <p className="tagline">Privacy is not a checkbox.</p>
                        <p className="tagline-strong">It's a responsibility.</p>
                    </div>

                    <p>At Winspire RCM, we operate in an industry where trust is not optional. Healthcare data carries real consequences, and we treat that responsibility with the seriousness it deserves.</p>
                    <p>This Privacy Policy explains how we collect, use, protect, and respect information when you interact with our website, services, and platforms, including Neura AI.</p>

                    <h2>Our Privacy Philosophy</h2>
                    <p>We believe:</p>
                    <ul>
                        <li>Data should be used with purpose, not curiosity</li>
                        <li>Access should be limited, not convenient</li>
                        <li>Transparency should be default, not requested</li>
                        <li>Security should be proactive, not reactive</li>
                    </ul>
                    <p>Privacy is designed into our systems, processes, and culture.</p>

                    <h2>Information We Collect</h2>
                    <p>We collect only what is necessary to operate effectively and responsibly.</p>

                    <h3>Information You Provide Directly</h3>
                    <p>This may include:</p>
                    <ul>
                        <li>Name, title, and organization</li>
                        <li>Email address and contact details</li>
                        <li>Information shared during demos or inquiries</li>
                        <li>Communications you send to us</li>
                    </ul>
                    <p>We do not collect information without a clear operational reason.</p>

                    <h3>Information Collected Automatically</h3>
                    <p>When you visit our website, we may collect limited technical information such as:</p>
                    <ul>
                        <li>Browser type and device information</li>
                        <li>IP address and general location</li>
                        <li>Pages visited and time spent</li>
                    </ul>
                    <p>This data helps us improve performance, security, and experience.</p>
                    <p>It is never used to profile individuals personally.</p>

                    <h2>How We Use Information</h2>
                    <p>We use information only for legitimate business purposes, including:</p>
                    <ul>
                        <li>Responding to inquiries and requests</li>
                        <li>Providing demonstrations or services</li>
                        <li>Improving our website and platform performance</li>
                        <li>Communicating relevant updates</li>
                        <li>Ensuring security and compliance</li>
                    </ul>
                    <p>We do not sell, rent, or trade personal information.</p>

                    <h2>Use of Healthcare and Client Data</h2>
                    <p>When providing services, we may process healthcare-related or operational data on behalf of clients.</p>
                    <p>In these cases:</p>
                    <ul>
                        <li>We act strictly as a data processor</li>
                        <li>Data ownership remains with the client</li>
                        <li>Access is limited to authorized personnel</li>
                        <li>Use is governed by contractual agreements</li>
                    </ul>
                    <p>All healthcare data is handled in alignment with applicable regulations, including HIPAA where applicable.</p>

                    <h2>Data Protection and Security</h2>
                    <p>Security is treated as an operational discipline, not an IT feature.</p>
                    <p>We implement:</p>
                    <ul>
                        <li>Role-based access controls</li>
                        <li>Encryption in transit and at rest</li>
                        <li>Secure infrastructure and monitoring</li>
                        <li>Regular internal reviews and audits</li>
                    </ul>
                    <p>No system is ever claimed to be infallible.</p>
                    <p>But protection is continuously strengthened.</p>

                    <h2>Sharing of Information</h2>
                    <p>Information may be shared only:</p>
                    <ul>
                        <li>With trusted service providers under strict confidentiality</li>
                        <li>When required by law or regulation</li>
                        <li>To protect rights, safety, or security</li>
                    </ul>
                    <p>We never share data for advertising or unrelated commercial use.</p>

                    <h2>Cookies and Tracking</h2>
                    <p>Our website may use cookies or similar technologies to:</p>
                    <ul>
                        <li>Improve site functionality</li>
                        <li>Understand usage patterns</li>
                        <li>Enhance user experience</li>
                    </ul>
                    <p>You may control cookie preferences through your browser settings.</p>

                    <h2>Data Retention</h2>
                    <p>We retain information only for as long as necessary:</p>
                    <ul>
                        <li>To fulfill the purpose for which it was collected</li>
                        <li>To comply with legal or contractual obligations</li>
                    </ul>
                    <p>When data is no longer required, it is securely deleted or anonymized.</p>

                    <h2>Your Rights</h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Request correction or deletion</li>
                        <li>Limit or object to certain uses</li>
                        <li>Request information about data handling</li>
                    </ul>
                    <p>We respect these rights and respond responsibly.</p>

                    <h2>Third-Party Links</h2>
                    <p>Our website may contain links to third-party sites.</p>
                    <p>We are not responsible for the privacy practices or content of those sites.</p>
                    <p>We encourage reviewing their policies separately.</p>

                    <h2>Policy Updates</h2>
                    <p>This Privacy Policy may be updated periodically to reflect:</p>
                    <ul>
                        <li>Regulatory changes</li>
                        <li>Operational improvements</li>
                        <li>Security enhancements</li>
                    </ul>
                    <p>Updates will be posted on this page with the revised effective date.</p>

                    <h2>Contact Us</h2>
                    <p>If you have questions about privacy, data handling, or security practices, you may contact us at:</p>
                    <p><a href="mailto:privacy@winspirercm.com" style={{ color: '#3b82f6' }}>privacy@winspirercm.com</a></p>
                    <p>or through our official contact channels.</p>

                    <h2>Final Word</h2>
                    <p>Privacy is not just about compliance.</p>
                    <p style={{ fontWeight: '600' }}>It's about respect.</p>
                    <p>We protect data the same way we manage revenue cycles — deliberately, transparently, and with accountability.</p>
                    <p style={{ color: '#999', fontSize: '13px', marginTop: '32px' }}>Last updated: January 2, 2026</p>

                    <style jsx>{`
                        .privacy-article {
                            max-width: 900px;
                            margin: 0 auto;
                            padding: 160px 48px 60px;
                            color: #333;
                            font-size: 15px;
                            line-height: 1.7;
                        }
                        h1 {
                            font-size: 2rem;
                            margin-bottom: 4px;
                            color: #111;
                        }
                        .tagline {
                            font-style: italic;
                            color: #666;
                            margin: 0 0 2px;
                        }
                        .tagline-strong {
                            font-weight: 600;
                            color: #111;
                            margin: 0 0 12px;
                        }
                        h2 {
                            font-size: 1.1rem;
                            font-weight: 600;
                            color: #111;
                            margin: 20px 0 6px;
                            border-bottom: 1px solid #e5e7eb;
                            padding-bottom: 4px;
                        }
                        h3 {
                            font-size: 0.95rem;
                            font-weight: 600;
                            color: #333;
                            margin: 12px 0 4px;
                        }
                        p {
                            margin: 0 0 6px;
                        }
                        ul {
                            margin: 4px 0 6px 20px;
                            padding: 0;
                        }
                        li {
                            margin-bottom: 2px;
                        }
                        @media (max-width: 768px) {
                            .privacy-article {
                                padding: 100px 20px 40px;
                            }
                            h1 {
                                font-size: 1.5rem;
                            }
                            h2 {
                                margin: 16px 0 4px;
                            }
                        }
                    `}</style>
                </article>
            </div>
        </Layout>
    );
}
