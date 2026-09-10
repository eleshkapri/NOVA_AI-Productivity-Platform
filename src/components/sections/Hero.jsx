import React, { useState } from 'react';
import { Button } from '../common/Button';
import {
  ArrowRight,
  Play,
  Check,
  Bot,
  Columns,
  GitPullRequest,
  Terminal,
} from 'lucide-react';
import { HeroKanban } from './hero/HeroKanban';
import { HeroCodeDiff } from './hero/HeroCodeDiff';
import { HeroTerminal } from './hero/HeroTerminal';
import { soundService } from '../../services/SoundService';

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
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isPrMerged, setIsPrMerged] = useState(false);

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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient Atmospheric Orange Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-30 dark:opacity-20 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15) 0%, rgba(255, 120, 0, 0.05) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Copy (Floria Signature Minimalist Typography) */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Announcement Pill with Orange Radiant Border */}
          <button
            onClick={() => {
              const aboutSec = document.getElementById('about');
              aboutSec?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 dark:bg-zinc-900/60 text-slate-800 dark:text-white backdrop-blur-md mb-8 hover:border-[#FF5500]/60 transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-ping" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-900 dark:text-white">
              NOVA 2.0 &bull; Autonomous AI Orchestration
            </span>
            <span className="text-xs text-[#FF5500] font-semibold hidden sm:inline group-hover:translate-x-0.5 transition-transform">
              Read editorial &rarr;
            </span>
          </button>

          {/* Main H1 Headline with Floria-Style Ultra-Tight Tracking & Italic Accent */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.92] mb-8">
            Build Better.{' '}
            <span className="text-[#FF5500] italic font-normal">
              Work Smarter.
            </span>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-zinc-400 max-w-[42ch] mx-auto leading-relaxed mb-10 font-normal text-balance">
            An elevated AI productivity platform engineered for visionary engineering squads to master backlogs, eliminate developer toil, and ship with unmatched precision.
          </p>

          {/* Dual CTAs in Floria Pill Style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="orange"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onOpenDemo('trial')}
              className="w-full sm:w-auto text-base h-14 px-8 rounded-full"
            >
              Experience Free Trial
            </Button>
            <Button
              variant="orangeGhost"
              size="lg"
              icon={Play}
              iconPosition="left"
              onClick={() => onOpenDemo('walkthrough')}
              className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-slate-100 dark:bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-white/20"
            >
              Watch Interactive Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-zinc-400">
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#FF5500]" /> No credit card required
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#FF5500]" /> 60-second GitHub setup
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#FF5500]" /> SOC2 Type II Certified
            </span>
          </div>

          {/* Floria Subtle Orange Laser Line Divider */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent" />
          </div>
        </div>

        {/* Interactive Platform Mockup (Floria-Style Ultra-Rounded Glass Window) */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto animate-float-subtle relative">
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
