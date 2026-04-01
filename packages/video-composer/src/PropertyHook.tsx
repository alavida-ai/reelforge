import React from "react";
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";

type Props = {
  exteriorClip: string;
  interiorClip: string;
};

// =============================================
// EDIT THESE VALUES TO TRIM YOUR CLIPS
// Times are in seconds. Save to preview.
// =============================================

// SCENE 1 — interior.mp4 — presenter outside, facing camera, walks to door
const SCENE_1_START = 0.825; // trim start (seconds)
const SCENE_1_END = 7.90;    // cut to scene 2 at this point

// SCENE 2 — exterior.mp4 — through the door, interior reveal, gesture
const SCENE_2_START = 3.0; // pick up scene 2 from here
const SCENE_2_END = 11;   // end of final video

// =============================================

export const PropertyHook: React.FC<Props> = ({
  exteriorClip,
  interiorClip,
}) => {
  const { fps } = useVideoConfig();

  const scene1Frames = Math.round((SCENE_1_END - SCENE_1_START) * fps);
  const scene2Frames = Math.round((SCENE_2_END - SCENE_2_START) * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* SCENE 1: interior.mp4 — presenter outside, hook line, walks to door */}
      <Sequence from={0} durationInFrames={scene1Frames}>
        <Video
          src={staticFile(interiorClip)}
          startFrom={Math.round(SCENE_1_START * fps)}
        />
      </Sequence>

      {/* SCENE 2: exterior.mp4 — through the door, interior reveal, gesture */}
      <Sequence from={scene1Frames} durationInFrames={scene2Frames}>
        <Video
          src={staticFile(exteriorClip)}
          startFrom={Math.round(SCENE_2_START * fps)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
