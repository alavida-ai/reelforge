import React from "react";
import { Composition } from "remotion";
import { PropertyHook } from "./PropertyHook";
import {
  COMPOSITION_FPS,
  COMPOSITION_HEIGHT,
  COMPOSITION_WIDTH,
} from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PropertyHook"
        component={PropertyHook}
        durationInFrames={Math.round(12.5 * COMPOSITION_FPS)}
        fps={COMPOSITION_FPS}
        width={COMPOSITION_WIDTH}
        height={COMPOSITION_HEIGHT}
        defaultProps={{
          exteriorClip: "exterior.mp4",
          interiorClip: "interior.mp4",
        }}
      />
    </>
  );
};
