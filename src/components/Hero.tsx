/**
 * Hero Component
 * 
 * The main hero section with title, subtitle, and CTA.
 * SSR-rendered for SEO - all text content is indexable.
 * 
 * Acts as the trigger area for the initial ScrollTrigger animation.
 */

interface HeroProps {
    /** Main heading (h1) */
    title?: string;
    /** Subtitle text */
    subtitle?: string;
    /** CTA button text */
    ctaText?: string;
    /** CTA button href or onClick handler */
    ctaHref?: string;
    /** Callback when CTA is clicked */
    onCtaClick?: () => void;
}

export default function Hero({
    title = 'Immersive 3D Experience',
    subtitle = 'Explore stunning visuals with smooth scroll animations. Built for performance and accessibility.',
    ctaText = 'Get Started',
    ctaHref = '#features',
    onCtaClick,
}: HeroProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onCtaClick) {
            e.preventDefault();
            onCtaClick();
        }
    };

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
                {/* SSR-rendered H1 - critical for SEO */}
                <h1 id="hero-title" className="hero-title">
                    {title}
                </h1>

                {/* SSR-rendered subtitle - indexable content */}
                <p className="hero-subtitle">
                    {subtitle}
                </p>

                {/* CTA with proper accessibility */}
                <a
                    href={ctaHref}
                    className="cta-button"
                    onClick={handleClick}
                    aria-label={ctaText}
                >
                    {ctaText}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M4 10H16M16 10L11 5M16 10L11 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            </div>
        </section>
    );
}
