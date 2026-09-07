import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollPosition } from './hooks/useScrollPosition';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';

// Section Components
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { Features } from './components/sections/Features';
import { About } from './components/sections/About';
import { HowItWorks } from './components/sections/HowItWorks';
import { Stats } from './components/sections/Stats';
import { Solutions } from './components/sections/Solutions';
import { Testimonials } from './components/sections/Testimonials';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { DemoModal } from './components/sections/DemoModal';

export function App() {
  const { toggleTheme, isDark } = useTheme();
  const { showBackToTop, scrollToTop } = useScrollPosition();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* 1. Navigation Bar (Sticky, Responsive, Hamburger, Theme Toggle) */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area with Semantic Landmark */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />

        {/* 3. Trusted By / Company Logos Strip */}
        <TrustedBy />

        {/* 4. Features Section (6+ rich cards) */}
        <Features />

        {/* 5. Product / About Section (Before vs After) */}
        <About />

        {/* 6. How It Works Section (4 Steps) */}
        <HowItWorks />

        {/* 7. Statistics Section (Animated Counters) */}
        <Stats />

        {/* 8. Solutions / Use Cases (4 Personas) */}
        <Solutions />

        {/* 9. Testimonials (Interactive Carousel) */}
        <Testimonials />

        {/* 10. Pricing (3 Plans + Monthly/Annual Toggle) */}
        <Pricing onOpenDemo={() => setIsDemoModalOpen(true)} />

        {/* 11. FAQ Section (Accordion) */}
        <FAQ />

        {/* 12. Final CTA Banner */}
        <FinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
      </main>

      {/* 13. Footer (Link Columns & Interactive Newsletter) */}
      <Footer />

      {/* Interactive Demo Modal (Bonus Feature) */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Back to Top Floating Action Button (Bonus Feature) */}
      <BackToTop show={showBackToTop} onScrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
