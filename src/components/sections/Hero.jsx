import React, { useState } from 'react';
import { Button } from '../common/Button';
import {
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Check,
  Clock,
  Zap,
  Bot,
} from 'lucide-react';

export function Hero({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('sprint');

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Soufflet & Orchid Ambient Atmospheric Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-30 dark:opacity-25 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(104, 51, 255, 0.25) 0%, rgba(216, 180, 82, 0.2) 35%, rgba(11, 12, 51, 0.2) 60%, transparent 80%)',
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
            <span className="flex h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#A78BFA] animate-ping" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#C4B5FD] dark:text-[#E0E7FF]">
              NOVA 2.0 &bull; Autonomous AI Orchestration
            </span>
            <span className="text-xs text-[#D8B452] font-semibold hidden sm:inline group-hover:text-white transition-colors">
              Read editorial &rarr;
            </span>
          </button>

          {/* Main H1 Headline with Grand Editorial Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-8">
            Build Better.{' '}
            <span className="text-gold-gradient font-serif italic font-normal">
              Work Smarter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
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
              className="w-full sm:w-auto text-base border-[#8E6FFF]/40 hover:border-[#8E6FFF]"
            >
              Watch Interactive Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#D8B452]" /> No credit card required
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#A78BFA]" /> 60-second GitHub setup
            </span>
            <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
              <Check className="w-4 h-4 text-[#D8B452]" /> SOC2 Type II Certified
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
            <div className="bg-[#0b0c33] rounded-t-2xl px-5 py-3.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-semibold tracking-wider text-slate-300 flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-[#D8B452]" />
                  nova-command-center &bull; sprint-48-active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('sprint')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    activeTab === 'sprint'
                      ? 'bg-[#D8B452] text-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active Sprint
                </button>
                <button
                  onClick={() => setActiveTab('copilot')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    activeTab === 'copilot'
                      ? 'bg-[#D8B452] text-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI Copilot Feed
                </button>
                <button
                  onClick={() => onOpenDemo('walkthrough')}
                  title="Launch full interactive demo studio"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 bg-gradient-to-r from-[#D8B452] to-[#B38722] text-black shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" /> Interactive Studio
                </button>
              </div>
            </div>

            {/* Mockup Dashboard Content */}
            <div className="bg-[#07081e] p-5 sm:p-7 rounded-b-2xl overflow-hidden">
              {activeTab === 'sprint' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: AI Backlog Ingestion */}
                  <div className="bg-[#0b0c33]/70 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D8B452]" />
                        AI Ingested (3)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#D8B452] font-bold">
                        Auto-triaged
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-249',
                              title: 'Refactor OAuth token rotation for multi-region failover',
                              status: 'Auto-triaged',
                              details:
                                'Automated 3-point Fibonacci estimation calibrated from historical velocity. Auth service multi-region failover test matrix staged with zero circular dependencies.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-white/10 shadow-xs hover:border-[#D8B452] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D8B452]/20 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-[#D8B452] font-bold group-hover:underline">NOV-249</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#D8B452]" /> 3 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                          Refactor OAuth token rotation for multi-region failover
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                            Auth Service
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium">
                            Auto-estimated
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-251',
                              title: 'Implement real-time WebSocket connection pool manager',
                              status: 'Auto-triaged',
                              details:
                                'Automated 5-point estimation. Backend API WebSocket multiplexing pool configured with heartbeat keepalive and graceful reconnection policies.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-white/10 shadow-xs hover:border-[#D8B452] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D8B452]/20 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-[#D8B452] font-bold group-hover:underline">NOV-251</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#D8B452]" /> 5 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                          Implement real-time WebSocket connection pool manager
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                            Backend API
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-[#0b0c33]/70 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#D8B452]" />
                        In Progress (2)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#D8B452] font-bold">
                        High Velocity
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-244',
                              title: 'Automate PR semantic changelogs & visual diff reports',
                              status: 'In Progress',
                              details:
                                'PR #142 linked. feat/pr-summarizer passing CI test matrix. Real-time AST semantic diff reasoning active.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-[#D8B452]/30 shadow-xs hover:border-[#D8B452] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D8B452]/20 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-[#D8B452] font-bold group-hover:underline">NOV-244</span>
                          <span className="text-[#D8B452] font-medium">PR #142 Linked</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                          Automate PR semantic changelogs & visual diff reports
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-1 text-slate-400">
                            <GitBranch className="w-3 h-3 text-[#D8B452]" /> feat/pr-summarizer
                          </span>
                          <span className="text-emerald-400 font-semibold">CI Passing</span>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-246',
                              title: 'Add Webhook payload validator with AES-GCM verification',
                              status: 'In Progress',
                              details:
                                '8 story points. Webhook security payload verification with AES-GCM key rotation and replay attack prevention.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-white/10 shadow-xs hover:border-[#D8B452] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D8B452]/20 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-[#D8B452] font-bold group-hover:underline">NOV-246</span>
                          <span>8 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                          Add Webhook payload validator with AES-GCM verification
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Shipped */}
                  <div className="bg-[#0b0c33]/70 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Completed (4)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        100% Verified
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-238',
                              title: 'Design token synchronization for dark/light mode system',
                              status: 'Merged',
                              details:
                                'Merged into main branch. Token pipeline synchronized across Tailwind CSS variables and Figma token export.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-white/10 opacity-75 hover:opacity-100 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-slate-500 line-through">NOV-238</span>
                          <span className="text-emerald-400 font-bold">Merged</span>
                        </div>
                        <p className="text-xs font-medium text-slate-400 line-through">
                          Design token synchronization for dark/light mode system
                        </p>
                      </div>

                      <div
                        onClick={() =>
                          onOpenDemo('task', {
                            task: {
                              id: 'NOV-240',
                              title: 'Zero-downtime database migration script for user sessions',
                              status: 'Merged',
                              details:
                                'Merged into main branch. Zero-downtime migration completed across all 12 replica database shards.',
                            },
                          })
                        }
                        className="p-3.5 bg-[#050614] rounded-lg border border-white/10 opacity-75 hover:opacity-100 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-slate-500 line-through">NOV-240</span>
                          <span className="text-emerald-400 font-bold">Merged</span>
                        </div>
                        <p className="text-xs font-medium text-slate-400 line-through">
                          Zero-downtime database migration script for user sessions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: AI Copilot Feed */
                <div className="space-y-3 font-mono text-xs">
                  <div
                    onClick={() => onOpenDemo('backlog')}
                    className="p-4 rounded-xl bg-[#050614] border border-[#D8B452]/30 hover:border-[#D8B452] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D8B452]/20 transition-all duration-300 cursor-pointer flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-[#D8B452]/20 text-[#D8B452] shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-[#D8B452]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#D8B452]">
                        [NOVA Copilot] Potential Bottleneck Detected on Sprint 48
                      </p>
                      <p className="text-slate-300 mt-1 font-sans">
                        Task <span className="font-mono font-bold text-[#D8B452]">NOV-244</span> depends on backend PR #138 which is pending review. Suggested action: Reassigned reviewer to Marcus Vance based on commit history in auth module.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => onOpenDemo('changelog')}
                    className="p-4 rounded-xl bg-[#050614] border border-white/10 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-400">
                        [NOVA Copilot] Automated PR Changelog Generated
                      </p>
                      <p className="text-slate-300 mt-1 font-sans">
                        Merged 4 commits into <span className="font-mono text-emerald-400">main</span>. Semantic version bumped to v2.4.0 with zero regressions detected in unit test suite.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
