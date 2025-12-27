/**
 * SEO Configuration
 * 
 * Centralized site metadata for SEO, OpenGraph, and Twitter cards.
 * Update these values for your specific site.
 */

export const seoConfig = {
    // Site identity
    siteName: 'Winspire RCM',
    siteUrl: 'https://your-domain.com',

    // Default page metadata
    defaultTitle: 'AI-Powered Healthcare Revenue Cycle Management',
    titleTemplate: '%s | Winspire RCM',
    defaultDescription: 'Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance.',

    // OpenGraph defaults
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'Winspire RCM',
        defaultImage: '/poster/hero-poster.webp',
        imageWidth: 1200,
        imageHeight: 630,
    },

    // Twitter card defaults
    twitter: {
        handle: '@yourtwitterhandle',
        site: '@yourtwitterhandle',
        cardType: 'summary_large_image',
    },

    // Organization structured data (JSON-LD)
    organization: {
        name: 'Winspire RCM',
        url: 'https://your-domain.com',
        logo: 'https://your-domain.com/logo.png',
        sameAs: [
            'https://twitter.com/yourtwitterhandle',
            'https://linkedin.com/company/yourcompany',
            'https://github.com/yourcompany',
        ],
    },
} as const;

export type SEOConfig = typeof seoConfig;
