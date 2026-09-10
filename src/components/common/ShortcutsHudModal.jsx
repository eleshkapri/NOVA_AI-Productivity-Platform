import React from 'react';
import {
  Keyboard,
  X,
  Compass,
  Activity,
  Sparkles,
} from 'lucide-react';
import { soundService } from '../../services/SoundService';

const SHORTCUT_GROUPS = [
  {
    title: 'Navigation Shortcuts',
    icon: Compass,
    shortcuts: [
      { keys: ['H'], label: 'Jump to Top / Hero', actionId: 'nav-hero' },
      { keys: ['J'], label: 'Glide to Next Landmark Section', actionId: 'snap-next' },
      { keys: ['U'], label: 'Glide to Previous Landmark Section', actionId: 'snap-prev' },
      { keys: ['F'], label: 'Jump to Autonomous Features', actionId: 'nav-features' },
      { keys: ['S'], label: 'Jump to Squad Solutions', actionId: 'nav-solutions' },
      { keys: ['P'], label: 'Jump to Pricing Plans', actionId: 'nav-pricing' },
      { keys: ['R'], label: 'Jump to ROI Calculator', actionId: 'nav-roi' },
    ],
  },
  {
    title: 'Views & Deep-Telemetry',
    icon: Activity,
    shortcuts: [
      { keys: ['W'], label: 'Open Autonomous Workspace Dashboard', actionId: 'view-workspace' },
      { keys: ['G'], label: 'Open Global System Status (99.99%)', actionId: 'view-status' },
      { keys: ['C'], label: 'Open Product Release Changelog', actionId: 'view-changelog' },
      { keys: ['D'], label: 'Open Interactive Demo Studio', actionId: 'view-demo' },
      { keys: ['K'], label: 'Open Command Palette & Search', actionId: 'view-palette' },
    ],
  },
  {
    title: 'Preferences & Actions',
    icon: Sparkles,
    shortcuts: [
      { keys: ['Z'], label: 'Minimize / Restore Active Popup', actionId: 'toggle-minimize' },
      { keys: ['T'], label: 'Toggle Dark / Light Theme', actionId: 'toggle-theme' },
      { keys: ['M'], label: 'Start / Stop Ambient Soundtrack', actionId: 'toggle-sound' },
      { keys: ['/'], label: 'Toggle this Shortcuts Guide', actionId: 'toggle-hud' },
      { keys: ['Esc'], label: 'Close Active Modal / Overlay', actionId: 'close-all' },
    ],
  },

];

export function ShortcutsHudModal({ isOpen, onClose, onExecuteAction }) {
  if (!isOpen) return null;

  const handleRowClick = (actionId) => {
    soundService.playChime('actionClick');
    onExecuteAction(actionId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          soundService.playChime('actionClick');
          onClose();
        }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Cybernetic Dialog Window */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#05060A] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-zinc-900/90 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500]">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 id="shortcuts-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Power-User Keyboard Shortcuts
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Navigate anywhere across NOVA instantly with single keystrokes or quick sequences
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playChime('actionClick');
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts Body List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {SHORTCUT_GROUPS.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.title} className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  <GroupIcon className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>{group.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.shortcuts.map((sc) => (
                    <div
                      key={sc.label}
                      onClick={() => handleRowClick(sc.actionId)}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-white/5 hover:border-[#FF5500]/50 hover:bg-[#FF5500]/5 dark:hover:bg-[#FF5500]/10 transition-all flex items-center justify-between gap-3 cursor-pointer group select-none active:scale-[0.98]"
                    >
                      <span className="text-xs text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-medium">
                        {sc.label}
                      </span>

                      {/* Key Cap */}
                      <div className="flex items-center shrink-0">
                        <kbd className="px-2.5 py-1 min-w-[28px] text-center rounded-lg bg-white dark:bg-zinc-950 border border-slate-300 dark:border-white/20 font-mono text-xs font-bold text-slate-800 dark:text-[#FF5500] shadow-xs group-hover:scale-105 group-hover:border-[#FF5500] transition-transform">
                          {sc.keys[0]}
                        </kbd>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/90 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px]">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[10px] text-[#FF5500] font-bold">/</kbd> anywhere or click any shortcut to run
          </span>
          <span className="text-[11px] font-mono text-emerald-500 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Shortcuts Active
          </span>
        </div>
      </div>
    </div>
  );
}
