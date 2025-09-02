import { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { Check, Copy } from "lucide-react";

export default function HeadlineEditor() {
  const {
    text,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    fontFamily,
    textColor,
    gradient,
    shadow,
    setText,
    setFontSize,
    setFontWeight,
    setLineHeight,
    setLetterSpacing,
    setFontFamily,
    setTextColor,
    toggleGradient,
    setGradientColors,
    setGradientDirection,
    setShadow,
  } = useEditorStore();

  const [copied, setCopied] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);

  // remove local gradient mirror; update store directly to avoid desync

  const generateCSS = () => {
    const styles = {
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
      textShadow: shadow !== "none" ? shadow : undefined,
      color: !gradient.enabled ? textColor : undefined,
      background: gradient.enabled
        ? `linear-gradient(${gradient.direction}, ${gradient.colors[0]}, ${gradient.colors[1]})`
        : undefined,
      WebkitBackgroundClip: gradient.enabled ? "text" : undefined,
      WebkitTextFillColor: gradient.enabled ? "transparent" : undefined,
      backgroundClip: gradient.enabled ? "text" : undefined,
    };

    return Object.entries(styles)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        const cssKey = key
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
          .replace("webkit-", "-webkit-");
        return `  ${cssKey}: ${value};`;
      })
      .join("\n");
  };

  const generateTailwindHTML = () => {
    const classes = [];

    const fontMap: Record<string, string> = {
      Inter: "font-sans",
      Roboto: "font-sans",
      "Open Sans": "font-sans",
      Poppins: "font-sans",
      "Playfair Display": "font-serif",
      Merriweather: "font-serif",
      "Fira Code": "font-mono",
      "JetBrains Mono": "font-mono",
    };
    classes.push(fontMap[fontFamily] || `font-['${fontFamily}']`);

    classes.push(`text-[${fontSize}px]`);

    const weightMap: Record<number, string> = {
      100: "font-thin",
      200: "font-extralight",
      300: "font-light",
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
      800: "font-extrabold",
      900: "font-black",
    };
    classes.push(weightMap[fontWeight] || `font-[${fontWeight}]`);

    classes.push(`leading-[${lineHeight}]`);

    if (letterSpacing !== 0) {
      classes.push(`tracking-[${letterSpacing}px]`);
    }

    if (gradient.enabled) {
      const direction = gradient.direction.replace("to ", "");
      const dirMap: Record<string, string> = {
        right: "bg-gradient-to-r",
        left: "bg-gradient-to-l",
        bottom: "bg-gradient-to-b",
        top: "bg-gradient-to-t",
        "bottom right": "bg-gradient-to-br",
        "bottom left": "bg-gradient-to-bl",
        "top right": "bg-gradient-to-tr",
        "top left": "bg-gradient-to-tl",
      };
      classes.push(dirMap[direction] || "bg-gradient-to-r");
      classes.push("bg-clip-text");
      classes.push("text-transparent");
      classes.push(`from-[${gradient.colors[0]}]`);
      classes.push(`to-[${gradient.colors[1]}]`);
    } else {
      classes.push(`text-[${textColor}]`);
    }

    if (shadow !== "none") {
      classes.push(`drop-shadow-[${shadow}]`);
    }

    return `<h1 class="${classes.join(" ")}">${text}</h1>`;
  };

  const copyCSS = async () => {
    const css = `.headline {\n${generateCSS()}\n}`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy CSS:", err);
    }
  };

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(generateTailwindHTML());
      setCopiedHTML(true);
      setTimeout(() => setCopiedHTML(false), 2000);
    } catch (err) {
      console.error("Failed to copy HTML:", err);
    }
  };

  // const headlineStyle = {
  //   fontFamily: fontFamily,
  //   fontSize: `${fontSize}px`,
  //   fontWeight: fontWeight,
  //   lineHeight: lineHeight,
  //   letterSpacing: `${letterSpacing}px`,
  //   textShadow: shadow !== "none" ? shadow : undefined,
  //   ...(gradient.enabled
  //     ? {
  //         background: `linear-gradient(${gradient.direction}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
  //         WebkitBackgroundClip: "text",
  //         WebkitTextFillColor: "transparent",
  //         backgroundClip: "text",
  //         color: "transparent",
  //       }
  //     : {
  //         color: textColor,
  //       }),
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Headline Typography Editor
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Preview
            </h2>
            <div className="bg-gray-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
              <h1
                className="text-5xl font-bold"
                style={{
                  background: gradient.enabled
                    ? `linear-gradient(${gradient.direction}, ${gradient.colors[0]}, ${gradient.colors[1]})`
                    : "none",
                  WebkitBackgroundClip: gradient.enabled ? "text" : "unset",
                  color: gradient.enabled ? "transparent" : "#111827",
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  textShadow: shadow !== "none" ? shadow : undefined,
                }}
              >
                {text}
              </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Controls
            </h2>

            {/* Headline Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your headline..."
              />
            </div>

            {/* Typography Controls */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Merriweather">Merriweather</option>
                  <option value="Fira Code">Fira Code</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Weight: {fontWeight}
                </label>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height: {lineHeight}
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="2"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter Spacing: {letterSpacing}px
                </label>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  step="0.5"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Gradient Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Gradient Text
                </label>
                <button
                  onClick={toggleGradient}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    gradient.enabled
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {gradient.enabled ? "ON" : "OFF"}
                </button>
              </div>

              {gradient.enabled && (
                <div className="space-y-3">
                  {/* Color Pickers */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Color 1
                      </label>
                      <input
                        type="color"
                        value={gradient.colors[0]}
                        onChange={(e) =>
                          setGradientColors([
                            e.target.value,
                            gradient.colors[1],
                          ])
                        }
                        className="w-full h-10 rounded border border-gray-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Color 2
                      </label>
                      <input
                        type="color"
                        value={gradient.colors[1]}
                        onChange={(e) =>
                          setGradientColors([
                            gradient.colors[0],
                            e.target.value,
                          ])
                        }
                        className="w-full h-10 rounded border border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Direction Dropdown */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Gradient Direction
                    </label>
                    <select
                      value={gradient.direction}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="to right">→ To Right</option>
                      <option value="to left">← To Left</option>
                      <option value="to bottom">↓ To Bottom</option>
                      <option value="to top">↑ To Top</option>
                      <option value="to bottom right">↘ To Bottom Right</option>
                      <option value="to bottom left">↙ To Bottom Left</option>
                      <option value="to top right">↗ To Top Right</option>
                      <option value="to top left">↖ To Top Left</option>
                    </select>
                  </div>
                  {/* live updates; no separate save needed */}
                </div>
              )}
            </div>

            {/* Solid Text Color */}
            {!gradient.enabled && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-14 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#111827"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Shadow Controls */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Shadow
              </label>
              <select
                value={shadow}
                onChange={(e) => setShadow(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="2px 2px 4px rgba(0,0,0,0.3)">Soft Shadow</option>
                <option value="4px 4px 8px rgba(0,0,0,0.5)">
                  Medium Shadow
                </option>
                <option value="6px 6px 12px rgba(0,0,0,0.7)">
                  Strong Shadow
                </option>
                <option value="0 0 10px rgba(59,130,246,0.8)">Blue Glow</option>
                <option value="0 0 10px rgba(236,72,153,0.8)">Pink Glow</option>
              </select>
            </div>

            {/* Copy Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={copyCSS}
                className="bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    CSS Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy CSS
                  </>
                )}
              </button>

              <button
                onClick={copyHTML}
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {copiedHTML ? (
                  <>
                    <Check size={18} />
                    HTML Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy HTML
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">CSS</h3>
              <button
                onClick={copyCSS}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Copy size={18} />
              </button>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`.headline {\n${generateCSS()}\n}`}</code>
            </pre>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <div className="">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">HTML + CSS</h3>
                <button
                  onClick={copyHTML}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
              <pre className="text-blue-400 text-sm overflow-x-auto">
                <code>{generateTailwindHTML()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
