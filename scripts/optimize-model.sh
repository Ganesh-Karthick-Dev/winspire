#!/usr/bin/env bash
# ============================================================================
# GLTF/GLB Model Optimization Script
# ============================================================================
#
# Optimizes 3D models for web delivery using gltf-transform.
# Pipeline: prune → draco compress → webp textures → brotli/gzip
#
# Prerequisites:
#   npm install -g @gltf-transform/cli
#   # OR it's installed as devDependency
#
# Usage:
#   ./scripts/optimize-model.sh input.glb [output.glb]
#   npm run optimize-model -- input.glb output.glb
#
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Input/output paths
IN="$1"
OUT="${2:-public/models/hero-draco.glb}"

# Validate input
if [ -z "$IN" ]; then
    echo -e "${RED}Error: No input file specified${NC}"
    echo "Usage: $0 <input.glb> [output.glb]"
    exit 1
fi

if [ ! -f "$IN" ]; then
    echo -e "${RED}Error: Input file not found: $IN${NC}"
    exit 1
fi

# Create output directory if needed
mkdir -p "$(dirname "$OUT")"

# Temporary files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo -e "${YELLOW}Starting optimization pipeline...${NC}"
echo "Input: $IN"
echo "Output: $OUT"
echo ""

# ============================================================================
# Step 1: Prune unused data
# ============================================================================
echo -e "${YELLOW}[1/4] Pruning unused data...${NC}"
npx gltf-transform prune "$IN" "$TEMP_DIR/pruned.glb"
echo -e "${GREEN}✓ Pruned${NC}"

# ============================================================================
# Step 2: Deduplicate data
# ============================================================================
echo -e "${YELLOW}[2/4] Deduplicating...${NC}"
npx gltf-transform dedup "$TEMP_DIR/pruned.glb" "$TEMP_DIR/deduped.glb"
echo -e "${GREEN}✓ Deduplicated${NC}"

# ============================================================================
# Step 3: Draco compression
# ============================================================================
# Draco provides excellent geometry compression
# Quantization bits (lower = smaller but less precise):
#   --quantize-position 14  (default, good for most models)
#   --quantize-normal 10
#   --quantize-texcoord 12
#   --quantize-color 8
echo -e "${YELLOW}[3/4] Applying Draco compression...${NC}"
npx gltf-transform draco "$TEMP_DIR/deduped.glb" "$TEMP_DIR/draco.glb"
echo -e "${GREEN}✓ Draco compressed${NC}"

# ============================================================================
# Step 4: Convert textures to WebP
# ============================================================================
# WebP provides better compression than JPEG/PNG
# Quality 80 is a good balance of size vs quality
echo -e "${YELLOW}[4/4] Converting textures to WebP...${NC}"
npx gltf-transform webp "$TEMP_DIR/draco.glb" "$OUT" --quality 80
echo -e "${GREEN}✓ Textures converted to WebP${NC}"

# ============================================================================
# Optional: Meshopt compression (alternative to Draco)
# ============================================================================
# Uncomment to use Meshopt instead of or in addition to Draco
# Meshopt is faster to decode but slightly larger files
# 
# echo -e "${YELLOW}Applying Meshopt compression...${NC}"
# npx gltf-transform meshopt "$TEMP_DIR/draco.glb" "$OUT"
# echo -e "${GREEN}✓ Meshopt compressed${NC}"

# ============================================================================
# Generate compressed versions for CDN
# ============================================================================
echo ""
echo -e "${YELLOW}Generating compressed versions...${NC}"

# Brotli compression (best ratio, requires server support)
if command -v brotli &> /dev/null; then
    brotli -q 11 -f "$OUT" -o "${OUT}.br"
    echo -e "${GREEN}✓ Brotli: ${OUT}.br${NC}"
else
    echo -e "${YELLOW}⚠ Brotli not installed, skipping .br generation${NC}"
    echo "  Install with: apt-get install brotli (or brew install brotli)"
fi

# Gzip compression (universal support)
if command -v gzip &> /dev/null; then
    gzip -9 -f -k "$OUT"
    echo -e "${GREEN}✓ Gzip: ${OUT}.gz${NC}"
else
    echo -e "${YELLOW}⚠ Gzip not installed, skipping .gz generation${NC}"
fi

# ============================================================================
# Report
# ============================================================================
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}Optimization complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

# File sizes
ORIGINAL_SIZE=$(stat -f%z "$IN" 2>/dev/null || stat --printf="%s" "$IN" 2>/dev/null)
FINAL_SIZE=$(stat -f%z "$OUT" 2>/dev/null || stat --printf="%s" "$OUT" 2>/dev/null)
REDUCTION=$((100 - (FINAL_SIZE * 100 / ORIGINAL_SIZE)))

echo "Original:  $(numfmt --to=iec-i --suffix=B $ORIGINAL_SIZE 2>/dev/null || echo "$ORIGINAL_SIZE bytes")"
echo "Optimized: $(numfmt --to=iec-i --suffix=B $FINAL_SIZE 2>/dev/null || echo "$FINAL_SIZE bytes")"
echo "Reduction: ${REDUCTION}%"
echo ""
echo "Output files:"
echo "  $OUT"
[ -f "${OUT}.br" ] && echo "  ${OUT}.br"
[ -f "${OUT}.gz" ] && echo "  ${OUT}.gz"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure your CDN/server to serve .br or .gz when supported"
echo "2. Set Cache-Control: public, max-age=31536000, immutable"
echo "3. Ensure Content-Type: model/gltf-binary"
