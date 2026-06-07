import { useState } from "react";

export default function PreviewBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Versione di anteprima — piattaforma in sviluppo
        </p>

        <button
          onClick={() => setVisible(false)}
          className="text-amber-700 text-sm font-semibold"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}