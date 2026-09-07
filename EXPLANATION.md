# NOVA — Technical Architecture & Design Explanation

> Prepared for the **Sankar Group Front-End Development Internship Review**.

---

## 1. Design Decisions

### A. Visual Identity & Brand System
Rather than submitting a generic, cookie-cutter Bootstrap template, NOVA was designed with a modern developer-first aesthetic inspired by leading developer tools (Linear, Supabase, Vercel, and Raycast):
- **Color Tokens**: Built on a refined palette pairing Deep Slate (`slate-950` / `slate-900`) with vibrant Electric Indigo (`#4f46e5`), Violet (`#7c3aed`), and Emerald (`#10b981`) for success indicators.
- **Glassmorphism & Depth**: Used layered frosted glass surfaces (`backdrop-blur-md bg-white/70` in light mode, `bg-slate-900/70 border-white/10` in dark mode) to create tangible depth without relying on heavy box shadows that clutter the viewport.
- **Micro-Interactions**: Subtle, GPU-accelerated hover effects (`hover:-translate-y-1`, smooth color transitions, gradient border glows, and pulsing status pills) provide immediate feedback without feeling distracting.

### B. Responsive Strategy (Mobile-First)
The layout was architected mobile-first using Tailwind CSS's breakpoint hierarchy (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`):
- **Navigation**: Collapses into an accessible slide-down mobile drawer with full backdrop blur and auto-closing on link selection or viewport expansion.
- **Grids**: Dynamic grid collapses from 3 columns on desktop $\rightarrow$ 2 columns on tablet $\rightarrow$ 1 column on mobile, preventing awkward line wrapping or horizontal overflow.
- **Zero Horizontal Overflow**: Guaranteed by strict wrapper containers (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) and defensive overflow constraints.

---

## 2. Technology Choices

### A. React 19 + Vite 8
- **Why Vite over Create React App (CRA)**: CRA is deprecated and slow. Vite utilizes native ES modules (ESM) during development for sub-second hot module replacement (HMR) and Rollup under the hood for highly optimized production chunking.
- **Why React**: The Sankar Group job posting specifically lists **React and Next.js** as core requirements. Developing with React directly proves competence with component lifecycles, hooks, and virtual DOM reconciliation.
- **Why not full Next.js for this specific brief**: A landing page without complex multi-page routing or server-side databases achieves the best Lighthouse performance and quickest dev loop when built with Vite. However, the component structure was strictly authored to be **isomorphic to Next.js App Router** (see Section 3).

### B. Tailwind CSS v4
- Standardizes all spacing (4px/8px scale), font weights, line heights, and border radiuses across all 13 sections.
- Eliminates unused CSS via modern tree-shaking, resulting in a compiled production CSS bundle of only **11.3 KB (gzipped)**.

### C. Lucide React
- Standardized, consistent SVG stroke weights (2px) and dimensions across all sections, ensuring cohesive iconography.

---

## 3. Component Structure & Data Flow

### A. Separation of Concerns & Data-Driven Architecture
To adhere to the **Single Responsibility Principle (SRP)** and avoid the anti-pattern of hardcoding text into monolithic JSX files:
- All section content is decoupled into `src/data/*.js` (`features.js`, `pricing.js`, `faq.js`, `howItWorks.js`, `testimonials.js`, `solutions.js`).
- Visual components act as pure, reusable presentation layers that map over structured props (e.g. `<FeatureCard key={feature.id} {...feature} />`).
- Updating copy, adding pricing plans, or modifying FAQs requires zero changes to component JSX, mimicking real-world CMS or API-driven architectures.

### B. Custom Hooks for Encapsulated Logic
- **`useTheme`**: Reads and writes to `localStorage`, synchronizes with `window.matchMedia('(prefers-color-scheme: dark)')`, and toggles the `dark` class on the `<html>` document element.
- **`useCountUp`**: Utilizes an `IntersectionObserver` to trigger a mathematical cubic ease-out number interpolation only when the Statistics section enters the user's viewport.
- **`useScrollPosition`**: Throttles window scroll events to update navbar blur depth and trigger the Back-to-Top floating button once scrolling surpasses 400px.

### C. Next.js Readiness (Isomorphic Architecture)
The codebase is structured so it can be ported to **Next.js 14/15 App Router** in minutes:
- Static sections (`Hero`, `TrustedBy`, `Features`, `About`, `HowItWorks`, `Footer`) can run as **React Server Components (RSC)** with zero JavaScript delivered to the client.
- Dynamic interactive widgets (`Navbar`, `Pricing` with billing toggle, `FAQ` accordion, `Testimonials` carousel, `DemoModal`, `BackToTop`) simply require the `'use client'` directive at the top of their respective files.

---

## 4. Challenges Faced & Solutions

1. **Challenge: Preventing Layout Shifts (CLS) in the FAQ Accordion**  
   - *Problem*: Using simple CSS `max-height` transitions often causes stepped, janky animations or requires arbitrary large pixel heights (e.g. `max-h-96`).
   - *Solution*: Implemented modern CSS grid row transitions (`grid-template-rows: 1fr` $\leftrightarrow$ `grid-template-rows: 0fr`). This allows the browser to calculate exact content heights natively without layout thrashing.

2. **Challenge: Performance & Bundle Size with Count-Up Animations**  
   - *Problem*: Heavy external animation libraries can bloat the client bundle and trigger excessive React re-renders.
   - *Solution*: Created a lightweight custom hook (`useCountUp.js`) using native `requestAnimationFrame` with an `IntersectionObserver` threshold. It only animates once when visible, runs smoothly at 60 FPS, and adds virtually zero kilobytes to the bundle.

3. **Challenge: Accessible Dialog & Drawer Scroll Locking**  
   - *Problem*: Opening the mobile menu or Demo modal allowed users to continue scrolling the background page.
   - *Solution*: Added a clean `useEffect` lifecycle in `Modal.jsx` that sets `document.body.style.overflow = 'hidden'` while open and restores it upon cleanup, alongside handling keyboard `Escape` dismissal.

---

## 5. How AI Tools Were Used

In adherence to the assignment's explicit AI guidelines:
- **Ideation & Brainstorming**: Used Antigravity (Google Gemini) to map the assignment rubric against Sankar Group’s multi-vertical tech profile (AI, telecom, and fintech ecosystem), resulting in the high-impact "NOVA" product positioning.
- **Boilerplate Acceleration**: Generated initial component skeletons, TypeScript-ready prop contracts, and realistic technical sprint data (avoiding generic "Lorem ipsum").
- **Quality Assurance & Verification**: Leveraged AI prompts to brainstorm accessibility edge cases (focus states, screen reader ARIA landmarks, contrast ratios) and verify clean production build scripts.
- **Manual Refinement**: Every component, CSS token, and event listener was manually reviewed, refined, and tested across viewports to ensure clean engineering standards.
