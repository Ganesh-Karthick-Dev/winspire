# Next.js 3D Site - Implementation Plan

SEO-first Next.js single-page site with fullscreen WebGL GLTF model, GSAP ScrollTrigger, and Lenis smooth scrolling.

## User Review Required

> [!IMPORTANT]
> **Model Asset**: Provide your `.glb` model file. Script outputs to `public/models/hero-draco.glb`.

> [!IMPORTANT]
> **Draco WASM**: Download from [three.js/examples/jsm/libs/draco](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/libs/draco) → `public/draco/`

---

## Proposed Changes

### Project Configuration

#### [NEW] [package.json](file:///home/ganesh/Documents/winspire/winspire/package.json)
`next@14`, `react@18`, `three`, `gsap`, `lenis`, `@gltf-transform/cli`

#### [NEW] [next.config.js](file:///home/ganesh/Documents/winspire/winspire/next.config.js)
Webpack optimization, caching headers for static assets

#### [NEW] [tsconfig.json](file:///home/ganesh/Documents/winspire/winspire/tsconfig.json)

---

### SEO & Metadata

#### [NEW] [src/components/SEOHead.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/SEOHead.tsx)
Title, description, OG tags, Twitter cards, canonical, preload poster

#### [NEW] [src/components/JsonLd.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/JsonLd.tsx)
Organization structured data

#### [NEW] [public/robots.txt](file:///home/ganesh/Documents/winspire/winspire/public/robots.txt)
#### [NEW] [public/sitemap.xml](file:///home/ganesh/Documents/winspire/winspire/public/sitemap.xml)

---

### Loader System (Critical)

#### [NEW] [src/pages/_document.tsx](file:///home/ganesh/Documents/winspire/winspire/src/pages/_document.tsx)
**Static HTML loader injected in `<body>` before React:**
```html
<div id="loader-root">
  <div class="loader-overlay">
    <div class="loader-progress">0%</div>
    <div class="loader-bar"></div>
  </div>
</div>
```
Appears instantly on hard refresh, before any JS.

#### [NEW] [src/lib/loaderManager.ts](file:///home/ganesh/Documents/winspire/winspire/src/lib/loaderManager.ts)
- `resetLoaderToZero()` - resets on every page mount
- `updateLoaderUI(percent)` - updates progress bar
- `finishLoader()` - triggers warmup + fade-out sequence
- `animateLoaderOut()` - GSAP fade with minimum 700ms display
- **Fade order**: Loader → Poster → Canvas

#### [NEW] [src/lib/threeManager.ts](file:///home/ganesh/Documents/winspire/winspire/src/lib/threeManager.ts)
**THREE.LoadingManager integration:**
```typescript
const manager = new THREE.LoadingManager();
manager.onProgress = (url, loaded, total) => {
  updateLoaderUI(Math.round((loaded / total) * 100));
};
manager.onLoad = () => finishLoader();
```

**Warmup sequence before fade-out:**
```typescript
await loadGLTFwithManager();
await warmupScene(scene, renderer, camera);
await waitForFirstFrame();
await animateLoaderOut();
showCanvas();
```

---

### Configuration

#### [NEW] [src/config/seo.ts](file:///home/ganesh/Documents/winspire/winspire/src/config/seo.ts)
#### [NEW] [src/config/animations.ts](file:///home/ganesh/Documents/winspire/winspire/src/config/animations.ts)
#### [NEW] [src/config/three-settings.ts](file:///home/ganesh/Documents/winspire/winspire/src/config/three-settings.ts)

---

### Core Library

#### [NEW] [src/lib/threeUtils.ts](file:///home/ganesh/Documents/winspire/winspire/src/lib/threeUtils.ts)
`clampDevicePixelRatio`, `isLowEndDevice`, `prefersReducedMotion`, `shouldDisable3D`, `scheduleIdleLoad`

---

### Styles

#### [NEW] [src/styles/globals.css](file:///home/ganesh/Documents/winspire/winspire/src/styles/globals.css)
```css
canvas { opacity: 0; transition: opacity 0.5s ease; }
canvas.ready { opacity: 1; }
.loader-overlay { opacity: 1; transition: opacity 0.6s; }
.poster-layer { opacity: 1; transition: opacity 0.8s; }
```
Focus states, reduced motion overrides, CLS-safe animations.

---

### Components

#### [NEW] [src/components/SkipToContent.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/SkipToContent.tsx)
#### [NEW] [src/components/Poster.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/Poster.tsx)
- LCP target with `next/image priority`
- Stays visible under loader during load
- Fades out AFTER loader fades out

#### [NEW] [src/components/WebGLCanvas.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/WebGLCanvas.tsx)
- Hidden until `.ready` class attached
- Injected after `requestIdleCallback`

#### [NEW] [src/components/GLTFViewer.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/GLTFViewer.tsx)
- Uses THREE.LoadingManager for progress
- Warmup: compile shaders, render first frame
- Adds `.ready` class only after complete warmup

#### [NEW] [src/components/Hero.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/Hero.tsx)
#### [NEW] [src/components/Section.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/Section.tsx)
#### [NEW] [src/components/Layout.tsx](file:///home/ganesh/Documents/winspire/winspire/src/components/Layout.tsx)

---

### Pages

#### [NEW] [src/pages/_app.tsx](file:///home/ganesh/Documents/winspire/winspire/src/pages/_app.tsx)
#### [NEW] [src/pages/index.tsx](file:///home/ganesh/Documents/winspire/winspire/src/pages/index.tsx)
- Calls `resetLoaderToZero()` on mount
- No loader caching in localStorage
- Lenis + ScrollTrigger integration

---

### Scripts & Assets

#### [NEW] [scripts/optimize-model.sh](file:///home/ganesh/Documents/winspire/winspire/scripts/optimize-model.sh)
#### [NEW] [public/draco/.gitkeep](file:///home/ganesh/Documents/winspire/winspire/public/draco/.gitkeep)
#### [NEW] [public/models/.gitkeep](file:///home/ganesh/Documents/winspire/winspire/public/models/.gitkeep)

---

### Documentation

#### [MODIFY] [README.md](file:///home/ganesh/Documents/winspire/winspire/README.md)
SEO checklist, Lighthouse targets, loader behavior docs

---

## Verification Plan

### Build & Dev
```bash
npm install && npm run build && npm run dev
```

### Loader Verification
1. Hard refresh → loader appears instantly (before JS)
2. Clear cache → observe progress bar updates
3. Fast cache load → loader still shows minimum 700ms
4. No black screen at any point
