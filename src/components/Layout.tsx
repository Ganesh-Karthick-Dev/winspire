/**
 * Layout Component
 * 
 * Page wrapper with semantic HTML structure.
 * Includes: header, main, footer and accessibility features.
 */

import SEOHead from './SEOHead';
import JsonLd from './JsonLd';
import SkipToContent from './SkipToContent';
import BackgroundVideo from './BackgroundVideo';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    /** Page title */
    title?: string;
    /** Page description */
    description?: string;
}

export default function Layout({
    children,
    title,
    description,
}: LayoutProps) {
    return (
        <>
            <SEOHead title={title} description={description} />
            <JsonLd />

            {/* Skip to content link for keyboard users */}
            <SkipToContent />

            {/* Background Video */}
            <BackgroundVideo />

            {/* Navbar */}
            <Navbar />

            {/* Main content area */}
            <main id="main-content" role="main" tabIndex={-1}>
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
