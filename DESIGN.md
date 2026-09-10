# DESIGN.md — NOVA Design System & Anti-Slop Specification

> Calibrated against **Taste Skill**, **Emil Kowalski Design Engineering**, and **Impeccable**.

---

## 1. The Three Dials (Taste Skill Configuration)
* **`DESIGN_VARIANCE: 7`** — High intentional asymmetry; rejects repetitive 3-equal-card layouts in favor of bento grids, split comparison viewers, and radar metrics.
* **`MOTION_INTENSITY: 6`** — Tactile, physics-calibrated micro-motion; 60fps matrix tilt on desktop cards, cubic ease-out number count-ups, procedural Web Audio chimes on actions.
* **`VISUAL_DENSITY: 4`** — Spacious developer tool density; comfortable margins (`px-4 sm:px-6 lg:px-8`), max-width 7xl containment, zero horizontal clipping.

---

## 2. Color Palette & Design Tokens

### Dark Mode (Obsidian Cybernetic — Default)
* **Background Deep**: `#050614` (`slate-950` / cybernetic obsidian)
* **Surface Glass**: `rgba(15, 23, 42, 0.7)` with `backdrop-blur-md` and `border-white/10`
* **Brand Primary (Liquid Gold)**: `#D8B452` / `#E5C568` (Warm metallic luxury accent)
* **Brand Secondary (Orchid Lavender)**: `#8E6FFF` / `#A78BFA` (Vibrant electric edge)
* **Success Indicator**: `#10B981` (Emerald-500)
* **Warning / Alert**: `#F59E0B` (Amber-500)
* **Danger / Chaos**: `#EF4444` (Rose-500)

### Light Mode (Crisp Slate High-Contrast)
* **Background Clean**: `#F8FAFC` (Crisp Slate 50)
* **Surface Card**: `#FFFFFF` with `border-slate-200/80` and elevated ambient shadows
* **High-Contrast Typography**: `#1E1B4B` to `#6833FF` via `.orchid-number-gradient` and `.orchid-lavender-gradient`
* **Text Primary**: `#0F172A` (Slate 900)
* **Text Muted**: `#475569` (Slate 600)

---

## 3. Motion & Animation Principles (Emil Kowalski Guidelines)
1. **Spring-Calibrated Curves**: Prefer cubic bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) and spring transitions over linear/stiff easing.
2. **Interruptible Transitions**: Modal dialogs, tabs, and drawer expansions must handle immediate reversal without stutter or jump.
3. **Hardware Acceleration**: Use `transform` (`translateY`, `scale3d`, `rotateX/Y`) and `opacity` exclusively for 60fps animations.
4. **Layout Shift Prevention**: Animate height changes using CSS Grid row transitions (`grid-template-rows: 1fr` $\leftrightarrow$ `grid-template-rows: 0fr`) rather than arbitrary `max-height`.
5. **Accessibility Discipline**: Always respect `@media (prefers-reduced-motion: reduce)` by disabling tilt physics and ambient particle animations.

---

## 4. Anti-Pattern & Anti-Slop Bans (Impeccable Standards)
* 🚫 **Banned**: Centered hero with generic dark purple mesh and generic "AI magic" stars.
* 🚫 **Banned**: Low-contrast gray-on-gray text that fails WCAG AA 4.5:1.
* 🚫 **Banned**: Nested cards-inside-cards-inside-cards without clear typographic hierarchy.
* 🚫 **Banned**: Infinite looping hover jank or micro-shakes that cause visual fatigue.
* 🚫 **Banned**: Placeholder "Lorem Ipsum" copy; all mocks must display real engineering data (AST nodes, PR branches, DORA latencies, git commits).
