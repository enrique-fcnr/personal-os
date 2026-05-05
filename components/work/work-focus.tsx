"use client";

import { useState } from "react";
import { Pencil, Check } from "lucide-react";

export default function WorkFocus() {
  const [editing, setEditing] = useState(false);
  const [focus, setFocus] = useState("Expansão Q4 & Infraestrutura de Dados");
  const [draft, setDraft] = useState(focus);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) setFocus(trimmed);
    else setDraft(focus);
    setEditing(false);
  };

  if (editing) {
    return (
      <p className="font-inter text-white/40 text-sm mt-2">
        Foco Atual:{" "}
        <span className="inline-flex items-center gap-1.5">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") { setDraft(focus); setEditing(false); }
            }}
            className="bg-transparent border-b border-brand-sky/50 focus:border-brand-sky outline-none text-brand-sky text-sm font-inter min-w-[220px]"
          />
          <button
            onMouseDown={(e) => { e.preventDefault(); commit(); }}
            className="text-white/30 hover:text-white transition-colors shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </span>
      </p>
    );
  }

  return (
    <p className="font-inter text-white/40 text-sm mt-2">
      Foco Atual:{" "}
      <button
        onClick={() => { setDraft(focus); setEditing(true); }}
        className="text-brand-sky hover:text-brand-sky inline-flex items-center gap-1.5 group"
      >
        <span>{focus}</span>
        <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
      </button>
    </p>
  );
}
