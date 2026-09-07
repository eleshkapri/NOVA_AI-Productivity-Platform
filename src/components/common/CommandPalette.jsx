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
} from 'lucide-react';
import { securityService } from '../../services/SecurityService';

export function CommandPalette({ isOpen, onClose, onToggleTheme, isDark, onOpenDemo }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
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
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'roi',
      title: 'Calculate Team ROI & Savings',
      category: 'Tools',
      icon: Sparkles,
      action: () => {
        document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'pricing',
      title: 'View Pricing Plans & Annual Discount',
      category: 'Navigation',
      icon: CheckCircle2,
      action: () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
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
      title: 'View Release Changelog (v2.4.0)',
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
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
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
  }, [isOpen, onClose, filtered, selectedIndex, onOpenDemo, onToggleTheme]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(timer);
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

      <div className="relative w-full max-w-xl bg-[#0b0c33] rounded-3xl border border-[#D8B452]/40 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#D8B452] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              const clean = securityService.sanitizeString(e.target.value, 100);
              setQuery(clean);
              setSelectedIndex(0);
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
            <div className="p-6 text-center text-xs text-slate-400">
              No matching commands or sections found.
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
                      ? 'bg-[#D8B452]/15 text-[#D8B452] border border-[#D8B452]/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-[#D8B452] text-black' : 'bg-white/5 text-slate-400'
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
                      isSelected ? 'translate-x-1 text-[#D8B452]' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#050614] flex items-center justify-between text-[11px] text-slate-400">
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
