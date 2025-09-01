import React from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '../store';
import { Eye, Download, Copy } from 'lucide-react';

export const PreviewPanel: React.FC = () => {
  const { settings, darkMode } = useEditorStore();

  const getPreviewStyles = () => {
    const baseStyles: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      fontWeight: settings.fontWeight,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}px`,
      fontFamily: settings.fontFamily,
      textAlign: 'center',
      width: '100%',
    };

    // Apply gradient if enabled
    if (settings.gradientEnabled) {
      baseStyles.background = `linear-gradient(${settings.gradientDirection}, ${settings.gradientColors[0]}, ${settings.gradientColors[1]})`;
      baseStyles.WebkitBackgroundClip = 'text';
      baseStyles.WebkitTextFillColor = 'transparent';
      baseStyles.backgroundClip = 'text';
    }

    // Apply text shadow
    if (settings.textShadow) {
      baseStyles.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    }

    // Apply outline
    if (settings.outline) {
      baseStyles.WebkitTextStroke = '1px black';
    }

    return baseStyles;
  };

  const getCardStyles = () => {
    const shadowStyles = {
      none: '',
      soft: 'shadow-lg',
      medium: 'shadow-xl',
      neon: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    };

    return shadowStyles[settings.shadowPreset];
  };

  const handleCopyImage = async () => {
    try {
      const element = document.getElementById('preview-headline');
      if (element) {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = 'headline.png';
        link.href = image;
        link.click();
      }
    } catch (error) {
      console.error('Failed to copy image:', error);
    }
  };

  const handleCopyCode = () => {
    const code = `<h1 style="${Object.entries(getPreviewStyles())
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ')}">${settings.text}</h1>`;
    
    navigator.clipboard.writeText(code);
    console.log('Snippet copied to clipboard!');
  };

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm h-full ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Eye size={20} className="text-blue-500" />
          <h2 className="text-xl font-bold">Preview</h2>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
            onClick={handleCopyCode}
            title="Copy HTML code"
          >
            <Copy size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
            onClick={handleCopyImage}
            title="Download as image"
          >
            <Download size={16} />
          </motion.button>
        </div>
      </div>

      {/* Segment Style Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Segment style:</label>
        <select
          className={`w-full px-3 py-2 rounded-lg border transition-colors ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="highlight">Highlight</option>
          <option value="background">Background</option>
        </select>
      </div>

      {/* Preview Area */}
      <div className={`flex-1 flex items-center justify-center p-8 rounded-xl transition-all duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } ${getCardStyles()}`}>
        <motion.div
          id="preview-headline"
          className="max-w-full text-center"
          style={getPreviewStyles()}
          whileHover={settings.hoverGlow ? { 
            filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))',
            scale: 1.02 
          } : {}}
          initial={settings.fadeIn ? { opacity: 0 } : {}}
          animate={settings.fadeIn ? { opacity: 1 } : {}}
          transition={settings.fadeIn ? { duration: 0.5 } : {}}
        >
          {settings.text.split(' ').map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              {wordIndex > 0 && <br />}
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  initial={settings.perLetterAnimation === 'stagger' ? { opacity: 0, y: 20 } : {}}
                  animate={settings.perLetterAnimation === 'stagger' ? { opacity: 1, y: 0 } : {}}
                  transition={settings.perLetterAnimation === 'stagger' ? { 
                    delay: (wordIndex * 10 + charIndex) * 0.1,
                    duration: 0.3 
                  } : {}}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
