/**
 * JSON-LD Structured Data Component
 * 
 * Renders Organization schema markup for SEO.
 * This is SSR-rendered to ensure search engines can parse the structured data.
 */

import { seoConfig } from '@/config/seo';

interface JsonLdProps {
    /** Additional schema properties to merge */
    additionalData?: Record<string, unknown>;
}

export default function JsonLd({ additionalData }: JsonLdProps) {
    // Organization schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: seoConfig.organization.name,
        url: seoConfig.organization.url,
        logo: seoConfig.organization.logo,
        sameAs: seoConfig.organization.sameAs,
        ...additionalData,
    };

    // WebPage schema for the current page
    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoConfig.defaultTitle,
        description: seoConfig.defaultDescription,
        url: seoConfig.siteUrl,
        publisher: {
            '@type': 'Organization',
            name: seoConfig.organization.name,
            logo: {
                '@type': 'ImageObject',
                url: seoConfig.organization.logo,
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
        </>
    );
}
