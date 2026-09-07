# Live Review & Code Defense Preparation Guide

> This cheat sheet prepares you for the live interview evaluation for the **Sankar Group Front-End Development Internship**.  
> Evaluators will test your comprehension of the codebase. Review these exact talking points.

---

### Q1: "How do your components work together?"
**Answer:**  
> *"The application follows a modular, single-responsibility component architecture. `App.jsx` acts as the root coordinator that mounts global providers and layout elements.
> 
> UI components are split into two categories:
> 1. **Common primitives** (`Button`, `Badge`, `SectionHeader`, `Modal`) which are stateless, reusable presentation components.
> 2. **Section components** (`Hero`, `Features`, `Pricing`, `FAQ`, etc.) which receive decoupled data from `src/data/*.js` and render cards dynamically.
> 
> State is lifted only where necessary: for instance, the theme state lives in `useTheme` and is shared with `Navbar` and the `<html>` root, while the interactive `DemoModal` visibility state is toggled from the Hero and Navbar CTAs."*

---

### Q2: "How does the mobile navigation work?"
**Answer:**  
> *"The mobile navigation is built inside `Navbar.jsx` using an accessible drawer pattern:
> - It uses a local boolean state `isOpen`.
> - A hamburger button (with `aria-expanded` and `aria-label`) toggles `isOpen` on smaller viewports (`md:hidden`).
> - When a user clicks any anchor link inside the mobile drawer, the `handleNavClick` handler smoothly scrolls to the target section with an 80px offset for the sticky header, and immediately sets `setIsOpen(false)` to collapse the menu.
> - In addition, we have a window `resize` event listener that automatically resets `isOpen` to `false` if the user rotates their device or resizes above the 768px (`md`) breakpoint."*

---

### Q3: "How does the FAQ accordion work?"
**Answer:**  
> *"The accordion in `FAQ.jsx` uses single-expand state management:
> - We store `openIndex` in state (defaulting to the first item `0`).
> - Clicking an item calls `handleToggle(index)`. If `openIndex === index`, it sets it to `null` (collapsing it); otherwise, it sets it to the clicked index.
> - For smooth animations without layout jank, we use CSS Grid row animation: `grid-template-rows: 1fr` when open, and `grid-template-rows: 0fr` when closed, with an `overflow: hidden` inner container. This allows the browser to transition between 0 and the exact dynamic height of the content without hardcoding arbitrary max-heights.
> - For accessibility, each question button has an `aria-expanded` boolean and an `aria-controls` attribute pointing to the answer container's unique ID."*

---

### Q4: "How is your data rendered?"
**Answer:**  
> *"All content is 100% data-driven and decoupled from the JSX. Rather than hardcoding text and repeating markup across cards, content lives in structured arrays in `src/data/*.js` (such as `features.js`, `pricing.js`, `faq.js`, `solutions.js`).
> 
> In each section, we map over the array with a unique key:
> ```jsx
> {featuresData.map((feature) => (
>   <FeatureCard key={feature.id} {...feature} />
> ))}
> ```
> This guarantees clean code, adheres to the DRY principle (Don't Repeat Yourself), and mirrors how a production web app consumes data from a REST or GraphQL API or headless CMS."*

---

### Q5: "Why did you select React + Vite + Tailwind instead of other frameworks?"
**Answer:**  
> *"Three reasons:
> 1. **Alignment with the Job Description**: Sankar Group explicitly stated React and Next.js as required skills. Using React 19 allowed me to showcase my mastery of core React patterns (hooks, state, virtual DOM, event delegation).
> 2. **Vite over Create React App**: Vite uses native ES modules (ESM) in development for instant HMR and Rollup for production bundling. Our production build completes in under 250 milliseconds with a minified bundle of just 83 KB, which is critical for Google Lighthouse performance.
> 3. **Tailwind CSS v4**: It provides a unified design token system. We get responsive utility classes, consistent 4px/8px spacing, and built-in dark mode support without runtime CSS-in-JS overhead."*

---

### Q6: "How did you handle responsive design?"
**Answer:**  
> *"I designed mobile-first using Tailwind's standard breakpoint tiers:
> - Base (mobile, 375px+): 1-column layouts, stacked cards, full-width buttons, and hamburger navigation.
> - Tablet (`md: 768px`): 2-column grids for features and steps, inline hero buttons.
> - Desktop (`lg: 1024px` / `xl: 1280px`): 3-column grids, horizontal roadmap connectors, and full desktop navbar with instant CTA buttons.
> - To prevent horizontal scrolling, every section is constrained within a centered `max-w-7xl` container with responsive padding (`px-4 sm:px-6 lg:px-8`), and defensive `overflow-hidden` constraints are applied to decorative blur circles."*

---

### Q7: "How would you further improve accessibility (a11y)?"
**Answer:**  
> *"While this site already includes semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), `aria-expanded` attributes, visible `focus-visible:ring-2` focus rings, and keyboard ESC handlers for modals, in a full enterprise deployment I would:
> 1. Add automated CI accessibility regression testing using `@axe-core/react` or Cypress a11y.
> 2. Implement an `aria-live="polite"` region for dynamic state changes, such as when switching the monthly/annual pricing toggle or receiving newsletter confirmation.
> 3. Add a hidden 'Skip to main content' anchor link at the very top of the page for screen reader and keyboard-only users."*

---

### Q8: "How would you optimize performance for a high-traffic production release?"
**Answer:**  
> *"1. **Code-Splitting**: Wrap heavier components that appear below the fold (like the `DemoModal` or `Testimonials`) in `React.lazy()` and `Suspense` so they are only loaded when requested or scrolled into view.
> 2. **Modern Image Formats**: Convert any raster mockups into modern AVIF and WebP formats with responsive `<picture>` srcset definitions and explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
> 3. **Edge Caching & CDN**: Host static assets on Cloudflare or Vercel Edge Network with aggressive `Cache-Control: public, max-age=31536000, immutable` headers."*

---

### Q9: "How would you convert this static site into a full Next.js production application?"
**Answer:**  
> *"Because I architected this codebase with Next.js App Router isomorphism in mind, the migration is seamless:
> 1. **Directory Restructuring**: Move the components into a Next.js project with the `app/` directory structure.
> 2. **Server Components (RSC)**: Convert static marketing sections (`Hero`, `TrustedBy`, `Features`, `About`, `HowItWorks`, `Footer`) into React Server Components. Since they have no client-side hooks, they render on the server and transmit zero JavaScript to the browser.
> 3. **Client Components**: Add the `'use client'` directive to interactive widgets (`Navbar`, `Pricing` with the annual billing toggle, `FAQ` accordion, `Testimonials` carousel, `DemoModal`, `BackToTop`).
> 4. **Backend API Routes**: Create Route Handlers (`app/api/newsletter/route.ts` and `app/api/demo/route.ts`) to securely connect the newsletter and demo requests to a service like Resend or SendGrid with database persistence in PostgreSQL/Prisma or Supabase."*

---

### Live Coding Modifications You Might Be Asked to Do:
1. **Change a color scheme**:
   - In `src/index.css` or component classes, change `indigo-600` to `blue-600` or `emerald-600`.
2. **Add a new feature card**:
   - Simply append a new object to `src/data/features.js` with `id`, `iconName`, `badge`, `title`, `description`, and `metric`. The grid updates automatically.
3. **Change annual discount from 20% to 25%**:
   - In `src/components/sections/Pricing.jsx`, change the badge text and update the `annualPrice` values in `src/data/pricing.js`.
4. **Add a new question to the FAQ**:
   - Append a new `{ id, question, answer }` object into `src/data/faq.js`.
