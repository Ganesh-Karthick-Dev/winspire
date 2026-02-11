/**
 * Terms and Conditions Page
 */

'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Terms() {
    useEffect(() => {
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');
    }, []);

    return (
        <Layout title="Terms and Conditions" description="Winspire RCM Terms and Conditions">
            <div style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
                <article className="terms-article">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1>Terms and Conditions</h1>
                    </div>

                    <p><strong>Winspire RCM</strong></p>
                    <p><strong>Effective Date:</strong> [18th May 2024]</p>
                    <p><strong>Last Updated:</strong> [10th Feb, 2026]</p>
                    <p>These Terms and Conditions (“Terms”) govern your access to and use of the websites operated by Winspire RCM, LLC and its affiliates (including Winspire RCM Private Limited) (“Winspire,” “we,” “our,” “us”), including [winspirercm.com], and any related pages, portals, forms, and content (collectively, the “Website”).</p>
                    <p>By accessing or using the Website, you agree to these Terms. If you do not agree, do not use the Website.</p>

                    <h2>1. Who We Are</h2>
                    <p>Winspire RCM is a technology enabled revenue cycle management company that provides business services, technology, and related solutions to healthcare organizations. The Website is provided for informational and business purposes.</p>

                    <h2>2. Eligibility</h2>
                    <p>You must be at least 18 years old to use this Website. By using the Website, you represent that you are at least 18 and have the authority to agree to these Terms.</p>

                    <h2>3. Changes to These Terms</h2>
                    <p>We may update these Terms from time to time. We will post the updated version with a revised “Last Updated” date. Your continued use of the Website after changes are posted means you accept the updated Terms.</p>

                    <h2>4. Website Purpose and No Medical Advice</h2>
                    <p>The Website provides general information about Winspire RCM, our capabilities, and related resources.</p>
                    <p>The Website does not provide medical advice, clinical guidance, diagnosis, or treatment. Do not rely on Website content as a substitute for professional medical advice or your provider’s instructions.</p>

                    <h2>5. Important Notice About PHI and Sensitive Data</h2>
                    <p>Unless a specific page explicitly states otherwise, this Website is not designed for submission of Protected Health Information (“PHI”), medical records, insurance information, claim numbers, or other patient specific sensitive data.</p>
                    <p>You agree not to submit PHI through general contact forms, career forms, chat widgets, or email links displayed on the Website. If you submit such information, you do so at your own risk and you authorize us to handle it only to the extent necessary to respond, secure our systems, and comply with applicable law.</p>
                    <p>Client specific PHI processing obligations, if any, are governed by the applicable Business Associate Agreement and services agreement, not by these Terms.</p>

                    <h2>6. Privacy Policy</h2>
                    <p>Our Privacy Policy explains how we collect and use personal information. By using the Website, you agree that we may collect and use information as described in our Privacy Policy.</p>
                    <p>If there is a conflict between these Terms and the Privacy Policy regarding personal information, the Privacy Policy will govern.</p>

                    <h2>7. Communications and Messaging</h2>
                    <p>If you provide your email address or phone number, you may receive communications from Winspire RCM as described in our Privacy and Messaging Policy, including messages relating to services, job opportunities, interview scheduling, application status updates, and administrative communications.</p>
                    <p>Message frequency may vary. Standard message and data rates may apply.</p>
                    <p>SMS opt out: reply “STOP”</p>
                    <p>SMS help: reply “HELP”</p>
                    <p>Email opt out: use the unsubscribe link or reply “Unsubscribe”</p>
                    <p>You agree that communications may be provided electronically and that such communications satisfy legal notice requirements where permitted by law.</p>

                    <h2>8. Intellectual Property and License</h2>
                    <h3>8.1 Ownership</h3>
                    <p>All content on the Website, including text, graphics, logos, icons, images, videos, designs, interfaces, software, code, and the arrangement and look and feel of the Website, is owned by or licensed to Winspire and is protected by intellectual property laws.</p>
                    <p>“Winspire,” “Winspire RCM,” “Neura AI,” and associated logos and brand elements are trademarks of Winspire or its licensors. No rights are granted to you except as expressly stated in these Terms.</p>
                    <h3>8.2 Limited License</h3>
                    <p>We grant you a limited, revocable, non exclusive, non transferable license to access and use the Website for lawful business purposes and personal informational use.</p>
                    <p>You may not copy, reproduce, distribute, publish, modify, create derivative works, reverse engineer, scrape, or commercially exploit any Website content without our written permission, except where permitted by law.</p>

                    <h2>9. Acceptable Use</h2>
                    <p>You agree not to use the Website in any way that:</p>
                    <ol>
                        <li>Violates any law or regulation</li>
                        <li>Infringes the rights of others</li>
                        <li>Attempts unauthorized access to systems or data</li>
                        <li>Disrupts, overloads, or damages the Website</li>
                        <li>Introduces malware, viruses, bots, or harmful code</li>
                        <li>Scrapes, harvests, or collects data without authorization</li>
                        <li>Misrepresents your identity or affiliation</li>
                        <li>Submits false, misleading, defamatory, or abusive content</li>
                        <li>Uses the Website to send unsolicited or unauthorized marketing or spam</li>
                    </ol>
                    <p>We may suspend or block access to the Website at any time if we believe you have violated these Terms.</p>

                    <h2>10. User Submissions</h2>
                    <h3>10.1 Submissions Through Forms</h3>
                    <p>If you submit information through the Website (including contact inquiries, demo requests, partnership inquiries, or career applications), you represent that the information is accurate to the best of your knowledge and that you have the right to provide it.</p>
                    <h3>10.2 Ownership and Permission</h3>
                    <p>Unless otherwise stated in writing, any non confidential information or materials you submit through the Website may be used by Winspire for the purpose of responding to your inquiry, improving our Website, and operating our business.</p>
                    <p>Do not submit trade secrets or confidential information through the Website unless a separate written agreement is in place.</p>
                    <h3>10.3 Career Applications</h3>
                    <p>If you apply for a role through the Website, you acknowledge that hiring decisions are at Winspire’s sole discretion. Submission of an application does not create an employment relationship, guarantee an interview, or promise employment.</p>

                    <h2>11. Third Party Links and Services</h2>
                    <p>The Website may include links to third party websites or tools. We do not control and are not responsible for third party content, privacy practices, security, or terms. Your use of third party sites is at your own risk and subject to their terms.</p>

                    <h2>12. Disclaimers</h2>
                    <p><strong>THE WEBSITE AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.</strong></p>
                    <p>To the fullest extent permitted by law, Winspire disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, completeness, reliability, and non infringement.</p>
                    <p>We do not warrant that the Website will be uninterrupted, error free, secure, or free of harmful components.</p>
                    <p>Any statements about outcomes, performance, timelines, or results are illustrative and may vary based on payer mix, specialty, workflow, baseline performance, data quality, and client operational factors. Actual results are not guaranteed.</p>

                    <h2>13. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Winspire and its officers, directors, employees, contractors, affiliates, and licensors will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, revenue, data, goodwill, or business interruption, arising out of or related to your use of the Website.</p>
                    <p>To the fullest extent permitted by law, Winspire’s total liability for any claim arising out of or related to the Website will not exceed USD 100.</p>
                    <p>Some jurisdictions do not allow certain limitations of liability, so some limitations may not apply to you.</p>

                    <h2>14. Indemnification</h2>
                    <p>You agree to defend, indemnify, and hold harmless Winspire and its officers, directors, employees, affiliates, and agents from any claims, damages, liabilities, losses, and expenses (including reasonable attorney fees) arising from or related to:</p>
                    <ol>
                        <li>Your use of the Website</li>
                        <li>Your violation of these Terms</li>
                        <li>Your violation of any law or third party rights</li>
                        <li>Any content or information you submit through the Website</li>
                    </ol>

                    <h2>15. Suspension and Termination</h2>
                    <p>We may suspend or terminate your access to the Website at any time, without notice, if we believe you have violated these Terms or if we discontinue the Website. Sections that by their nature should survive termination will survive, including intellectual property, disclaimers, limitation of liability, indemnification, and governing law.</p>

                    <h2>16. Feedback</h2>
                    <p>If you provide suggestions, ideas, or feedback, you grant Winspire a worldwide, perpetual, irrevocable, royalty free license to use, modify, and incorporate that feedback into our products, services, and Website without compensation.</p>

                    <h2>17. Copyright Complaints</h2>
                    <p>If you believe content on the Website infringes your copyright, send a notice to [legal@winspirercm.com] with:</p>
                    <ol>
                        <li>Identification of the copyrighted work</li>
                        <li>Identification of the allegedly infringing material</li>
                        <li>Your contact information</li>
                        <li>A statement that you have a good faith belief the use is unauthorized</li>
                        <li>A statement under penalty of perjury that the information is accurate and you are authorized to act</li>
                        <li>Your physical or electronic signature</li>
                    </ol>
                    <p>We may remove content and take appropriate action.</p>

                    <h2>18. Governing Law and Dispute Resolution</h2>
                    <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict of laws principles.</p>
                    <h3>18.1 Informal Resolution</h3>
                    <p>Before filing a claim, you agree to contact us and attempt to resolve the dispute informally by emailing [legal@winspirercm.com] with a description of the issue and the relief requested.</p>
                    <h3>18.2 Venue</h3>
                    <p>If a dispute cannot be resolved informally, you agree that any legal action will be brought in the state or federal courts located in Delaware, and you consent to personal jurisdiction in those courts.</p>

                    <h2>19. International Users</h2>
                    <p>If you access the Website from outside the United States, you understand that your information may be processed in the United States and other jurisdictions where Winspire or its service providers operate.</p>

                    <h2>20. Severability</h2>
                    <p>If any provision of these Terms is found unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force.</p>

                    <h2>21. Entire Agreement</h2>
                    <p>These Terms, together with the Privacy Policy and any additional posted policies, form the entire agreement between you and Winspire relating to your use of the Website, and supersede prior understandings regarding the Website.</p>

                    <h2>22. Contact Information</h2>
                    <p>Questions about these Terms can be sent to:</p>
                    <p><strong>Winspire RCM, LLC</strong><br />
                    2810 N Church St, Wilmington, Delaware 19802, USA<br />
                    Email: <a href="mailto:contact@winspirercm.com">contact@winspirercm.com</a><br />
                    Phone: +1 (585) 563 7788</p>

                    <style jsx>{`
                        .terms-article {
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
                            margin: 48px 0 24px; /* Increased space matching privacy */
                            padding-top: 0;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 12px;
                        }
                        h3 {
                            font-size: 1.15rem;
                            font-weight: 600;
                            color: #1a1a1a !important;
                            margin: 32px 0 16px; /* Increased space matching privacy */
                        }
                        p {
                            margin: 0 0 16px; /* Increased space matching privacy */
                            color: #1a1a1a !important;
                        }
                        ul, ol {
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
                            .terms-article {
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
