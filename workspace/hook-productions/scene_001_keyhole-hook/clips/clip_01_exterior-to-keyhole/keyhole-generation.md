# Keyhole Image Generation

## Purpose
Generate the end frame for Clip 1 / start frame for Clip 2. A photorealistic close-up of a brass keyhole on a matte black door, with warm interior light visible through the opening.

## Requirements
1. Must be 9:16 (portrait) to match TikTok format
2. Must show warm golden glow through the keyhole — this bridges to the interior in Clip 2
3. The glow should hint at herringbone flooring and dark steel (matching the actual property)
4. Door style must match photo 03 — modern, matte black, clean lines
5. Photorealistic — no stylization, no illustration

## Reference Images
- Photo 03 (exterior) — for door style, color, material
- Photo 08 (hallway interior) — for the warm glow color temperature and interior elements

## Prompt (Nano Banana 2)
```
Extreme close-up of a modern matte black front door with a polished brass keyhole escutcheon placed on the actual lock side of the door, slightly below mid-height and offset from the middle of the frame. Preserve believable door geometry and leave visible negative space across the door surface. Through the keyhole opening, warm golden interior light glows, faintly showing herringbone wooden flooring and dark steel staircase railing inside. The brass keyhole plate has fine brushed texture. Dramatic side lighting from the right. Black door has smooth matte finish. Shot on macro lens, shallow depth of field. Dark moody atmospheric photorealistic architectural detail photography.
```

## Prompt (Higgsfield Soul — fallback)
```
Extreme macro close-up photograph of a brass keyhole on a matte black modern door. The keyhole sits on the real lock stile of the door, not in the geometric center of the frame, and occupies the lower-middle third with more dark door surface visible around it. Through the keyhole opening, warm golden interior light glows from inside. The brass keyhole plate has fine texture details. The black door surface is smooth matte. Dramatic cinematic lighting from the right side. Shot on macro lens, f/2.8, shallow depth of field. Photorealistic, high detail, moody atmospheric. Vertical 9:16 format.
```

## API Config (Nano Banana 2)
```json
{
  "prompt": "...",
  "resolution": "1K",
  "aspect_ratio": "9:16",
  "image_input": ["{exterior_url}", "{hallway_url}"],
  "output_format": "jpg"
}
```

## API Config (Higgsfield Soul — fallback)
```json
{
  "params": {
    "prompt": "...",
    "width_and_height": "1088x1632",
    "enhance_prompt": false,
    "quality": "1080p",
    "batch_size": 4,
    "image_reference": {
      "type": "image_url",
      "image_url": "{exterior_url}"
    }
  }
}
```

## Status
- [ ] Generated
- [ ] Approved
- [ ] Saved to `frame/end.jpg`
