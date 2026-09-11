import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { Calculator, ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { VelocityHealthQuiz } from './roi/VelocityHealthQuiz';
import { soundService } from '../../services/SoundService';
import { smoothScrollService } from '../../services/SmoothScrollService';

export function RoiCalculator({ onOpenDemo }) {
  const [activeMode, setActiveMode] = useState('calculator'); // 'calculator' | 'quiz'
  const [teamSize, setTeamSize] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_user_team_size');
      return saved ? Number(saved) : 25;
    } catch {
      return 25;
    }
  });
  const [avgSalary, setAvgSalary] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_user_avg_salary');
      return saved ? Number(saved) : 120000;
    } catch {
      return 120000;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nova_user_team_size', String(teamSize));
      localStorage.setItem('nova_user_avg_salary', String(avgSalary));
    } catch {
      // non-blocking
    }
  }, [teamSize, avgSalary]);

  useEffect(() => {
    const handleActivateQuiz = () => {
      setActiveMode('quiz');
    };
    window.addEventListener('activate-velocity-quiz', handleActivateQuiz);
    return () => window.removeEventListener('activate-velocity-quiz', handleActivateQuiz);
  }, []);

  // Math calculations
  const weeklyHoursSaved = Math.round(teamSize * 14.5);
  const hourlyRate = avgSalary / 2000;
  const annualSavings = Math.round(weeklyHoursSaved * 48 * hourlyRate * 0.42);

  return (
    <section id="roi-calculator" className="py-10 md:py-14 bg-orange-500/[0.015] dark:bg-zinc-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Interactive Economics & Diagnostics"
            eyebrowVariant="orange"
            title="Calculate Your Team's"
            titleHighlight="Productivity Dividend"
            description="Adjust your engineering headcount or take our 4-step diagnostic assessment to preview the quantifiable velocity gains unlocked by NOVA."
          />
        </MotionReveal>

        <MotionReveal animation="fade-up" delay={120}>
          <div className="max-w-5xl mx-auto bg-white/95 dark:bg-zinc-900/40 rounded-[2.5rem] p-8 sm:p-12 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-2xl ring-1 ring-inset ring-white/5">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-zinc-950 border border-slate-300 dark:border-white/10 shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveMode('calculator');
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeMode === 'calculator'
                      ? 'bg-[#FF5500] text-black shadow-sm font-extrabold'
                      : 'text-slate-700 dark:text-zinc-400 font-bold hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Headcount Economics</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playChime('actionClick');
                    setActiveMode('quiz');
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeMode === 'quiz'
                      ? 'bg-[#FF5500] text-black shadow-sm font-extrabold'
                      : 'text-slate-700 dark:text-zinc-400 font-bold hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Velocity Health Diagnostic</span>
                </button>
              </div>
            </div>

            {activeMode === 'calculator' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Sliders Input Column */}
                <div className="lg:col-span-6 space-y-8">
                  {/* Slider 1: Team Size */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label htmlFor="team-size-slider" className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
                    Engineering Team Size
                  </label>
                  <span className="text-xl font-mono font-bold text-orange-600 dark:text-orange-400">
                    {teamSize} Engineers
                  </span>
                </div>
                <input
                  id="team-size-slider"
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>5 devs</span>
                  <span>75 devs</span>
                  <span>150 devs</span>
                </div>
              </div>

              {/* Slider 2: Average Salary */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label htmlFor="salary-slider" className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
                    Avg Annual Compensation
                  </label>
                  <span className="text-xl font-mono font-bold text-orange-600 dark:text-orange-400">
                    ${avgSalary.toLocaleString()} / yr
                  </span>
                </div>
                <input
                  id="salary-slider"
                  type="range"
                  min="60000"
                  max="220000"
                  step="10000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>$60,000</span>
                  <span>$140,000</span>
                  <span>$220,000</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-3">
                <Calculator className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  Model calibrated from empirical telemetry across 500+ engineering teams measuring PR merge latency, story estimation, and retrospective overhead.
                </span>
              </div>
            </div>

            {/* Live Calculated Output Column */}
            <div className="lg:col-span-6 bg-zinc-950 p-5 sm:p-8 rounded-[2rem] border border-[#FF5500]/40 shadow-2xl space-y-6 text-white ring-1 ring-inset ring-white/5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-orange-400">
                Projected Annual Dividend
              </span>

              {/* Annual Dollar Savings */}
              <div>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="w-8 h-8 text-orange-400" />
                  <span className="text-5xl sm:text-6xl font-black font-mono text-orange-gradient tracking-tighter">
                    {annualSavings.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-400 mt-1 font-semibold font-mono">
                  Estimated Capital Reclaimed Annually
                </p>
              </div>

              {/* 2 Sub-metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span>Engineering Hours</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    +{weeklyHoursSaved.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-zinc-400">hrs/wk</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Focus time restored</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Velocity Factor</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    4.2x{' '}
                    <span className="text-xs font-normal text-zinc-400">speed</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Faster PR cycles</p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="orange"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full justify-center text-sm flex-1 shadow-lg shadow-[#FF5500]/25"
                  onClick={() => onOpenDemo ? onOpenDemo('trial', { plan: 'pro' }) : smoothScrollService.scrollTo('#pricing', { offset: -70, duration: 1.5 })}
                >
                  Capture This ROI with Pro
                </Button>
                {onOpenDemo && (
                  <button
                    onClick={() => onOpenDemo('contact')}
                    className="px-5 py-2.5 rounded-full border border-white/10 hover:border-[#FF5500]/40 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Custom Audit
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <VelocityHealthQuiz onOpenDemo={onOpenDemo} defaultTeamSize={teamSize} />
        )}
        </div>
        </MotionReveal>
      </div>
    </section>
  );
}
