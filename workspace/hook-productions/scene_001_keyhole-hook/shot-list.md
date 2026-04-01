# Shot List — "Through the Keyhole" Hook

## Property
Helmusweg 12, 5926 VW Venlo

## Brand
Homi — neon green (#00FF00) + black (#000000)

## Platform
TikTok-first — 9:16, 1080x1920

## Duration
5 seconds (trimmed from ~20s raw across 4 clips)

## Hook Text
"Gewoon huis. Van binnen niet." — appears at the reveal moment (~2.0s)

---

## Beat Sheet

| Time | Beat | What the viewer sees |
|------|------|---------------------|
| 0.0-1.0s | THE APPROACH | Camera pushes toward the front door of a suburban Dutch house |
| 1.0-1.5s | THE KEYHOLE | Close-up of brass keyhole on black door, warm golden glow through opening |
| 1.5-2.5s | THE PEEK | Camera pushes through the keyhole into the hallway — staircase, herringbone floors |
| 2.5-3.5s | THE REVEAL | Hallway opens into bright living room — text drops: "Gewoon huis. Van binnen niet." |
| 3.5-5.0s | THE DETAIL | Push into gold tap on Calacatta marble — Homi logo + "Helmusweg 12, Venlo" |

## Hook Stacking
- **Visual:** Dark exterior → keyhole → bright interior contrast
- **Text:** "Gewoon huis. Van binnen niet." at reveal
- **Audio:** Ambient hum → whoosh at keyhole → beat drop at reveal
- **Brand:** Homi green keyhole outline, green text, logo bookend

---

## Keyframe Photos

| ID | Source | Description | Used in |
|----|--------|-------------|---------|
| K1 | Photo 03 (cropped 9:16) | Exterior head-on, natural door composition preserved | Clip 1 start |
| K2 | **Generated** (Nano Banana 2) | Brass keyhole on black door, warm interior glow | Clip 1 end / Clip 2 start |
| K3 | Photo 08 | Hallway facing forward — staircase right, corridor ahead | Clip 2 end / Clip 3 start |
| K4 | Photo 22 | Open-plan living/dining — cream sectional, pendants, herringbone | Clip 3 end / Clip 4 start |
| K5 | Photo 37 | Kitchen detail — gold tap, marble, vase, black cabinets | Clip 4 end |

### Keyframe locations in workspace
```
frames/selected/01_exterior_9x16.jpg     → K1
clips/clip_01_exterior-to-keyhole/frame/  → K2 (to be generated)
clips/clip_02_keyhole-to-hallway/frame/   → K2, K3
clips/clip_03_hallway-to-living/frame/    → K3, K4
clips/clip_04_living-to-detail/frame/     → K4, K5
```

### Note on frame_start vs frame_start_ref
- `start.jpg` = the actual frame sent to Kling (either the keyframe or last frame of previous clip)
- `start_ref.jpg` / `end_ref.jpg` = the target keyframe for reference. Will be replaced by cropped 9:16 versions before generation.

---

## Clip List

### Clip 1 — Exterior → Keyhole
- **Start:** K1 (exterior 9:16)
- **End:** K2 (generated keyhole)
- **Kling model:** kling-v3, pro, 5s
- **Prompt:** "Smooth forward dolly toward the front door, accelerating. Camera pushes close to the door surface. Natural daylight. Cinematic."
- **Negative:** "blurry, distorted, warped walls, morphing, glitch, unrealistic, low quality, jittery, fisheye, cartoon, deformed architecture, melting, stretching"
- **Visual gap:** Medium — same door at different scales
- **Hallucination risk:** Low — straightforward push-in on architecture
- **Cost:** $0.56
- **Status:** ⏳ Waiting for keyhole image generation

### Clip 2 — Keyhole → Hallway
- **Start:** Last frame of Clip 1 (or K2)
- **End:** K3 (hallway forward, photo 08, cropped 9:16)
- **Kling model:** kling-v3, pro, 5s
- **Prompt:** "Smooth forward movement through the opening into interior space. Dark to light transition. Cinematic."
- **Negative:** "blurry, distorted, warped walls, morphing, glitch, unrealistic, low quality, jittery, fisheye, cartoon, deformed architecture, melting, stretching"
- **Visual gap:** Medium — dark keyhole to semi-lit interior, bridged by warm glow in keyhole image
- **Hallucination risk:** Medium — the critical transition. Keyhole glow must match hallway tones.
- **Cost:** $0.56
- **Status:** ⏳ Blocked by Clip 1

### Clip 3 — Hallway → Living Room
- **Start:** Last frame of Clip 2 (or K3)
- **End:** K4 (living room, photo 22, cropped 9:16)
- **Kling model:** kling-v3, pro, 5s
- **Prompt:** "Steady forward glide through doorway into open room. Gentle parallax. Soft natural light. Cinematic."
- **Negative:** "blurry, distorted, warped walls, morphing, glitch, unrealistic, low quality, jittery, fisheye, cartoon, deformed architecture, melting, stretching"
- **Visual gap:** Small — both interior, same floor, same tones
- **Hallucination risk:** Low
- **Cost:** $0.56
- **Status:** ⏳ Blocked by Clip 2

### Clip 4 — Living Room → Kitchen Detail
- **Start:** Last frame of Clip 3 (or K4)
- **End:** K5 (kitchen detail, photo 37, cropped 9:16)
- **Kling model:** kling-v3, pro, 5s
- **Prompt:** "Slow forward dolly at counter height, decelerating. Soft overhead light catches gold reflections. Shallow depth of field. Cinematic."
- **Negative:** "blurry, distorted, warped walls, morphing, glitch, unrealistic, low quality, jittery, fisheye, cartoon, deformed architecture, melting, stretching"
- **Visual gap:** Small — both interior, same space
- **Hallucination risk:** Low
- **Cost:** $0.56
- **Status:** ⏳ Blocked by Clip 3

---

## Generation Chain
```
1. Generate keyhole image (Nano Banana 2 / Higgsfield)
2. Generate Clip 1: K1 → K2 (exterior → keyhole)
3. Extract last frame of Clip 1
4. Generate Clip 2: last_frame_1 → K3 (keyhole → hallway)
5. Extract last frame of Clip 2
6. Generate Clip 3: last_frame_2 → K4 (hallway → living)
7. Extract last frame of Clip 3
8. Generate Clip 4: last_frame_3 → K5 (living → kitchen detail)
9. Review all clips
10. Trim + stitch in Remotion with branding + text + audio
```

## Budget
| Item | Cost |
|------|------|
| Keyhole image (Nano Banana 2 or Higgsfield) | ~$0.04 |
| Clip 1 (Kling v3 Pro 5s) | $0.56 |
| Clip 2 (Kling v3 Pro 5s) | $0.56 |
| Clip 3 (Kling v3 Pro 5s) | $0.56 |
| Clip 4 (Kling v3 Pro 5s) | $0.56 |
| Iteration buffer (~4 retries) | $2.24 |
| **Total max** | **~$4.52** |

---

## Assembly (Remotion)
1. Trim each clip to best 1-1.5s
2. Stitch into 5s continuous video
3. Add Homi green keyhole outline animation (0.0-2.0s)
4. Add text: "Gewoon huis. Van binnen niet." (2.0-3.5s, Homi green, slam animation)
5. Add Homi logo corner (0.0-0.5s + 3.5-5.0s)
6. Add lower third: "Helmusweg 12, Venlo" (3.5-5.0s)
7. Add audio: ambient → whoosh → beat drop
8. Export 9:16, 1080x1920, MP4

## Pre-Generation Checklist
- [ ] Keyhole image generated and approved
- [ ] All end-frame keyframes cropped to 9:16
- [ ] Keyhole image has visible warm glow matching hallway tones
- [ ] All frame pairs verified for camera direction compatibility
- [ ] Kling API video credits confirmed
- [ ] Prompts reviewed
