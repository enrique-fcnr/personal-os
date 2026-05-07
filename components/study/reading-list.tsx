"use client";

import { useState } from "react";
import { Plus, X, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type Book = {
  id: number;
  title: string;
  author: string;
  type: string;
  currentPage: number;
  totalPages: number;
  coverGradient: string;
};

const COVERS = [
  "from-[#1a3a5c] to-[#0d2035]",
  "from-[#3d2010] to-[#1a0d05]",
  "from-[#0a2a1a] to-[#051510]",
  "from-[#2a1040] to-[#120820]",
  "from-[#1a2a40] to-[#0a1525]",
  "from-[#3a1a10] to-[#1a0d08]",
];

const TYPES = ["Livro", "Artigo", "Whitepaper", "Scientific Journal", "Newsletter"];

const INITIAL: Book[] = [
  { id: 1, title: "Princípios de Design de Sistemas",  author: "Johnathan Ivy",     type: "Livro",              currentPage: 148, totalPages: 320, coverGradient: COVERS[0] },
  { id: 2, title: "Neuroplasticidade e Aprendizado",   author: "Scientific Journal", type: "Scientific Journal", currentPage: 8,   totalPages: 22,  coverGradient: COVERS[1] },
  { id: 3, title: "Economia de Rede e Efeitos Virais", author: "Whitepaper V2",      type: "Whitepaper",         currentPage: 12,  totalPages: 60,  coverGradient: COVERS[2] },
  { id: 4, title: "The Pragmatic Programmer",          author: "Hunt & Thomas",      type: "Livro",              currentPage: 352, totalPages: 352, coverGradient: COVERS[3] },
  { id: 5, title: "Atomic Habits",                     author: "James Clear",        type: "Livro",              currentPage: 285, totalPages: 285, coverGradient: COVERS[4] },
];

let nextId  = INITIAL.length + 1;
let nextClr = INITIAL.length;

function pct(current: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((current / total) * 100));
}

function barColor(p: number) {
  if (p >= 100) return "bg-green-400";
  if (p >= 50)  return "bg-brand-sky";
  return "bg-brand-sky/60";
}

export default function ReadingList() {
  const [books, setBooks]         = useState<Book[]>(INITIAL);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [editPageId, setEditPageId] = useState<number | null>(null);
  const [pageDraft, setPageDraft] = useState("");
  const [adding, setAdding]       = useState(false);
  const [form, setForm]           = useState({ title: "", author: "", type: "Livro", currentPage: "", totalPages: "" });

  const add = () => {
    if (!form.title.trim()) return;
    setBooks((p) => [...p, {
      id: nextId++,
      title: form.title,
      author: form.author || "—",
      type: form.type,
      currentPage: parseInt(form.currentPage) || 0,
      totalPages: parseInt(form.totalPages) || 0,
      coverGradient: COVERS[nextClr++ % COVERS.length],
    }]);
    setForm({ title: "", author: "", type: "Livro", currentPage: "", totalPages: "" });
    setAdding(false);
  };

  const commitPage = (id: number) => {
    const val = parseInt(pageDraft) || 0;
    setBooks((p) => p.map((b) => b.id === id ? { ...b, currentPage: Math.min(val, b.totalPages) } : b));
    setEditPageId(null);
  };

  const remove = (id: number) => { setBooks((p) => p.filter((b) => b.id !== id)); setConfirmId(null); };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 text-brand-sky" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">Leitura</p>
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-sky hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <input
            placeholder="Autor / Fonte"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
          />
          <div className="grid grid-cols-3 gap-2 items-end">
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="bg-transparent border-b border-white/20 outline-none font-inter text-[10px] text-white/60 pb-1 [color-scheme:dark]"
            >
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input
              placeholder="Página atual"
              value={form.currentPage}
              onChange={(e) => setForm((f) => ({ ...f, currentPage: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
            />
            <div className="flex items-end gap-2">
              <input
                placeholder="Total de páginas"
                value={form.totalPages}
                onChange={(e) => setForm((f) => ({ ...f, totalPages: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") add(); }}
                className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1 w-0"
              />
              <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-sky hover:text-white transition-colors shrink-0 pb-1">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Book list */}
      <div className="flex flex-col gap-5 max-h-72 overflow-y-auto">
        {books.map((book) => {
          const p = pct(book.currentPage, book.totalPages);
          const done = p >= 100;
          return (
            <div key={book.id} className="group">
              <div className="flex items-center gap-4">
                {/* Cover */}
                <div className={cn(
                  "w-12 h-16 rounded-md shrink-0 bg-gradient-to-br flex items-end p-1.5",
                  book.coverGradient
                )}>
                  <div className="w-full h-0.5 bg-white/10 rounded-full" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-sm font-medium text-white/85 leading-snug line-clamp-2">{book.title}</p>
                  <p className="font-inter text-[11px] text-white/35 mt-0.5">{book.author}</p>

                  {/* Page tracker */}
                  {book.totalPages > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        {/* Editable current page */}
                        <div className="flex items-center gap-1 text-white/30">
                          {editPageId === book.id ? (
                            <input
                              autoFocus
                              value={pageDraft}
                              onChange={(e) => setPageDraft(e.target.value)}
                              onBlur={() => commitPage(book.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") commitPage(book.id);
                                if (e.key === "Escape") setEditPageId(null);
                              }}
                              className="bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-inter text-[10px] text-white/70 w-10 text-center"
                            />
                          ) : (
                            <button
                              onClick={() => { setPageDraft(String(book.currentPage)); setEditPageId(book.id); }}
                              className="font-inter text-[10px] text-white/40 hover:text-white/70 transition-colors tabular-nums"
                            >
                              p.{book.currentPage}
                            </button>
                          )}
                          <span className="font-inter text-[10px] text-white/20">/ {book.totalPages}</span>
                        </div>
                        <span className={cn("font-inter text-[10px] font-medium", done ? "text-green-400" : "text-brand-sky")}>
                          {p}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-500", barColor(p))}
                          style={{ width: `${p}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remove */}
                <div className="shrink-0 self-start">
                  {confirmId === book.id ? (
                    <span className="flex flex-col items-end gap-1">
                      <button onClick={() => remove(book.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                      <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmId(book.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
