/**
 * Privacy Policy Page - Updated
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
        <Layout title="Privacy Policy" description="Winspire RCM Privacy & Messaging Policy">
            <div style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
                <article className="privacy-article">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1>Privacy & Messaging Policy</h1>
                    </div>

                    <p>Winspire RCM (“we,” “our,” or “us”) values your privacy and is committed to protecting your personal information. This Privacy & Messaging Policy explains how we collect, use, disclose, and safeguard information when you visit our website, engage with our services, or interact with us through SMS, email, phone calls, or other communication campaigns.</p>
                    <p>By using our website or engaging with our communications, you consent to the practices described in this Policy.</p>

                    <h2>1. Introduction</h2>
                    <p>This Policy explains how Winspire RCM collects, uses, and protects personal information.</p>
                    <p>“Personal information” includes details that identify or relate to you directly or indirectly, such as your name, contact details, professional information, device data, and interaction history.</p>
                    <p>This Policy applies to:</p>
                    <ul>
                        <li>Website visitors</li>
                        <li>Business inquiries and prospects</li>
                        <li>Job applicants and candidates</li>
                        <li>Clients and partners</li>
                        <li>Individuals who opt in to receive communications from Winspire RCM</li>
                    </ul>

                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <h3>a. Information You Provide</h3>
                    <ul>
                        <li>Name, email address, phone number</li>
                        <li>Company name, job title, and professional details</li>
                        <li>Messages, inquiries, and form submissions</li>
                        <li>Resume and application details (for careers)</li>
                    </ul>
                    <h3>b. Information Collected Automatically</h3>
                    <ul>
                        <li>IP address, browser type, device information</li>
                        <li>Pages visited, interaction data, and usage patterns</li>
                        <li>Approximate location based on IP address</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Respond to inquiries and requests</li>
                        <li>Provide information about our services</li>
                        <li>Schedule meetings, demos, or interviews</li>
                        <li>Share job openings and application updates</li>
                        <li>Improve our website, services, and communications</li>
                        <li>Maintain security and prevent misuse</li>
                        <li>Comply with legal and regulatory requirements</li>
                    </ul>
                    <p>We do not collect or request patient medical records, insurance information, or Protected Health Information (PHI) through general website forms.</p>

                    <h2>4. Messaging & Communications Policy</h2>
                    <h3>a. Types of Messages You May Receive</h3>
                    <p>If you opt in, you may receive communications related to:</p>
                    <ul>
                        <li>Winspire RCM services and capabilities</li>
                        <li>Job openings and career opportunities</li>
                        <li>Interview scheduling and reminders</li>
                        <li>Application or onboarding status updates</li>
                        <li>Operational or administrative communications</li>
                    </ul>
                    <p>We do not send unsolicited promotional messages.</p>

                    <h3>b. Consent</h3>
                    <p>By providing your phone number or email address through our website, forms, or direct communication, you consent to receive communications from Winspire RCM relevant to your inquiry, application, or professional engagement.</p>
                    <p>Consent is not a condition of purchase or service.</p>

                    <h3>c. Message Frequency</h3>
                    <p>Message frequency may vary based on:</p>
                    <ul>
                        <li>Your interaction with us</li>
                        <li>Client engagement requirements</li>
                        <li>Hiring or interview processes</li>
                    </ul>

                    <h3>d. Message and Data Rates</h3>
                    <p>Standard message and data rates may apply based on your mobile carrier and service plan.</p>

                    <h3>e. Opt Out Instructions</h3>
                    <p>You may opt out at any time:</p>
                    <ul>
                        <li>SMS: Reply “STOP” to unsubscribe from text messages</li>
                        <li>Email: Click the “Unsubscribe” link in the email or reply with “Unsubscribe”</li>
                    </ul>
                    <p>After opting out, you may receive a confirmation message. No further messages will be sent unless you re opt in.</p>

                    <h3>f. Support & Help</h3>
                    <p>For assistance:</p>
                    <ul>
                        <li>Reply “HELP” to any SMS message</li>
                        <li>Email: <a href="mailto:contact@winspirercm.com">contact@winspirercm.com</a></li>
                        <li>Phone: +1 (585) 563 7788</li>
                    </ul>

                    <h2>5. Sharing of Information</h2>
                    <p>We respect your privacy.</p>
                    <ul>
                        <li>We do not sell, rent, or share your personal information with third parties for promotional or marketing purposes.</li>
                        <li>Information may be shared only with trusted service providers who support our operations (such as hosting, communication, or scheduling tools), and only to the extent necessary to perform those services.</li>
                        <li>We may disclose information if required by law or to protect the rights, security, and integrity of Winspire RCM.</li>
                    </ul>

                    <h2>6. Data Security</h2>
                    <p>We use industry standard administrative, technical, and organizational safeguards to protect your information from unauthorized access, misuse, alteration, or disclosure.</p>
                    <p>While we take security seriously, no system can be guaranteed to be completely secure. If you believe your information has been compromised, please contact us immediately.</p>

                    <h2>7. Children’s Privacy</h2>
                    <p>Our services and communications are intended for adults.</p>
                    <p>We do not knowingly collect personal information from individuals under the age of 18.</p>

                    <h2>8. Data Retention</h2>
                    <p>We retain personal information only as long as necessary to:</p>
                    <ul>
                        <li>Fulfill the purpose for which it was collected</li>
                        <li>Meet business, legal, and compliance requirements</li>
                        <li>Resolve disputes and enforce agreements</li>
                    </ul>

                    <h2>9. Your Privacy Rights</h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Request corrections</li>
                        <li>Request deletion</li>
                        <li>Withdraw consent for communications</li>
                    </ul>
                    <p>To exercise your rights, contact us at <a href="mailto:contact@winspirercm.com">contact@winspirercm.com</a>.</p>

                    <h2>10. Policy Updates</h2>
                    <p>We may update this Policy periodically. Any changes will be posted on this page with an updated effective date. Continued use of our website or services constitutes acceptance of the revised Policy.</p>

                    <h2>11. Contact Information</h2>
                    <p>For questions, concerns, or privacy related requests:</p>
                    <p><strong>Winspire RCM</strong><br />
                    Email: <a href="mailto:contact@winspirercm.com">contact@winspirercm.com</a><br />
                    Phone: +1 (585) 563 7788</p>

                    <style jsx>{`
                        .privacy-article {
                            max-width: 900px;
                            margin: 0 auto;
                            padding: 160px 48px 60px;
                            color: #1a1a1a !important;
                            font-size: 16pt; /* Requested font size */
                            line-height: 1.6;
                        }
                        h1 {
                            font-size: 2.5rem;
                            margin-bottom: 20px;
                            color: #000000 !important;
                        }
                        h2 {
                            font-size: 1.4rem;
                            font-weight: 700;
                            color: #000000 !important;
                            margin: 48px 0 24px; /* Increased space */
                            padding-top: 0;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 12px;
                        }
                        h3 {
                            font-size: 1.15rem;
                            font-weight: 600;
                            color: #1a1a1a !important;
                            margin: 32px 0 16px; /* Increased space */
                        }
                        p {
                            margin: 0 0 16px; /* Increased space */
                            color: #1a1a1a !important;
                        }
                        ul {
                            margin: 0 0 24px 20px;
                            padding: 0;
                            color: #1a1a1a !important;
                        }
                        li {
                            margin-bottom: 4px;
                            color: #1a1a1a !important;
                        }
                        a {
                            color: #3b82f6 !important;
                            text-decoration: underline !important;
                        }
                        a:hover {
                            text-decoration: none !important;
                        }
                        @media (max-width: 768px) {
                            .privacy-article {
                                padding: 100px 20px 40px;
                                font-size: 14pt; /* Slightly smaller for mobile readability */
                            }
                            h1 {
                                font-size: 2rem;
                            }
                        }
                    `}</style>
                </article>
            </div>
        </Layout>
    );
}
