import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Play,
  HelpCircle,
  Layers,
  CheckCircle2,
  X,
  Rocket,
  Code2,
  Activity,
  Send,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { smoothScrollService } from '../../services/SmoothScrollService';

export function CommandPalette({ isOpen, onClose, onToggleTheme, isDark, onOpenDemo, onGoToDashboard, onExitDashboard, currentView }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    ...(onGoToDashboard
      ? [
          {
            id: 'go-dashboard',
            title: 'Open Autonomous Workspace Dashboard',
            category: 'Workspace',
            icon: Zap,
            action: () => {
              onClose();
              onGoToDashboard();
            },
          },
        ]
      : []),
    ...(currentView === 'dashboard' && onExitDashboard
      ? [
          {
            id: 'exit-dashboard',
            title: 'Exit to NOVA Main Landing Page',
            category: 'Workspace',
            icon: ArrowRight,
            action: () => {
              onClose();
              onExitDashboard();
            },
          },
        ]
      : []),
    {
      id: 'trial',
      title: 'Start 14-Day Free Trial (All Tiers)',
      category: 'Actions',
      icon: Rocket,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('trial');
      },
    },
    {
      id: 'demo',
      title: 'Watch Product Interactive Walkthrough',
      category: 'Actions',
      icon: Play,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('backlog');
      },
    },
    {
      id: 'features',
      title: 'Explore Autonomous Capabilities',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        smoothScrollService.scrollTo('#features', { offset: -70, duration: 1.5 });
        onClose();
      },
    },
    {
      id: 'roi',
      title: 'Calculate Team ROI & Savings',
      category: 'Tools',
      icon: Sparkles,
      action: () => {
        smoothScrollService.scrollTo('#roi-calculator', { offset: -70, duration: 1.5 });
        onClose();
      },
    },
    {
      id: 'velocity-quiz',
      title: 'Take Team Velocity Health Diagnostic Quiz',
      category: 'Tools',
      icon: TrendingUp,
      action: () => {
        smoothScrollService.scrollTo('#roi-calculator', { offset: -70, duration: 1.5 });
        window.dispatchEvent(new CustomEvent('activate-velocity-quiz'));
        onClose();
      },
    },
    {
      id: 'pricing',
      title: 'View Pricing Plans & Annual Discount',
      category: 'Navigation',
      icon: CheckCircle2,
      action: () => {
        smoothScrollService.scrollTo('#pricing', { offset: -70, duration: 1.5 });
        onClose();
      },
    },
    {
      id: 'docs',
      title: 'Open Developer Documentation & REST API',
      category: 'Resources',
      icon: Code2,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('docs');
      },
    },
    {
      id: 'status',
      title: 'Check Global Infrastructure & Status (99.99%)',
      category: 'Resources',
      icon: Activity,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('status');
      },
    },
    {
      id: 'changelog',
      title: 'View Release Changelog (v2.4.1 Latest)',
      category: 'Product',
      icon: Sparkles,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('changelog');
      },
    },
    {
      id: 'contact',
      title: 'Consult Enterprise Architecture Team',
      category: 'Enterprise',
      icon: Send,
      action: () => {
        onClose();
        if (onOpenDemo) onOpenDemo('contact', { plan: 'enterprise' });
      },
    },
    {
      id: 'theme',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'faq',
      title: 'Browse Frequently Asked Questions',
      category: 'Navigation',
      icon: HelpCircle,
      action: () => {
        smoothScrollService.scrollTo('#faq', { offset: -70, duration: 1.5 });
        onClose();
      },
    },
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          document.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 10);
      const timer2 = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-zinc-950/95 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Search Bar */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex items-center px-5 py-4 border-b border-white/10 gap-3 cursor-text"
        >
          <Search className="w-5 h-5 text-[#FF5500] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            autoFocus
            onChange={(e) => {
              setQuery(e.target.value.slice(0, 100));
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              // Strictly isolate search bar typing: never let keystrokes bubble up to global shortcut listeners
              if (e.key !== 'Escape' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
                e.stopPropagation();
              }
            }}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5500]">
                <Search className="w-5 h-5 opacity-80" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  No matching telemetry or commands found for &quot;{query}&quot;
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Try searching for features, pricing, status, or keyboard shortcuts.
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
                {['Pricing', 'Status', 'ROI', 'Features', 'Changelog'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag.toLowerCase())}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 hover:bg-orange-500/20 text-slate-300 hover:text-[#FF7700] border border-white/10 hover:border-[#FF5500]/40 transition-all cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500/15 text-[#FF7700] border border-orange-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-[#FF5500] text-black shadow-md shadow-orange-500/25' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'translate-x-1 text-[#FF5500]' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-white/10 bg-zinc-950 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
