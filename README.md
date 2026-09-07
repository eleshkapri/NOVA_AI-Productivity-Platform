# NOVA — Autonomous AI Productivity Platform
> **Build Better. Work Smarter.**  
> Front-End Development Intern Assignment Submission for **Sankar Group**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Live Demo & Repository
- **Live URL**: [https://nova-ai-platform.vercel.app](https://nova-ai-platform.vercel.app) *(or your deployed Vercel/Netlify link)*
- **GitHub Repository**: [https://github.com/your-username/sankar-group-internship-nova](https://github.com/your-username/sankar-group-internship-nova)

---

## 🚀 Project Overview
**NOVA** is an enterprise-grade AI productivity platform designed to eliminate developer toil and streamline sprint execution. It unifies project management, automates backlog grooming, provides real-time codebase-aware PR summaries, and forecasts sprint velocity risks before deadlines hit.

This project was built from scratch to meet and exceed all specifications defined in the **Sankar Group Front-End Development Internship** assignment brief.

---

## 🛠️ Technologies Used
- **Core Framework**: React 19 (Functional Components, Hooks, declarative state)
- **3D Graphics & WebGL**: Three.js (Interactive 3D Neural Core, dynamic cursor parallax, constellation lattice, procedural wave simulation)
- **Bundler & Tooling**: Vite 8 (Ultra-fast HMR, sub-300ms production builds with dynamic code-splitting)
- **Styling & Design System**: Tailwind CSS v4 (Custom dark/light mode tokens, glassmorphism, responsive utilities)
- **Iconography**: `lucide-react` (Crisp, modern SVG icons)
- **Linter & Code Quality**: `oxlint` (Zero warnings, clean ESLint-compatible rules)
- **State Management**: Custom React Hooks (`useTheme`, `useCountUp`, `useScrollPosition`)

---

## 📋 Comprehensive Feature Matrix

### 1. Mandatory Sections (13/13 Completed)
1. **Navigation Bar**: Sticky on scroll, dynamic backdrop blur, brand logo, section anchors, dark/light mode switcher, and mobile hamburger drawer with auto-close.
2. **Hero Section**: Eyebrow announcement pill, bold H1, dual CTAs ("Start Free Trial" & "Watch Demo"), trust indicators, and an **interactive sprint dashboard console mockup**.
3. **Trusted By**: Clean, grayscale logo strip featuring 6 high-growth tech companies.
4. **Features (6 Rich Cards)**: Responsive 3-col grid with autonomous AI, copilot, predictive velocity, PR summaries, tool sync, and zero-trust security.
5. **Product / About Section**: Split-screen narrative on developer fragmentation, 3 core metrics, and an **interactive Before vs. With NOVA workflow toggle**.
6. **How It Works**: 4-step onboarding journey with desktop connecting lines and mobile timeline layout.
7. **Statistics**: 4 key scale metrics with automated count-up animations.
8. **Solutions / Use Cases**: 4-persona segmented tabs (*Engineering Teams*, *Product Managers*, *Freelancers & Agencies*, *Enterprise Leaders*) with dynamic feature checklists.
9. **Testimonials**: Minimum 3 reviews (4 included) with star ratings, quotes, company badges, and initials avatars.
10. **Pricing**: 3 tiers (*Starter*, *Professional*, *Enterprise*) with feature checklists and highlighted "Most Popular" ribbon.
11. **FAQ**: 6 comprehensive questions inside a buttery single-open accordion with full keyboard navigation and ARIA attributes.
12. **Final CTA**: Full-width high-conversion gradient banner with dual CTAs and trust badges.
13. **Footer**: 4-column structured link directory, live operational status indicator, social links, copyright, and newsletter validation.

### 2. Bonus Features (8/8 Completed)
- [x] **Dark / Light Mode**: Seamless theme toggle with system preference fallback and `localStorage` persistence.
- [x] **Animated Statistics**: Numerical count-up triggered on scroll using an `IntersectionObserver` hook.
- [x] **Scroll Animations**: Smooth entrance reveals, hover glow effects, and GPU-accelerated transforms.
- [x] **Testimonial Carousel**: Interactive slider with prev/next arrows, dot indicators, and autoplay with hover pause.
- [x] **Monthly / Annual Pricing Toggle**: Real-time state recalculation with an active **"Save 20%"** discount badge.
- [x] **Interactive Demo Modal**: Accessible popup dialog with simulated CLI output, feature walkthrough tabs, and keyboard ESC dismissal.
- [x] **Newsletter Email Validation**: Live client-side regex check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), inline error reporting, and success feedback.
- [x] **Back-to-Top Button**: Floating action button appearing past 400px scroll with smooth scroll-to-top behavior.

---

## 💻 Installation & Local Development

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/sankar-group-internship-nova.git

# 2. Navigate into the project folder
cd sankar-group-internship-nova

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview the production build
npm run preview
```

---

## 📁 Project Architecture & Clean File Structure

```
├── index.html                     # HTML5 shell, SEO meta tags, Google Fonts
├── vite.config.js                 # Vite configuration with Tailwind CSS v4 plugin
├── package.json                   # Dependencies and scripts
├── README.md                      # Submission documentation
├── EXPLANATION.md                 # 5-question evaluation document
├── INTERVIEW_PREP.md              # Complete live review defense Q&A
└── src/
    ├── main.jsx                   # React entry point
    ├── App.jsx                    # Root component assembling all sections
    ├── index.css                  # Custom utilities, dark mode variant, scrollbar
    ├── hooks/                     # Reusable React hooks
    │   ├── useTheme.js            # Dark/light mode state & persistence
    │   ├── useCountUp.js          # IntersectionObserver number animation
    │   └── useScrollPosition.js   # Sticky navbar & back-to-top trigger
    ├── data/                      # 100% Decoupled, data-driven content arrays
    │   ├── navigation.js          # Header and footer navigation links
    │   ├── logos.js               # Trusted companies data
    │   ├── features.js            # 6 core feature cards with badges & metrics
    │   ├── about.js               # Before vs After comparison data
    │   ├── howItWorks.js          # 4-step workflow details
    │   ├── stats.js               # Numerical counters
    │   ├── solutions.js           # 4 persona profiles & capability checklists
    │   ├── testimonials.js        # 4 client reviews with rating & quotes
    │   ├── pricing.js             # 3 tiers with monthly & annual pricing
    │   └── faq.js                 # 6 technical Q&As
    └── components/
        ├── common/                # Reusable UI primitives
        │   ├── Button.jsx         # Accessible button with 5 variants & sizes
        │   ├── Badge.jsx          # Color-coded badges with pulse dots
        │   ├── SectionHeader.jsx  # Uniform typographic section headers
        │   └── Modal.jsx          # Accessible dialog with ESC listener & scroll lock
        ├── layout/                # Structural layout components
        │   ├── Navbar.jsx         # Sticky header with mobile drawer
        │   ├── Footer.jsx         # Footer with newsletter email validation
        │   └── BackToTop.jsx      # Scroll-to-top floating action button
        └── sections/              # The 13 required landing page sections
            ├── Hero.jsx           # Hero with interactive sprint preview
            ├── TrustedBy.jsx      # Grayscale logo bar
            ├── Features.jsx       # 6 feature cards with hover glow
            ├── About.jsx          # Story & Before-vs-After comparison
            ├── HowItWorks.jsx     # 4-step horizontal/vertical roadmap
            ├── Stats.jsx          # Animated numerical counters
            ├── Solutions.jsx      # Persona tabs with live checklists
            ├── Testimonials.jsx   # Autoplay carousel slider
            ├── Pricing.jsx        # Pricing cards with annual discount toggle
            ├── FAQ.jsx            # Single-expand accordion
            ├── FinalCTA.jsx       # Full-bleed conversion banner
            └── DemoModal.jsx      # Interactive product tour simulator
```

---

## 🤖 AI Tools Disclosure
In compliance with the assignment brief's transparency guidelines:
- **AI Tool Used**: Antigravity (powered by Google Gemini)
- **Role of AI**: AI assistance was utilized to accelerate component scaffolding, brainstorm enterprise-grade copy tailored to the Sankar Group JD, structure the responsive layout tokens in Tailwind CSS, and generate edge-case test criteria.
- **Human Oversight**: Every line of code was reviewed, debugged, and refined. Architectural patterns, hook encapsulation, accessibility ARIA attributes, and component isolation were verified manually to ensure maintainability and production readiness.

---

## 📄 License
This project is open-source under the MIT License.
