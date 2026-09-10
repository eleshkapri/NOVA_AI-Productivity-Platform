import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';
import { PdfReportService } from '../../../services/PdfReportService';

const QUESTIONS = [
  {
    id: 'cadence',
    title: 'How frequently does your engineering team deploy to production?',
    subtitle: 'Deployment frequency is the core indicator of continuous delivery maturity.',
    options: [
      { text: 'Multiple times per day (Continuous Delivery pipeline)', score: 25, label: 'Elite' },
      { text: 'Once per week (Scheduled sprint batch releases)', score: 18, label: 'Standard' },
      { text: 'Every 2-4 weeks (Staging freezes & manual soak tests)', score: 10, label: 'Friction' },
      { text: 'Quarterly or longer (High-risk manual ceremonies)', score: 4, label: 'Critical' },
    ],
  },
  {
    id: 'review',
    title: 'What is your typical Pull Request review and merge latency?',
    subtitle: 'Idle PR time accounts for up to 40% of sprint cycle delays.',
    options: [
      { text: '< 2 hours (Rapid automated review & fast approvals)', score: 25, label: 'Elite' },
      { text: '1 to 2 days (Minor review queues between focus blocks)', score: 18, label: 'Standard' },
      { text: '3 to 5 days (Frequent context switching & stale branches)', score: 10, label: 'Friction' },
      { text: '> 1 week (Severe review bottlenecks & merge conflicts)', score: 3, label: 'Critical' },
    ],
  },
  {
    id: 'backlog',
    title: 'How much time do engineers spend on backlog grooming & story estimation?',
    subtitle: 'Sprint mechanics and estimation overhead often consume prime coding hours.',
    options: [
      { text: 'Zero toil (AI-assisted continuous triage & sizing)', score: 25, label: 'Elite' },
      { text: '1-2 hours per week in sprint ceremonies', score: 18, label: 'Standard' },
      { text: '3-4 hours per week in estimation & alignment meetings', score: 9, label: 'Friction' },
      { text: 'Chaotic / Unpredictable scope creep with minimal estimation', score: 3, label: 'Critical' },
    ],
  },
  {
    id: 'ci',
    title: 'How long does your CI test suite take to verify a pull request?',
    subtitle: 'Slow or flaky CI pipelines break developer flow state and delay releases.',
    options: [
      { text: '< 5 minutes on distributed edge runners', score: 25, label: 'Elite' },
      { text: '10-20 minutes with occasional test retries', score: 17, label: 'Standard' },
      { text: '30+ minutes with frequent flaky test failures', score: 8, label: 'Friction' },
      { text: 'Manual QA validation & fragmented local test scripts', score: 2, label: 'Critical' },
    ],
  },
];

export function VelocityHealthQuiz({ onOpenDemo, defaultTeamSize = 25 }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (option) => {
    soundService.playChime('actionClick');
    const updated = [...answers, option];
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      soundService.playChime('stepAdvance');
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    soundService.playChime('actionClick');
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate Metrics
  const totalScore = answers.reduce((sum, a) => sum + (a.score || 0), 0);

  let tierName = 'Elite Velocity';
  let tierColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let tierDesc =
    'Your squad operates with high continuous delivery maturity. NOVA can optimize edge cases and autonomous security audits.';

  if (totalScore < 45) {
    tierName = 'Critical Velocity Debt';
    tierColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    tierDesc =
      'Severe engineering friction detected across review latency and deployment gates. Over 30% of engineering capacity is lost to repetitive coordination toil.';
  } else if (totalScore < 70) {
    tierName = 'High Bottleneck Risk';
    tierColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    tierDesc =
      'Significant review queues and estimation overhead are draining velocity. Automated AI review and autonomous triage can reclaim ~14 hours per dev/week.';
  } else if (totalScore < 90) {
    tierName = 'Moderate Friction';
    tierColor = 'text-[#D8B452] bg-[#D8B452]/10 border-[#D8B452]/30';
    tierDesc =
      'Solid engineering foundation, but manual PR review cycle times and backlog refinement can be accelerated by 3.4x with NOVA.';
  }

  // Estimated ROI numbers based on score & teamSize
  const frictionFactor = Math.max(0.15, (100 - totalScore) / 100);
  const hoursSavedPerYear = Math.round(defaultTeamSize * 48 * 14 * frictionFactor);
  const annualSavingsDollars = Math.round(hoursSavedPerYear * 68);

  const generateReportText = () => {
    return `# NOVA Engineering Velocity & ROI Executive Health Report
Generated on: ${new Date().toLocaleDateString()}
Team Benchmark Size: ${defaultTeamSize} Engineers

============================================================
EXECUTIVE SUMMARY
============================================================
• Velocity Health Index: ${totalScore} / 100
• Health Tier: ${tierName}
• Projected Annual Capacity Reclaimed: ${hoursSavedPerYear.toLocaleString()} hours / year
• Projected Annual Productivity Dividend: $${annualSavingsDollars.toLocaleString()} USD
• Assessment Status: 100% Verified across 4 DORA dimensions

============================================================
DIAGNOSTIC QUESTION BREAKDOWN
============================================================
1. Deployment Cadence:
   Selected: ${answers[0]?.text || 'N/A'} (Score: ${answers[0]?.score || 0}/25)

2. PR Review Cycle Time:
   Selected: ${answers[1]?.text || 'N/A'} (Score: ${answers[1]?.score || 0}/25)

3. Backlog Refinement & Estimation Overhead:
   Selected: ${answers[2]?.text || 'N/A'} (Score: ${answers[2]?.score || 0}/25)

4. CI Flakiness & Test Suite Latency:
   Selected: ${answers[3]?.text || 'N/A'} (Score: ${answers[3]?.score || 0}/25)

============================================================
TAILORED NOVA ARCHITECTURAL PRESCRIPTIONS
============================================================
1. Autonomous PR Copilot:
   Automate initial PR reviews, AST memory leak detection, and semantic changelog generation to cut review latency by 72%.

2. Autonomous Backlog Ingestion:
   Eliminate manual sprint planning friction with historical Fibonacci story point estimation and zero-circular dependency resolution.

3. Distributed Zero-Downtime Edge Deployment:
   Stage canary release gates with multi-region geoRouter failover and zero-downtime database session migration.

============================================================
ABOUT NOVA
============================================================
NOVA is an elevated AI productivity platform engineered for visionary engineering squads.
Visit https://nova.internal to activate your 14-day full trial.
`;
  };

  const handleDownloadReport = () => {
    soundService.playChime('stepAdvance');
    PdfReportService.generateReport({
      totalScore,
      tierName,
      tierDesc,
      defaultTeamSize,
      hoursSavedPerYear,
      annualSavingsDollars,
      answers,
    });
  };

  const handleCopySummary = () => {
    const text = generateReportText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    soundService.playChime('actionClick');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {!isCompleted ? (
        /* ================= QUIZ IN PROGRESS ================= */
        <div className="space-y-6 animate-fade-in">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452]">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {QUESTIONS[currentStep].title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden shrink-0 ml-4">
              <div
                className="h-full bg-gradient-to-r from-[#6833FF] via-[#8E6FFF] to-[#D8B452] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className="p-4 rounded-2xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10 hover:border-[#D8B452] hover:bg-amber-50/30 dark:hover:bg-[#0b0c33] hover:shadow-lg hover:shadow-[#D8B452]/10 transition-all text-left flex items-center justify-between gap-4 cursor-pointer group select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 group-hover:text-black dark:group-hover:text-white group-hover:bg-[#D8B452] text-xs font-mono font-bold flex items-center justify-center transition-colors shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {option.text}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      option.label === 'Elite'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : option.label === 'Standard'
                        ? 'bg-blue-500/20 text-blue-400'
                        : option.label === 'Friction'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {option.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D8B452] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Click any option to auto-advance to next question</span>
            <span className="font-mono">{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete</span>
          </div>
        </div>
      ) : (
        /* ================= RESULTS SCORECARD & REPORT ================= */
        <div className="space-y-6 animate-fade-in">
          {/* Top Score Ribbon */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0b0c33] border border-[#D8B452]/40 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D8B452]">
                  Velocity Diagnostic Scorecard
                </span>
                <span className={`text-[11px] px-3 py-0.5 rounded-full font-bold border ${tierColor}`}>
                  {tierName}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-serif italic text-gold-gradient">
                {totalScore} / 100 Health Index
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {tierDesc}
              </p>
            </div>

            {/* Replay Button */}
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
              title="Retake assessment"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Quantified Impact Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Annual Hours Reclaimed</span>
                <Clock className="w-4 h-4 text-[#D8B452]" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {hoursSavedPerYear.toLocaleString()} <span className="text-xs font-normal text-slate-400">hrs/yr</span>
              </div>
              <span className="text-[11px] text-emerald-500 font-semibold mt-0.5 block">
                Across {defaultTeamSize} engineers
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Annual Cost Dividend</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono text-gold-gradient">
                ${annualSavingsDollars.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-500 font-semibold mt-0.5 block">
                Estimated engineering ROI
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Primary Recommendation</span>
                <Sparkles className="w-4 h-4 text-[#8E6FFF]" />
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                Autonomous PR Copilot
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                Target: -72% review waiting time
              </span>
            </div>
          </div>

          {/* Tailored Architectural Prescriptions */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D8B452]" /> Tailored NOVA Architectural Prescriptions
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#a1741a] dark:text-[#D8B452] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Autonomous PR Code Diff Reasoning
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Automate AST semantic diffs, security audits, and changelog generation so human engineers only review business logic.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#8E6FFF] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Continuous Fibonacci Auto-Triage
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Calibrate backlog estimation based on historical team velocity and eliminate 3+ hours of repetitive planning meetings.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row: Download & Copy Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadReport}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8B452] hover:bg-[#b5953f] text-black text-xs font-bold transition-all shadow-md cursor-pointer"
                title="Download formatted executive report (.pdf)"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive Report (.pdf)</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0b0c33] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all cursor-pointer"
                title="Copy report text to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => onOpenDemo && onOpenDemo('trial')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6833FF] to-[#8E6FFF] hover:opacity-90 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <span>Deploy NOVA with this Configuration &rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
