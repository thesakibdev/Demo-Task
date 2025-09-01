interface Preset {
  id: string;
  label: string;
  style: string;
}

export function PresetCard({ preset }: { preset: Preset }) {
  return (
    <div
      draggable
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 p-3 cursor-grab hover:shadow-md transition"
    >
      <div className={preset.style}>{preset.label}</div>
    </div>
  );
}
