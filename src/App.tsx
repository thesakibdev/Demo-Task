import React from "react";
import { PresetCard } from "./components/PresetCard";

const App = () => {
  const presets = [
    { id: "hero", label: "Hero", style: "text-5xl font-bold" },
    { id: "minimal", label: "Minimal", style: "text-3xl font-light" },
    {
      id: "neon",
      label: "Neon",
      style: "text-4xl text-pink-500 drop-shadow-[0_0_10px_#ff00ff]",
    },
    { id: "elegant", label: "Elegant", style: "text-4xl italic" },
    { id: "bold", label: "Bold", style: "text-6xl font-extrabold" },
  ];
  return (
    <div>
      {presets.map((preset) => (
        <PresetCard key={preset.id} preset={preset} />
      ))}
    </div>
  );
};

export default App;
