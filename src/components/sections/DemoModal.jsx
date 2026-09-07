import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  Bot,
  GitPullRequest,
  TrendingUp,
  CheckCircle,
  Rocket,
  ShieldCheck,
  Code2,
  Activity,
  Copy,
  Check,
  Send,
} from 'lucide-react';

export function DemoModal({ isOpen, onClose, initialTab = 'backlog', selectedPlan = 'pro', selectedTask = null }) {
  const [activeFeature, setActiveFeature] = useState(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);

  // Trial Workspace Creator state
  const [workspaceName, setWorkspaceName] = useState('');
  const [selectedHost, setSelectedHost] = useState('github');
  const [activePlan, setActivePlan] = useState(selectedPlan);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Consultation state
  const [contactForm, setContactForm] = useState({ name: '', email: '', teamSize: '25-50', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Synchronize state when modal is opened with new parameters without cascading effects
  const [prevProps, setPrevProps] = useState({ isOpen, initialTab, selectedPlan });
  if (isOpen && (!prevProps.isOpen || prevProps.initialTab !== initialTab || prevProps.selectedPlan !== selectedPlan)) {
    setPrevProps({ isOpen, initialTab, selectedPlan });
    setActiveFeature(initialTab);
    setActivePlan(selectedPlan);
    setDeploySuccess(false);
    setIsDeploying(false);
    setContactSubmitted(false);
  } else if (!isOpen && prevProps.isOpen) {
    setPrevProps({ isOpen, initialTab, selectedPlan });
  }

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

  const handleCopyCode = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLaunchTrial = (e) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
    }, 1200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NOVA Command Center" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
          <div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {activeFeature === 'trial'
                ? 'Launch Your Autonomous Workspace'
                : activeFeature === 'contact'
                ? 'Connect with Architecture Specialists'
                : activeFeature === 'docs'
                ? 'Developer Documentation & API'
                : activeFeature === 'status'
                ? 'Global System Infrastructure Health'
                : activeFeature === 'changelog'
                ? 'Product Release Changelog'
                : activeFeature === 'task'
                ? 'Task Intelligence Inspector'
                : 'Interactive Product Demonstration'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {activeFeature === 'trial'
                ? 'Initialize your 14-day full access trial with instant GitHub/GitLab integration.'
                : activeFeature === 'contact'
                ? 'Consult with our principal systems engineers for enterprise SLAs and custom SOC2 compliance.'
                : activeFeature === 'docs'
                ? 'Explore REST endpoints, webhook payloads, and autonomous CLI commands.'
                : activeFeature === 'status'
                ? 'Real-time telemetry from NOVA multi-region clusters.'
                : activeFeature === 'changelog'
                ? 'Recent autonomous engine updates and sprint optimization heuristics.'
                : activeFeature === 'task'
                ? 'Automated task breakdown, story points, and commit linkages.'
                : 'Explore how NOVA automates sprint mechanics, writes PR summaries, and prevents blockers.'}
            </p>
          </div>

          {/* Quick status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 self-start sm:self-auto shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Cluster Active &bull; v2.4.0
          </div>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <button
            onClick={() => setActiveFeature('backlog')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'backlog'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> Backlog AI
          </button>
          <button
            onClick={() => setActiveFeature('pr')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'pr'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" /> PR Summaries
          </button>
          <button
            onClick={() => setActiveFeature('velocity')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'velocity'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Velocity Radar
          </button>
          <button
            onClick={() => setActiveFeature('trial')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'trial'
                ? 'bg-gradient-to-r from-[#D8B452] to-[#B88A23] text-black shadow-md'
                : 'bg-amber-500/10 border border-[#D8B452]/40 text-[#a1741a] dark:text-[#D8B452] hover:bg-[#D8B452]/20'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" /> Start Free Trial
          </button>
          <button
            onClick={() => setActiveFeature('docs')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'docs'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> API & Docs
          </button>
          <button
            onClick={() => setActiveFeature('contact')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'contact'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" /> Consultation
          </button>
          <button
            onClick={() => setActiveFeature('status')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'status'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Status
          </button>
        </div>

        {/* TAB 1, 2, 3: Interactive Tour (Backlog, PR, Velocity) */}
        {demoFeatures[activeFeature] && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452]">
                  {demoFeatures[activeFeature].badge}
                </span>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {demoFeatures[activeFeature].title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {demoFeatures[activeFeature].subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {demoFeatures[activeFeature].steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Rocket}
                  iconPosition="right"
                  onClick={() => setActiveFeature('trial')}
                >
                  Launch Live Sandbox
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#050614] rounded-2xl p-5 border border-white/10 font-mono text-xs text-slate-300 shadow-inner flex flex-col justify-between overflow-x-auto transition-all duration-300 hover:border-[#D8B452]/40 hover:shadow-lg hover:shadow-[#D8B452]/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 text-[11px] text-slate-400">
                <span>nova-cli v2.4.0 --interactive</span>
                <span className="text-[#D8B452] font-bold">● Active</span>
              </div>
              <pre className="whitespace-pre-wrap text-[11px] text-[#D8B452] leading-relaxed font-mono">
                {demoFeatures[activeFeature].previewSnippet}
              </pre>
              <div className="mt-4 pt-2 border-t border-white/10 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Simulated Real-Time Stream</span>
                <span>Execution Time: 0.84s</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Instant Workspace & Free Trial Creator */}
        {activeFeature === 'trial' && (
          <div className="space-y-6 animate-fade-in">
            {deploySuccess ? (
              <div className="p-8 rounded-3xl bg-amber-50 dark:bg-[#D8B452]/10 border border-[#D8B452]/40 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#D8B452] text-black flex items-center justify-center font-bold shadow-lg shadow-[#D8B452]/30">
                  <Check className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                  Workspace Initialized Successfully!
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Your repository <span className="font-mono font-bold text-[#a1741a] dark:text-[#D8B452]">{workspaceName || 'nova-sprint-demo'}</span> is connected on the <span className="uppercase font-bold">{activePlan}</span> tier.
                </p>
                <div className="max-w-md mx-auto p-3.5 bg-black/80 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-[#D8B452]">
                  <span>TOKEN: nova_live_9f82d1c7a8</span>
                  <button
                    onClick={() => handleCopyCode('nova_live_9f82d1c7a8')}
                    className="p-1.5 rounded hover:bg-white/10 text-white cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <Button variant="primary" size="sm" onClick={onClose}>
                    Enter Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLaunchTrial} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Workspace / Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="e.g. acme-engineering"
                      className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Primary Repository Provider
                    </label>
                    <select
                      value={selectedHost}
                      onChange={(e) => setSelectedHost(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    >
                      <option value="github">GitHub Organization</option>
                      <option value="gitlab">GitLab Cloud / Self-Hosted</option>
                      <option value="linear">Linear Sync</option>
                      <option value="bitbucket">Bitbucket Cloud</option>
                    </select>
                  </div>
                </div>

                {/* Plan Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Select Your Starting Plan (All Include 14-Day Full Trial)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['developer', 'pro', 'enterprise'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setActivePlan(p)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer capitalize font-bold text-xs ${
                          activePlan === p
                            ? 'bg-[#D8B452]/20 border-[#D8B452] text-[#a1741a] dark:text-[#D8B452] shadow-sm'
                            : 'bg-slate-50 dark:bg-[#050614] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {p}
                        <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                          {p === 'developer' ? 'Free tier' : p === 'pro' ? '$29 / user' : 'Custom'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D8B452]/30 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452] shrink-0" />
                  <span>No credit card required. Immediate automated OAuth hook for your engineering repos.</span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" type="submit" disabled={isDeploying}>
                    {isDeploying ? 'Configuring Pipeline...' : 'Create & Connect Workspace →'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 5: Architecture Consultation */}
        {activeFeature === 'contact' && (
          <div className="space-y-6 animate-fade-in">
            {contactSubmitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                  Consultation Request Dispatched
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Our Principal Solutions Architect will reach out within 2 business hours with a custom SOC2 compliance package and technical migration plan.
                </p>
                <div className="pt-2">
                  <Button variant="primary" size="sm" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Sarah Connor"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="sarah@enterprise.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Engineering Headcount
                  </label>
                  <select
                    value={contactForm.teamSize}
                    onChange={(e) => setContactForm({ ...contactForm, teamSize: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                  >
                    <option value="10-25">10 - 25 Engineers</option>
                    <option value="25-50">25 - 50 Engineers</option>
                    <option value="50-150">50 - 150 Engineers</option>
                    <option value="150+">150+ Engineers (Global Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Architecture Priorities / Security Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="We need on-prem deployment, custom data retention policies, and SOC2 Type II audit logs..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="primary" size="md" type="submit">
                    Send Consultation Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 6: API & Developer Docs */}
        {activeFeature === 'docs' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a1741a] dark:text-[#D8B452]">
                REST Endpoint: Automated Sprint Ingestion
              </span>
              <button
                onClick={() =>
                  handleCopyCode(
                    `curl -X POST https://api.nova.ai/v1/sprint/triage \\\n  -H "Authorization: Bearer nova_live_token" \\\n  -d '{"repo": "acme/backend", "sprint_id": 49}'`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-700 dark:text-slate-200 hover:bg-[#D8B452] hover:text-black transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>

            <div className="bg-[#050614] rounded-2xl p-5 border border-white/10 font-mono text-xs text-[#D8B452] overflow-x-auto">
              <pre className="whitespace-pre">
{`curl -X POST https://api.nova.ai/v1/sprint/triage \\
  -H "Authorization: Bearer $NOVA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "organization": "acme-engineering",
    "provider": "github",
    "sprint_number": 49,
    "auto_estimate": true,
    "detect_bottlenecks": true
  }'`}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                <p className="font-bold text-slate-900 dark:text-white">Webhook Sync</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Instant push updates on every PR merge.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                <p className="font-bold text-slate-900 dark:text-white">CLI Toolchain</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1"><code className="text-[#D8B452]">npm i -g @nova/cli</code></p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                <p className="font-bold text-slate-900 dark:text-white">SOC2 Vault</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">End-to-end AES-256 GCM token storage.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Global Status */}
        {activeFeature === 'status' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  All Systems Fully Operational
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                99.992% 30-Day Uptime
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'US-East Autonomous Cluster (N. Virginia)', status: 'Operational', latency: '14ms' },
                { name: 'EU-West Inference Engine (Frankfurt)', status: 'Operational', latency: '19ms' },
                { name: 'AP-South API Gateway (Mumbai)', status: 'Operational', latency: '22ms' },
                { name: 'GitHub Webhook Ingestion Pipeline', status: 'Operational', latency: '8ms' },
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">{c.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-400">{c.latency}</span>
                    <span className="font-bold text-emerald-500">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: Task Inspector (When clicking any ticket in Hero console) */}
        {activeFeature === 'task' && selectedTask && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#a1741a] dark:text-[#D8B452] text-sm">
                  {selectedTask.id || 'NOV-244'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D8B452]/20 text-[#a1741a] dark:text-[#D8B452] text-xs font-bold">
                  {selectedTask.status || 'In Progress'}
                </span>
              </div>
              <h5 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedTask.title || 'Automate PR semantic changelogs & visual diff reports'}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedTask.details ||
                  'Analyzed commits across 4 branches. Generated semantic changelog with zero regressions detected in unit test suite.'}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close Inspector
              </Button>
              <Button variant="primary" size="sm" onClick={() => setActiveFeature('trial')}>
                Open in Full Workspace →
              </Button>
            </div>
          </div>
        )}

        {/* TAB 9: Changelog & Release Notes */}
        {activeFeature === 'changelog' && (
          <div className="space-y-3 animate-fade-in">
            {[
              {
                ver: 'v2.4.0 — Multi-Agent PR Review Heuristics',
                date: 'Released 3 days ago',
                notes: 'Automated AST-level memory leak detection and parallel TanStack query analysis.',
              },
              {
                ver: 'v2.3.8 — Linear & GitHub Deep Sync',
                date: 'Released 2 weeks ago',
                notes: 'Two-way ticket state synchronization with sub-10ms webhook dispatch.',
              },
              {
                ver: 'v2.3.0 — Autonomous Fibonacci Story Pointing',
                date: 'Released 1 month ago',
                notes: 'Calibrated from historical commit velocity across 50,000+ public engineering tasks.',
              },
            ].map((log) => (
              <div
                key={log.ver}
                className="p-4 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{log.ver}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{log.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{log.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
