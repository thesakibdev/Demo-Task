type GradientDir = "to-r" | "to-l" | "to-t" | "to-b";

type ShadowPreset = "none" | "soft" | "medium" | "neon";

type LetterEffect = "none" | "fade" | "slide" | "stagger";

type SegmentStyle = "none" | "underline" | "highlight" | "block";

interface Segment {
  start: number; // inclusive word index
  end: number; // inclusive
  style: SegmentStyle;
}

interface HeadlineSettings {
  text: string;
  fontFamily: string;
  fontSize: number; // px
  fontWeight: number; // 100..900
  lineHeight: number; // em
  letterSpacing: number; // em
  gradient: {
    enabled: boolean;
    dir: GradientDir;
    from: string;
    to: string;
  };
  textColor: string; // used if gradient disabled
  effects: {
    letterEffect: LetterEffect;
    hoverGlow: boolean;
    textShadow: ShadowPreset;
    outline: boolean;
    fadeIn: boolean;
  };
  segments: Segment[]; // word/segment styling
  cardShadow: ShadowPreset;
  theme: "light" | "dark";
}


export type { GradientDir, ShadowPreset, LetterEffect, SegmentStyle, Segment };

export default HeadlineSettings;