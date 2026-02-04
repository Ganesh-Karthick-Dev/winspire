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
// import Navbar from './Navbar'; // Old navbar - commented out
// import SmartNavbar from './SmartNavbar'; // Old smart navbar - commented out
import DockNavbar from './DockNavbar';
import Footer from './Footer';
import FlowerCursor from './FlowerCursor';
import SmoothScroll from './SmoothScroll';

interface LayoutProps {
    children: React.ReactNode;
    /** Page title */
    title?: string;
    /** Page description */
    description?: string;
    /** Hide default navbar (for custom placement) */
    hideNavbar?: boolean;
}

export default function Layout({
    children,
    title,
    description,
    hideNavbar = false,
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

            {/* Dock Navbar - Right Side */}
            {!hideNavbar && <DockNavbar />}

            {/* Main content area */}
            <SmoothScroll>
                <main id="main-content" role="main" tabIndex={-1}>
                    {children}
                </main>
            </SmoothScroll>

            {/* Footer */}
            <Footer />
        </>
    );
}

