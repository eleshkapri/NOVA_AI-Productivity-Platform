import React, { useState } from 'react';
import {
  ArrowLeft,
  Activity,
  GitPullRequest,
  Bot,
  ShieldCheck,
  Zap,
  Terminal,
  Radio,
  CheckCircle2,
  Play,
  Pause,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  GitBranch,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { soundService } from '../../services/SoundService';

export function WorkspaceDashboard({
  workspace,
  onExit,
  isDark,
  toggleTheme,
  onOpenCommandPalette,
}) {
  const currentWorkspace = workspace || {
    name: 'nova-sprint-demo',
    plan: 'pro',
    host: 'github',
    token: 'nova_live_9f82d1c7a8',
    createdAt: 'Active Session',
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [isTokenCopied, setIsTokenCopied] = useState(false);
  const [tokenValue, setTokenValue] = useState(currentWorkspace.token || 'nova_live_9f82d1c7a8');
  const [isScanningPR, setIsScanningPR] = useState(false);
  const [isMergingPR, setIsMergingPR] = useState(false);
  const [mergedPRs, setMergedPRs] = useState(new Set());
  const [activePRId, setActivePRId] = useState('PR-384');
  const [isSweepRunning, setIsSweepRunning] = useState(false);
  const [projectionMode, setProjectionMode] = useState('optimal'); // 'optimal' | 'conservative'

  const [agentStates, setAgentStates] = useState({
    prd: true,
    velocity: true,
    sentinel: true,
    canary: true,
  });

  const [activityFeed, setActivityFeed] = useState([
    {
      id: 1,
      time: 'Just now',
      tag: 'PRD-SYNTH',
      text: 'Parsed Jira Epic #ENG-4890 into 6 balanced sprint stories.',
      status: 'success',
    },
    {
      id: 2,
      time: '1m ago',
      tag: 'AST-GUARD',
      text: 'Detected memory leak in WebSockets connection pool. Generated automated patch PR-384.',
      status: 'warning',
    },
    {
      id: 3,
      time: '4m ago',
      tag: 'VELOCITY-AI',
      text: 'Calibrated sprint velocity to 42 pts. Team pacing on track for Friday release.',
      status: 'info',
    },
    {
      id: 4,
      time: '12m ago',
      tag: 'CANARY-GATE',
      text: 'Canary deployment v2.4.1 verified across 5,000 live sessions with zero 5xx anomalies.',
      status: 'success',
    },
  ]);

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(tokenValue);
    soundService.playChime('actionClick');
    setIsTokenCopied(true);
    setTimeout(() => setIsTokenCopied(false), 2000);
  };

  const handleRegenerateToken = () => {
    soundService.playChime('stepAdvance');
    const newToken = 'nova_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
    setTokenValue(newToken);
  };

  const handleToggleAgent = (agentKey) => {
    soundService.playChime('actionClick');
    setAgentStates((prev) => {
      const next = !prev[agentKey];
      const name =
        agentKey === 'prd'
          ? 'PRD Ingestion Agent'
          : agentKey === 'velocity'
          ? 'Velocity Predictor'
          : agentKey === 'sentinel'
          ? 'AST Code Sentinel'
          : 'Canary Deployer';

      setActivityFeed((feed) => [
        {
          id: Date.now(),
          time: 'Just now',
          tag: 'AGENT-STATE',
          text: `${name} ${next ? 'enabled and listening for git events' : 'paused by operator'}.`,
          status: next ? 'success' : 'warning',
        },
        ...feed.slice(0, 7),
      ]);
      return { ...prev, [agentKey]: next };
    });
  };

  const handleRunHeuristicSweep = () => {
    if (isSweepRunning) return;
    soundService.playChime('actionClick');
    setIsSweepRunning(true);

    setTimeout(() => {
      soundService.playChime('stepAdvance');
    }, 800);

    setTimeout(() => {
      setIsSweepRunning(false);
      soundService.playChime('goldChord');
      setActivityFeed((feed) => [
        {
          id: Date.now(),
          time: 'Just now',
          tag: 'SWEEP-COMPLETE',
          text: `Autonomous squad completed AST inspection across 18 microservices. Zero CVE regressions.`,
          status: 'success',
        },
        ...feed.slice(0, 7),
      ]);
    }, 1600);
  };

  const handleTriggerPRScan = () => {
    if (isScanningPR) return;
    soundService.playChime('actionClick');
    setIsScanningPR(true);

    setTimeout(() => {
      setIsScanningPR(false);
      soundService.playChime('goldChord');
    }, 1400);
  };

  const handleMergePR = (prId) => {
    if (isMergingPR || mergedPRs.has(prId)) return;
    soundService.playChime('actionClick');
    setIsMergingPR(true);

    setTimeout(() => {
      setIsMergingPR(false);
      setMergedPRs((prev) => new Set([...prev, prId]));
      soundService.playChime('goldChord');
      setActivityFeed((feed) => [
        {
          id: Date.now(),
          time: 'Just now',
          tag: 'PR-MERGED',
          text: `Merged ${prId} into main. Triggered automated canary staging in us-east-1.`,
          status: 'success',
        },
        ...feed.slice(0, 7),
      ]);
    }, 1500);
  };

  const prList = [
    {
      id: 'PR-384',
      title: 'Fix(ws): Resolve connection leak in socket heartbeat listener',
      author: 'agent-nova-sentinel',
      branch: 'fix/ws-leak-patch',
      risk: 'Low Risk',
      riskColor: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
      diffStats: '+18 / -4',
    },
    {
      id: 'PR-381',
      title: 'Feat(auth): Enforce Ed25519 webhook signatures for external payloads',
      author: 'agent-nova-sentinel',
      branch: 'feat/ed25519-webhooks',
      risk: 'Medium Risk',
      riskColor: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
      diffStats: '+142 / -28',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050614] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[#D8B452]/20 selection:text-[#D8B452]">
      {/* Top Cybernetic Navigation & Workspace Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#07081e]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
        {/* Left: Exit to Website + Brand Identifier */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              soundService.playChime('actionClick');
              onExit();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Return to NOVA Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Website</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] dark:from-[#D8B452] dark:to-[#B88A23] flex items-center justify-center text-black font-black text-xs shadow-md shadow-amber-500/20">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  {currentWorkspace.name}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#D8B452]/15 border border-[#D8B452]/40 text-[10px] font-black uppercase tracking-wider text-[#a1741a] dark:text-[#D8B452]">
                  {currentWorkspace.plan}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Connected to {currentWorkspace.host === 'github' ? 'GitHub' : currentWorkspace.host === 'gitlab' ? 'GitLab' : 'Bitbucket'} &bull; Isolated Sandbox
              </p>
            </div>
          </div>
        </div>

        {/* Center: Cluster Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>us-east-1 Cluster: 100% Nominal (12ms)</span>
        </div>

        {/* Right: Actions (Hotkeys, Theme, Command Palette) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:border-[#D8B452]/40 transition-all cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 rounded bg-white dark:bg-black/40 text-[10px] text-slate-500">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={() => {
              soundService.playChime('actionClick');
              toggleTheme();
            }}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Velocity Radar', icon: Activity },
            { id: 'prs', label: 'Pull Requests & Reviews', icon: GitPullRequest, badge: '2 Open' },
            { id: 'agents', label: 'Autonomous Agents', icon: Bot, badge: '4 Online' },
            { id: 'webhooks', label: 'Webhooks & API Keys', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundService.playChime('actionClick');
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#D8B452] text-black shadow-md shadow-[#D8B452]/25 scale-102 font-black'
                    : 'bg-slate-100 dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#12144b]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-black/20 text-black' : 'bg-[#D8B452]/20 text-[#a1741a] dark:text-[#D8B452]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & VELOCITY RADAR */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top KPI Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-[#D8B452]/20 shadow-sm hover:shadow-md transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Sprint 48 Velocity
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                    42 <span className="text-xs font-normal text-slate-400">/ 68 pts</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +18%
                  </span>
                </div>
                <div className="mt-3 w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#D8B452] to-amber-500 h-full rounded-full w-[62%]" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-[#D8B452]/20 shadow-sm hover:shadow-md transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Lead Time to Change
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                    18.4 <span className="text-xs font-normal text-slate-400">min</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-500">Elite DORA</span>
                </div>
                <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Automated AST reviews & instant CI</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-[#D8B452]/20 shadow-sm hover:shadow-md transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mean Time to Recover
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                    7.8 <span className="text-xs font-normal text-slate-400">min</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-500">Instant Rollback</span>
                </div>
                <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Automated canary circuit breaker</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-[#D8B452]/20 shadow-sm hover:shadow-md transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Autonomous Patches
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                    14 <span className="text-xs font-normal text-slate-400">this week</span>
                  </h4>
                  <span className="text-xs font-bold text-indigo-500">100% Passing</span>
                </div>
                <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Zero human intervention required</p>
              </div>
            </div>

            {/* Velocity Burndown Simulator & Live Heuristic Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Burndown Chart Card (2 cols) */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452]" />
                      Predictive Sprint 48 Burndown Trajectory
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Machine-learning model evaluates historical squad velocity against active WIP.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/40 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playChime('actionClick');
                        setProjectionMode('optimal');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        projectionMode === 'optimal'
                          ? 'bg-[#D8B452] text-black shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Optimal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playChime('actionClick');
                        setProjectionMode('conservative');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        projectionMode === 'conservative'
                          ? 'bg-[#D8B452] text-black shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Conservative
                    </button>
                  </div>
                </div>

                {/* SVG Visual Burndown Chart */}
                <div className="relative pt-2 pb-1">
                  <div className="h-44 w-full relative flex items-end">
                    {/* SVG Curve */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="burnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#D8B452" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#D8B452" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Ideal Guideline */}
                      <line x1="10" y1="10" x2="490" y2="140" stroke="currentColor" strokeDasharray="4 4" className="text-slate-300 dark:text-white/20" strokeWidth="2" />
                      {/* Actual Burndown Path */}
                      <path
                        d={
                          projectionMode === 'optimal'
                            ? 'M 10 10 L 100 35 L 200 60 L 300 85 L 400 120 L 490 145'
                            : 'M 10 10 L 100 40 L 200 70 L 300 105 L 400 130 L 490 140'
                        }
                        fill="none"
                        stroke="#D8B452"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Area under curve */}
                      <path
                        d={
                          projectionMode === 'optimal'
                            ? 'M 10 10 L 100 35 L 200 60 L 300 85 L 400 120 L 490 145 L 490 150 L 10 150 Z'
                            : 'M 10 10 L 100 40 L 200 70 L 300 105 L 400 130 L 490 140 L 490 150 L 10 150 Z'
                        }
                        fill="url(#burnGrad)"
                      />
                      {/* Current Day Milestone marker */}
                      <circle cx="300" cy="85" r="5" fill="#D8B452" stroke="#000" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
                    <span>Day 1 (Plan: 68pts)</span>
                    <span>Day 5 (Mid-Sprint Checkpoint)</span>
                    <span className="text-[#a1741a] dark:text-[#D8B452] font-bold">Day 10 (Projected: 0pts)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-[#D8B452]/10 border border-[#D8B452]/30 text-xs flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">AI Heuristic Insight:</strong> 12 story points projected for delivery 18 hours ahead of schedule.
                  </span>
                  <button
                    type="button"
                    onClick={handleRunHeuristicSweep}
                    disabled={isSweepRunning}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#D8B452] text-black font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSweepRunning ? 'animate-spin' : ''}`} />
                    <span>{isSweepRunning ? 'Evaluating...' : 'Re-Calibrate'}</span>
                  </button>
                </div>
              </div>

              {/* Real-time Activity Stream (1 col) */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                      Live Heuristics Feed
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">STREAM ONLINE</span>
                  </div>

                  <div className="space-y-3 mt-3 max-h-[340px] overflow-y-auto pr-1">
                    {activityFeed.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-100 dark:border-white/5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-[10px] font-black px-1.5 py-0.2 rounded ${
                              item.status === 'success'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : item.status === 'warning'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                            }`}
                          >
                            [{item.tag}]
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleRunHeuristicSweep}
                    disabled={isSweepRunning}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#a1741a] dark:text-[#D8B452]" />
                    <span>Run Full Heuristic Inspection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PULL REQUESTS & CODE REVIEWS */}
        {activeTab === 'prs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GitPullRequest className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452]" />
                    Autonomous PR Code Review Engine
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Review and promote AI-generated code patches with automated verification gates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerPRScan}
                  disabled={isScanningPR}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] dark:from-[#D8B452] dark:to-[#B88A23] text-black font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanningPR ? 'animate-spin' : ''}`} />
                  <span>{isScanningPR ? 'Scanning Repository...' : 'Trigger Deep Heuristic AST Scan'}</span>
                </button>
              </div>

              {/* PR Queue Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PR Selection Column */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Active Pull Request Queue
                  </span>
                  {prList.map((pr) => {
                    const isSelected = activePRId === pr.id;
                    const isMerged = mergedPRs.has(pr.id);
                    return (
                      <div
                        key={pr.id}
                        onClick={() => {
                          soundService.playChime('actionClick');
                          setActivePRId(pr.id);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50 dark:bg-[#D8B452]/10 border-[#D8B452] shadow-sm scale-101'
                            : 'bg-slate-50 dark:bg-[#050614] border-slate-200 dark:border-white/10 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-bold text-xs text-[#a1741a] dark:text-[#D8B452]">
                            {pr.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pr.riskColor}`}>
                            {isMerged ? 'MERGED' : pr.risk}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                          {pr.title}
                        </h5>
                        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>{pr.diffStats}</span>
                          <span>{pr.author}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PR Inspector Panel (2 cols) */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-4">
                  {prList.filter((p) => p.id === activePRId).map((pr) => {
                    const isMerged = mergedPRs.has(pr.id);
                    return (
                      <div key={pr.id} className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-[#D8B452]">{pr.id}</span>
                              <span className="text-xs font-mono text-slate-400">({pr.branch})</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                              {pr.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleMergePR(pr.id)}
                              disabled={isMerged || isMergingPR}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                isMerged
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                                  : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md hover:scale-105 active:scale-95'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isMerged ? 'Merged to Main' : isMergingPR ? 'Promoting Canary...' : 'Approve & Canary Merge'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Heuristic Code Diff Viewer */}
                        <div className="rounded-xl bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto space-y-1">
                          <div className="text-[11px] text-slate-400 pb-2 border-b border-white/10 flex items-center justify-between">
                            <span>services/gateway/wsConnection.js</span>
                            <span className="text-emerald-400">Heuristic Security: 0 Vulns</span>
                          </div>
                          <p className="text-slate-500">// Old Implementation (Leaked socket on dropped TCP packet):</p>
                          <p className="text-red-400 bg-red-950/40 px-2 py-0.5 rounded">-  socket.on(&apos;heartbeat&apos;, () =&gt; this.trackConnection(socket));</p>
                          <p className="text-slate-500 pt-1">// NOVA Autonomous AST Patch (WeakRef event registration):</p>
                          <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+  const weakSocket = new WeakRef(socket);</p>
                          <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+  this.cleanupRegistry.register(socket, socket.id);</p>
                          <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+  socket.on(&apos;heartbeat&apos;, () =&gt; this.safeTrack(weakSocket));</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>CI Unit Test Suite: <strong>148/148 Passed</strong> in 3.4s</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">Coverage: 94.2%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTONOMOUS AGENTS */}
        {activeTab === 'agents' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452]" />
                    Autonomous Agent Workforce Manager
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure operational autonomy levels, CPU allocation, and event triggers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRunHeuristicSweep}
                  disabled={isSweepRunning}
                  className="px-4 py-2 rounded-xl bg-[#D8B452] text-black font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSweepRunning ? 'Executing Sweep...' : 'Trigger Full Squad Sweep'}</span>
                </button>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'prd',
                    name: 'Agent PRD-Synthesizer',
                    role: 'Autonomous Requirement Engineering',
                    desc: 'Ingests Figma, Jira, and PRDs to draft actionable tasks with Fibonacci point estimates.',
                    cpu: '0.4 vCPU • 256MB',
                    events: '1,420 events/day',
                  },
                  {
                    key: 'sentinel',
                    name: 'Agent AST-Sentinel',
                    role: 'Deep Code Vulnerability & Memory Guard',
                    desc: 'Scans pull requests for resource leaks, unclosed streams, and zero-day regressions.',
                    cpu: '1.2 vCPU • 512MB',
                    events: '4,890 events/day',
                  },
                  {
                    key: 'velocity',
                    name: 'Agent Velocity-Predictor',
                    role: 'Sprint Radar & Blocker Mitigation',
                    desc: 'Calculates developer burnout indicators and predicts sprint delivery dates with 94% accuracy.',
                    cpu: '0.2 vCPU • 128MB',
                    events: '320 events/day',
                  },
                  {
                    key: 'canary',
                    name: 'Agent Canary-Deployer',
                    role: 'Automated Staged Promotion & Rollback',
                    desc: 'Monitors real-time 5xx rates during rolling releases. Triggers sub-second rollbacks on anomaly.',
                    cpu: '0.8 vCPU • 256MB',
                    events: '9,240 events/day',
                  },
                ].map((agent) => {
                  const isEnabled = agentStates[agent.key];
                  return (
                    <div
                      key={agent.key}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                              {agent.name}
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleAgent(agent.key)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isEnabled
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-200 dark:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                          >
                            {isEnabled ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
                            <span>{isEnabled ? 'Active' : 'Paused'}</span>
                          </button>
                        </div>
                        <span className="text-[11px] font-bold text-[#a1741a] dark:text-[#D8B452]">
                          {agent.role}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          {agent.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{agent.cpu}</span>
                        <span>{agent.events}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WEBHOOKS & API KEYS */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Token Security Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452]" />
                    Zero-Trust Cryptographic Access Token
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Used to authenticate CI/CD runners, local CLI, and webhook callbacks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-white/10 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-slate-500 mr-2">TOKEN:</span>
                    <span className="text-[#D8B452] font-bold">
                      {isTokenVisible ? tokenValue : 'nova_live_' + '•'.repeat(16)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsTokenVisible((prev) => !prev)}
                      className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      title={isTokenVisible ? 'Hide token' : 'Reveal token'}
                    >
                      {isTokenVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      title="Copy token to clipboard"
                    >
                      {isTokenCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">Tier: {currentWorkspace.plan.toUpperCase()} &bull; Expires in 14 days</span>
                  <button
                    type="button"
                    onClick={handleRegenerateToken}
                    className="text-xs font-bold text-[#a1741a] dark:text-[#D8B452] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regenerate Key</span>
                  </button>
                </div>
              </div>

              {/* Connected Repository Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452]" />
                    Linked Repository Webhooks
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    NOVA listens to incoming pull_request, push, and release webhooks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentWorkspace.host}.com/{currentWorkspace.name}/core-app
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Endpoint: <code className="font-mono text-[11px] text-[#a1741a] dark:text-[#D8B452]">https://api.nova.ai/v2/hooks/wh_8f912c</code>
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Last payload delivery: 12 seconds ago (HTTP 200)</span>
                  </span>
                  <span className="font-mono text-[11px]">TLS 1.3</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceDashboard;
