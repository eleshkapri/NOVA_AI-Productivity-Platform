import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Terminal,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Layers,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { soundService } from '../../services/SoundService';
import { securityService } from '../../services/SecurityService';
import { SystemStatusView } from './status/SystemStatusView';
import { ChangelogView } from './changelog/ChangelogView';

const CHAPTER_LOGS = [
  'Stage 01: Ingesting PRD specifications & architecture AST graph.',
  'Stage 02: Fibonacci velocity calibrated across engineering squads.',
  'Stage 03: PR analysis active — AST memory leak patch ready.',
  'Stage 04: Predictive release radar online — canary deployment gates ready.',
];

const playChime = (type = 'stepAdvance') => {
  soundService.playChime(type);
};

function DemoModalContent({ isOpen, onClose, onEnterDashboard, initialTab, selectedPlan, selectedTask, initialStage = 0 }) {
  const [activeFeature, setActiveFeature] = useState(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);

  // Walkthrough Interactive Simulator State
  const [walkthroughStage, setWalkthroughStage] = useState(initialStage);
  const [isWalkthroughPlaying, setIsWalkthroughPlaying] = useState(true);
  const [walkthroughProgress, setWalkthroughProgress] = useState(0);
  const [walkthroughSpeed, setWalkthroughSpeed] = useState(1);
  const [patchApplied, setPatchApplied] = useState(false);
  const [canaryPromoted, setCanaryPromoted] = useState(false);
  const [customSimulationLog, setCustomSimulationLog] = useState(null);

  // Trial Workspace Creator state
  const [workspaceName, setWorkspaceName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [teamSize, setTeamSize] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_user_team_size');
      return saved ? Number(saved) : 25;
    } catch {
      return 25;
    }
  });
  const [workspaceError, setWorkspaceError] = useState('');
  const workspaceInputRef = useRef(null);
  const [selectedHost, setSelectedHost] = useState('github');
  const [activePlan, setActivePlan] = useState(selectedPlan);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const deployTimersRef = useRef([]);

  const clearDeployTimers = () => {
    deployTimersRef.current.forEach((t) => clearTimeout(t));
    deployTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearDeployTimers();
  }, []);

  useEffect(() => {
    if (activeFeature === 'trial' && isOpen && !isDeploying && !deploySuccess) {
      const timer = setTimeout(() => {
        workspaceInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeFeature, isOpen, isDeploying, deploySuccess]);

  // Consultation state
  const [contactForm, setContactForm] = useState({ name: '', email: '', teamSize: '25-50', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const progressRef = useRef(0);

  // Automatic Progression of Walkthrough Simulation Progress & Stages (1 -> 2 -> 3 -> 4 -> 1)
  useEffect(() => {
    if (activeFeature !== 'walkthrough' || !isWalkthroughPlaying) return;

    const interval = setInterval(() => {
      progressRef.current += 1.5 * walkthroughSpeed;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setWalkthroughProgress(0);
        setWalkthroughStage((prevStage) => (prevStage + 1) % 4);
        setCustomSimulationLog(null);
        playChime();
      } else {
        setWalkthroughProgress(progressRef.current);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeFeature, isWalkthroughPlaying, walkthroughSpeed]);

  const activeSimulationLog = customSimulationLog || CHAPTER_LOGS[walkthroughStage];

  const handleSelectStage = (idx) => {
    progressRef.current = 0;
    setWalkthroughStage(idx);
    setWalkthroughProgress(0);
    setCustomSimulationLog(null);
    playChime();
  };

  const handleNextStage = () => {
    progressRef.current = 0;
    setWalkthroughStage((prev) => (prev + 1) % 4);
    setWalkthroughProgress(0);
    setCustomSimulationLog(null);
    playChime();
  };

  const handleRestart = () => {
    progressRef.current = 0;
    setWalkthroughStage(0);
    setWalkthroughProgress(0);
    setPatchApplied(false);
    setCanaryPromoted(false);
    setCustomSimulationLog(null);
    playChime();
  };

  const walkthroughChapters = [
    {
      id: 0,
      badge: 'Step 01 • Backlog Ingestion',
      title: 'Autonomous PRD & Architecture Ingestion',
      description: 'NOVA connects directly to Jira, Figma, and GitHub to parse unstructured specifications into actionable engineering requirements.',
      actionTitle: 'Trigger Live Re-Parse',
    },
    {
      id: 1,
      badge: 'Step 02 • Story Estimation',
      title: 'Fibonacci Velocity Calibration & Task Synthesis',
      description: 'AI model evaluates 50,000+ past historical team commits to assign story points (3, 5, 8) and assign balanced workloads.',
      actionTitle: 'Auto-Assign to Sprint 48',
    },
    {
      id: 2,
      badge: 'Step 03 • Code Review',
      title: 'Self-Healing Pull Request Review & AST Fixes',
      description: 'Detects architectural bottlenecks and memory leaks in real time, drafting unit-tested git commits directly into your PR.',
      actionTitle: 'Apply Fix Patch & Merge',
    },
    {
      id: 3,
      badge: 'Step 04 • Release Radar',
      title: 'Predictive Velocity & Zero-Downtime Rollout',
      description: 'Foresees sprint spillovers 4 days early, automatically generating canary deployment gates with zero regressions.',
      actionTitle: 'Promote Canary to 100%',
    },
  ];

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
    e?.preventDefault?.();
    if (isDeploying) return;

    const trimmedName = workspaceName ? workspaceName.trim() : '';
    if (!trimmedName) {
      setWorkspaceError('Workspace / Organization Name is required to initialize your sandbox.');
      workspaceInputRef.current?.focus();
      playChime('actionClick');
      return;
    }

    if (trimmedName.length < 2) {
      setWorkspaceError('Workspace / Organization Name must be at least 2 characters.');
      workspaceInputRef.current?.focus();
      playChime('actionClick');
      return;
    }

    setWorkspaceError('');
    playChime('actionClick');
    const cleanWorkspace = securityService.sanitizeString(trimmedName, 50) || trimmedName;
    setWorkspaceName(cleanWorkspace);
    setIsDeploying(true);
    setDeployStep(1);

    clearDeployTimers();

    const t1 = setTimeout(() => {
      setDeployStep(2);
      playChime('stepAdvance');
    }, 550);

    const t2 = setTimeout(() => {
      setDeployStep(3);
      playChime('stepAdvance');
    }, 1100);

    const t3 = setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
      playChime('goldChord');
    }, 1700);

    deployTimersRef.current = [t1, t2, t3];
  };

  const handleContactSubmit = (e) => {
    e?.preventDefault?.();
    playChime('actionClick');
    const cleanContact = securityService.sanitizePayload(contactForm);
    setContactForm(cleanContact);
    setContactSubmitted(true);
  };

  const handleInteractiveTrigger = (command, logMessage) => {
    playChime('actionClick');
    setActiveSimulationLog(logMessage);
    if (command === 'patch') setPatchApplied(true);
    if (command === 'canary') setCanaryPromoted(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NOVA Command Center" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
          <div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              {activeFeature === 'walkthrough' ? (
                <>
                  <Sparkles className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452]" />
                  Interactive Demo Studio
                </>
              ) : activeFeature === 'trial' ? (
                'Launch Your Autonomous Workspace'
              ) : activeFeature === 'contact' ? (
                'Connect with Architecture Specialists'
              ) : activeFeature === 'docs' ? (
                'Developer Documentation & API'
              ) : activeFeature === 'status' ? (
                'Global System Infrastructure Health'
              ) : activeFeature === 'changelog' ? (
                'Product Release Changelog'
              ) : activeFeature === 'task' ? (
                'Task Intelligence Inspector'
              ) : (
                'Interactive Product Demonstration'
              )}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {activeFeature === 'walkthrough'
                ? 'Experience real-time autonomous backlog ingestion, automated PR code review, and predictive sprint analytics.'
                : activeFeature === 'trial'
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
            Simulator Active &bull; v2.4.0
          </div>
        </div>

        {/* Feature Selector Tabs with Mobile Horizontal Swipe */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
          <button
            onClick={() => {
              setActiveFeature('walkthrough');
              playChime();
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'walkthrough'
                ? 'bg-gradient-to-r from-[#D8B452] to-[#B88A23] text-black shadow-md shadow-[#D8B452]/25 font-black'
                : 'bg-amber-500/15 border border-[#D8B452]/40 text-[#a1741a] dark:text-[#D8B452] hover:bg-[#D8B452]/25'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Interactive Studio
          </button>
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
            onClick={() => {
              setActiveFeature('status');
              playChime();
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'status'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Status
          </button>
          <button
            onClick={() => {
              setActiveFeature('changelog');
              playChime();
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              activeFeature === 'changelog'
                ? 'bg-[#D8B452] text-black shadow-md'
                : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Changelog
          </button>
        </div>

        {/* ========================================================
            FEATURE TAB 0: LIVE INTERACTIVE WALKTHROUGH STUDIO
            ======================================================== */}
        {activeFeature === 'walkthrough' && (
          <div className="space-y-6 animate-fade-in">
            {/* Walkthrough Player Controller Bar */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#07081e] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left: Playback controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWalkthroughPlaying(!isWalkthroughPlaying)}
                  title={isWalkthroughPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                  className="w-10 h-10 rounded-full bg-[#D8B452] hover:bg-[#E5C773] text-black flex items-center justify-center font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isWalkthroughPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={handleRestart}
                  title="Restart Walkthrough"
                  className="p-2.5 rounded-full bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#D8B452] cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setWalkthroughSpeed(walkthroughSpeed === 1 ? 2 : 1)}
                  title="Playback Speed"
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-[#a1741a] dark:text-[#D8B452] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {walkthroughSpeed}x Speed
                </button>
              </div>

              {/* Center: Stage Chapter Badges */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                {walkthroughChapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectStage(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      walkthroughStage === idx
                        ? 'bg-[#D8B452] text-black shadow-sm scale-102 font-black'
                        : 'bg-white/80 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-white/5'
                    }`}
                  >
                    0{idx + 1}. {ch.badge.split('• ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrubber Progress Bar for current stage */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#a1741a] dark:text-[#D8B452] uppercase">
                  {walkthroughChapters[walkthroughStage].badge}
                </span>
                <span>Auto-Advancing: {Math.round(walkthroughProgress)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#a1741a] via-[#D8B452] to-[#B38722] rounded-full transition-all duration-100 ease-linear shadow-[0_0_8px_#D8B452]"
                  style={{ width: `${walkthroughProgress}%` }}
                />
              </div>
            </div>

            {/* Chapter Display Screen (Mac-style terminal / console) */}
            <div className="bg-[#050614] rounded-3xl p-6 md:p-8 border border-[#D8B452]/30 shadow-2xl text-white relative overflow-hidden group">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D8B452]/10 blur-3xl pointer-events-none" />

              {/* Stage Header */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D8B452] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Stage 0{walkthroughStage + 1} of 04
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mt-1 text-white tracking-tight">
                    {walkthroughChapters[walkthroughStage].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl font-light leading-relaxed">
                    {walkthroughChapters[walkthroughStage].description}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={Sparkles}
                  onClick={() => handleInteractiveTrigger('action', `User triggered action on Stage ${walkthroughStage + 1}`)}
                  className="shrink-0"
                >
                  {walkthroughChapters[walkthroughStage].actionTitle}
                </Button>
              </div>

              {/* Interactive Visual Stage Payload */}
              <div className="relative z-10 pt-6">
                {walkthroughStage === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#0b0c33]/90 border border-white/10 space-y-3 font-mono text-xs">
                      <div className="text-[#D8B452] flex items-center justify-between font-bold">
                        <span>&gt; Ingesting Jira / PRD Payload...</span>
                        <span className="text-emerald-400">● 100% Parsed</span>
                      </div>
                      <div className="space-y-1.5 text-slate-300 text-[11px]">
                        <p className="text-white font-semibold">PRD-409: "Multi-Region Auth Token Rotation"</p>
                        <p className="text-slate-400">&bull; Target SLA: Sub-200ms failover switch</p>
                        <p className="text-slate-400">&bull; Touched Repos: auth-core, gateway, web-client</p>
                        <p className="text-[#D8B452]">&bull; Dependencies: Zero cyclic locks detected</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0b0c33]/90 border border-white/10 space-y-2 text-xs">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated Task Graph</span>
                      <div className="space-y-2 pt-1">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <span className="text-slate-200">NOV-249: OAuth token failover hook</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#D8B452] font-bold text-[10px]">3 pts</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <span className="text-slate-200">NOV-250: Redis cluster multi-write mirror</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#D8B452] font-bold text-[10px]">5 pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {walkthroughStage === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D8B452] font-bold">Frontend Squad</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">8 pts</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">Auth refresh hook + fallback toast matrix</p>
                      <p className="text-[10px] text-slate-500 font-mono">Assigned: @alex &bull; 99% velocity match</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D8B452] font-bold">Backend Squad</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">13 pts</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">Session revocation endpoint & JWT replication</p>
                      <p className="text-[10px] text-slate-500 font-mono">Assigned: @sarah &bull; 97% velocity match</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D8B452] font-bold">QA & E2E</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">5 pts</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">Simulated multi-region latency chaos testing</p>
                      <p className="text-[10px] text-slate-500 font-mono">Assigned: @david &bull; 100% velocity match</p>
                    </div>
                  </div>
                )}

                {walkthroughStage === 2 && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#0b0c33]/90 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="text-[#D8B452] font-bold">PR #192: src/auth/TokenManager.ts</span>
                        <span className={patchApplied ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {patchApplied ? '✓ Memory Leak Fixed & Merged' : '⚠️ 1 Memory Leak Detected'}
                        </span>
                      </div>

                      <div className="p-3 bg-black/60 rounded-xl space-y-1 font-mono text-[11px]">
                        <div className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                          - window.addEventListener('sessionExpired', onExpire); // Memory leak: never unsubscribed
                        </div>
                        <div className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          + useEffect(() =&gt; &#123; window.addEventListener('sessionExpired', onExpire); return () =&gt; window.removeEventListener('sessionExpired', onExpire); &#125;, []);
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-slate-400">Automated AST reasoning: Unit tests passing (24/24)</span>
                        <button
                          onClick={() => handleInteractiveTrigger('patch', 'Auto-patch staged and verified by NOVA bot.')}
                          className="px-3 py-1 rounded-lg bg-[#D8B452] hover:bg-[#F3D887] text-black font-bold text-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
                        >
                          {patchApplied ? '✓ Fix Staged in Git' : '⚡ Auto-Apply Fix Patch'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {walkthroughStage === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-1 text-center">
                      <span className="text-2xl font-black text-gold-gradient font-sans">4.2x</span>
                      <p className="text-slate-300 font-bold font-sans text-xs">Sprint Velocity Boost</p>
                      <p className="text-[10px] text-slate-500">vs historical baseline</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-1 text-center">
                      <span className="text-2xl font-black text-emerald-400 font-sans">0.00%</span>
                      <p className="text-slate-300 font-bold font-sans text-xs">Regression Rate</p>
                      <p className="text-[10px] text-slate-500">99.98% PR test precision</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0b0c33]/80 border border-white/10 space-y-1 text-center">
                      <span className="text-2xl font-black text-[#D8B452] font-sans">2.5 Days</span>
                      <p className="text-slate-300 font-bold font-sans text-xs">Ahead of Deadline</p>
                      <button
                        onClick={() => handleInteractiveTrigger('canary', 'Canary rollout promoted to 100% traffic.')}
                        className="mt-1 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] cursor-pointer hover:scale-105 transition-all"
                      >
                        {canaryPromoted ? '✓ 100% Traffic Live' : '🚀 Promote Canary'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Terminal Activity Stream */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#D8B452]" />
                  <span>Log: <strong className="text-white">{activeSimulationLog}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextStage}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-xs flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
                  >
                    Next Stage <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveFeature('trial')}
                    className="px-3 py-1 rounded-lg bg-[#D8B452] text-black font-sans font-bold text-xs flex items-center gap-1 cursor-pointer hover:bg-[#F3D887] transition-all hover:scale-105"
                  >
                    Start 14-Day Trial <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    type="button"
                    onClick={() => handleCopyCode('nova_live_9f82d1c7a8')}
                    className="p-1.5 rounded hover:bg-white/10 text-white cursor-pointer"
                    title="Copy Token"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    icon={Rocket}
                    iconPosition="right"
                    onClick={() => {
                      playChime('actionClick');
                      const finalName = workspaceName && workspaceName.trim() ? workspaceName.trim() : 'nova-demo-workspace';
                      const finalSlug = finalName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                      const finalRepo = repoName && repoName.trim() ? repoName.trim() : `${finalSlug}-core`;
                      const tokenHash = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 6);
                      const generatedToken = `nova_live_${finalSlug.replace(/-/g, '_')}_${tokenHash}`;

                      onEnterDashboard?.({
                        name: finalName,
                        slug: finalSlug,
                        plan: activePlan || 'pro',
                        host: selectedHost || 'github',
                        repo: finalRepo,
                        teamSize: Number(teamSize) || 25,
                        token: generatedToken,
                        createdAt: new Date().toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                        isProvisioned: true,
                      });
                      onClose();
                    }}
                  >
                    Enter Workspace Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      playChime('actionClick');
                      setDeploySuccess(false);
                      setIsDeploying(false);
                      setDeployStep(0);
                    }}
                  >
                    Configure Another
                  </Button>
                </div>
              </div>
            ) : isDeploying ? (
              /* Dedicated Production-Grade Cybernetic Provisioning Center */
              <div className="p-8 rounded-3xl bg-slate-950 dark:bg-[#050614] border border-[#D8B452]/40 text-center space-y-6 animate-fade-in shadow-2xl relative overflow-hidden">
                {/* Subtle animated ambient aura */}
                <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
                <div className="absolute -top-16 -left-16 w-44 h-44 bg-[#D8B452]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Centered Holographic Orbital Scanner with Dynamic Percentage */}
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#D8B452]/40 animate-spin-slow" />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#D8B452] border-r-[#8E6FFF] border-b-cyan-400 animate-spin-smooth" />
                  <div className="w-16 h-16 rounded-full bg-black/80 border border-[#D8B452]/60 flex flex-col items-center justify-center shadow-lg shadow-[#D8B452]/20 relative z-10">
                    <span className="text-base font-black font-mono text-[#D8B452]">
                      {deployStep === 1 ? '33%' : deployStep === 2 ? '68%' : '100%'}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400">SYNC</span>
                  </div>
                </div>

                {/* Provisioning Headline & Target Spec */}
                <div className="space-y-1 relative z-10">
                  <h5 className="text-lg font-black tracking-tight text-white flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D8B452]" />
                    Cloud Provisioning Sequence Active
                  </h5>
                  <p className="text-xs text-slate-400 font-mono">
                    Target: <span className="text-[#D8B452] font-bold">{workspaceName || 'nova-demo-workspace'}</span> &bull; <span className="uppercase">{activePlan}</span> tier on AWS us-east-1
                  </p>
                </div>

                {/* 3 Step Milestone Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left relative z-10 max-w-xl mx-auto font-mono text-xs">
                  <div className={`p-3 rounded-xl border transition-all ${deployStep >= 1 ? 'bg-[#D8B452]/10 border-[#D8B452]/40 text-[#D8B452]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px]">
                      {deployStep > 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D8B452]" />}
                      <span>Phase 01</span>
                    </div>
                    <p className="text-[10px] text-slate-300">AWS us-east-1 Sandbox Container</p>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${deployStep >= 2 ? 'bg-[#D8B452]/10 border-[#D8B452]/40 text-[#D8B452]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px]">
                      {deployStep > 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : deployStep === 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D8B452]" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block" />}
                      <span>Phase 02</span>
                    </div>
                    <p className="text-[10px] text-slate-300">Zero-Trust TLS Webhook Linkage</p>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${deployStep >= 3 ? 'bg-[#D8B452]/10 border-[#D8B452]/40 text-[#D8B452]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px]">
                      {deployStep >= 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block" />}
                      <span>Phase 03</span>
                    </div>
                    <p className="text-[10px] text-slate-300">Autonomous Agents & Developer Key</p>
                  </div>
                </div>

                {/* Real-Time Cybernetic Log Terminal */}
                <div className="max-w-xl mx-auto p-3 rounded-xl bg-black/80 border border-white/10 text-left font-mono text-[11px] text-slate-300 space-y-1 relative z-10 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-white/10">
                    <span>sys.provision.log</span>
                    <span className="text-[#D8B452]">● STREAMING</span>
                  </div>
                  <p className="text-emerald-400">&gt; [0.12s] Cluster node allocated: us-east-1a-sandbox</p>
                  {deployStep >= 2 && <p className="text-cyan-400">&gt; [0.65s] Bound repository webhook to {selectedHost}.com</p>}
                  {deployStep >= 3 && <p className="text-[#D8B452]">&gt; [1.25s] Cryptographic token generated. Finalizing workspace...</p>}
                </div>
              </div>
            ) : (
              <form onSubmit={handleLaunchTrial} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="workspace-name-input"
                        className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                      >
                        <span>Workspace / Organization Name</span>
                        <span className="text-rose-500 font-bold" title="Required">*</span>
                        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          Required
                        </span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {workspaceName.length}/50
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        id="workspace-name-input"
                        ref={workspaceInputRef}
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={!!workspaceError}
                        maxLength={50}
                        value={workspaceName}
                        onChange={(e) => {
                          setWorkspaceName(e.target.value);
                          if (workspaceError) setWorkspaceError('');
                        }}
                        placeholder="e.g. acme-engineering"
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                          workspaceError
                            ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20'
                            : 'border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-[#D8B452]'
                        }`}
                      />
                    </div>

                    {workspaceError ? (
                      <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium mt-1.5 animate-fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{workspaceError}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                        <span className="truncate font-mono">
                          URI: nova.cloud/{workspaceName.trim() ? workspaceName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') : 'org-slug'}
                        </span>
                      </div>
                    )}

                    {/* Quick suggestion presets */}
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Presets:
                      </span>
                      {['acme-corp', 'hyperion-dev', 'quantum-labs'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            playChime('actionClick');
                            setWorkspaceName(preset);
                            setWorkspaceError('');
                            workspaceInputRef.current?.focus();
                          }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#D8B452]/50 hover:text-[#D8B452] transition-colors cursor-pointer"
                        >
                          +{preset}
                        </button>
                      ))}
                    </div>
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
                      <option value="bitbucket">Bitbucket Cloud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Primary Repository Name
                    </label>
                    <input
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder={workspaceName.trim() ? `${workspaceName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')}-core` : 'e.g. core-platform'}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Engineering Team Size
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    >
                      <option value={15}>10 - 20 Developers (Small Squad)</option>
                      <option value={25}>20 - 50 Developers (Growing Squad)</option>
                      <option value={60}>50 - 100 Developers (Scale-Up)</option>
                      <option value={150}>100+ Developers (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Select Target Plan Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['starter', 'pro', 'enterprise'].map((p) => (
                      <div
                        key={p}
                        onClick={() => {
                          playChime('actionClick');
                          setActivePlan(p);
                        }}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          activePlan === p
                            ? 'border-[#D8B452] bg-[#D8B452]/10 font-bold text-slate-900 dark:text-white scale-102 shadow-xs'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <span className="capitalize text-xs tracking-wider">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#07081e] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452]" />
                    <span>No credit card required. 14 days unrestricted access.</span>
                  </div>
                  <span className="font-bold text-[#a1741a] dark:text-[#D8B452]">SOC2 Compliant</span>
                </div>

                <Button
                  type="submit"
                  onClick={handleLaunchTrial}
                  variant="primary"
                  size="lg"
                  icon={Rocket}
                  iconPosition="right"
                  className="w-full justify-center"
                >
                  Launch Instant Trial Workspace
                </Button>
              </form>
            )}
          </div>
        )}

        {/* TAB 5: Documentation & API Reference */}
        {activeFeature === 'docs' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a1741a] dark:text-[#D8B452]">
                  REST API Endpoint
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Trigger autonomous backlog synthesis programmatically via webhooks.
                </p>
                <div className="p-2.5 bg-black/80 rounded-xl font-mono text-[11px] text-[#D8B452] flex items-center justify-between">
                  <span>POST /v2/backlog/synthesize</span>
                  <button
                    onClick={() => handleCopyCode('curl -X POST https://api.nova.ai/v2/backlog/synthesize -H "Authorization: Bearer $NOVA_KEY"')}
                    className="hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a1741a] dark:text-[#D8B452]">
                  Developer CLI
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Run diff analysis and velocity checks directly in your local terminal.
                </p>
                <div className="p-2.5 bg-black/80 rounded-xl font-mono text-[11px] text-[#D8B452] flex items-center justify-between">
                  <span>npx nova-cli review --strict</span>
                  <button
                    onClick={() => handleCopyCode('npx nova-cli review --strict')}
                    className="hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#0b0c33] border border-[#D8B452]/30 flex items-center justify-between">
              <div>
                <h6 className="text-sm font-bold text-slate-900 dark:text-white">
                  Need Custom Webhook Integration?
                </h6>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Full OpenAPI 3.1 specifications and Postman collections are available.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setActiveFeature('contact')}>
                Contact Engineering
              </Button>
            </div>
          </div>
        )}

        {/* TAB 6: Consultation / Enterprise Contact Form */}
        {activeFeature === 'contact' && (
          <div className="space-y-4 animate-fade-in">
            {contactSubmitted ? (
              <div className="p-8 rounded-3xl bg-amber-50 dark:bg-[#D8B452]/10 border border-[#D8B452]/40 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#D8B452] text-black flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                  Consultation Request Received!
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  A Principal Solutions Architect will reach out within 2 business hours to configure your customized enterprise trial.
                </p>
                <Button variant="outline" size="sm" onClick={() => setContactSubmitted(false)}>
                  Send Another Inquiry
                </Button>
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
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
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
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Engineering Team Size
                  </label>
                  <select
                    value={contactForm.teamSize}
                    onChange={(e) => setContactForm({ ...contactForm, teamSize: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                  >
                    <option value="10-25">10 - 25 Developers</option>
                    <option value="25-50">25 - 50 Developers</option>
                    <option value="50-200">50 - 200 Developers</option>
                    <option value="200+">200+ Developers (Enterprise Custom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Specific Architecture / Compliance Needs
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your CI/CD stack (GitHub Actions, GitLab, Jenkins) and compliance requirements..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D8B452]"
                  />
                </div>

                <Button
                  type="submit"
                  onClick={handleContactSubmit}
                  variant="primary"
                  size="md"
                  icon={Send}
                  iconPosition="right"
                  className="w-full justify-center"
                >
                  Request Executive Architecture Briefing
                </Button>
              </form>
            )}
          </div>
        )}

        {/* TAB 7: Status & Live Cluster Health */}
        {activeFeature === 'status' && (
          <div className="animate-fade-in">
            <SystemStatusView onClose={onClose} />
          </div>
        )}

        {/* TAB 8: Task Intelligence Inspector */}
        {activeFeature === 'task' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-[#D8B452]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#D8B452]/20 text-[#a1741a] dark:text-[#D8B452] font-mono font-bold text-xs">
                  {selectedTask?.id || 'NOV-249'}
                </span>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Triaged by AI
                </span>
              </div>

              <h5 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedTask?.title || 'Refactor OAuth token rotation for multi-region failover'}
              </h5>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Story Points</span>
                  <span className="font-bold text-slate-900 dark:text-white">5 Points</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Assignee</span>
                  <span className="font-bold text-slate-900 dark:text-white">@alex (Frontend)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Sprint Target</span>
                  <span className="font-bold text-[#a1741a] dark:text-[#D8B452]">Sprint 48</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#0b0c33] border border-[#D8B452]/30 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white mb-1">
                AI Heuristic Summary:
              </p>
              <p>
                {selectedTask?.summary ||
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
          <div className="animate-fade-in">
            <ChangelogView onClose={onClose} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export function DemoModal({ isOpen, onClose, onEnterDashboard, initialTab = 'walkthrough', selectedPlan = 'pro', selectedTask = null, initialStage = 0 }) {
  if (!isOpen) return null;

  return (
    <DemoModalContent
      key={`${initialTab}-${initialStage}-${selectedPlan}`}
      isOpen={isOpen}
      onClose={onClose}
      onEnterDashboard={onEnterDashboard}
      initialTab={initialTab}
      selectedPlan={selectedPlan}
      selectedTask={selectedTask}
      initialStage={initialStage}
    />
  );
}

export default DemoModal;
