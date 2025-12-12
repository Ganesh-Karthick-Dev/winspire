/**
 * Layout Component
 * 
 * Page wrapper with semantic HTML structure.
 * Includes: header, main, footer and accessibility features.
 */

import SEOHead from './SEOHead';
import JsonLd from './JsonLd';
import SkipToContent from './SkipToContent';

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

            {/* Semantic header */}
            <header role="banner">
                <nav aria-label="Main navigation">
                    {/* Navigation can be added here if needed */}
                </nav>
            </header>

            {/* Main content area */}
            <main id="main-content" role="main" tabIndex={-1}>
                {children}
            </main>

            {/* Semantic footer */}
            <footer role="contentinfo">
                <p>
                    © {new Date().getFullYear()} Your Company. Built with Next.js, Three.js, and GSAP.
                </p>
            </footer>
        </>
    );
}
