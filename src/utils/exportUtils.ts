import type { HeadlineSettings } from '../store';

export function exportToJSON(settings: HeadlineSettings) {
  const data = JSON.stringify(settings, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "headline-settings.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToSnippet(settings: HeadlineSettings) {
  const getStyles = () => {
    const baseStyles = [
      `font-size: ${settings.fontSize}px`,
      `font-weight: ${settings.fontWeight}`,
      `line-height: ${settings.lineHeight}`,
      `letter-spacing: ${settings.letterSpacing}px`,
      `font-family: ${settings.fontFamily}`,
    ];

    if (settings.gradientEnabled) {
      baseStyles.push(
        `background: linear-gradient(${settings.gradientDirection}, ${settings.gradientColors[0]}, ${settings.gradientColors[1]})`,
        '-webkit-background-clip: text',
        '-webkit-text-fill-color: transparent',
        'background-clip: text'
      );
    }

    if (settings.textShadow) {
      baseStyles.push('text-shadow: 2px 2px 4px rgba(0,0,0,0.3)');
    }

    if (settings.outline) {
      baseStyles.push('-webkit-text-stroke: 1px black');
    }

    return baseStyles.join('; ');
  };

  const snippet = `<h1 style="${getStyles()}">${settings.text}</h1>`;
  
  navigator.clipboard.writeText(snippet).then(() => {
    // You could add a toast notification here
    console.log('Snippet copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy snippet:', err);
  });
}

export function exportToReactComponent(settings: HeadlineSettings) {
  const getStyles = () => {
    const baseStyles: Record<string, string | number> = {
      fontSize: `${settings.fontSize}px`,
      fontWeight: settings.fontWeight,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}px`,
      fontFamily: settings.fontFamily,
    };

    if (settings.gradientEnabled) {
      baseStyles.background = `linear-gradient(${settings.gradientDirection}, ${settings.gradientColors[0]}, ${settings.gradientColors[1]})`;
      baseStyles.WebkitBackgroundClip = 'text';
      baseStyles.WebkitTextFillColor = 'transparent';
      baseStyles.backgroundClip = 'text';
    }

    if (settings.textShadow) {
      baseStyles.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    }

    if (settings.outline) {
      baseStyles.WebkitTextStroke = '1px black';
    }

    return baseStyles;
  };

  const component = `import React from 'react';

const Headline = () => {
  const styles = ${JSON.stringify(getStyles(), null, 2)};
  
  return (
    <h1 style={styles}>
      ${settings.text}
    </h1>
  );
};

export default Headline;`;

  const blob = new Blob([component], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Headline.tsx";
  a.click();
  URL.revokeObjectURL(url);
}
