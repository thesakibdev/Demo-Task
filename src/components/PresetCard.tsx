import { motion } from 'framer-motion';
import type { HeadlinePreset } from '../store';

interface PresetCardProps {
  preset: HeadlinePreset;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PresetCard({ preset, isSelected = false, onClick }: PresetCardProps) {
  const { settings } = preset;
  
  // Generate preview styles based on settings
  const getPreviewStyles = () => {
    const baseStyles = {
      fontSize: `${Math.min(settings.fontSize / 2, 24)}px`,
      fontWeight: settings.fontWeight,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}px`,
      fontFamily: settings.fontFamily,
    };

    if (settings.gradientEnabled) {
      return {
        ...baseStyles,
        background: `linear-gradient(${settings.gradientDirection}, ${settings.gradientColors[0]}, ${settings.gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }

    return baseStyles;
  };

  return (
    <motion.div
      draggable
      className={`p-3 rounded-lg border-2 cursor-grab hover:shadow-md transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-sm text-gray-900 dark:text-white">
            {preset.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {getPresetDescription(preset)}
          </div>
        </div>
        
        <div 
          className="text-center ml-2"
          style={getPreviewStyles()}
        >
          {settings.text.length > 8 ? settings.text.substring(0, 8) + '...' : settings.text}
        </div>
      </div>
    </motion.div>
  );
}

function getPresetDescription(preset: HeadlinePreset): string {
  const descriptions: Record<string, string> = {
    'hero': 'Launch big ideas',
    'minimal': 'Clarity over noise',
    'neon': 'Glow like a pro',
    'elegant': 'Timeless typography',
    'bold': 'Make it unforgettable',
    'modern': 'Contemporary style'
  };
  
  return descriptions[preset.id] || 'Custom preset';
}
