# Bright River — Brand Identity

Extracted via Firecrawl Branding Format v2 on 2026-04-01.

## Source

- **URL:** https://bright-river.com/
- **Firecrawl scrape ID:** 019d499d-33b3-75bd-b7e4-e37954254085

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#BEAED5` | Soft purple — brand accent, CTAs, highlights |
| Secondary | `#2EA3F2` | Blue — links, secondary actions |
| Accent / Text | `#10113D` | Deep navy — backgrounds (dark mode), primary text (light mode) |
| Background | `#FFFFFF` | Light mode background |
| Text Primary | `#10113D` | Body text |
| Link | `#10113D` | Link color |

### Dark Mode Token Mapping (oklch)

Used in `globals.css` `.dark` block:

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

### Font Sizes

| Element | Size |
|---------|------|
| h1 | 56px |
| h2 | 36px |
| body | 19px |

## Images

| Asset | URL |
|-------|-----|
| Logo (SVG) | `https://bright-river.com/wp-content/uploads/2024/05/BR-logo-blue-purple-tagline.svg` |
| Favicon | `https://bright-river.com/wp-content/uploads/2021/04/cropped-favicon-bright-river-32x32.jpg` |
| OG Image | `https://bright-river.com/wp-content/uploads/2021/07/Linkedin-1200-627.jpg` |

### Logo SVG Colors

From direct SVG inspection:
- `.st0` fill: `#121228` (deep navy)
- `.st1` fill: `#BCADD4` (soft purple)

## Brand Personality

- **Tone:** Professional
- **Energy:** Medium
- **Target Audience:** Businesses seeking visual content solutions
- **Color Scheme:** Light (their site is light mode)
- **Design Framework:** Custom (Divi/WordPress)

## Spacing

- **Base unit:** 4px
- **Border radius:** 3px
