# DESIGN SYSTEM SPECIFICATION: Kibret Mulugeta Personal Identity Site

## 1. Color Palette & Semantic Tokens
The visual palette is inspired by high-tech AI research labs (DeepMind, OpenAI research publications) with slate/zinc dark backgrounds, sleek surfaces, and vibrant technical accents.

```css
:root {
  --bg-dark: #090a0f;           /* Main background: Deep Slate/Zinc black */
  --bg-surface: #12141d;        /* Surface layers & card backgrounds */
  --bg-surface-hover: #1a1d2b;  /* Interactive surface hover state */
  --border-subtle: rgba(255, 255, 255, 0.08); /* Minimal 1px border */
  --border-accent: rgba(56, 189, 248, 0.3);    /* Cyan highlight border */

  --text-primary: #f3f4f6;      /* Off-white primary text */
  --text-secondary: #9ca3af;    /* Slate-400 muted text */
  --text-muted: #6b7280;        /* Slate-500 extra muted label text */

  --accent-cyan: #38bdf8;       /* Primary technical cyan */
  --accent-indigo: #6366f1;     /* Secondary deep indigo */
  --accent-emerald: #10b981;    /* System status / research green */
}
```

---

## 2. Typography Hierarchy
- **Primary Body & Headings:** `Inter`, `system-ui`, `sans-serif`
- **Code, Metrics & Technical Specs:** `JetBrains Mono`, `Fira Code`, `monospace`

| Style Name | Font Family | Size / Leading | Weight | Usage |
|---|---|---|---|---|
| Hero Display | Inter | 3.5rem / 1.1 | 800 (ExtraBold) | Main Hero Title |
| Section Heading | Inter | 2.25rem / 1.2 | 700 (Bold) | Main Section Headers |
| Card Title | Inter | 1.25rem / 1.4 | 600 (SemiBold) | Project & Research Titles |
| Technical Label | JetBrains Mono | 0.875rem / 1.5 | 500 (Medium) | Tags, Code, Metrics, System Architecture |
| Body Regular | Inter | 1rem / 1.6 | 400 (Regular) | General Descriptions & Case Studies |

---

## 3. Visual Primitives & Glassmorphism
- **Tactical Grid:** Subtle background grid overlay using CSS linear gradients.
- **Glassmorphic Cards:** `backdrop-blur-md bg-[#12141D]/80 border border-white/10 shadow-2xl`
- **Gradients:** Radial glow overlays for hero section and visual diagrams (`radial-gradient(ellipse at top, #1e293b 0%, #090a0f 70%)`).

---

## 4. Animation & Motion Design Guidelines
- Framer Motion variant standards for cards, page transitions, and node highlights.
- **Micro-interactions:** Hover scale `1.02`, glow intensity transitions `300ms ease-out`.
- **Accessibility:** Full compliance with `prefers-reduced-motion` using Framer Motion's `useReducedMotion()` hook or conditional transition props.
