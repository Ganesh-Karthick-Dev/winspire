# Next.js 3D Site

SEO-first Next.js single-page site with fullscreen WebGL GLTF model, GSAP ScrollTrigger animations, and Lenis smooth scrolling.

## Features

- **3D Model Viewer** - Draco-compressed GLTF with Three.js
- **Smooth Scrolling** - Lenis with GSAP ScrollTrigger integration
- **SEO Optimized** - SSR content, meta tags, JSON-LD structured data
- **Performance First** - Code-split, lazy-loaded 3D, LCP-optimized poster
- **Accessible** - Keyboard nav, focus states, reduced motion support
- **Mobile Fallback** - Static poster for low-end devices

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Setup Checklist

### 1. Draco Decoder Files

Download and place in `public/draco/`:

```bash
# Download from three.js repository
curl -O https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/draco_decoder.wasm
curl -O https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/draco_decoder.js
curl -O https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/draco_wasm_wrapper.js
mv draco_* public/draco/
```

### 2. 3D Model

Optimize your model and place in `public/models/`:

```bash
# Install gltf-transform CLI
npm install -g @gltf-transform/cli

# Optimize your model
npm run optimize-model -- your-model.glb public/models/hero-draco.glb
```

### 3. Poster Image

Create a poster image for LCP and fallback:

```bash
# Place a 1920x1080 WebP image
# public/poster/hero-poster.webp

# Generate LQIP (requires ImageMagick)
convert public/poster/hero-poster.webp -resize 40x -quality 30 public/lqip/hero-blur.jpg
```

### 4. Update Configuration

Edit `src/config/seo.ts`:
- Site name and URL
- Default meta descriptions
- OpenGraph image
- Organization schema

## Project Structure

```
├── public/
│   ├── draco/          # Draco WASM decoders
│   ├── models/         # Optimized GLB files
│   ├── poster/         # Hero poster (LCP target)
│   ├── lqip/           # Low-quality image placeholders
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── GLTFViewer.tsx    # 3D model loader
│   │   ├── WebGLCanvas.tsx   # Canvas element
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Section.tsx       # Reusable section
│   │   ├── Poster.tsx        # Fallback image
│   │   ├── SEOHead.tsx       # Meta tags
│   │   └── JsonLd.tsx        # Structured data
│   ├── config/
│   │   ├── seo.ts            # SEO configuration
│   │   ├── animations.ts     # GSAP presets
│   │   └── three-settings.ts # Renderer config
│   ├── lib/
│   │   ├── threeUtils.ts     # Device detection
│   │   ├── loaderManager.ts  # Loading UI
│   │   └── threeManager.ts   # Scene management
│   ├── pages/
│   │   ├── _document.tsx     # Static loader HTML
│   │   ├── _app.tsx          # App wrapper
│   │   └── index.tsx         # Main page
│   └── styles/
│       └── globals.css       # Global styles
└── scripts/
    └── optimize-model.sh     # Model optimization
```

## Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | ≤ 2.5s | Poster image as LCP, preloaded |
| CLS | = 0 | No layout shifts, reserved space |
| TBT | < 150ms | Code-split, lazy 3D loading |
| INP | < 200ms | Non-blocking event handlers |
| Bundle | < 150KB | Dynamic imports, tree-shaking |

## SEO Validation Checklist

- [ ] Lighthouse SEO score: 100
- [ ] All meta tags present and valid
- [ ] Structured data validates at schema.org/validator
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] No render-blocking scripts
- [ ] Hero poster is LCP element
- [ ] 3D model loads AFTER initial content
- [ ] Viewport stable (no CLS)
- [ ] All text content visible without JS (SSR)

## Loader Behavior

1. **Hard Refresh** → Static HTML loader appears instantly
2. **Progress** → Updates based on THREE.LoadingManager
3. **Warmup** → Shaders compile, first frame renders
4. **Fade Sequence** → Loader → Poster → Canvas
5. **Minimum Display** → 700ms to prevent flash

## Accessibility

- Skip-to-content link for keyboard users
- Focus states on all interactive elements
- `prefers-reduced-motion` disables 3D and animations
- Low-end device detection falls back to poster
- All images have alt text
- Semantic HTML structure

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Static Export

```bash
# Enable in next.config.js: output: 'export'
npm run build
# Deploy 'out' folder to any static host
```

### CDN Headers

Configure your CDN for optimal caching:

```
# GLB models
Cache-Control: public, max-age=31536000, immutable
Content-Type: model/gltf-binary

# WASM files
Cache-Control: public, max-age=31536000, immutable
Content-Type: application/wasm

# Images
Cache-Control: public, max-age=31536000, immutable
```

## Adding New Sections

1. Add a new `<Section>` in `index.tsx`:
```tsx
<Section id="new-section" title="New Feature">
  <p>Your content here.</p>
</Section>
```

2. Add scroll animation in `setupScrollAnimations`:
```tsx
gsap.timeline({
  scrollTrigger: {
    trigger: '#new-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
}).to(model.rotation, {
  y: Math.PI * 2.5,
  ease: 'none',
});
```

## Troubleshooting

### Model not loading
- Check browser console for errors
- Verify Draco files are in `public/draco/`
- Ensure model path is correct

### Animations not working
- Check if `prefers-reduced-motion` is enabled
- Verify ScrollTrigger is registered
- Check for JavaScript errors

### Performance issues
- Use the optimize-model.sh script
- Reduce texture resolution
- Lower pixel ratio in config

## License

MIT