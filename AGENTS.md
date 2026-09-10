# AGENTS.md — AI Agent Guidance & Skills Integration

This project is configured with three premier design engineering & anti-slop skill toolkits:
1. **Emil Kowalski Design Engineering** (`.agents/skills/emil-design-eng`, `.agents/skills/animate`, `.agents/skills/apple-design`, `.agents/skills/review-animations`)
2. **Taste Skill (Anti-Slop Frontend Framework)** (`.agents/skills/design-taste-frontend`, `.agents/skills/high-end-visual-design`, `.agents/skills/redesign-existing-projects`)
3. **Impeccable Design Toolkit** (`.agents/skills/impeccable`)

---

## Agent Instructions & Priorities
1. **Honor Design & Product Context**: Always read and adhere to [`PRODUCT.md`](./PRODUCT.md) and [`DESIGN.md`](./DESIGN.md) before making frontend modifications.
2. **Anti-Slop Discipline**:
   - Never default to generic AI purple mesh gradients, cookie-cutter 3-column cards, or low-contrast text.
   - Maintain the Three Dials configuration: `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 4`.
3. **Fluid Motion & Micro-Interactions**:
   - Follow Emil Kowalski's animation rules: use spring-calibrated easing (`cubic-bezier(0.16, 1, 0.3, 1)`), interruptible state transitions, and CSS Grid row expansions for zero Cumulative Layout Shift (CLS).
   - Ensure all animations respect `@media (prefers-reduced-motion: reduce)`.
4. **Code Quality & Build Integrity**:
   - Enforce zero warnings on `npx oxlint --deny-warnings`.
   - Ensure clean production builds on `npm run build`.
   - Never run local dev servers or localhost.
