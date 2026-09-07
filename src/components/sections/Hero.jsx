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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 dark:opacity-30 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.45) 0%, rgba(168, 85, 247, 0.25) 45%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Copy */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/50 shadow-xs mb-6 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 tracking-wide">
              NOVA 2.0 is Live &bull; Autonomous Sprint Workflows
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hidden sm:inline">
              Read announcement &rarr;
            </span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Build Better.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-purple-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
              Work Smarter
            </span>{' '}
            with Autonomous AI.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            NOVA is the AI-powered productivity platform that unifies project backlogs, automates sprint retrospectives, and eliminates developer busywork.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                const pricing = document.getElementById('pricing');
                pricing?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base shadow-indigo-600/30"
            >
              Start 14-Day Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Play}
              iconPosition="left"
              onClick={onOpenDemo}
              className="w-full sm:w-auto text-base"
            >
              Watch Interactive Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> 60-second GitHub setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> SOC2 Type II Certified
            </span>
          </div>
        </div>

        {/* Interactive Platform Mockup */}
        <div className="mt-14 md:mt-18 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1.5 sm:p-2.5 bg-gradient-to-b from-indigo-500/30 via-slate-300/30 dark:via-indigo-900/20 to-slate-200/20 dark:to-slate-800/40 shadow-2xl shadow-indigo-500/10 border border-slate-300/50 dark:border-white/10 backdrop-blur-xl">
            {/* Top Mockup Title Bar */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-t-xl px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-3 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-500" />
                  nova-command-center &bull; sprint-48-active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('sprint')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'sprint'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Active Sprint
                </button>
                <button
                  onClick={() => setActiveTab('copilot')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'copilot'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  AI Copilot Feed
                </button>
              </div>
            </div>

            {/* Mockup Dashboard Content */}
            <div className="bg-white dark:bg-slate-950 p-4 sm:p-6 rounded-b-xl overflow-hidden">
              {activeTab === 'sprint' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: AI Backlog Ingestion */}
                  <div className="bg-slate-50 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        AI Ingested (3)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                        Auto-triaged
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 transition-colors">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">NOV-249</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> 3 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Refactor OAuth token rotation for multi-region failover
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            Auth Service
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                            Auto-estimated
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">NOV-251</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> 5 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Implement real-time WebSocket connection pool manager
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            Backend API
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-slate-50 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        In Progress (2)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                        High Velocity
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-indigo-500/40 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">NOV-244</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">PR #142 Linked</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Automate PR semantic changelogs & visual diff reports
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-1 text-slate-500">
                            <GitBranch className="w-3 h-3 text-indigo-500" /> feat/pr-summarizer
                          </span>
                          <span className="text-emerald-600 font-semibold">CI Passing</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">NOV-246</span>
                          <span>8 pts</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Add Webhook payload validator with AES-GCM verification
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: AI Validated / Shipped */}
                  <div className="bg-slate-50 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Completed & Validated (4)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                        100% Verified
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80 opacity-85">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-slate-400 line-through">NOV-238</span>
                          <span className="text-emerald-500 font-bold">Merged</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-through">
                          Design token synchronization for dark/light mode system
                        </p>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80 opacity-85">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono text-slate-400 line-through">NOV-240</span>
                          <span className="text-emerald-500 font-bold">Merged</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-through">
                          Zero-downtime database migration script for user sessions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: AI Copilot Feed */
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        [NOVA Copilot] Potential Bottleneck Detected on Sprint 48
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans">
                        Task <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">NOV-244</span> depends on backend PR #138 which is pending review. Suggested action: Reassigned reviewer to Marcus Vance based on commit history in auth module.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        [NOVA Copilot] Automated PR Changelog Generated
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans">
                        Merged 4 commits into <span className="font-mono text-emerald-600 dark:text-emerald-400">main</span>. Semantic version bumped to v2.4.0 with zero regressions detected in unit test suite.
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
