# Creative Brief: CI Branding Templates for Real Estate Short-Form Video

## Project Overview

We're building a web app that takes raw real estate property videos and adds broker branding + hooks for short-form social platforms (TikTok, Instagram Reels, YouTube Shorts). Your job is to design **5 distinct CI template systems** that overlay broker branding onto property footage.

These templates are not one-off designs — they're **systems**. Each template must work with any broker's brand assets (logo, colors, fonts) that get plugged in dynamically. Think of them as branded skins for video content.

## What You're Designing

5 CI branding template systems, each including:

1. **Opening frame** — how branding appears at the start (after the hook)
2. **Persistent overlay** — subtle branding throughout the video (logo placement, color accents)
3. **Lower third** — broker name/title treatment that appears during the video
4. **End card** — closing frame with broker contact info, logo, call to action
5. **Transition elements** — branded transitions between cuts (optional, style-dependent)

Each template must be designed for **vertical video (9:16 aspect ratio)**.

## The 5 Template Styles

We need variety across the spectrum of Dutch real estate broker positioning. Each template should feel distinctly different:

### Template 1: "Luxury Boutique"
- **Vibe:** Serhant-level premium. Think gold accents, serif fonts, generous white space, subtle animations
- **For brokers who:** Sell high-end properties in Amsterdam-Zuid, Wassenaar, Bloemendaal
- **References:** serhant.com, high-end fashion brand aesthetics
- **Branding presence:** Elegant, understated, never loud

### Template 2: "Modern Minimal"
- **Vibe:** Clean, contemporary, Scandinavian-influenced. Sans-serif, monochrome with one accent color
- **For brokers who:** Position as design-forward, urban, attract younger affluent buyers
- **References:** Kinfolk magazine, Aesop, modern architecture firms
- **Branding presence:** Clean lines, geometric, architectural feel

### Template 3: "Warm Professional"
- **Vibe:** Approachable, trustworthy, established. Classic but not stuffy
- **For brokers who:** Serve the broad middle market, family homes, suburban properties
- **References:** Traditional Dutch "makelaar" elevated to social media quality
- **Branding presence:** Visible but friendly, not intimidating

### Template 4: "Bold & Energetic"
- **Vibe:** High energy, dynamic, TikTok-native. Motion-heavy, punchy typography, strong color blocks
- **For brokers who:** Want to stand out, attract attention, are comfortable being loud on social
- **References:** Sports branding, streetwear aesthetics, high-energy creators
- **Branding presence:** In your face, unapologetic, memorable

### Template 5: "Editorial / Cinematic"
- **Vibe:** Magazine-quality, storytelling-driven. Subtle overlays, cinematic bars, documentary feel
- **For brokers who:** Want their properties to feel like stories, not listings
- **References:** Architectural Digest, Monocle, Netflix property shows
- **Branding presence:** Minimal during footage, stronger on intro/outro

## Technical Requirements

### Format
- Vertical video: 9:16 (1080x1920px)
- Design in After Effects, Figma, or equivalent — we need source files
- Export as motion graphic templates (MOGRTs) or equivalent format that allows dynamic text/color/logo replacement

### Dynamic Elements (must be swappable per broker)
- Logo (various aspect ratios — horizontal, square, stacked)
- Primary brand color
- Secondary brand color
- Primary font (or closest system font match)
- Broker name (text)
- Broker title/tagline (text)
- Contact info — phone, email, website (end card only)

### Platform Considerations
- Must work on all three platforms (TikTok, Instagram Reels, YouTube Shorts)
- Safe zones: keep critical elements away from platform UI overlaps (bottom bar on TikTok, caption area on Reels)
- Templates should not interfere with hook content at video start
- Branding should enhance, not obscure, the property footage

### Quality Bar
- **99.9% first-time-right** — when a broker sees their branded video, they approve it on first review
- Templates must look professional at every broker's brand — test with at least 3 different brand color schemes (dark, light, colorful)
- No template should look like a generic "add your logo here" watermark

## Deliverables

Per template (x5):
1. **Style guide page** — showing the template system with sample broker brand applied
2. **Motion mockup** — 15-30 second sample video showing all elements in action (opening, overlay, lower third, end card)
3. **Source files** — editable templates (After Effects / MOGRT or equivalent)
4. **Safe zone map** — diagram showing where elements sit relative to platform UI
5. **Color adaptation examples** — each template shown with 3 different broker brands (dark luxury, light minimal, colorful energetic)

## What Success Looks Like

An operator pastes a broker's website URL. The app scrapes the brand. The operator sees 5 template previews with that broker's actual colors, logo, and fonts applied. They pick one, and the exported video looks like it was custom-designed for that broker. The broker sees it and thinks: "This is exactly my brand."

## Timeline & Budget

- [To be discussed with Thomas]

## Market Context

The Dutch real estate market has ~11,000 active firms, with NVM handling ~70% of transactions. Brokers range from luxury boutique (Amsterdam-Zuid, Wassenaar) to broad suburban market. The templates must work across this entire spectrum. Standard property video pricing in NL is EUR 175-400, so these templates need to feel premium without requiring premium per-video cost.

An existing competitor (AutoReel, US-based) offers basic branding overlays but nothing approaching brand-aware CI systems extracted from broker websites. The templates you design are a core differentiator.

## Rendering Context

The templates will be applied to video using one of two approaches (dev team to decide):
- **Remotion** (React-based video composition) — templates would be coded as React components with dynamic props for brand colors, logo, fonts
- **FFmpeg / cloud API** (Shotstack/Creatomate) — templates would be applied as overlay layers via API

Either way, your deliverables should include source files that can be translated into code. If you have experience with Remotion or programmatic video, that's a plus.

## Reference
- Serhant ([serhant.com](https://serhant.com/)) — the gold standard for real estate personal branding
- DSTRCT Real Estate Amsterdam (https://www.dstrct.com/properties/) — Dutch luxury market reference (TikTok presence: https://www.tiktok.com/@dstrctrealestate)
- Woning Media NL pricing: standard video EUR 175-400, premium EUR 500-1,250 ([source](https://www.woningmedia.nl/userdata/file/Woning%20Media%20-%20Prijslijst%202024%202025%20-%20DEF.pdf))
- Full project context: see reelforge-prd.md
- Manus market research: see manus_reelforge_full_research_report.md

## Questions to Discuss
- Do you have preferred tools for creating dynamic video templates?
- Any experience with MOGRT or programmatic video template systems (like Remotion, Creatomate)?
- Can you provide 2-3 initial concepts per template before going into full production?
