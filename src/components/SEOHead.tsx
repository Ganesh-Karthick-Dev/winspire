/**
 * SEOHead Component
 * 
 * Renders all SEO-related meta tags in the document head.
 * Includes title, description, OpenGraph, Twitter cards, canonical URL,
 * and preload hints for LCP optimization.
 * 
 * This component is SSR-rendered to ensure search engines can index content.
 */

import Head from 'next/head';
import { seoConfig } from '@/config/seo';

interface SEOHeadProps {
    /** Page title (will be appended with site name) */
    title?: string;
    /** Page description for meta and OG tags */
    description?: string;
    /** Canonical URL for this page */
    canonicalUrl?: string;
    /** OpenGraph image URL */
    ogImage?: string;
    /** Additional keywords */
    keywords?: string;
    /** Disable indexing for this page */
    noIndex?: boolean;
}

export default function SEOHead({
    title,
    description = seoConfig.defaultDescription,
    canonicalUrl,
    ogImage = seoConfig.openGraph.defaultImage,
    keywords,
    noIndex = false,
}: SEOHeadProps) {
    // Build the full title with template
    const fullTitle = title
        ? seoConfig.titleTemplate.replace('%s', title)
        : seoConfig.defaultTitle;

    // Build full URLs
    const fullCanonicalUrl = canonicalUrl || seoConfig.siteUrl;
    const fullOgImage = ogImage.startsWith('http')
        ? ogImage
        : `${seoConfig.siteUrl}${ogImage}`;

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={seoConfig.organization.name} />

            {/* Robots */}
            {noIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}

            {/* Canonical URL */}
            <link rel="canonical" href={fullCanonicalUrl} />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Theme Color */}
            <meta name="theme-color" content="#000000" />

            {/* OpenGraph Tags */}
            <meta property="og:type" content={seoConfig.openGraph.type} />
            <meta property="og:url" content={fullCanonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:width" content={String(seoConfig.openGraph.imageWidth)} />
            <meta property="og:image:height" content={String(seoConfig.openGraph.imageHeight)} />
            <meta property="og:site_name" content={seoConfig.openGraph.siteName} />
            <meta property="og:locale" content={seoConfig.openGraph.locale} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content={seoConfig.twitter.cardType} />
            <meta name="twitter:site" content={seoConfig.twitter.site} />
            <meta name="twitter:creator" content={seoConfig.twitter.handle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />


            {/* Preconnect to external resources */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

            {/* DNS Prefetch */}
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
    );
}
