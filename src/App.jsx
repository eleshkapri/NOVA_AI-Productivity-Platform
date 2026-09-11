import React, { useState, useEffect } from 'react';
import { useTheme, useScrollPosition, useDocumentTitle } from './hooks';
import {
  CustomCursor,
  ProgressBar,
  Preloader,
  SoundToggle,
  LiveActivityToast,
  AmbientBackground,
  SectionConnector,
} from './components/common';
import {
  Navbar,
  Footer,
  BackToTop,
  FlankTelemetryRails,
} from './components/layout';
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
} from './components/sections';
import { Keyboard } from 'lucide-react';
import { soundService } from './services/SoundService';
import { smoothScrollService } from './services/SmoothScrollService';
import { Analytics } from '@vercel/analytics/react';

const WorkspaceDashboard = React.lazy(() => import('./components/dashboard'));
const DemoModal = React.lazy(() =>
  import('./components/sections/DemoModal').then((m) => ({ default: m.DemoModal }))
);
const CommandPalette = React.lazy(() =>
  import('./components/common/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);
const ShortcutsHudModal = React.lazy(() =>
  import('./components/common/ShortcutsHudModal').then((m) => ({ default: m.ShortcutsHudModal }))
);

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

  // Initialize Lenis smooth momentum scroll engine
  useEffect(() => {
    smoothScrollService.init();
    return () => {
      smoothScrollService.destroy();
    };
  }, []);

  // Recalculate dimensions on view change
  useEffect(() => {
    smoothScrollService.resize();
  }, [currentView]);

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
    smoothScrollService.scrollTo(0, { immediate: true });
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
        smoothScrollService.scrollTo(0, { duration: 1.5 });
        break;
      case 'nav-features':
        smoothScrollService.scrollTo('#features', { offset: -70, duration: 1.5 });
        break;
      case 'nav-solutions':
        smoothScrollService.scrollTo('#solutions', { offset: -70, duration: 1.5 });
        break;
      case 'nav-pricing':
        smoothScrollService.scrollTo('#pricing', { offset: -70, duration: 1.5 });
        break;
      case 'nav-roi':
        smoothScrollService.scrollTo('#roi-calculator', { offset: -70, duration: 1.5 });
        break;
      case 'view-workspace':
        soundService.playChime('actionClick');
        if (currentView === 'dashboard') {
          setCurrentView('landing');
          smoothScrollService.scrollTo(0, { immediate: true });
        } else {
          if (!hasActiveWorkspace) {
            handleEnterDashboard({
              name: 'Acme Autonomous Lab',
              slug: 'acme-lab',
              plan: 'pro',
              host: 'github',
              repo: 'nova-core-mesh',
              teamSize: 25,
            });
          } else {
            setCurrentView('dashboard');
            smoothScrollService.scrollTo(0, { immediate: true });
          }
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
      case 'toggle-minimize':
        soundService.playChime('actionClick');
        if (modalConfig.isOpen) {
          window.dispatchEvent(new CustomEvent('toggle-modal-minimize'));
        } else {
          window.dispatchEvent(new CustomEvent('toggle-popup-minimize'));
        }
        break;
      case 'snap-next': {
        soundService.playChime('actionClick');
        const sections = ['hero', 'features', 'about', 'how-it-works', 'stats', 'solutions', 'pricing', 'faq'];
        const scrollPos = window.scrollY + 120;
        const nextSec = sections.find((id) => {
          const el = document.getElementById(id);
          return el && el.offsetTop > scrollPos;
        });
        if (nextSec) {
          smoothScrollService.scrollTo('#' + nextSec, { offset: -70, duration: 1.5 });
        }
        break;
      }
      case 'snap-prev': {
        soundService.playChime('actionClick');
        const sections = ['hero', 'features', 'about', 'how-it-works', 'stats', 'solutions', 'pricing', 'faq'];
        const scrollPos = window.scrollY - 80;
        const prevSec = [...sections].reverse().find((id) => {
          const el = document.getElementById(id);
          return el && el.offsetTop < scrollPos;
        });
        if (prevSec) {
          if (prevSec === 'hero') {
            smoothScrollService.scrollTo(0, { duration: 1.5 });
          } else {
            smoothScrollService.scrollTo('#' + prevSec, { offset: -70, duration: 1.5 });
          }
        }
        break;
      }
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
      // 1. Strict Search Bar Guard: When search bar / Command Palette is open, NO single-key shortcuts trigger
      if (isCommandPaletteOpen) {
        if (e.key === 'Escape') {
          setIsCommandPaletteOpen(false);
        }
        return;
      }

      // 2. Strict Input Guard: If typing on ANY input, textarea, or editable element, bypass shortcuts
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          Boolean(target.closest && target.closest('input, textarea, select, [contenteditable="true"]')));

      if (isInput) return;

      // 3. Escape closes any open modal, palette, or HUD
      if (e.key === 'Escape') {
        setIsShortcutsHudOpen(false);
        setIsCommandPaletteOpen(false);
        handleCloseModal();
        return;
      }

      // 4. Modal Active Guard: If a modal dialog is open, only allow 'Z' (minimize/restore toggle) and Escape
      if (modalConfig.isOpen) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault();
          soundService.playChime('actionClick');
          window.dispatchEvent(new CustomEvent('toggle-modal-minimize'));
        }
        return;
      }

      // 5. '/' opens or dismisses shortcuts HUD (1-button toggle!)
      if (e.key === '/') {
        e.preventDefault();
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen((prev) => !prev);
        return;
      }

      // 6. 'k' or Command / Ctrl + K opens Command Palette (1-button 'k' supported!)
      if (e.key.toLowerCase() === 'k' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen(false);
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 7. Single-button hotkeys (1-key immediate execution)
      const k = e.key.toLowerCase();
      if (k === 'z') {
        soundService.playChime('actionClick');
        window.dispatchEvent(new CustomEvent('toggle-popup-minimize'));
      } else if (k === 'h') {
        setIsShortcutsHudOpen(false);
        smoothScrollService.scrollTo(0, { duration: 1.5 });
        soundService.playChime('actionClick');
      } else if (k === 'f') {
        setIsShortcutsHudOpen(false);
        smoothScrollService.scrollTo('#features', { offset: -70, duration: 1.5 });
        soundService.playChime('actionClick');
      } else if (k === 's') {
        setIsShortcutsHudOpen(false);
        smoothScrollService.scrollTo('#solutions', { offset: -70, duration: 1.5 });
        soundService.playChime('actionClick');
      } else if (k === 'p') {
        setIsShortcutsHudOpen(false);
        smoothScrollService.scrollTo('#pricing', { offset: -70, duration: 1.5 });
        soundService.playChime('actionClick');
      } else if (k === 'r') {
        setIsShortcutsHudOpen(false);
        smoothScrollService.scrollTo('#roi-calculator', { offset: -70, duration: 1.5 });
        soundService.playChime('actionClick');
      } else if (k === 'w') {
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen(false);
        if (currentView === 'dashboard') {
          setCurrentView('landing');
          smoothScrollService.scrollTo(0, { immediate: true });
        } else {
          if (!hasActiveWorkspace) {
            handleEnterDashboard({
              name: 'Acme Autonomous Lab',
              slug: 'acme-lab',
              plan: 'pro',
              host: 'github',
              repo: 'nova-core-mesh',
              teamSize: 25,
            });
          } else {
            setCurrentView('dashboard');
            smoothScrollService.scrollTo(0, { immediate: true });
          }
        }
      } else if (k === 'g') {
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen(false);
        handleOpenModal('status');
      } else if (k === 'c') {
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen(false);
        handleOpenModal('changelog');
      } else if (k === 'd') {
        soundService.playChime('actionClick');
        setIsShortcutsHudOpen(false);
        handleOpenModal('walkthrough');
      } else if (k === 't') {
        soundService.playChime('actionClick');
        toggleTheme();
      } else if (k === 'm') {
        soundService.toggle();
      } else if (k === 'j') {
        soundService.playChime('actionClick');
        const sections = ['hero', 'features', 'about', 'how-it-works', 'stats', 'solutions', 'pricing', 'faq'];
        const scrollPos = window.scrollY + 120;
        const nextSec = sections.find((id) => {
          const el = document.getElementById(id);
          return el && el.offsetTop > scrollPos;
        });
        if (nextSec) {
          smoothScrollService.scrollTo('#' + nextSec, { offset: -70, duration: 1.5 });
        }
      } else if (k === 'u') {
        soundService.playChime('actionClick');
        const sections = ['hero', 'features', 'about', 'how-it-works', 'stats', 'solutions', 'pricing', 'faq'];
        const scrollPos = window.scrollY - 80;
        const prevSec = [...sections].reverse().find((id) => {
          const el = document.getElementById(id);
          return el && el.offsetTop < scrollPos;
        });
        if (prevSec) {
          if (prevSec === 'hero') {
            smoothScrollService.scrollTo(0, { duration: 1.5 });
          } else {
            smoothScrollService.scrollTo('#' + prevSec, { offset: -70, duration: 1.5 });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalConfig.isOpen, isCommandPaletteOpen, isShortcutsHudOpen, toggleTheme, currentView, hasActiveWorkspace]);

  return (
    <div className="min-h-screen flex flex-col text-[#0f172a] dark:text-[#f1f2f6] transition-colors duration-300 font-sans selection:bg-[#FF5500] selection:text-black relative">
      {/* 0. Accessible Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#FF5500] focus:text-black focus:font-extrabold focus:text-xs focus:shadow-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all cursor-pointer"
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

      {/* 6. Command Palette / Quick Search (⌘K) — Lazy loaded on demand */}
      {isCommandPaletteOpen && (
        <React.Suspense fallback={null}>
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
              smoothScrollService.scrollTo(0, { immediate: true });
            } : undefined}
            onExitDashboard={() => {
              soundService.playChime('actionClick');
              setCurrentView('landing');
              smoothScrollService.scrollTo(0, { immediate: true });
            }}
          />
        </React.Suspense>
      )}

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
            smoothScrollService.scrollTo(0, { immediate: true });
          }}
        />
      )}

      {/* Main Content Area: Landing Page vs Workspace Dashboard */}
      {currentView === 'dashboard' ? (
        <main id="main-content" className="flex-1 relative z-10">
          <React.Suspense
            fallback={
              <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05060A] flex flex-col items-center justify-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/15 border border-[#FF5500]/40 flex items-center justify-center animate-pulse">
                  <span className="w-6 h-6 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin" />
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
                smoothScrollService.scrollTo(0, { immediate: true });
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
                smoothScrollService.scrollTo(0, { immediate: true });
              }}
              isDark={isDark}
              toggleTheme={toggleTheme}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
          </React.Suspense>
        </main>
      ) : (
        <>
          {/* Cybernetic Edge Margin Rails (visible on xl+ viewports) */}
          <FlankTelemetryRails />

          <main id="main-content" className="flex-1 relative z-10">
            {/* 1. Hero Section with Interactive Dashboard Console */}
            <Hero onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* 2. Trusted By / Company Logos */}
            <TrustedBy />

            {/* 3. Features Section (6+ rich cards) */}
            <Features onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* Architectural Transition 1: Core Engine Bridge */}
            <SectionConnector badge="AST SYNTAX GRAPH CORE" metric="LATENCY < 12MS" icon="terminal" />

            {/* 4. Product / About Section (Before vs After) */}
            <About />

            {/* 5. How It Works Section (4 Steps) */}
            <HowItWorks />

            {/* 6. Statistics Section (Animated Counters) */}
            <Stats />

            {/* 7. Solutions / Use Cases (4 Personas) */}
            <Solutions onOpenDemo={(tab, extra) => handleOpenModal(tab || 'backlog', extra)} />

            {/* Architectural Transition 2: Economic Value Bridge */}
            <SectionConnector badge="ENGINEERING VALUE HARVEST" metric="4.2X VELOCITY" icon="activity" />

            {/* 8. Interactive ROI & Productivity Economics Calculator */}
            <RoiCalculator onOpenDemo={(tab, extra) => handleOpenModal(tab || 'trial', extra)} />

            {/* 9. Testimonials (Carousel Slider) */}
            <Testimonials />

            {/* Architectural Transition 3: Commitment & Provisioning Bridge */}
            <SectionConnector badge="PREDICTABLE COMPUTE ARCHITECTURE" metric="TRANSPARENT TIERING" icon="cpu" />

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

      {/* Interactive Demo & Workspace Modal — Lazy loaded on demand */}
      {modalConfig.isOpen && (
        <React.Suspense fallback={null}>
          <DemoModal
            isOpen={modalConfig.isOpen}
            onClose={handleCloseModal}
            onEnterDashboard={handleEnterDashboard}
            initialTab={modalConfig.tab}
            selectedPlan={modalConfig.plan}
            selectedTask={modalConfig.task}
            initialStage={modalConfig.stage || 0}
          />
        </React.Suspense>
      )}

      {/* Power-User Keyboard Shortcuts HUD Modal — Lazy loaded on demand */}
      {isShortcutsHudOpen && (
        <React.Suspense fallback={null}>
          <ShortcutsHudModal
            isOpen={isShortcutsHudOpen}
            onClose={() => setIsShortcutsHudOpen(false)}
            onExecuteAction={handleExecuteShortcutAction}
          />
        </React.Suspense>
      )}

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
            title="View Keyboard Shortcuts (/)"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-zinc-950/90 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/10 shadow-lg backdrop-blur-md text-xs font-mono transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#FF5500]" />
            <span className="text-[11px] font-bold">Shortcuts</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] text-[#FF5500] font-bold border border-slate-200 dark:border-white/10">/</kbd>
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
