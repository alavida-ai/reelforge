# Production Plan — "Through the Keyhole" Hook

## Overview
One flowing 5-second branded hook using Kling v3 Pro for video generation and Nano Banana 2 for keyhole image generation.

---

## Step 1: Generate Keyhole Image (Nano Banana 2 via Replicate)

### API
`POST https://api.replicate.com/v1/models/google/nano-banana-2/predictions`

### Reference Images
Feed the exterior photo (03) AND the hallway interior (08) as `image_input` references. This grounds the keyhole image in the actual property — the door style, color palette, and interior glow will match.

### Prompt (to be refined)
```
Extreme close-up of a modern matte black front door with a polished brass keyhole escutcheon on the actual lock side of the door, offset from the center of frame and sitting slightly below mid-height. Camera is pressed close to the door surface. Through the keyhole opening, warm golden interior light glows — faintly showing herringbone wooden flooring and a dark steel railing through the small aperture. The brass keyhole plate has fine brushed texture with dramatic side lighting. The black door has a smooth matte finish. Photorealistic architectural detail photography, shot on macro lens, shallow depth of field. Moody cinematic lighting, dark and atmospheric. Vertical 9:16.
```

Key prompt elements:
- **"Through the keyhole opening, warm golden interior light glows"** — this creates visual overlap with the interior frames, bridging the gap
- **"herringbone wooden flooring and a dark steel railing"** — references actual elements from the property interior, so the glow through the keyhole matches what Kling v3 will reveal
- **Reference images** — exterior (03) for door style, hallway (08) for interior glow color

### Parameters
```json
{
  "prompt": "...",
  "resolution": "1K",
  "aspect_ratio": "9:16",
  "image_input": ["exterior_url", "hallway_url"],
  "output_format": "jpg"
}
```

### What we need from this:
A 9:16 image of a keyhole that:
1. Looks like it belongs to this specific house (black door, brass hardware)
2. Shows warm interior glow through the keyhole opening
3. Is dark/moody overall (high contrast with the bright interior reveal)
4. Could plausibly be the "start frame" that Kling v3 interpolates FROM toward the interior

---

## Step 2: Prep All Frames for Kling v3

### Crop to 9:16
All property photos are 2160x1440 (3:2 landscape). Kling v3 supports aspect_ratio parameter but our frames need to be compatible. We'll crop to 9:16 (1080x1920) while preserving the real door geometry and lock-side composition, not blindly centering every frame.

### Frame Sequence (the flowing shot)

| Position | Image | Description | Role in Kling |
|----------|-------|-------------|---------------|
| Start | Generated keyhole (9:16) | Dark door, brass keyhole, warm glow | `image` (start frame) |
| End | Photo 22, cropped 9:16 | Open-plan living/dining, bright, spacious | `image_tail` (end frame) |

**This is the primary generation: keyhole → living room reveal.**

Then for the detail push:

| Position | Image | Description | Role in Kling |
|----------|-------|-------------|---------------|
| Start | Last frame of Clip 1 (or Photo 22 cropped) | Living room | `image` |
| End | Photo 37, cropped 9:16 | Kitchen detail — gold tap, marble, vase | `image_tail` |

### Reducing the visual gap
The keyhole image is generated WITH interior elements visible through the opening. This means:
- The warm gold glow matches the interior lighting
- The herringbone floor is faintly visible — same floor that fills photo 22
- The dark steel railing echoes the staircase in the hallway
- Kling v3 has visual anchors to interpolate from

---

## Step 3: Kling v3 Pro — Hyperparameters

### Key parameters and how they reduce hallucination:

| Parameter | Value | Why |
|-----------|-------|-----|
| `model_name` | `"kling-v3"` | Latest model, best architectural quality |
| `mode` | `"pro"` | 1080p, higher quality = less artifacts on architecture |
| `duration` | `"5"` | Enough time for smooth transition without rushing |
| `cfg_scale` | `0.7` | **Higher = stricter adherence to prompt, less model improvisation.** Default is 0.5. We push to 0.7 to constrain the model. Note: docs say v2.x doesn't support this but v1 and v3 should. Test with and without. |
| `negative_prompt` | See below | Explicitly forbid hallucination patterns |
| `camera_control` | See below | Explicit camera movement instead of letting model guess |
| `sound` | `"off"` | Audio added in Remotion |

### Camera Control (explicit, not prompt-driven)
Instead of relying on the prompt for camera movement, use the `camera_control` object for precision:

```json
"camera_control": {
  "type": "simple",
  "config": {
    "horizontal": 0,
    "vertical": 0,
    "pan": 0,
    "tilt": 0,
    "roll": 0,
    "zoom": -3
  }
}
```

**`zoom: -3`** = longer focal length, narrowing FOV = a forward push into the scene. This is the dolly-in effect without hallucinating lateral movement.

**IMPORTANT:** `camera_control` and `image_tail` are **mutually exclusive** on Kling. We can't use both. So we have a choice:

- **Option A: Use `image_tail` (start+end frame)** — let Kling interpolate between keyhole and interior. No explicit camera control. The model decides the motion.
- **Option B: Use `camera_control`** — explicit zoom/push on the start frame only. No end frame target. The model animates the keyhole image with controlled forward motion.

**For reducing hallucination: Option A is safer** because the end frame anchors the result. Without an end frame, the model freely generates what it thinks is "behind" the keyhole — and it will hallucinate.

### Prompt (for Clip 1: keyhole → interior)
```
Smooth forward camera movement through the opening, transitioning from dark close-up to bright interior space. Natural light transition. Cinematic.
```

Short. Motion-only. The images do the heavy lifting.

### Negative Prompt
```
blurry, distorted, warped walls, morphing objects, glitch, unrealistic, low quality, jittery, fisheye, cartoon, painting, illustration, deformed architecture, melting, stretching
```

### Prompt (for Clip 2: living room → kitchen detail)
```
Steady forward dolly, gentle parallax. Soft ambient light. Cinematic shallow depth of field.
```

### API Call — Clip 1
```json
{
  "model_name": "kling-v3",
  "image": "{keyhole_image_url}",
  "image_tail": "{photo_22_cropped_url}",
  "prompt": "Smooth forward camera movement through the opening, transitioning from dark close-up to bright interior space. Natural light transition. Cinematic.",
  "negative_prompt": "blurry, distorted, warped walls, morphing objects, glitch, unrealistic, low quality, jittery, fisheye, cartoon, painting, illustration, deformed architecture, melting, stretching",
  "duration": "5",
  "mode": "pro",
  "sound": "off"
}
```

### API Call — Clip 2
```json
{
  "model_name": "kling-v3",
  "image": "{photo_22_cropped_url_or_last_frame_clip1}",
  "image_tail": "{photo_37_cropped_url}",
  "prompt": "Steady forward dolly, gentle parallax. Soft ambient light. Cinematic shallow depth of field.",
  "negative_prompt": "blurry, distorted, warped walls, morphing objects, glitch, unrealistic, low quality, jittery, fisheye, cartoon, painting, illustration, deformed architecture, melting, stretching",
  "duration": "5",
  "mode": "pro",
  "sound": "off"
}
```

---

## Step 4: Assembly in Remotion

1. Trim Clip 1 to best 2.5-3s (the keyhole reveal)
2. Trim Clip 2 to best 2s (the detail push)
3. Join with seamless cut (frame-matched if we use last-frame chaining)
4. Add Homi green keyhole outline animation on the opening
5. Add text: "Gewoon huis. Van binnen niet." at 2.0s
6. Add Homi logo + "Helmusweg 12, Venlo" lower third at 3.5s
7. Add audio: ambient hum → whoosh at reveal → beat drop
8. Export 9:16, 1080x1920

---

## Budget

| Item | Cost |
|------|------|
| Nano Banana 2 (keyhole image, ~4 variations) | ~$0.04 |
| Kling v3 Pro Clip 1 (5s) | $0.56 |
| Kling v3 Pro Clip 2 (5s) | $0.56 |
| Iteration budget (3-4 more attempts) | ~$1.68 |
| **Total max** | **~$2.84** |

---

## Pre-Generation Checklist

- [ ] Generate keyhole image with Nano Banana 2 (with reference images from property)
- [ ] Select best keyhole image
- [ ] Crop Photo 22 to 9:16
- [ ] Crop Photo 37 to 9:16
- [ ] Verify keyhole image and Photo 22 have visual overlap (warm glow = interior tones)
- [ ] Upload all frames to accessible URLs
- [ ] Confirm Kling API video credits available
- [ ] Run Clip 1 generation
- [ ] Review Clip 1 — check for hallucination on architecture
- [ ] Extract last frame of Clip 1 for chaining
- [ ] Run Clip 2 generation
- [ ] Review Clip 2
- [ ] Assemble in Remotion with branding
