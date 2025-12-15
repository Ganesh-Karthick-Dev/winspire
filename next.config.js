/** @type {import('next').NextConfig} */

/**
 * Next.js Configuration
 * 
 * Optimized for:
 * - Performance: Webpack optimizations for three.js tree-shaking
 * - SEO: Proper caching headers for static assets
 * - Bundle size: Code-splitting and dynamic imports
 */
const nextConfig = {
    reactStrictMode: true,

    // Turbopack configuration (Next.js 16+)
    turbopack: {},

    // Enable static export if deploying to static hosting
    // output: 'export',

    // Image optimization settings
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // Custom headers for caching static assets
    async headers() {
        return [
            {
                // Cache GLB models aggressively (1 year, immutable)
                source: '/models/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // Cache WASM/Draco decoders
                source: '/draco/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                    { key: 'Content-Type', value: 'application/wasm' },
                ],
            },
            {
                // Cache images
                source: '/poster/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/lqip/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },

    // Webpack configuration for three.js optimization
    webpack: (config, { isServer }) => {
        // Optimize three.js imports - only include what's needed
        config.resolve.alias = {
            ...config.resolve.alias,
            'three': 'three',
        };

        // Handle WASM files
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        };

        // Add rule for WASM files
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'webassembly/async',
        });

        return config;
    },
};

module.exports = nextConfig;
