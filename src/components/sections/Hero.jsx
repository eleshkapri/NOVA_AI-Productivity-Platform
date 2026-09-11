import React, { useState, useEffect, useRef } from 'react';
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
import { VelocityRhythmModel, SprintTaskModel } from '../../models';

const Hero3dCutaway = React.lazy(() =>
  import('./hero/Hero3dCutaway').then((m) => ({ default: m.Hero3dCutaway }))
);

const RAW_VELOCITY_MODES = [
  {
    id: 'hyperscale',
    label: 'Hyperscale',
    fullLabel: 'Hyperscale Sprint',
    icon: Zap,
    statusText: '4.2x Burndown Active',
    badgeSymbol: '★',
    badgeText: 'DORA Elite // 4.2x Burndown',
    badgeColor: 'text-[#FF5500]',
    metrics: [
      { id: 'm1', value: '10x', label: 'Burndown Rate', accent: 'text-slate-900 dark:text-white', sub: '+340% velocity' },
      { id: 'm2', value: '8ms', label: 'AST Analysis', accent: 'text-[#FF5500]', sub: 'Real-time AST parse' },
      { id: 'm3', value: '99.9%', label: 'Test Accuracy', accent: 'text-emerald-500', sub: 'CI test matrix' },
    ],
  },
  {
    id: 'zerotrust',
    label: 'Zero-Trust',
    fullLabel: 'Zero-Trust Hardened',
    icon: ShieldCheck,
    statusText: 'SOC2 Type II Verified',
    badgeSymbol: '▲',
    badgeText: 'SOC2 Type II // Zero Trust',
    badgeColor: 'text-emerald-500',
    metrics: [
      { id: 'm1', value: '0 CVE', label: 'Security Surface', accent: 'text-emerald-500', sub: 'Zero known exploits' },
      { id: 'm2', value: 'AES-256', label: 'Payload Cipher', accent: 'text-[#FF5500]', sub: 'AES-GCM signed' },
      { id: 'm3', value: '100%', label: 'Audit Trail', accent: 'text-sky-500 dark:text-sky-400', sub: 'Cryptographic chain' },
    ],
  },
  {
    id: 'autopilot',
    label: 'AI Pilot',
    fullLabel: 'Autonomous AI Pilot',
    icon: Cpu,
    statusText: 'Full AST Copilot Active',
    badgeSymbol: '●',
    badgeText: 'Autonomous Copilot // 12x Burndown',
    badgeColor: 'text-[#FF5500]',
    metrics: [
      { id: 'm1', value: '12x', label: 'Velocity Cadence', accent: 'text-slate-900 dark:text-white', sub: 'Autonomous burndown' },
      { id: 'm2', value: '0.4ms', label: 'Inference Latency', accent: 'text-[#FF5500]', sub: 'Sub-ms AST engine' },
      { id: 'm3', value: '99.99%', label: 'Self-Healing CI', accent: 'text-emerald-500', sub: 'Auto test synthesis' },
    ],
  },
];

const VELOCITY_MODES = Object.freeze(
  RAW_VELOCITY_MODES.map((config) => new VelocityRhythmModel(config))
);

/**
 * AnimatedHeroLine: Self-observing Animation 3 line reveal.
 * Tracks its own viewport intersection so it never disappears when neighboring lines scroll off,
 * and only resets when 100% off screen.
 */
function AnimatedHeroLine({
  text,
  as: Component = 'div',
  className = '',
  wordClassName = '',
  startDelay = 0,
  staggerMs = 45,
  durationMs = 550,
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const lineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.intersectionRatio === 0) {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.1],
        rootMargin: '0px',
      }
    );

    const el = lineRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const words = text ? text.trim().split(/\s+/).filter(Boolean) : [];

  return (
    <Component ref={lineRef} className={className}>
      {words.map((word, i) => (
        <span
          key={`hw-${i}`}
          className="inline-block overflow-hidden align-top mr-[0.24em] last:mr-0 pb-[0.08em]"
        >
          <span
            className={`inline-block select-none font-extrabold cursor-default transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] ${wordClassName}`}
            style={{
              transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
              opacity: isVisible ? 1 : 0,
              transitionDuration: `${durationMs}ms`,
              transitionDelay: `${startDelay + i * staggerMs}ms`,
              willChange: isVisible ? 'auto' : 'transform, opacity',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}




const RAW_INITIAL_TASKS = [
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

const INITIAL_TASKS = Object.freeze(
  RAW_INITIAL_TASKS.map((t) => new SprintTaskModel(t))
);

export function Hero({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('sprint'); // 'sprint' | 'diff' | 'terminal'
  const [velocityMode, setVelocityMode] = useState('hyperscale');
  const currentVelocityMode =
    VELOCITY_MODES.find((m) => m.id === velocityMode) || VELOCITY_MODES[0];
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
      prev.map((t) => (t.id === taskId ? (t instanceof SprintTaskModel ? t.withStatus(targetStatus) : { ...t, status: targetStatus }) : t))
    );
  };

  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
    setIsPrMerged(false);
  };

  const handleMergePr = () => {
    setIsPrMerged(true);
    setTasks((prev) =>
      prev.map((t) => (t.id === 'NOV-244' ? (t instanceof SprintTaskModel ? t.withStatus('done') : { ...t, status: 'done' }) : t))
    );
    soundService.playChime('stepAdvance');
  };

  return (
    <section
      id="hero"
      className={`relative pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-14 overflow-hidden ${isRevealed ? 'hero-revealed' : ''}`}
    >

      {/* Ambient Atmospheric Orange Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-30 dark:opacity-20 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15) 0%, rgba(255, 120, 0, 0.05) 40%, transparent 70%)',
        }}
      />

      {/* NOVA Kinetic SVG Vector Energy Conduit */}
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
        {/* Tracked Metadata Eyebrow */}
        <div
          className="rapid-fade-up flex items-center justify-between gap-4 mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-slate-200/80 dark:border-white/10"
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

        {/* Asymmetric Display Headline with Line Masking */}
        <div className="mb-4 sm:mb-6 select-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[5.75rem] font-extrabold tracking-[-0.04em] text-slate-900 dark:text-white leading-[0.93] uppercase">
            {/* Line 1: Flush Left */}
            <AnimatedHeroLine
              text="THE AUTONOMOUS SPRINT"
              className="rapid-line-mask"
              startDelay={20}
              staggerMs={45}
              wordClassName="text-slate-900 dark:text-white"
            />
          </h1>
        </div>

        {/* Dynamic Two-Column Stage: Lines 2 & 3 + Narrative Lede on Left vs 3D Cutaway + Telemetry on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-2 sm:mb-4">
          {/* Left Column (7 cols): Lines 2 & 3, Datum Line, Narrative Lede, CTAs & Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="select-none">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold tracking-[-0.04em] text-slate-900 dark:text-white leading-[0.93] uppercase">
                {/* Line 2: Asymmetric Right Shift */}
                <AnimatedHeroLine
                  text="NOT ON THE SURFACE"
                  className="rapid-line-mask rapid-indent-1"
                  startDelay={30}
                  staggerMs={45}
                  wordClassName="text-slate-700 dark:text-zinc-300"
                />

                {/* Datum Horizon Line & Label */}
                <div className="rapid-indent-1 flex items-center gap-3 mt-3 sm:mt-5 mb-2">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-slate-500 dark:text-zinc-400">
                    EXECUTION
                  </span>
                  <div className="h-px w-14 sm:w-24 bg-slate-300 dark:bg-white/20" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#FF5500]">0.00 MS</span>
                </div>

                {/* Line 3: Deep Indent & Radiant Accent */}
                <AnimatedHeroLine
                  text="BEGINS."
                  className="rapid-line-mask rapid-indent-2"
                  startDelay={30}
                  staggerMs={45}
                  wordClassName="text-[#FF5500]"
                />
              </div>
            </div>

            {/* Editorial Lede Narrative */}
            <p
              className="rapid-fade-up text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-400 leading-relaxed font-normal text-pretty max-w-[50ch] pt-2"
              style={{ '--d': '0.3s' }}
            >
              The finished pull request is just the visible layer. Continuous AST parsing, test synthesis, and autonomous sprint burndown decide whether your engineering squad will ship at 10x velocity &mdash; and we orchestrate all of it, from ticket to production.
            </p>




            {/* Dual CTAs in High-Contrast Pill Style */}
            <div
              className="rapid-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              style={{ '--d': '0.92s' }}
            >
              <Button
                variant="orange"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onOpenDemo('trial')}
                menuRoll
              >
                Start Autonomous Trial
              </Button>

              <Button
                variant="orangeGhost"
                size="lg"
                icon={Play}
                iconPosition="left"
                onClick={() => onOpenDemo('walkthrough')}
              >
                Watch Interactive Demo
              </Button>
            </div>

            {/* Verification Proof Metric Badges */}
            <div
              className="rapid-fade-up pt-1 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-zinc-400"
              style={{ '--d': '1.02s' }}
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Zero Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>SOC2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Instant 3-Min GitHub Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): 3D Model + Telemetry Cockpit Deck */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Center Stage: Interactive 3D Cutaway Architectural Model (Zero Card Background) */}
            <React.Suspense
              fallback={
                <div className="w-full h-[320px] sm:h-[350px] flex flex-col items-center justify-center gap-3">
                  <div className="w-9 h-9 rounded-full border-2 border-[#FF5500]/30 border-t-[#FF5500] animate-spin" />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    INITIALIZING 3D ENGINE...
                  </span>
                </div>
              }
            >
              <Hero3dCutaway velocityMode={velocityMode} />
            </React.Suspense>

            {/* Unified Telemetry & Execution Rhythm Deck (Below card placed in immediate close range) */}
            <div
              className="rapid-fade-up rounded-2xl bg-white/85 dark:bg-zinc-900/85 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-black/5 overflow-hidden transition-all duration-300"
              style={{ '--d': '0.70s' }}
            >
              {/* Upper Tier: Live Responsive Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3.5 sm:p-4">
                {currentVelocityMode.metrics.map((metric) => (
                  <div key={metric.id} className="transition-all duration-300">
                    <div
                      key={`${velocityMode}-${metric.value}`}
                      className={`text-xl sm:text-2xl font-mono font-extrabold transition-all duration-300 ${metric.accent}`}
                    >
                      {metric.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 truncate">
                      {metric.label}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 dark:text-zinc-500 mt-0.5 truncate hidden sm:block">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seamless Live Cadence Bar Divider */}
              <div className="px-3.5 sm:px-4 py-1.5 bg-slate-50/90 dark:bg-black/40 border-t border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 dark:text-zinc-400">
                    EXECUTION RHYTHM // {currentVelocityMode.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FF5500] font-bold tracking-wider">
                  {currentVelocityMode.statusText}
                </span>
              </div>

              {/* Lower Tier: Execution Rhythm Selector (Placed in immediate close range!) */}
              <div className="p-2 sm:p-2.5 bg-slate-100/60 dark:bg-zinc-950/40">
                <div className="grid grid-cols-3 gap-1.5">
                  {VELOCITY_MODES.map((mode) => {
                    const isSelected = velocityMode === mode.id;
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleSelectVelocityMode(mode.id)}
                        className={`px-2 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer outline-none select-none ${
                          isSelected
                            ? 'bg-[#FF5500] text-black shadow-md shadow-[#FF5500]/30 font-extrabold scale-[1.02]'
                            : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Platform Mockup */}
        <div
          className="rapid-fade-up mt-1 sm:mt-2 max-w-5xl mx-auto animate-float-subtle relative"
          style={{ '--d': '0.82s' }}
        >
          {/* Floating Physics Badges */}
          <div className="hidden md:flex absolute -top-5 -left-6 z-20 animate-float-sway-1 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-[#FF5500] hover:scale-105 transition-all">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span>AST Ingest // 8ms</span>
            </div>
          </div>

          <div className="hidden md:flex absolute -top-5 -right-6 z-20 animate-float-sway-2 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-[#FF5500] hover:scale-105 transition-all">
              <span className={currentVelocityMode.badgeColor}>{currentVelocityMode.badgeSymbol}</span>
              <span>{currentVelocityMode.badgeText}</span>
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
