# Clip 1 — Exterior → Keyhole

## What the viewer sees
Camera approaches the front of the house and pushes toward the front door, ending on a close-up of the brass keyhole with warm interior light glowing through.

## Frames
- **Start:** Photo 03 — exterior, head-on, front door preserved in a natural 9:16 crop
- **End:** Generated keyhole image — brass keyhole on black door, warm glow (native 9:16)

## Steps
1. Crop Photo 03 to 9:16 while preserving the actual lock-side alignment of the door
2. Generate keyhole image with Nano Banana 2 (reference: Photo 03 for door style, Photo 08 for interior glow)
3. Upload both frames
4. Generate clip with Kling v3 Pro (start+end frame, 5s)
5. Review for hallucination
6. Extract last frame for Clip 2 chain

## Visual gap assessment
- Both frames show the same front door — just at different scales (wide vs macro)
- The door remains geometrically believable in both, with the lock detail staying on the real lock side rather than being forced into the frame center
- Color shifts from neutral daylight (exterior) to dark/warm (keyhole) — natural lighting transition as you approach a door
- Risk: the house facade could warp during the push-in. Mitigation: short prompt, let the images guide.

## Cost
- Nano Banana 2: ~$0.01
- Kling v3 Pro 5s: $0.56
