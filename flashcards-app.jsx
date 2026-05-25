const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ───────────────────── Markdown-lite + KaTeX ─────────────────────
   We accept inline `$...$` and display `$$...$$` math, plus **bold**.
   Render to React children so KaTeX runs in HTML mode on real DOM. */

function renderRich(text) {
  if (!text) return null;
  // split out math segments first
  const parts = [];
  const re = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let lastIdx = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) {
      parts.push({ type: "text", value: text.slice(lastIdx, m.index), key: i++ });
    }
    if (m[1] !== undefined) {
      parts.push({ type: "math-display", value: m[1], key: i++ });
    } else {
      parts.push({ type: "math-inline", value: m[2], key: i++ });
    }
    lastIdx = re.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push({ type: "text", value: text.slice(lastIdx), key: i++ });
  }
  return parts.map(p => {
    if (p.type === "text") return <BoldText key={p.key} text={p.value} />;
    if (p.type === "math-inline") return <TeX key={p.key} tex={p.value} display={false} />;
    return <TeX key={p.key} tex={p.value} display={true} />;
  });
}

function BoldText({ text }) {
  const segs = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {segs.map((s, i) => {
        if (s.startsWith("**") && s.endsWith("**")) {
          return <strong key={i}>{s.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={i}>{s}</React.Fragment>;
      })}
    </>
  );
}

function TeX({ tex, display }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.katex) {
      try {
        window.katex.render(tex, ref.current, {
          displayMode: display,
          throwOnError: false,
          output: "html"
        });
      } catch (e) {
        ref.current.textContent = tex;
      }
    }
  }, [tex, display]);
  return display
    ? <div ref={ref} className="kx-display" />
    : <span ref={ref} className="kx-inline" />;
}

/* ───────────────────── Flashcard ───────────────────── */

function Flashcard({ card, flipped, onFlip, index, total }) {
  const catLabel = window.CATEGORIES.find(c => c.id === card.cat)?.label || card.cat;
  return (
    <div className="card-stage">
      <div
        className={"card-flip" + (flipped ? " is-flipped" : "")}
        onClick={onFlip}
        role="button"
        aria-label="Voltear tarjeta"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onFlip(); }}}
      >
        {/* FRONT — Pregunta */}
        <div className="card face front">
          <div className="card-header">
            <span className="chip-side">Pregunta</span>
            <span className="chip-cat">{catLabel}</span>
          </div>
          <div className="card-body">
            <div className="card-q">{renderRich(card.q)}</div>
          </div>
          <div className="card-footer">
            <span className="card-count">{String(index + 1).padStart(2, "0")} <span className="muted">/ {String(total).padStart(2, "0")}</span></span>
            <span className="hint">Pulsa <kbd>espacio</kbd> o haz clic para voltear</span>
          </div>
        </div>

        {/* BACK — Respuesta */}
        <div className="card face back">
          <div className="card-header">
            <span className="chip-side back-chip">Respuesta</span>
            <span className="chip-cat back-chip-cat">{catLabel}</span>
          </div>
          <div className="card-body">
            <div className="card-a">{renderRich(card.a)}</div>
          </div>
          <div className="card-footer back-footer">
            <span className="card-count">{String(index + 1).padStart(2, "0")} <span className="muted">/ {String(total).padStart(2, "0")}</span></span>
            <span className="hint">Pulsa <kbd>espacio</kbd> para volver</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── App ───────────────────── */

function shuffleArr(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const all = window.FLASHCARDS;
  const cats = window.CATEGORIES.map(c => ({
    ...c,
    n: c.id === "todas" ? all.length : all.filter(x => x.cat === c.id).length
  }));

  const [activeCat, setActiveCat] = useState("todas");
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState(() => all.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(() => new Set());

  // Recompute deck when filter or shuffle changes
  useEffect(() => {
    const base = all
      .map((c, i) => ({ c, i }))
      .filter(x => activeCat === "todas" || x.c.cat === activeCat)
      .map(x => x.i);
    setOrder(shuffled ? shuffleArr(base) : base);
    setIndex(0);
    setFlipped(false);
  }, [activeCat, shuffled]);

  const total = order.length;
  const cardIdx = order[index];
  const card = cardIdx != null ? all[cardIdx] : null;

  const next = useCallback(() => {
    setFlipped(false);
    setIndex(i => (i + 1) % total);
  }, [total]);
  const prev = useCallback(() => {
    setFlipped(false);
    setIndex(i => (i - 1 + total) % total);
  }, [total]);
  const flip = useCallback(() => setFlipped(f => !f), []);

  const markKnown = () => {
    setKnown(s => {
      const next = new Set(s);
      next.add(cardIdx);
      return next;
    });
    next();
  };
  const markReview = () => {
    setKnown(s => {
      const next = new Set(s);
      next.delete(cardIdx);
      return next;
    });
    next();
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      if (e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      else if (e.key.toLowerCase() === "s") { setShuffled(s => !s); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, flip]);

  const knownInDeck = order.filter(i => known.has(i)).length;
  const progressPct = total > 0 ? Math.round((knownInDeck / total) * 100) : 0;

  return (
    <div className="app">
      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-left">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="40" height="40">
              <text x="6" y="22" fontFamily="Instrument Serif, serif" fontSize="22" fill="currentColor">a</text>
              <text x="20" y="14" fontFamily="Instrument Serif, serif" fontSize="14" fill="currentColor" fontStyle="italic">n</text>
            </svg>
          </div>
          <div>
            <h1 className="title">Tarjetas didácticas</h1>
            <p className="subtitle">Potenciación, radicación &amp; logaritmación · {all.length} tarjetas</p>
          </div>
        </div>
        <div className="hdr-right">
          <button
            className={"icon-btn" + (shuffled ? " active" : "")}
            onClick={() => setShuffled(s => !s)}
            title="Mezclar (S)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M4 20l17-17"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
            <span>{shuffled ? "Mezclado" : "Mezclar"}</span>
          </button>
          <button
            className="icon-btn"
            onClick={() => { setKnown(new Set()); setIndex(0); setFlipped(false); }}
            title="Reiniciar progreso"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>
            <span>Reiniciar</span>
          </button>
        </div>
      </header>

      {/* CATEGORY CHIPS */}
      <nav className="chips" aria-label="Categorías">
        {cats.map(c => (
          <button
            key={c.id}
            className={"chip" + (activeCat === c.id ? " on" : "")}
            onClick={() => setActiveCat(c.id)}
          >
            <span>{c.label}</span>
            <span className="chip-n">{c.n}</span>
          </button>
        ))}
      </nav>

      {/* PROGRESS */}
      <div className="progress-row">
        <div className="progress-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: progressPct + "%" }} />
        </div>
        <span className="progress-text">
          <strong>{knownInDeck}</strong> de {total} dominadas <span className="muted">· {progressPct}%</span>
        </span>
      </div>

      {/* CARD */}
      <main className="stage-wrap">
        <button className="nav-btn left" onClick={prev} aria-label="Anterior">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {card && (
          <Flashcard
            card={card}
            flipped={flipped}
            onFlip={flip}
            index={index}
            total={total}
          />
        )}

        <button className="nav-btn right" onClick={next} aria-label="Siguiente">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </main>

      {/* ACTIONS */}
      <div className="actions">
        <button className="action review" onClick={markReview}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>
          Repasar otra vez
        </button>
        <button className="action flip-action" onClick={flip}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17v-6h6"/><path d="M21 13a9 9 0 0 1-15 6.7L3 17"/><path d="M3 11a9 9 0 0 1 15-6.7L21 7"/></svg>
          {flipped ? "Ocultar respuesta" : "Ver respuesta"}
        </button>
        <button className="action known" onClick={markKnown}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          La domino
        </button>
      </div>

      {/* KEY HINTS */}
      <footer className="foot">
        <span><kbd>←</kbd> <kbd>→</kbd> navegar</span>
        <span><kbd>espacio</kbd> voltear</span>
        <span><kbd>S</kbd> mezclar</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
