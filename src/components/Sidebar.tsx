import React from 'react';
import { motion } from 'framer-motion';
import { PresetCard } from './PresetCard';
import { useEditorStore } from '../store';
import { Download, Share2, Save, Copy, FileText, Link, Undo2, Redo2 } from 'lucide-react';
import { exportToJSON, exportToSnippet, exportToReactComponent } from '../utils/exportUtils';
import { copyShareableURL } from '../utils/shareUtils';

export const Sidebar: React.FC = () => {
  const { presets, selectPreset, selectedPresetId, darkMode, settings } = useEditorStore();

  const handleExport = () => {
    exportToJSON(settings);
  };

  const handleShare = async () => {
    try {
      await copyShareableURL(settings);
      console.log('Shareable URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const handleSave = () => {
    console.log('Settings saved to localStorage!');
  };

  const handleExportReact = () => {
    exportToReactComponent(settings);
  };

  const handleCopySnippet = () => {
    exportToSnippet(settings);
  };

  const colorTemplates = [
    { name: 'INDIGO → CYAN', colors: ['#4f46e5', '#06b6d4'] },
    { name: 'PURPLE → PINK', colors: ['#8b5cf6', '#ec4899'] },
    { name: 'BLUE → VIOLET', colors: ['#3b82f6', '#8b5cf6'] },
    { name: 'ORANGE → ROSE', colors: ['#f59e0b', '#f43f5e'] },
    { name: 'MINT → LIME', colors: ['#10b981', '#84cc16'] },
    { name: 'SLATE → SKY', colors: ['#475569', '#0ea5e9'] },
    { name: 'NEON LIME → CYAN', colors: ['#84cc16', '#06b6d4'] },
  ];

  return (
    <div className="space-y-6">
      {/* Preset Gallery */}
      <div className={`rounded-2xl p-6 backdrop-blur-sm ${
        darkMode 
          ? 'bg-gray-800/50 border border-gray-700' 
          : 'bg-white/50 border border-gray-200'
      }`}>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Preset Gallery</h2>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Drag into editor →
          </p>
        </div>

        <div className="space-y-3">
          {presets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isSelected={selectedPresetId === preset.id}
              onClick={() => selectPreset(preset.id)}
            />
          ))}
        </div>
      </div>

      {/* Color Templates */}
      <div className={`rounded-2xl p-6 backdrop-blur-sm ${
        darkMode 
          ? 'bg-gray-800/50 border border-gray-700' 
          : 'bg-white/50 border border-gray-200'
      }`}>
        <h2 className="text-lg font-bold mb-4">Color Templates</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {colorTemplates.map((template) => (
            <motion.button
              key={template.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onClick={() => useEditorStore.getState().updateSettings({ 
                gradientColors: template.colors as [string, string],
                gradientEnabled: true 
              })}
            >
              <div 
                className="w-full h-4 rounded mb-2"
                style={{
                  background: `linear-gradient(to-r, ${template.colors[0]}, ${template.colors[1]})`
                }}
              />
              <div className="text-left">
                <div className="text-sm font-medium">{template.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Apply</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
