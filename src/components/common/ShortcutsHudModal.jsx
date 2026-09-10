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
      { keys: ['G', 'H'], label: 'Jump to Top / Hero', actionId: 'nav-hero' },
      { keys: ['G', 'F'], label: 'Jump to Autonomous Features', actionId: 'nav-features' },
      { keys: ['G', 'S'], label: 'Jump to Squad Solutions', actionId: 'nav-solutions' },
      { keys: ['G', 'P'], label: 'Jump to Pricing Plans', actionId: 'nav-pricing' },
      { keys: ['G', 'R'], label: 'Jump to ROI Calculator', actionId: 'nav-roi' },
    ],
  },
  {
    title: 'Views & Deep-Telemetry',
    icon: Activity,
    shortcuts: [
      { keys: ['W'], label: 'Open Autonomous Workspace Dashboard', actionId: 'view-workspace' },
      { keys: ['S'], label: 'Open Global System Status (99.99%)', actionId: 'view-status' },
      { keys: ['C'], label: 'Open Product Release Changelog', actionId: 'view-changelog' },
      { keys: ['D'], label: 'Open Interactive Demo Studio', actionId: 'view-demo' },
      { keys: ['⌘', 'K'], label: 'Open Command Palette & Search', actionId: 'view-palette' },
    ],
  },
  {
    title: 'Preferences & Actions',
    icon: Sparkles,
    shortcuts: [
      { keys: ['T'], label: 'Toggle Dark / Light Theme', actionId: 'toggle-theme' },
      { keys: ['M'], label: 'Toggle Ambient Soundtrack / Audio', actionId: 'toggle-sound' },
      { keys: ['?'], label: 'Toggle this Shortcuts Guide', actionId: 'toggle-hud' },
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
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#07081e] border border-slate-200 dark:border-[#8E6FFF]/35 rounded-3xl shadow-2xl shadow-[#6833FF]/20 overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#0b0c33] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D8B452]/15 border border-[#D8B452]/30 text-[#D8B452]">
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
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <GroupIcon className="w-3.5 h-3.5 text-[#D8B452]" />
                  <span>{group.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.shortcuts.map((sc) => (
                    <div
                      key={sc.label}
                      onClick={() => handleRowClick(sc.actionId)}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/5 hover:border-[#D8B452]/40 hover:bg-slate-100 dark:hover:bg-[#0b0c33] transition-all flex items-center justify-between gap-3 cursor-pointer group select-none"
                    >
                      <span className="text-xs text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-medium">
                        {sc.label}
                      </span>

                      {/* Key Caps */}
                      <div className="flex items-center gap-1 shrink-0">
                        {sc.keys.map((k, idx) => (
                          <React.Fragment key={idx}>
                            <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 font-mono text-[11px] font-bold text-[#a1741a] dark:text-[#D8B452] shadow-xs group-hover:scale-105 transition-transform">
                              {k}
                            </kbd>
                            {idx < sc.keys.length - 1 && (
                              <span className="text-[10px] text-slate-400 font-mono">then</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-[#0b0c33] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px]">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[10px]">?</kbd> anywhere to open or dismiss
          </span>
          <span className="text-[11px] font-mono text-emerald-500 font-semibold">
            ● Shortcuts Active
          </span>
        </div>
      </div>
    </div>
  );
}
