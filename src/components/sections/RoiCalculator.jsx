import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Calculator, ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';

export function RoiCalculator({ onOpenDemo }) {
  const [teamSize, setTeamSize] = useState(25);
  const [avgSalary, setAvgSalary] = useState(120000);

  // Math calculations
  const weeklyHoursSaved = Math.round(teamSize * 14.5);
  const hourlyRate = avgSalary / 2000;
  const annualSavings = Math.round(weeklyHoursSaved * 48 * hourlyRate * 0.42);

  return (
    <section id="roi-calculator" className="py-24 md:py-36 bg-amber-50/25 dark:bg-[#07081e]/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Interactive Economics"
          title="Calculate Your Team's"
          titleHighlight="Productivity Dividend"
          description="Adjust your engineering headcount and benchmark compensation to preview the quantifiable velocity gains unlocked by NOVA."
        />

        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-[#D8B452]/30 shadow-xl dark:shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-8">
              {/* Slider 1: Team Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="team-size-slider" className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                    Engineering Team Size
                  </label>
                  <span className="text-xl font-mono font-bold text-[#a1741a] dark:text-[#D8B452]">
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
                  className="w-full h-2 bg-slate-200 dark:bg-[#050614] rounded-lg appearance-none cursor-pointer accent-[#D8B452]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>5 devs</span>
                  <span>75 devs</span>
                  <span>150 devs</span>
                </div>
              </div>

              {/* Slider 2: Average Salary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="salary-slider" className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                    Avg Annual Compensation
                  </label>
                  <span className="text-xl font-mono font-bold text-[#a1741a] dark:text-[#D8B452]">
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
                  className="w-full h-2 bg-slate-200 dark:bg-[#050614] rounded-lg appearance-none cursor-pointer accent-[#D8B452]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>$60,000</span>
                  <span>$140,000</span>
                  <span>$220,000</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
                <Calculator className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                <span>
                  Model calibrated from empirical telemetry across 500+ engineering teams measuring PR merge latency, story estimation, and retrospective overhead.
                </span>
              </div>
            </div>

            {/* Live Calculated Output Column */}
            <div className="lg:col-span-6 bg-[#0b0c33] dark:bg-[#050614] p-8 rounded-3xl border border-[#D8B452]/40 shadow-xl space-y-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D8B452]">
                Projected Annual Dividend
              </span>

              {/* Annual Dollar Savings */}
              <div>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="w-8 h-8 text-[#D8B452]" />
                  <span className="text-5xl sm:text-6xl font-black text-white font-serif italic text-gold-gradient tracking-tight">
                    {annualSavings.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-semibold">
                  Estimated Capital Reclaimed Annually
                </p>
              </div>

              {/* 2 Sub-metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Clock className="w-4 h-4 text-[#D8B452]" />
                    <span>Engineering Hours</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    +{weeklyHoursSaved.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">hrs/wk</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Focus time restored</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Velocity Factor</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    4.2x{' '}
                    <span className="text-xs font-normal text-slate-400">speed</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Faster PR cycles</p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full justify-center text-sm flex-1"
                  onClick={() => {
                    const pricing = document.getElementById('pricing');
                    pricing?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Capture This ROI with Pro
                </Button>
                {onOpenDemo && (
                  <button
                    onClick={onOpenDemo}
                    className="px-5 py-2.5 rounded-full border border-white/10 hover:border-[#D8B452]/40 text-xs font-semibold text-slate-300 hover:text-[#D8B452] transition-colors cursor-pointer"
                  >
                    Custom Audit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
