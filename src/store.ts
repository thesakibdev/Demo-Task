import create from 'zustand';

export type GradientDirection = 'to-r' | 'to-l' | 'to-t' | 'to-b';

export type PerLetterAnimation = 'none' | 'fade' | 'slide' | 'stagger';

export interface HeadlineSettings {
  text: string;
  fontFamily: string;
  fontSize: number; // px
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  gradientEnabled: boolean;
  gradientDirection: GradientDirection;
  gradientColors: [string, string];
  perLetterAnimation: PerLetterAnimation;
  hoverGlow: boolean;
  textShadow: boolean;
  outline: boolean;
  fadeIn: boolean;
  wordStyling: {
    highlight: boolean;
    underline: boolean;
    backgroundBlock: boolean;
  };
  shadowPreset: 'none' | 'soft' | 'medium' | 'neon';
}

export interface HeadlinePreset {
  id: string;
  name: string;
  settings: HeadlineSettings;
}

interface EditorState {
  presets: HeadlinePreset[];
  selectedPresetId: string | null;
  settings: HeadlineSettings;
  darkMode: boolean;

  selectPreset: (id: string) => void;
  updateSettings: (partial: Partial<HeadlineSettings>) => void;
  toggleDarkMode: () => void;
  setSettings: (settings: HeadlineSettings) => void;
  addPreset: (preset: HeadlinePreset) => void;
  resetSettings: () => void;
}

const defaultSettings: HeadlineSettings = {
  text: 'Your Headline Here',
  fontFamily: 'Inter',
  fontSize: 48,
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: 0,
  gradientEnabled: false,
  gradientDirection: 'to-r',
  gradientColors: ['#4f46e5', '#8b5cf6'], // blue-purple gradient
  perLetterAnimation: 'none',
  hoverGlow: false,
  textShadow: false,
  outline: false,
  fadeIn: false,
  wordStyling: {
    highlight: false,
    underline: false,
    backgroundBlock: false,
  },
  shadowPreset: 'none',
};

export const useEditorStore = create < EditorState > ((set, get) => ({
  presets: [
    {
      id: 'hero',
      name: 'Hero',
      settings: {
        ...defaultSettings,
        fontSize: 64,
        fontWeight: 900,
        gradientEnabled: true,
        gradientColors: ['#06b6d4', '#3b82f6'],
        perLetterAnimation: 'stagger',
        shadowPreset: 'medium',
      },
    },
    {
      id: 'minimal',
      name: 'Minimal',
      settings: {
        ...defaultSettings,
        fontFamily: 'Roboto',
        fontWeight: 400,
        gradientEnabled: false,
        shadowPreset: 'soft',
      },
    },
    {
      id: 'neon',
      name: 'Neon',
      settings: {
        ...defaultSettings,
        fontFamily: 'Courier New',
        fontWeight: 700,
        gradientEnabled: true,
        gradientColors: ['#ff00cc', '#333399'],
        shadowPreset: 'neon',
        hoverGlow: true,
      },
    },
    // Add more presets as needed
  ],
  selectedPresetId: 'hero',
  settings: defaultSettings,
  darkMode: false,

  selectPreset: (id) => {
    const preset = get().presets.find((p) => p.id === id);
    if (preset) {
      set({ selectedPresetId: id, settings: preset.settings });
    }
  },

  updateSettings: (partial) => {
    set((state) => ({
      settings: { ...state.settings, ...partial },
    }));
  },

  setSettings: (settings) => set({ settings }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  addPreset: (preset) =>
    set((state) => ({ presets: [...state.presets, preset] })),

  resetSettings: () => set({ settings: defaultSettings }),
}));