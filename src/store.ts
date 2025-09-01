import { create } from "zustand";
import {
  saveSettings,
  loadSettings,
  savePresets,
  loadPresets,
  saveDarkMode,
  loadDarkMode,
} from "./utils/localStorageUtils";
import { loadSettingsFromURL } from "./utils/shareUtils";

export type GradientDirection = "to-r" | "to-l" | "to-t" | "to-b";

export type PerLetterAnimation = "none" | "fade" | "slide" | "stagger";

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
  shadowPreset: "none" | "soft" | "medium" | "neon";
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
  saveCurrentSettings: () => void;
  loadSavedSettings: () => void;
}

const defaultSettings: HeadlineSettings = {
  text: "Timeless typography",
  fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, serif",
  fontSize: 64,
  fontWeight: 600,
  lineHeight: 1.0,
  letterSpacing: 0,
  gradientEnabled: true,
  gradientDirection: "to-r",
  gradientColors: ["#3b82f6", "#8b5cf6"], // blue to purple gradient
  perLetterAnimation: "fade",
  hoverGlow: false,
  textShadow: false,
  outline: false,
  fadeIn: true,
  wordStyling: {
    highlight: false,
    underline: true,
    backgroundBlock: false,
  },
  shadowPreset: "soft",
};

const defaultPresets: HeadlinePreset[] = [
  {
    id: "hero",
    name: "Hero",
    settings: {
      ...defaultSettings,
      text: "Launch big ideas",
      fontSize: 64,
      fontWeight: 900,
      gradientEnabled: true,
      gradientColors: ["#06b6d4", "#3b82f6"],
      perLetterAnimation: "stagger",
      shadowPreset: "medium",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    settings: {
      ...defaultSettings,
      text: "Clarity over noise",
      fontFamily: "Roboto",
      fontSize: 36,
      fontWeight: 400,
      gradientEnabled: false,
      shadowPreset: "soft",
    },
  },
  {
    id: "neon",
    name: "Neon",
    settings: {
      ...defaultSettings,
      text: "Glow like a pro",
      fontFamily: "Courier New",
      fontSize: 48,
      fontWeight: 700,
      gradientEnabled: true,
      gradientColors: ["#ff00cc", "#333399"],
      shadowPreset: "neon",
      hoverGlow: true,
      perLetterAnimation: "stagger",
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    settings: {
      ...defaultSettings,
      text: "Timeless typography",
      fontFamily: "Playfair Display",
      fontSize: 42,
      fontWeight: 600,
      gradientEnabled: true,
      gradientColors: ["#8b5cf6", "#a855f7"],
      shadowPreset: "soft",
      letterSpacing: 2,
    },
  },
  {
    id: "bold",
    name: "Bold",
    settings: {
      ...defaultSettings,
      text: "Make it unforgettable",
      fontSize: 72,
      fontWeight: 900,
      gradientEnabled: true,
      gradientColors: ["#f59e0b", "#ef4444"],
      shadowPreset: "medium",
      textShadow: true,
    },
  },
  {
    id: "modern",
    name: "Modern",
    settings: {
      ...defaultSettings,
      text: "Contemporary style",
      fontFamily: "Poppins",
      fontSize: 40,
      fontWeight: 600,
      gradientEnabled: true,
      gradientColors: ["#10b981", "#059669"],
      shadowPreset: "soft",
      lineHeight: 1.1,
    },
  },
];

// Initialize settings from URL, localStorage, or defaults
const initializeSettings = (): HeadlineSettings => {
  // First try to load from URL
  const urlSettings = loadSettingsFromURL();
  if (urlSettings) {
    return urlSettings;
  }

  // Then try to load from localStorage
  const savedSettings = loadSettings();
  if (savedSettings) {
    return savedSettings;
  }

  // Finally use defaults
  return defaultSettings;
};

// Initialize presets from localStorage or defaults
const initializePresets = (): HeadlinePreset[] => {
  const savedPresets = loadPresets();
  return savedPresets || defaultPresets;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  presets: initializePresets(),
  selectedPresetId: "elegant", // Set to elegant by default to match the image
  settings: initializeSettings(),
  darkMode: loadDarkMode(),

  selectPreset: (id: string) => {
    const preset = get().presets.find((p: HeadlinePreset) => p.id === id);
    if (preset) {
      set({ selectedPresetId: id, settings: preset.settings });
      saveSettings(preset.settings);
    }
  },

  updateSettings: (partial: Partial<HeadlineSettings>) => {
    set((state: EditorState) => {
      const newSettings = { ...state.settings, ...partial };
      saveSettings(newSettings);
      return { settings: newSettings };
    });
  },

  setSettings: (settings: HeadlineSettings) => {
    set({ settings });
    saveSettings(settings);
  },

  toggleDarkMode: () => {
    set((state: EditorState) => {
      const newDarkMode = !state.darkMode;
      saveDarkMode(newDarkMode);
      return { darkMode: newDarkMode };
    });
  },

  addPreset: (preset: HeadlinePreset) => {
    set((state: EditorState) => {
      const newPresets = [...state.presets, preset];
      savePresets(newPresets);
      return { presets: newPresets };
    });
  },

  resetSettings: () => {
    set({ settings: defaultSettings });
    saveSettings(defaultSettings);
  },

  saveCurrentSettings: () => {
    const { settings } = get();
    saveSettings(settings);
  },

  loadSavedSettings: () => {
    const savedSettings = loadSettings();
    if (savedSettings) {
      set({ settings: savedSettings });
    }
  },
}));
