import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollPosition } from './hooks/useScrollPosition';

// Soufflet Malt Signature Experience Components
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { SoundToggle } from './components/common/SoundToggle';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';

// Section Components (13 Required Sections)
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
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#050614] text-[#1a1a2e] dark:text-[#f1f2f6] transition-colors duration-300 font-sans selection:bg-[#D8B452] selection:text-black relative">
      {/* Soufflet Malt Luxury Preloader */}
      <Preloader />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Ambient Sound Toggle */}
      <SoundToggle />

      {/* 1. Navigation Bar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />

        {/* 3. Trusted By / Company Logos */}
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

        {/* 9. Testimonials (Carousel Slider) */}
        <Testimonials />

        {/* 10. Pricing (3 Plans + Monthly/Annual Toggle) */}
        <Pricing onOpenDemo={() => setIsDemoModalOpen(true)} />

        {/* 11. FAQ Section (Accordion) */}
        <FAQ />

        {/* 12. Final CTA Banner */}
        <FinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* Interactive Demo Modal (Bonus) */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Back to Top Floating Action Button (Bonus) */}
      <BackToTop show={showBackToTop} onScrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
