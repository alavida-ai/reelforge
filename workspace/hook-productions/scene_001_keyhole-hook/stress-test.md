# Stress Test — Frame Compatibility & Hallucination Risk

## 0% hallucination tolerance. Every risk identified below must be mitigated before generation.

---

## Image Properties

| Frame | Photo | Dimensions | Brightness | Color Temp | Orientation |
|-------|-------|-----------|-----------|------------|-------------|
| 01_exterior | 03 | 2160x1440 | 157/255 (mid) | Neutral (-8) | Landscape 3:2 |
| 02_keyhole | TBD | TBD | ~30/255 (dark) | Warm (gold glow) | Portrait 9:16 |
| 03_living-reveal | 22 | 2160x1440 | 160/255 (mid) | Neutral (+9) | Landscape 3:2 |
| 04_kitchen-detail | 37 | 2160x1440 | 148/255 (mid) | Warm (+18) | Landscape 3:2 |

---

## Transition Analysis — Pair by Pair

### PAIR 1: Exterior (03) → Keyhole (generated)
**Visual gap:** LARGE
- Exterior is a wide shot of the full house from 10m away. Keyhole is an extreme macro close-up of a door lock.
- Completely different scale, framing, lighting, and color.
- No shared visual elements between the two frames.

**Hallucination risk:** HIGH
- The model has to invent the entire approach sequence — walking up the driveway, reaching the door, zooming into the keyhole.
- Architecture will likely warp as the model tries to dolly from wide to macro.
- The house's proportions could distort during the push-in.

**Mitigation options:**
1. **Don't generate this as one clip.** Use a HARD CUT from exterior to keyhole — simple, TikTok-native, no AI interpolation needed. The hard cut is actually better for the hook because it's faster and more punchy.
2. If we must have motion: generate an INTERMEDIARY frame — a medium shot of just the front door (crop/zoom into photo 03 to isolate the door), then chain: wide → door → keyhole.

**Recommendation:** HARD CUT. No generation needed for this pair.

---

### PAIR 2: Keyhole (generated) → Living Room Reveal (22)
**Visual gap:** VERY LARGE
- Keyhole is dark (avg brightness ~30), macro close-up, warm gold tones, portrait orientation.
- Living room is bright (160), wide shot, neutral cream tones, landscape orientation.
- Zero visual overlap — nothing in the keyhole frame exists in the living room frame.
- Different aspect ratios if keyhole is 9:16 and living room photo is 3:2.

**Hallucination risk:** EXTREME
- This is the most dangerous pair. The visual gap is as large as the original exterior → hallway pair that failed.
- The model must transition from a dark close-up to a bright wide room — it will hallucinate the entire in-between.
- The aspect ratio mismatch adds another dimension of confusion.

**Mitigation options:**
1. **Use the keyhole as a GRAPHIC OVERLAY, not a generation frame.** The keyhole shape is a vignette/mask applied in Remotion OVER the interior footage. The camera push-in happens on the interior photo (22) with a keyhole-shaped mask that starts small and expands to full frame. No AI generation needed for this transition — it's a compositing trick.
2. If we must use AI: the keyhole image needs to show the interior THROUGH the keyhole opening — so the model already knows what's on the other side. Generate the keyhole image with a visible interior glow that matches photo 22's color temperature.
3. **Add intermediary:** Use photo 08 (hallway forward) as a bridge between keyhole and living room. Keyhole → hallway (small gap, both have warm tones) → living room (hallway to living room is a smaller visual step).

**Recommendation:** COMPOSITING APPROACH (option 1). The keyhole is a mask in Remotion that reveals the interior — no AI transition needed. This is the safest path to zero hallucination.

---

### PAIR 3: Living Room (22) → Kitchen Detail (37)
**Visual gap:** MODERATE
- Both are interior shots with the same property's aesthetic.
- Similar brightness (160 vs 148).
- Same herringbone floor visible in both.
- Color temperature shifts from neutral to warm — the kitchen has more gold/marble tones.
- Different spatial scale — wide room vs medium detail shot.
- Camera direction compatible — both face forward into the space.

**Hallucination risk:** MODERATE
- The transition from wide living room to kitchen island is a room change — the model has to move through a doorway/opening.
- The kitchen island in photo 37 has specific objects (gold tap, vase, flowers) that the model might distort.
- The living room has specific furniture (sectional, olive tree) that could morph weirdly as the camera leaves.

**Mitigation options:**
1. **Use photo 27 (kitchen wide) as intermediary.** Photo 27 shows the kitchen island from a wider angle with the same black cabinets and marble visible. It bridges the living room scale to the detail scale.
2. **Use a hard cut** instead of a continuous push. Cut from living room to kitchen detail — the beat drop lands on the cut.
3. If using AI generation: keep the prompt extremely simple. "Smooth forward dolly." Nothing about the scene.

**Recommendation:** Either hard cut (safest) or intermediary frame (photo 27). If generating, this is the ONLY pair worth trying as an AI generation because both frames are interior with shared visual language.

---

## Aspect Ratio Problem

All property photos are **landscape 3:2 (2160x1440)**. TikTok is **portrait 9:16 (1080x1920)**.

This means we need to either:
1. **Crop to 9:16** before generating — lose the sides of each image, keeping the center
2. **Generate in 9:16** and accept that the AI will reframe the composition
3. **Generate in landscape** and crop in post

**Recommendation:** Crop the selected frames to 9:16 BEFORE any generation. This way:
- The AI sees exactly what will appear in the final video
- No surprise reframing or lost composition
- The keyhole image should be generated natively in 9:16

---

## Revised Strategy — Zero Hallucination Path

Given the analysis above, here's the safest approach:

### What to generate with AI:
1. **Keyhole close-up image** (Nano Banana 3) — 9:16, dark door, brass keyhole, warm interior glow visible through opening
2. **Living room → Kitchen detail video** (Kling v3 Pro) — the ONLY AI video generation. Both frames are interior, same aesthetic, moderate visual gap. Start+end frame, 5 seconds, pro mode.

### What to do in Remotion (no AI, zero hallucination risk):
1. **Exterior shot** — animate with a simple slow push-in (Ken Burns effect on the photo). No AI.
2. **Hard cut** to keyhole frame
3. **Keyhole reveal** — the keyhole shape is a MASK that starts small over the interior footage, then expands to full frame. The "fly through the keyhole" effect is achieved with compositing, not AI generation. Camera push-in on the interior photo underneath.
4. **AI-generated clip** — living room to kitchen detail (the one Kling v3 generation)
5. **Branding overlay** — Homi green keyhole outline, text, logo, audio

### Generation budget:
- 1 image generation (Nano Banana 3): keyhole frame
- 1 video generation (Kling v3 Pro, 5s): living room → kitchen detail = ~$0.56
- Optional: 1 more video generation if we want the living room to have subtle motion too = ~$0.56
- **Total: ~$1.12 max**

---

## Kling v3 Hyperparameter Optimization

From the docs, here are the parameters that matter for our generation:

| Parameter | Value | Why |
|-----------|-------|-----|
| `model_name` | `kling-v3` | Latest model, best quality, supports start+end frame |
| `mode` | `pro` | 1080p output, higher quality — essential for architecture |
| `duration` | `5` | 5 seconds, trim to best 2-3s in post |
| `image` | Living room (22) cropped to 9:16 | Start frame |
| `image_tail` | Kitchen detail (37) cropped to 9:16 | End frame |
| `prompt` | Motion-only, short | See below |
| `negative_prompt` | Anti-hallucination terms | See below |
| `sound` | `off` | Audio added in post |
| `cfg_scale` | NOT supported on v3 | Only v1 models support this |

### Prompt strategy (from our learnings):
- **DO:** Describe camera movement only. Use cinematography terms (dolly, pan, push).
- **DO:** Include pace words (slowly, smoothly, steady).
- **DO:** Mention atmospheric details (light shifts, reflections).
- **DON'T:** Describe what's in the image — the model already sees it.
- **DON'T:** Over-prompt — keep it under 2 sentences.

### Optimized prompt:
```
Smooth steady forward dolly through the space, gentle parallax as objects pass on both sides. Soft natural light, warm ambient glow. Cinematic, shallow depth of field.
```

### Negative prompt:
```
blurry, distorted, warped walls, morphing objects, glitch, unrealistic, low quality, jittery camera, fisheye, cartoon, painting, illustration
```

### Critical pre-generation steps:
1. **Crop both frames to 9:16** before uploading
2. **Verify camera direction is compatible** — both should face roughly the same direction (forward into the space)
3. **Check visual overlap** — shared elements (herringbone floor, wall color, lighting quality) anchor the model

---

## Checklist Before Any Generation

- [ ] Keyhole image generated via Nano Banana 3 (9:16, matches door style)
- [ ] All selected frames cropped to 9:16 (1080x1920)
- [ ] Verify photo 22 and 37 face compatible camera directions
- [ ] Verify visual overlap exists between photo 22 and 37
- [ ] Upload cropped frames to accessible URLs
- [ ] Confirm Kling API credits are available for video generation
- [ ] Prompts reviewed and approved
