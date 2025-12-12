# LQIP (Low Quality Image Placeholder)

Place your blur placeholder image here.

Expected file: hero-blur.jpg

This tiny, blurred image:
- Loads instantly
- Shows while main poster loads
- Creates blur-up effect when main image loads

Recommended specs:
- Format: JPEG
- Size: 20-40px wide (aspect ratio preserved)
- Quality: 20-40
- File size: < 2KB
- Apply blur in image editor or rely on CSS blur

Generate with ImageMagick:
```bash
convert poster/hero-poster.webp -resize 40x -quality 30 lqip/hero-blur.jpg
```
