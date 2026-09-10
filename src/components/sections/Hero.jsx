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
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient Atmospheric Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40 dark:opacity-25 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.08) 0%, rgba(217, 119, 6, 0.08) 35%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Copy */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Announcement Pill with Orchid Radiant Border */}
          <button
            onClick={() => {
              const aboutSec = document.getElementById('about');
              aboutSec?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="orchid-tag-pill mb-8 cursor-pointer group hover:scale-105 active:scale-95"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#7C3AED] dark:bg-[#A78BFA] shadow-[0_0_8px_#7C3AED] dark:shadow-[0_0_8px_#A78BFA] animate-ping" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#5B21B6] dark:text-[#E0E7FF]">
              NOVA 2.0 &bull; Autonomous AI Orchestration
            </span>
            <span className="text-xs text-[#B45309] dark:text-[#D8B452] font-semibold hidden sm:inline group-hover:text-[#7C3AED] dark:group-hover:text-white transition-colors">
              Read editorial &rarr;
            </span>
          </button>

          {/* Main H1 Headline with Grand Editorial Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-8">
            Build Better.{' '}
            <span className="text-gold-gradient italic font-black">
              Work Smarter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
            An elevated AI productivity platform engineered for visionary engineering squads to master backlogs, eliminate developer toil, and ship with unmatched precision.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
            <Button
              variant="orchid"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onOpenDemo('trial')}
              className="w-full sm:w-auto text-base"
            >
              Experience Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Play}
              iconPosition="left"
              onClick={() => onOpenDemo('walkthrough')}
              className="w-full sm:w-auto text-base"
            >
              Watch Interactive Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#B45309] dark:text-[#D8B452]" /> No credit card required
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#7C3AED] dark:text-[#A78BFA]" /> 60-second GitHub setup
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#B45309] dark:text-[#D8B452]" /> SOC2 Type II Certified
            </span>
          </div>

          {/* Orchid Scanning Laser Beam Divider */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="decor-laser-beam" />
          </div>
        </div>

        {/* Interactive Platform Mockup (Orchid Cyber Console) */}
        <div className="mt-16 md:mt-22 max-w-5xl mx-auto animate-float-subtle relative">
          {/* Orchid-style Atmospheric Gradient Orb directly behind the Console */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-[#6833FF]/30 via-[#8E6FFF]/20 to-[#D8B452]/15 blur-[120px] pointer-events-none -z-10 orchid-ambient-orb" />

          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#6833FF]/25 via-[#0b0c33]/90 to-[#050614] shadow-2xl shadow-[#6833FF]/20 border border-[#8E6FFF]/35 backdrop-blur-2xl orchid-card">
            {/* Top Mockup Title Bar */}
            <div className="bg-[#0b0c33] rounded-t-2xl px-3 sm:px-5 py-2.5 sm:py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-white/10 gap-2.5">
              <div className="flex items-center justify-between md:justify-start gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-1 sm:ml-3 text-[11px] sm:text-xs font-semibold tracking-wider text-slate-300 flex items-center gap-1.5 truncate">
                  <Bot className="w-3.5 h-3.5 text-[#D8B452] shrink-0" />
                  <span className="truncate">nova-command-center</span>
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
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'sprint'
                      ? 'bg-[#D8B452] text-black shadow-xs font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Columns className="w-3 h-3" />
                  <span>Active Sprint</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveTab('diff');
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'diff'
                      ? 'bg-[#D8B452] text-black shadow-xs font-extrabold'
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
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'terminal'
                      ? 'bg-[#D8B452] text-black shadow-xs font-extrabold'
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
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 bg-gradient-to-r from-[#D8B452] to-[#B38722] text-black shadow-sm whitespace-nowrap ml-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Interactive Studio
                </button>
              </div>
            </div>

            {/* Mockup Dashboard Content */}
            <div className="bg-[#07081e] p-4 sm:p-6 rounded-b-2xl overflow-hidden">
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
