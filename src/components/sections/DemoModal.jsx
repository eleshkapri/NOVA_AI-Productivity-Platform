import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Bot, GitPullRequest, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export function DemoModal({ isOpen, onClose }) {
  const [activeFeature, setActiveFeature] = useState('backlog');

  const demoFeatures = {
    backlog: {
      title: 'Autonomous Sprint Backlog Ingestion',
      subtitle: 'Converts unstructured requirements into story-pointed engineering tasks in 10 seconds.',
      badge: 'Sprint Planning',
      steps: [
        'Ingests PRD / Figma link / Slack thread',
        'Deconstructs logic into frontend, backend, and DB tasks',
        'Auto-assigns Fibonacci story points calibrated from historical team velocity',
        'Checks for circular dependencies across existing branches',
      ],
      previewSnippet: `[NOVA Engine] Analyzing PRD: 'Unified User Onboarding'
✓ Identified 4 Sub-Tasks:
  1. FE: Auth token refresh hook (3 pts) - assigned to @alex
  2. BE: Session revocation endpoint (5 pts) - assigned to @sarah
  3. DB: Migration schema for oauth_accounts (2 pts)
  4. QA: E2E Cypress matrix for MFA challenge (3 pts)
Velocity Forecast: 98.4% probability of completion within Sprint 49.`,
    },
    pr: {
      title: 'Real-Time PR Context & Architectural Diff',
      subtitle: 'Eliminates 45-minute PR review bottlenecks with automated diff reasoning.',
      badge: 'Code Review Copilot',
      steps: [
        'Reads git diff and identifies modified architectural boundaries',
        'Synthesizes plain-English architectural summary for reviewers',
        'Highlights potential performance regressions and SQL N+1 queries',
        'Verifies test coverage delta across touched modules',
      ],
      previewSnippet: `[NOVA Review Bot] PR #184: 'Optimized Data Fetching Layer'
Summary: Replaced waterfall fetch in Dashboard.tsx with parallel TanStack queries.
⚠️ Performance Notice:
  - Detected 1 potential memory leak in event listener cleanup (line 84).
  - Recommended fix auto-staged in commit f92a1c.
✓ Test Coverage: 92.4% (+4.1% over base branch).
Result: Approved for staging merge.`,
    },
    velocity: {
      title: 'Predictive Velocity & Burnout Radar',
      subtitle: 'Anticipates sprint spillovers 4 days before deadline so you can course-correct early.',
      badge: 'Sprint Analytics',
      steps: [
        'Monitors active WIP (Work In Progress) per engineer',
        'Flags blocked tickets that have seen zero activity in 48 hours',
        'Forecasts final sprint delivery completion date',
        'Recommends rebalancing tasks before engineer burnout occurs',
      ],
      previewSnippet: `[Sprint 48 Radar] Mid-Sprint Checkpoint
- Completed: 42 pts | Remaining: 24 pts | Projected: 66/68 pts
- Blocker Alert: NOV-239 (Stripe Webhook) is waiting on 3rd-party sandbox key.
- Suggested Mitigation: Shift NOV-241 to Sprint 49 to protect primary release goal.
Team Morale Index: Optimal (Low Overtime Risk).`,
    },
  };

  const current = demoFeatures[activeFeature];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interactive Product Tour" maxWidth="max-w-4xl">
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Experience NOVA in Action
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore how NOVA automates sprint mechanics, writes PR summaries, and prevents blockers.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 border-b border-slate-200 dark:border-white/10 pb-4">
          <button
            onClick={() => setActiveFeature('backlog')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'backlog'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> Backlog AI
          </button>
          <button
            onClick={() => setActiveFeature('pr')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'pr'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" /> PR Summaries
          </button>
          <button
            onClick={() => setActiveFeature('velocity')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'velocity'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Velocity Radar
          </button>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8B452]">
                {current.badge}
              </span>
              <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {current.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {current.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-[#D8B452] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#050614] rounded-2xl p-5 border border-white/10 font-mono text-xs text-slate-300 shadow-inner flex flex-col justify-between overflow-x-auto transition-all duration-300 hover:border-[#D8B452]/40 hover:shadow-lg hover:shadow-[#D8B452]/10">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 text-[11px] text-slate-400">
              <span>nova-cli v2.4.0 --interactive</span>
              <span className="text-[#D8B452] font-bold">● Active</span>
            </div>
            <pre className="whitespace-pre-wrap text-[11px] text-[#D8B452] leading-relaxed font-mono">
              {current.previewSnippet}
            </pre>
            <div className="mt-4 pt-2 border-t border-white/10 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Simulated Real-Time Stream</span>
              <span>Execution Time: 0.84s</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ready to integrate with your GitHub or Linear workspace?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 sm:flex-initial">
              Close Tour
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                onClose();
                const pricing = document.getElementById('pricing');
                pricing?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 sm:flex-initial"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
