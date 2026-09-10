import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import {
  ArrowRight,
  Play,
  Check,
  Bot,
  Columns,
  GitPullRequest,
  Terminal,
  Zap,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { HeroKanban } from './hero/HeroKanban';
import { HeroCodeDiff } from './hero/HeroCodeDiff';
import { HeroTerminal } from './hero/HeroTerminal';
import { soundService } from '../../services/SoundService';
import { smoothScrollService } from '../../services/SmoothScrollService';

const VELOCITY_MODES = [
  { id: 'hyperscale', label: 'Hyperscale Sprint', icon: Zap, statusText: '4.2x Burndown' },
  { id: 'zerotrust', label: 'Zero-Trust Hardened', icon: ShieldCheck, statusText: 'SOC2 Verified' },
  { id: 'autopilot', label: 'Autonomous AI Pilot', icon: Cpu, statusText: 'Full AST Copilot' },
];

const INITIAL_TASKS = [
  {
    id: 'NOV-249',
    title: 'Refactor OAuth token rotation for multi-region failover',
    points: 3,
    service: 'Auth Service',
    status: 'backlog',
    details:
      'Automated 3-point Fibonacci estimation calibrated from historical velocity. Auth service multi-region failover test matrix staged with zero circular dependencies.',
  },
  {
    id: 'NOV-251',
    title: 'Implement real-time WebSocket connection pool manager',
    points: 5,
    service: 'Backend API',
    status: 'backlog',
    details:
      'Automated 5-point estimation. Backend API WebSocket multiplexing pool configured with heartbeat keepalive and graceful reconnection policies.',
  },
  {
    id: 'NOV-244',
    title: 'Automate PR semantic changelogs & visual diff reports',
    points: 5,
    service: 'PR Copilot',
    branch: 'feat/pr-summarizer',
    status: 'in_progress',
    details:
      'PR #142 linked. feat/pr-summarizer passing CI test matrix. Real-time AST semantic diff reasoning active.',
  },
  {
    id: 'NOV-246',
    title: 'Add Webhook payload validator with AES-GCM verification',
    points: 8,
    service: 'Security Layer',
    status: 'in_progress',
    details:
      '8 story points. Webhook security payload verification with AES-GCM key rotation and replay attack prevention.',
  },
  {
    id: 'NOV-238',
    title: 'Design token synchronization for dark/light mode system',
    points: 3,
    service: 'Design System',
    status: 'done',
    details:
      'Merged into main branch. Token pipeline synchronized across Tailwind CSS variables and Figma token export.',
  },
  {
    id: 'NOV-240',
    title: 'Zero-downtime database migration script for user sessions',
    points: 5,
    service: 'Infra & DB',
    status: 'done',
    details:
      'Merged into main branch. Zero-downtime migration completed across all 12 replica database shards.',
  },
];

export function Hero({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('sprint'); // 'sprint' | 'diff' | 'terminal'
  const [velocityMode, setVelocityMode] = useState('hyperscale');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isPrMerged, setIsPrMerged] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectVelocityMode = (modeId) => {
    setVelocityMode(modeId);
    soundService.playChime('actionClick');
  };

  const handleMoveTask = (taskId, targetStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
    setIsPrMerged(false);
  };

  const handleMergePr = () => {
    setIsPrMerged(true);
    setTasks((prev) =>
      prev.map((t) => (t.id === 'NOV-244' ? { ...t, status: 'done' } : t))
    );
    soundService.playChime('stepAdvance');
  };

  return (
    <section
      id="hero"
      className={`relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden ${isRevealed ? 'hero-revealed' : ''}`}
    >
      {/* Ambient Atmospheric Orange Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-30 dark:opacity-20 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15) 0%, rgba(255, 120, 0, 0.05) 40%, transparent 70%)',
        }}
      />

      {/* Crency-Style Kinetic SVG Vector Energy Conduit */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-25 dark:opacity-30"
        >
          <path
            d="M-50,220 C320,120 540,380 720,240 C900,100 1120,320 1490,180"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-slate-400/30 dark:text-zinc-700/40"
          />
          <path
            d="M-50,220 C320,120 540,380 720,240 C900,100 1120,320 1490,180"
            stroke="url(#conduitGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-conduit-draw"
          />
          <defs>
            <linearGradient id="conduitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#FF5500" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FF8800" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="720" cy="240" r="5" fill="#FF5500" className="animate-photon" />
          <circle cx="1120" cy="320" r="3.5" fill="#FF8800" className="animate-ping" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rapidkert-Style Tracked Metadata Eyebrow */}
        <div
          className="rapid-fade-up flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200/80 dark:border-white/10"
          style={{ '--d': '0.05s' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-ping" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-slate-700 dark:text-zinc-300">
              NOVA PLATFORM &mdash; AUTONOMOUS AI SPRINT ORCHESTRATION
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              smoothScrollService.scrollTo('#about', { offset: -70 });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-[#FF5500] dark:text-zinc-400 dark:hover:text-[#FF5500] transition-colors cursor-pointer group"
          >
            <span>01 // MISSION CONTROL</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Rapidkert Signature Asymmetric Display Headline with Line Masking */}
        <div className="mb-10 sm:mb-12 select-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-extrabold tracking-[-0.04em] text-slate-900 dark:text-white leading-[0.93] uppercase">
            {/* Line 1: Flush Left (matches 'THE GOOD GARDEN') */}
            <span className="rapid-line-mask">
              <b className="rapid-line-content font-extrabold" style={{ '--d': '0.12s' }}>
                THE AUTONOMOUS SPRINT
              </b>
            </span>

            {/* Line 2: Asymmetric Right Shift (matches 'NOT ON THE SURFACE') */}
            <span className="rapid-line-mask rapid-indent-1 mt-1 sm:mt-2">
              <b className="rapid-line-content font-extrabold text-slate-700 dark:text-zinc-300" style={{ '--d': '0.26s' }}>
                NOT ON THE SURFACE
              </b>
            </span>

            {/* Datum Horizon Line & Label (matches 'SURFACE' above 'BEGINS.') */}
            <div className="rapid-indent-1 flex items-center gap-3 mt-4 sm:mt-6 mb-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-slate-500 dark:text-zinc-400">
                EXECUTION
              </span>
              <div className="h-px w-14 sm:w-24 bg-slate-300 dark:bg-white/20" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#FF5500]">0.00 MS</span>
            </div>

            {/* Line 3: Deep Indent & Radiant Accent (matches 'BEGINS.') */}
            <span className="rapid-line-mask rapid-indent-2">
              <b className="rapid-line-content font-extrabold text-[#FF5500]" style={{ '--d': '0.40s' }}>
                BEGINS.
              </b>
            </span>
          </h1>
        </div>

        {/* Two-Column Editorial Narrative & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          {/* Left Column (7 cols): Editorial Lede Narrative & Dual CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <p
              className="rapid-fade-up text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-400 leading-relaxed font-normal text-pretty max-w-[48ch]"
              style={{ '--d': '0.54s' }}
            >
              The finished pull request is just the visible layer. Continuous AST parsing, test synthesis, and autonomous sprint burndown decide whether your engineering squad will ship at 10x velocity &mdash; and we orchestrate all of it, from ticket to production.
            </p>

            {/* Dual CTAs in Rapidkert High-Contrast Pill Style */}
            <div
              className="rapid-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              style={{ '--d': '0.66s' }}
            >
              <Button
                variant="orange"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onOpenDemo('trial')}
                menuRoll
                className="text-base h-13 px-8 rounded-full shadow-lg shadow-[#FF5500]/25"
              >
                Experience Free Trial
              </Button>
              <Button
                variant="orangeGhost"
                size="lg"
                icon={Play}
                iconPosition="left"
                onClick={() => onOpenDemo('walkthrough')}
                menuRoll
                className="text-base h-13 px-8 rounded-full border border-slate-300 dark:border-white/15 hover:border-[#FF5500]/60"
              >
                Watch Interactive Demo
              </Button>
            </div>

            {/* Trust & Compliance Badges */}
            <div
              className="rapid-fade-up flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-zinc-400 pt-1"
              style={{ '--d': '0.74s' }}
            >
              <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
                <Check className="w-3.5 h-3.5 text-[#FF5500]" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
                <Check className="w-3.5 h-3.5 text-[#FF5500]" /> 60-second GitHub setup
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
                <Check className="w-3.5 h-3.5 text-[#FF5500]" /> SOC2 Type II Certified
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Rapidkert-style Quick Metrics & Velocity Selector */}
          <div className="lg:col-span-5 space-y-4">
            {/* Micro Stats Card (matching Rapidkert's foot stats) */}
            <div
              className="rapid-fade-up grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm"
              style={{ '--d': '0.60s' }}
            >
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 dark:text-white">10x</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Burndown Rate</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#FF5500]">8ms</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">AST Analysis</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-500">99.9%</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Test Accuracy</div>
              </div>
            </div>

            {/* Velocity Mode Selector Pill */}
            <div
              className="rapid-fade-up p-1.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/80 border border-slate-300/80 dark:border-white/10 backdrop-blur-xl"
              style={{ '--d': '0.72s' }}
            >
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 dark:text-zinc-400 px-3 py-1">
                Execution Rhythm:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VELOCITY_MODES.map((mode) => {
                  const isSelected = velocityMode === mode.id;
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleSelectVelocityMode(mode.id)}
                      className={`flex-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer outline-none select-none ${
                        isSelected
                          ? 'bg-[#FF5500] text-black shadow-md shadow-[#FF5500]/30 font-extrabold'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Platform Mockup (Floria-Style Ultra-Rounded Glass Window) */}
        <div
          className="rapid-fade-up mt-8 md:mt-12 max-w-5xl mx-auto animate-float-subtle relative"
          style={{ '--d': '0.82s' }}
        >
          {/* Floating Physics Badges (Crency Agency style) */}
          <div className="hidden md:flex absolute -top-5 -left-6 z-20 animate-float-sway-1 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-[#FF5500] hover:scale-105 transition-all">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span>AST Ingest // 8ms</span>
            </div>
          </div>

          <div className="hidden md:flex absolute -top-5 -right-6 z-20 animate-float-sway-2 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-[#FF5500] hover:scale-105 transition-all">
              <span className="text-[#FF5500]">★</span>
              <span>DORA Elite // 4.2x Burndown</span>
            </div>
          </div>

          <div className="hidden lg:flex absolute -bottom-5 -right-6 z-20 animate-float-sway-1 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-[#FF5500] hover:scale-105 transition-all">
              <span className="text-[#FF5500]">▲</span>
              <span>SOC2 Type II // Zero Trust</span>
            </div>
          </div>

          {/* Subtle Ambient Depth Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] rounded-full bg-gradient-to-tr from-[#FF5500]/20 via-[#FF7700]/10 to-transparent blur-[100px] pointer-events-none -z-10" />

          <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-[#05060A] shadow-2xl shadow-black/80 border border-slate-200/20 dark:border-white/10 backdrop-blur-2xl overflow-hidden ring-1 ring-inset ring-white/10">
            {/* Top Mockup Title Bar */}
            <div className="bg-zinc-900/90 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-white/10 gap-2.5">
              <div className="flex items-center justify-between md:justify-start gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-1 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-300 flex items-center gap-2 truncate">
                  <Bot className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                  <span className="truncate">nova-kernel // mission-control.ast</span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveTab('sprint');
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'sprint'
                      ? 'bg-[#FF5500] text-black shadow-xs font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Columns className="w-3 h-3" />
                  <span>Sprint Velocity</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveTab('diff');
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'diff'
                      ? 'bg-[#FF5500] text-black shadow-xs font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GitPullRequest className="w-3 h-3" />
                  <span>PR Diff Inspector</span>
                  {isPrMerged && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveTab('terminal');
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'terminal'
                      ? 'bg-[#FF5500] text-black shadow-xs font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>AI Terminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenDemo('walkthrough')}
                  title="Launch full interactive demo studio"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-sm whitespace-nowrap ml-1"
                >
                  <Play className="w-3 h-3 text-[#FF5500] fill-current" /> Demo Studio
                </button>
              </div>
            </div>

            {/* Mockup Dashboard Content */}
            <div className="bg-[#05060A] p-4 sm:p-6 overflow-hidden">
              {activeTab === 'sprint' && (
                <HeroKanban
                  tasks={tasks}
                  onMoveTask={handleMoveTask}
                  onResetTasks={handleResetTasks}
                  onOpenDemo={onOpenDemo}
                  velocityMode={velocityMode}
                />
              )}
              {activeTab === 'diff' && (
                <HeroCodeDiff
                  isPrMerged={isPrMerged}
                  onMergePr={handleMergePr}
                  onOpenDemo={onOpenDemo}
                />
              )}
              {activeTab === 'terminal' && (
                <HeroTerminal onOpenDemo={onOpenDemo} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
