# Sprite Pipeline

How variants get from raw outputs into packed sprite sheets used by the app.

Decisions to capture when made:
- Sheet packing approach (uniform grid / atlas / per-mode separate sheets)
- Source format vs. final format (PNG/JPG/WebP)
- Render size per dot (currently dots are tiny — likely 64×64 or smaller)
- Quality/size tradeoff per sheet
- Build script location + invocation

Build script lives at `sprite-build.mjs` once it exists.
