import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '../store';
import { 
  Type, 
  Palette, 
  Sparkles, 
  Settings, 
  ArrowRight, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Copy,
  Save,
  FolderOpen,
  Link,
  Undo2,
  Redo2
} from 'lucide-react';

export const EditorPanel: React.FC = () => {
  const { settings, updateSettings, darkMode } = useEditorStore();
  const [expandedSections, setExpandedSections] = useState({
    typography: true,
    colorGradient: true,
    effects: true
  });

  const fontFamilies = [
    'ui-serif, Georgia, Cambria, Times New Roman, serif',
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 
    'Montserrat', 'Raleway', 'Playfair Display', 'Merriweather'
  ];

  const colorTemplates = [
    { name: 'Ocean Blue', colors: ['#06b6d4', '#3b82f6'] },
    { name: 'Sunset', colors: ['#f59e0b', '#ef4444'] },
    { name: 'Forest', colors: ['#10b981', '#059669'] },
    { name: 'Neon Pink', colors: ['#ec4899', '#8b5cf6'] },
    { name: 'Golden', colors: ['#fbbf24', '#f59e0b'] },
    { name: 'Purple Dream', colors: ['#8b5cf6', '#a855f7'] },
  ];

  const gradientDirections = [
    { value: 'to-r', icon: ArrowRight, label: 'Right' },
    { value: 'to-l', icon: ArrowLeft, label: 'Left' },
    { value: 'to-t', icon: ArrowUp, label: 'Up' },
    { value: 'to-b', icon: ArrowDown, label: 'Down' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm h-full ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200'
    }`}>
      {/* Top Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Settings size={20} className="text-blue-500" />
          <span className="font-semibold">Editor</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Copy PNG"
          >
            <Download size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Export JSON"
          >
            <FileText size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Embed Snippet"
          >
            <Copy size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Save"
          >
            <Save size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Load"
          >
            <FolderOpen size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Copy Link"
          >
            <Link size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Undo"
          >
            <Undo2 size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Redo"
          >
            <Redo2 size={16} />
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Headline Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Headline</label>
          <input
            type="text"
            value={settings.text}
            onChange={(e) => updateSettings({ text: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            }`}
            placeholder="Enter your headline..."
          />
        </div>

        {/* Typography Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('typography')}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Type size={16} className="text-blue-500" />
              <span className="font-semibold">Typography</span>
            </div>
            {expandedSections.typography ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {expandedSections.typography && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium mb-2">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Size: {settings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    value={settings.fontSize}
                    onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Font Weight */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Weight: {settings.fontWeight}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={settings.fontWeight}
                    onChange={(e) => updateSettings({ fontWeight: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Line Height */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Line Height: {settings.lineHeight}em
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => updateSettings({ lineHeight: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Letter Spacing */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Letter Spacing: {settings.letterSpacing}em
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="20"
                    value={settings.letterSpacing}
                    onChange={(e) => updateSettings({ letterSpacing: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Color & Gradient Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('colorGradient')}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Palette size={16} className="text-blue-500" />
              <span className="font-semibold">Color & Gradient</span>
            </div>
            {expandedSections.colorGradient ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {expandedSections.colorGradient && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.gradientEnabled}
                  onChange={(e) => updateSettings({ gradientEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Enable Gradient</span>
              </div>

              {settings.gradientEnabled && (
                <>
                  {/* Gradient Direction */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Direction</label>
                    <div className="grid grid-cols-4 gap-2">
                      {gradientDirections.map((direction) => {
                        const Icon = direction.icon;
                        return (
                          <motion.button
                            key={direction.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-lg border transition-colors ${
                              settings.gradientDirection === direction.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : darkMode
                                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                            onClick={() => updateSettings({ gradientDirection: direction.value as any })}
                            title={direction.label}
                          >
                            <Icon size={16} />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gradient Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">From</label>
                      <input
                        type="color"
                        value={settings.gradientColors[0]}
                        onChange={(e) => updateSettings({ 
                          gradientColors: [e.target.value, settings.gradientColors[1]] 
                        })}
                        className="w-full h-12 rounded-lg border cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">To</label>
                      <input
                        type="color"
                        value={settings.gradientColors[1]}
                        onChange={(e) => updateSettings({ 
                          gradientColors: [settings.gradientColors[0], e.target.value] 
                        })}
                        className="w-full h-12 rounded-lg border cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Effects Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('effects')}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-blue-500" />
              <span className="font-semibold">Effects</span>
            </div>
            {expandedSections.effects ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {expandedSections.effects && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Per-letter Animation */}
                <div>
                  <label className="block text-sm font-medium mb-2">Per-letter</label>
                  <select
                    value={settings.perLetterAnimation}
                    onChange={(e) => updateSettings({ perLetterAnimation: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="none">None</option>
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="stagger">Stagger</option>
                  </select>
                </div>

                {/* Text Shadow */}
                <div>
                  <label className="block text-sm font-medium mb-2">Text Shadow</label>
                  <select
                    value={settings.shadowPreset}
                    onChange={(e) => updateSettings({ shadowPreset: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="none">None</option>
                    <option value="soft">Soft</option>
                    <option value="medium">Medium</option>
                    <option value="neon">Neon</option>
                  </select>
                </div>

                {/* Toggle Effects */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.hoverGlow}
                      onChange={(e) => updateSettings({ hoverGlow: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Hover Glow</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.outline}
                      onChange={(e) => updateSettings({ outline: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Outline</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.fadeIn}
                      onChange={(e) => updateSettings({ fadeIn: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Fade-in</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.textShadow}
                      onChange={(e) => updateSettings({ textShadow: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Text Shadow</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
