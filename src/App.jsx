import React, { useState, useEffect, useRef } from 'react';
import { useTheme, useScrollPosition, useDocumentTitle } from './hooks';
import {
  CustomCursor,
  ProgressBar,
  Preloader,
  SoundToggle,
  CommandPalette,
  LiveActivityToast,
  AmbientBackground,
  ShortcutsHudModal,
} from './components/common';
import { Navbar, Footer, BackToTop } from './components/layout';
import {
  Hero,
  TrustedBy,
  Features,
  About,
  HowItWorks,
  Stats,
  Solutions,
  RoiCalculator,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
  DemoModal,
} from './components/sections';
import { Keyboard } from 'lucide-react';
import { soundService } from './services/SoundService';
import { Analytics } from '@vercel/analytics/react';

const WorkspaceDashboard = React.lazy(() => import('./components/dashboard'));

const isValidWorkspace = (ws) => {
  return Boolean(
    ws &&
    typeof ws === 'object' &&
    ws.isProvisioned === true &&
    typeof ws.name === 'string' &&
    ws.name.trim().length >= 2 &&
    ws.token
  );
};

export function App() {
  const { toggleTheme, isDark } = useTheme();
  const { showBackToTop, scrollToTop } = useScrollPosition();
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [activeWorkspace, setActiveWorkspace] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_active_workspace');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (isValidWorkspace(parsed)) {
        return parsed;
      }
      // Purge any dummy or unprovisioned workspaces from localStorage
      localStorage.removeItem('nova_active_workspace');
      return null;
    } catch {
      return null;
    }
  });

  const hasActiveWorkspace = isValidWorkspace(activeWorkspace);

  const pageTitle =
    currentView === 'dashboard'
      ? `NOVA — Workspace: ${activeWorkspace?.name || 'Sandbox'}`
      : 'NOVA — Autonomous AI Productivity Platform | Build Better. Work Smarter.';
  useDocumentTitle(pageTitle);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    tab: 'walkthrough',
    plan: 'pro',
    task: null,
    stage: 0,
  });
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsHudOpen, setIsShortcutsHudOpen] = useState(false);
  const lastKeyRef = useRef({ key: null, time: 0 });

  const handleEnterDashboard = (workspaceData) => {
    if (!isValidWorkspace(workspaceData)) {
      handleOpenModal('trial');
      return;
    }
    const cleanName = workspaceData.name.trim();
    const cleanSlug = workspaceData.slug || cleanName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const ws = {
      name: cleanName,
      slug: cleanSlug,
      plan: workspaceData.plan || 'pro',
      host: workspaceData.host || 'github',
      repo: workspaceData.repo || `${cleanSlug}-core`,
      teamSize: Number(workspaceData.teamSize) || 25,
      token: workspaceData.token || `nova_live_${cleanSlug.replace(/-/g, '_')}_a8f92c`,
      createdAt: workspaceData.createdAt || 'Active Session',
      isProvisioned: true,
    };
    setActiveWorkspace(ws);
    try {
      localStorage.setItem('nova_active_workspace', JSON.stringify(ws));
    } catch {
      // storage non-blocking
    }
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (tab = 'walkthrough', extra = {}) => {
    setModalConfig({
      isOpen: true,
      tab,
      plan: extra.plan || 'pro',
      task: extra.task || null,
      stage: extra.stage !== undefined ? extra.stage : 0,
    });
  };

  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleExecuteShortcutAction = (actionId) => {
    setIsShortcutsHudOpen(false);
    switch (actionId) {
      case 'nav-hero':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav-features':
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'nav-solutions':
        document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'nav-pricing':
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'nav-roi':
        document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'view-workspace':
        soundService.playChime('actionClick');
        if (hasActiveWorkspace) {
          setCurrentView('dashboard');
        } else {
          handleOpenModal('trial');
        }
        break;
      case 'view-status':
        handleOpenModal('status');
        break;
      case 'view-changelog':
        handleOpenModal('changelog');
        break;
      case 'view-demo':
        handleOpenModal('walkthrough');
        break;
      case 'view-palette':
        setIsCommandPaletteOpen(true);
        break;
      case 'toggle-theme':
        toggleTheme();
        break;
      case 'toggle-sound':
        soundService.toggle();
        break;
      case 'toggle-hud':
        setIsShortcutsHudOpen((prev) => !prev);
        break;
      case 'close-all':
        setIsShortcutsHudOpen(false);
        setIsCommandPaletteOpen(false);
        handleCloseModal();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpenPalette);
    return () => document.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  // Global Keyboard Shortcuts Listener (with Input Protection)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isInput) return;

      // If a modal or palette or HUD is open, only allow Escape to dismiss
      if (modalConfig.isOpen || isCommandPaletteOpen || isShortcutsHudOpen) {
        if (e.key === 'Escape') {
          setIsShortcutsHudOpen(false);
          setIsCommandPaletteOpen(false);
          handleCloseModal();
        }
        return;
      }

      // Escape closes any open modal or HUD
      if (e.key === 'Escape') {
        setIsShortcutsHudOpen(false);
        setIsCommandPaletteOpen(false);
        handleCloseModal();
        return;
      }

      // '?' or Shift + '/' opens shortcuts HUD
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen((prev) => !prev);
        return;
      }

      // Command / Ctrl + K opens Command Palette
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        soundService.playChime('actionClick');
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      const now = Date.now();
      const last = lastKeyRef.current;

      // Two-key 'g' sequences (e.g. g h, g f, g s, g p, g r)
      if (last.key === 'g' && now - last.time < 1000) {
        lastKeyRef.current = { key: null, time: 0 };
        const lower = e.key.toLowerCase();
        if (lower === 'h') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          soundService.playChime('actionClick');
        } else if (lower === 'f') {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          soundService.playChime('actionClick');
        } else if (lower === 's') {
          document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
          soundService.playChime('actionClick');
        } else if (lower === 'p') {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          soundService.playChime('actionClick');
        } else if (lower === 'r') {
          document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
          soundService.playChime('actionClick');
        }
        return;
      }

      if (e.key.toLowerCase() === 'g') {
        lastKeyRef.current = { key: 'g', time: now };
        return;
      }

      // Single-letter hotkeys
      const k = e.key.toLowerCase();
      if (k === 'w') {
        soundService.playChime('actionClick');
        if (currentView === 'dashboard') {
          setCurrentView('landing');
        } else {
          if (hasActiveWorkspace) {
            setCurrentView('dashboard');
          } else {
            handleOpenModal('trial');
          }
        }
      } else if (k === 's') {
        soundService.playChime('actionClick');
        handleOpenModal('status');
      } else if (k === 'c') {
        soundService.playChime('actionClick');
        handleOpenModal('changelog');
      } else if (k === 'd') {
        soundService.playChime('actionClick');
        handleOpenModal('walkthrough');
      } else if (k === 't') {
        soundService.playChime('actionClick');
        toggleTheme();
      } else if (k === 'm') {
        soundService.toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalConfig.isOpen, isCommandPaletteOpen, isShortcutsHudOpen, toggleTheme, currentView, hasActiveWorkspace]);

  return (
    <div className="min-h-screen flex flex-col text-[#0f172a] dark:text-[#f1f2f6] transition-colors duration-300 font-sans selection:bg-[#D8B452] selection:text-black relative">
      {/* 0. Accessible Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#D8B452] focus:text-black focus:font-extrabold focus:text-xs focus:shadow-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all cursor-pointer"
      >
        Skip to main content &darr;
      </a>

      {/* Luxury Custom Mouse Cursor */}
      <CustomCursor />

      {/* 0. Ambient Floating Motionable Canvas & Sky Environment (z-0) */}
      <AmbientBackground />

      {/* 1. Liquid Gold Top Reading Progress Bar */}
      <ProgressBar />

      {/* 2. Luxury Preloader with 0-100% Counter */}
      <Preloader isDark={isDark} />

      {/* 3. Ambient Sound / Harmonic Chimes Toggle */}
      <SoundToggle />

      {/* 5. Live Engineering Activity Toast */}
      <LiveActivityToast onOpenDemo={(tab, extra) => handleOpenModal(tab, extra)} />

      {/* 6. Command Palette / Quick Search (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)}
        currentView={currentView}
        onGoToDashboard={hasActiveWorkspace ? () => {
          soundService.playChime('actionClick');
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } : undefined}
        onExitDashboard={() => {
          soundService.playChime('actionClick');
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. Navigation Bar */}
      {currentView === 'landing' && (
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)}
          onOpenTrial={() => handleOpenModal('trial')}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          hasActiveWorkspace={hasActiveWorkspace}
          onGoToDashboard={() => {
            soundService.playChime('actionClick');
            setCurrentView('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Content Area: Landing Page vs Workspace Dashboard */}
      {currentView === 'dashboard' ? (
        <main id="main-content" className="flex-1 relative z-10">
          <React.Suspense
            fallback={
              <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050614] flex flex-col items-center justify-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D8B452]/15 border border-[#D8B452]/40 flex items-center justify-center animate-pulse">
                  <span className="w-6 h-6 border-2 border-[#D8B452] border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Initializing Isolated Sandbox Environment...
                </p>
              </div>
            }
          >
            <WorkspaceDashboard
              workspace={activeWorkspace}
              onExit={() => {
                soundService.playChime('actionClick');
                setCurrentView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onResetWorkspace={() => {
                soundService.playChime('actionClick');
                setActiveWorkspace(null);
                try {
                  localStorage.removeItem('nova_active_workspace');
                } catch {
                  // storage non-blocking
                }
                setCurrentView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isDark={isDark}
              toggleTheme={toggleTheme}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
          </React.Suspense>
        </main>
      ) : (
        <>
          <main id="main-content" className="flex-1 relative z-10">
            {/* 1. Hero Section with Interactive Dashboard Console */}
            <Hero onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* 2. Trusted By / Company Logos */}
            <TrustedBy />

            {/* 3. Features Section (6+ rich cards) */}
            <Features onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* 4. Product / About Section (Before vs After) */}
            <About />

            {/* 5. How It Works Section (4 Steps) */}
            <HowItWorks />

            {/* 6. Statistics Section (Animated Counters) */}
            <Stats />

            {/* 7. Solutions / Use Cases (4 Personas) */}
            <Solutions onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* 8. Interactive ROI & Productivity Economics Calculator */}
            <RoiCalculator onOpenDemo={(tab, extra) => handleOpenModal(tab || 'trial', extra)} />

            {/* 9. Testimonials (Carousel Slider) */}
            <Testimonials />

            {/* 10. Pricing (3 Plans + Monthly/Annual Toggle) */}
            <Pricing onOpenDemo={(tab, extra) => handleOpenModal(tab || 'trial', extra)} />

            {/* 11. FAQ Section (Accordion) */}
            <FAQ onOpenDemo={(tab, extra) => handleOpenModal(tab || 'contact', extra)} />

            {/* 12. Final CTA Banner */}
            <FinalCTA onOpenDemo={(tab, extra) => handleOpenModal(tab || 'trial', extra)} />
          </main>

          {/* 13. Footer */}
          <Footer onOpenModal={(tab, extra) => handleOpenModal(tab, extra)} />
        </>
      )}

      {/* Interactive Demo & Workspace Modal */}
      <DemoModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        onEnterDashboard={handleEnterDashboard}
        initialTab={modalConfig.tab}
        selectedPlan={modalConfig.plan}
        selectedTask={modalConfig.task}
        initialStage={modalConfig.stage || 0}
      />

      {/* Power-User Keyboard Shortcuts HUD Modal */}
      <ShortcutsHudModal
        isOpen={isShortcutsHudOpen}
        onClose={() => setIsShortcutsHudOpen(false)}
        onExecuteAction={handleExecuteShortcutAction}
      />

      {/* Bottom-Right Floating Action Dock (Shortcuts + BackToTop) */}
      {currentView === 'landing' && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundService.playChime('actionClick');
              setIsShortcutsHudOpen(true);
            }}
            aria-label="Open keyboard shortcuts guide"
            title="View Keyboard Shortcuts (?)"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/85 dark:bg-[#07081e]/90 text-slate-300 hover:text-white border border-slate-700/60 dark:border-white/10 shadow-lg backdrop-blur-md text-xs font-mono transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#D8B452]" />
            <span className="text-[11px] font-bold">Shortcuts</span>
            <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-[#D8B452] font-bold">?</kbd>
          </button>

          <BackToTop show={showBackToTop} onScrollToTop={scrollToTop} />
        </div>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
