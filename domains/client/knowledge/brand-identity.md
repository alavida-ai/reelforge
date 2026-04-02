---
description: Bright River brand identity — colors, fonts, logo URLs, design tokens, dark mode mapping
last-validated: 2026-04-02
confidence: high
validated-by: firecrawl-scrape (home, brand extraction)
tags: [bright-river, brand, colors, fonts, logo, design-tokens]
---

# Bright River — Brand Identity

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#BEAED5` | Soft purple — brand accent, CTAs, highlights |
| Secondary | `#2EA3F2` | Blue — links, secondary actions |
| Accent / Text | `#10113D` | Deep navy — backgrounds (dark), primary text (light) |
| Background | `#FFFFFF` | Light mode background |
| Logo Navy | `#121228` | Deep navy in SVG (.st0 fill) |
| Logo Purple | `#BCADD4` | Soft purple in SVG (.st1 fill) |

### Dark Mode Token Mapping (oklch)

Used in `globals.css` `.dark` block for ReelForge demo:

```css
/* Deep navy surfaces — from #10113D */
--background: oklch(0.12 0.03 280);
--foreground: oklch(0.92 0.01 280);
--card: oklch(0.15 0.03 280);
--surface: oklch(0.17 0.03 280);
--surface-raised: oklch(0.20 0.03 280);

/* Purple accent — from #BEAED5, lifted for dark mode */
--brand: oklch(0.76 0.10 300);
--brand-bright: oklch(0.83 0.10 300);
--brand-glow: oklch(0.76 0.10 300 / 25%);
--brand-subtle: oklch(0.76 0.10 300 / 8%);
--brand-dim: oklch(0.55 0.08 300);
```

## Typography

| Role | Family | Stack |
|------|--------|-------|
| Body | Lato | Lato, Helvetica, Arial, Lucida, sans-serif |
| Heading | Lato | Lato, Helvetica, Arial, Lucida, sans-serif |

| Element | Size |
|---------|------|
| h1 | 56px |
| h2 | 36px |
| body | 19px |

## Logo Assets

| Asset | URL |
|-------|-----|
| Logo (SVG, with tagline) | `https://bright-river.com/wp-content/uploads/2024/05/BR-logo-blue-purple-tagline.svg` |
| Favicon | `https://bright-river.com/wp-content/uploads/2021/04/cropped-favicon-bright-river-32x32.jpg` |
| OG Image | `https://bright-river.com/wp-content/uploads/2021/07/Linkedin-1200-627.jpg` |

## Brand Personality

| Dimension | Character |
|-----------|-----------|
| Positioning | Confident market leader, not a challenger |
| Tone | Professional, direct, results-focused |
| Energy | Efficient, no-nonsense, but approachable |
| Differentiation | Data-driven ("let's talk numbers" is a recurring section header) |
| Innovation signal | "AI-powered" as trust marker, not hype |
| Relationship style | Partnership-oriented ("dedicated account managers", "your team") |
| Risk posture | Aggressively removes friction (free trials, SLA guarantees) |
| Color scheme | Light mode on their own site; deep navy for dark contexts |

## Design Details

- **Base spacing unit:** 4px
- **Border radius:** 3px
- **Design framework:** Custom (Divi/WordPress)
- **Aesthetic:** Clean, professional, light — not flashy
