import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { statisticsData } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';
import { Activity, ShieldCheck, ArrowUpRight, Cpu } from 'lucide-react';
import { soundService } from '../../services/SoundService';

const TELEMETRY_MODES = [
  {
    id: 'throughput',
    label: 'Pipeline Throughput',
    unit: 'GB/s',
    current: '48.2',
    peak: '54.6',
    delta: '+314%',
    points: [18, 22, 21, 28, 26, 35, 32, 41, 38, 44, 42, 48.2],
  },
  {
    id: 'latency',
    label: 'P99 Edge Latency',
    unit: 'ms',
    current: '11.8',
    peak: '9.4',
    delta: '-68.4%',
    points: [84, 76, 62, 55, 48, 41, 36, 28, 24, 18, 14, 11.8],
  },
  {
    id: 'ast_nodes',
    label: 'AST Node Resolution',
    unit: 'nodes/s',
    current: '14,820',
    peak: '16,240',
    delta: '+4.2x',
    points: [3200, 4100, 5800, 7200, 8900, 9800, 11200, 12400, 13100, 13800, 14200, 14820],
  },
];

function VelocityTelemetryHud() {
  const [activeMode, setActiveMode] = useState('throughput');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const activeData = TELEMETRY_MODES.find((m) => m.id === activeMode) || TELEMETRY_MODES[0];

  const minVal = Math.min(...activeData.points);
  const maxVal = Math.max(...activeData.points);
  const range = maxVal - minVal || 1;

  const svgWidth = 700;
  const svgHeight = 160;
  const paddingY = 20;

  const coords = activeData.points.map((val, idx) => {
    const x = (idx / (activeData.points.length - 1)) * svgWidth;
    const normalized = (val - minVal) / range;
    const y = svgHeight - paddingY - normalized * (svgHeight - paddingY * 2);
    return { x, y, val };
  });

  const linePath = coords.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;

  return (
    <div className="relative rounded-[2.5rem] bg-white/90 dark:bg-zinc-950 border border-slate-200/80 dark:border-white/10 hover:border-[#FF5500]/40 transition-all duration-500 shadow-xl overflow-hidden p-6 sm:p-8 mb-8 backdrop-blur-xl ring-1 ring-inset ring-white/5">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FF5500]/10 blur-3xl pointer-events-none -z-10" />

      {/* Top Header & Channel Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5500]" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#FF5500] uppercase">
              Autonomous Runtime Telemetry
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineering Velocity & Stream Performance
          </h4>
        </div>

        {/* Channel Selection Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-zinc-900/80 rounded-2xl border border-slate-300 dark:border-white/10 shadow-xs">
          {TELEMETRY_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                soundService.playChime('actionClick');
                setActiveMode(mode.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeMode === mode.id
                  ? 'bg-[#FF5500] text-black shadow-sm font-extrabold'
                  : 'text-slate-700 dark:text-zinc-400 font-bold hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 pb-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400">Current Velocity</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {activeData.current} <span className="text-sm font-normal text-orange-500">{activeData.unit}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400">Peak Saturation</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {activeData.peak} <span className="text-sm font-normal text-emerald-400">{activeData.unit}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400">Efficiency Delta</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-6 h-6" /> {activeData.delta}
          </div>
        </div>
      </div>

      {/* SVG Waveform Visualization */}
      <div className="relative w-full h-[160px] my-2 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5">
        <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20 dark:opacity-10">
          <div className="w-full h-px bg-slate-400 dark:bg-white" />
          <div className="w-full h-px bg-slate-400 dark:bg-white" />
          <div className="w-full h-px bg-slate-400 dark:bg-white" />
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="velocityAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="velocityLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="60%" stopColor="#FF5500" />
              <stop offset="100%" stopColor="#FF7700" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#velocityAreaGrad)" />

          <path
            d={linePath}
            fill="none"
            stroke="url(#velocityLineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]"
          />

          {coords.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={(e) => {
                e.stopPropagation();
                setHoveredIdx(idx);
              }}
            >
              {/* Invisible larger touch target for mobile fingers */}
              <circle cx={pt.x} cy={pt.y} r="14" className="fill-transparent" />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === idx ? '6' : '3.5'}
                className="fill-[#05060A] stroke-[#FF5500] stroke-2 transition-all duration-200"
              />
            </g>
          ))}
        </svg>

        {hoveredIdx !== null && (
          <div
            className="absolute z-20 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-[#FF5500]/60 text-[11px] font-mono text-white shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-8"
            style={{
              left: `${(hoveredIdx / (coords.length - 1)) * 100}%`,
              top: `${(coords[hoveredIdx].y / svgHeight) * 100}%`,
            }}
          >
            {coords[hoveredIdx].val} {activeData.unit}
          </div>
        )}
      </div>

      {/* Bottom Telemetry Verification Strip */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF5500] animate-pulse" />
          <span className="font-bold text-slate-800 dark:text-white">STREAMING LIVE FROM 12 EDGE NODES</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-orange-400" />
            <span>AST RESOLVER: <strong className="text-white">OPTIMAL</strong></span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SOC-2 TYPE II VERIFIED</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  const [ref, displayValue] = useCountUp(stat.value, 1800, stat.decimals);

  return (
    <div
      ref={ref}
      className="group bg-white/90 dark:bg-zinc-900/40 p-7 sm:p-9 rounded-[2.25rem] border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-2xl hover:border-[#FF5500]/50 transition-all duration-500 text-center flex flex-col justify-between backdrop-blur-xl cursor-default h-full ring-1 ring-inset ring-white/5"
    >
      <div>
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-orange-gradient">
            {displayValue}
          </span>
          <span className="text-orange-400 font-extrabold ml-0.5">{stat.suffix}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-wide group-hover:text-orange-400 transition-colors">
          {stat.label}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          {stat.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" /> Verified Metric
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Measurable Velocity Scale"
            eyebrowVariant="orange"
            title="Battle-Tested Scale &"
            titleHighlight="Performance Benchmarks"
            description="NOVA orchestrates high-throughput sprint pipelines for enterprise engineering squads demanding uncompromising stability."
          />
        </MotionReveal>

        {/* 4 Animated Count-up Cards with Tactile Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {statisticsData.map((stat, idx) => (
            <MotionReveal key={stat.id} animation="fade-up" delay={idx * 80} className="h-full">
              <StatCard stat={stat} />
            </MotionReveal>
          ))}
        </div>

        {/* Interactive Autonomous Velocity Telemetry Graph HUD */}
        <MotionReveal animation="fade-up" delay={180}>
          <VelocityTelemetryHud />
        </MotionReveal>

        {/* Global Edge Runtime Benchmark Strip */}
        <MotionReveal animation="fade-up" delay={220}>
          <div className="p-4 sm:p-5 rounded-[2rem] bg-white/70 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-white/10 shadow-xs backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">EDGE CLUSTER STATUS</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>iad-01: <strong className="text-emerald-400">12ms</strong></span>
              <span>sfo-02: <strong className="text-emerald-400">14ms</strong></span>
              <span>fra-01: <strong className="text-emerald-400">18ms</strong></span>
              <span>bom-01: <strong className="text-emerald-400">24ms</strong></span>
              <span className="hidden sm:inline font-bold text-orange-400">99.99% SOC2 COMPLIANT</span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
