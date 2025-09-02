import { create } from "zustand";

interface Gradient {
  enabled: boolean;
  direction: string;
  colors: [string, string];
}

interface EditorState {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textColor: string;
  gradient: Gradient;
  shadow: string;
  setText: (val: string) => void;
  setFontSize: (val: number) => void;
  setFontWeight: (val: number) => void;
  setFontFamily: (val: string) => void;
  setLineHeight: (val: number) => void;
  setLetterSpacing: (val: number) => void;
  setTextColor: (val: string) => void;
  toggleGradient: () => void;
  setGradientColors: (colors: [string, string]) => void;
  setGradientDirection: (direction: string) => void; 
  setShadow: (val: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  text: "Your Awesome Headline",
  fontFamily: "san serif",
  fontSize: 48,
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: 0,
  textColor: "#111827",
  gradient: {
    enabled: false,
    direction: "to right",
    colors: ["#6366F1", "#EC4899"],
  },
  shadow: "none",
  setText: (val) => set({ text: val }),
  setFontSize: (val) => set({ fontSize: val }),
  setFontWeight: (val) => set({ fontWeight: val }),
  setFontFamily: (val) => set({ fontFamily: val }),
  setLineHeight: (val) => set({ lineHeight: val }),
  setLetterSpacing: (val) => set({ letterSpacing: val }),
  setTextColor: (val) => set({ textColor: val }),
  toggleGradient: () =>
    set((s) => ({ gradient: { ...s.gradient, enabled: !s.gradient.enabled } })),
  setGradientColors: (colors) =>
    set((s) => ({ gradient: { ...s.gradient, colors } })),
  setGradientDirection: (
    direction 
  ) => set((s) => ({ gradient: { ...s.gradient, direction } })),
  setShadow: (val) => set({ shadow: val }),
}));
