import React, { useEffect } from 'react';
import { useEditorStore } from '../store';

export const KeyboardShortcuts: React.FC = () => {
  const { toggleDarkMode, resetSettings } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K for quick actions
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        // You can add a quick actions modal here
        console.log('Quick actions triggered');
      }

      // Cmd/Ctrl + D for dark mode toggle
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault();
        toggleDarkMode();
      }

      // Escape to reset settings
      if (event.key === 'Escape') {
        resetSettings();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleDarkMode, resetSettings]);

  return null; // This component doesn't render anything
};
