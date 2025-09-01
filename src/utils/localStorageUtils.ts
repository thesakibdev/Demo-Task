import type { HeadlineSettings, HeadlinePreset } from '../store';

const STORAGE_KEYS = {
  SETTINGS: 'headline-editor-settings',
  PRESETS: 'headline-editor-presets',
  DARK_MODE: 'headline-editor-dark-mode',
} as const;

export function saveSettings(settings: HeadlineSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): HeadlineSettings | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
}

export function savePresets(presets: HeadlinePreset[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
  } catch (error) {
    console.error('Failed to save presets:', error);
  }
}

export function loadPresets(): HeadlinePreset[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRESETS);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load presets:', error);
    return null;
  }
}

export function saveDarkMode(darkMode: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
  } catch (error) {
    console.error('Failed to save dark mode:', error);
  }
}

export function loadDarkMode(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  } catch (error) {
    console.error('Failed to load dark mode:', error);
    return false;
  }
}

export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}
