/**
 * Layout Component
 * 
 * Page wrapper with semantic HTML structure.
 * Includes: header, main, footer and accessibility features.
 */

import SEOHead from './SEOHead';
import JsonLd from './JsonLd';
import SkipToContent from './SkipToContent';
import AnimatedBackground from './AnimatedBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import FlowerCursor from './FlowerCursor';

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

            {/* Flower/Sparkle Cursor Effect - commented out for later use */}
            {/* <FlowerCursor /> */}

            {/* Skip to content link for keyboard users */}
            <SkipToContent />

            {/* Animated Gradient Background */}
            <AnimatedBackground />

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
