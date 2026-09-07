import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollPosition } from './hooks/useScrollPosition';

// Soufflet Malt Luxury & Interactive Experience Components
import { ProgressBar } from './components/common/ProgressBar';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { SoundToggle } from './components/common/SoundToggle';
import { CommandPalette } from './components/common/CommandPalette';
import { LiveActivityToast } from './components/common/LiveActivityToast';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';

// Section Components (13 Required Sections + User-Friendly Tools)
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { Features } from './components/sections/Features';
import { About } from './components/sections/About';
import { HowItWorks } from './components/sections/HowItWorks';
import { Stats } from './components/sections/Stats';
import { Solutions } from './components/sections/Solutions';
import { RoiCalculator } from './components/sections/RoiCalculator';
import { Testimonials } from './components/sections/Testimonials';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { DemoModal } from './components/sections/DemoModal';

export function App() {
  const { toggleTheme, isDark } = useTheme();
  const { showBackToTop, scrollToTop } = useScrollPosition();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpenPalette);
    return () => document.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#050614] text-[#1a1a2e] dark:text-[#f1f2f6] transition-colors duration-300 font-sans selection:bg-[#D8B452] selection:text-black relative">
      {/* 1. Liquid Gold Top Reading Progress Bar */}
      <ProgressBar />

      {/* 2. Soufflet Malt Luxury Preloader with 0-100% Counter */}
      <Preloader />

      {/* 3. Interactive Custom Cursor with Trailing Ring */}
      <CustomCursor />

      {/* 4. Ambient Sound / Harmonic Chimes Toggle */}
      <SoundToggle />

      {/* 5. Live Engineering Activity Toast */}
      <LiveActivityToast />

      {/* 6. Command Palette / Quick Search (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 7. Navigation Bar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Dashboard Console */}
        <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />

        {/* 2. Trusted By / Company Logos */}
        <TrustedBy />

        {/* 3. Features Section (6+ rich cards) */}
        <Features />

        {/* 4. Product / About Section (Before vs After) */}
        <About />

        {/* 5. How It Works Section (4 Steps) */}
        <HowItWorks />

        {/* 6. Statistics Section (Animated Counters) */}
        <Stats />

        {/* 7. Solutions / Use Cases (4 Personas) */}
        <Solutions />

        {/* 8. Interactive ROI & Productivity Economics Calculator */}
        <RoiCalculator onOpenDemo={() => setIsDemoModalOpen(true)} />

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

      {/* Interactive Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Back to Top Floating Action Button */}
      <BackToTop show={showBackToTop} onScrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
