/**
 * SEO Configuration
 * 
 * Centralized site metadata for SEO, OpenGraph, and Twitter cards.
 * Update these values for your specific site.
 */

export const seoConfig = {
    // Site identity
    siteName: 'Your 3D Site',
    siteUrl: 'https://your-domain.com',

    // Default page metadata
    defaultTitle: 'Immersive 3D Experience',
    titleTemplate: '%s | Your 3D Site',
    defaultDescription: 'Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance.',

    // OpenGraph defaults
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'Your 3D Site',
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
        name: 'Your Company Name',
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
