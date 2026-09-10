import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  RotateCcw,
  ArrowRight,
  GitBranch,
  Check,
  TrendingUp,
  Activity,
  Cpu,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';

export function HeroKanban({ tasks, onMoveTask, onResetTasks, onOpenDemo, velocityMode = 'hyperscale' }) {
  const [showBurndown, setShowBurndown] = useState(true);
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const donePoints = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.points, 0);
  const progressPercent = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;
  const isSprintFinished = progressPercent === 100;
  const remainingPoints = totalPoints - donePoints;

  // Dynamic Burndown Calculation for SVG Visualization
  // Coordinate bounds: X in [50, 460], Y in [15, 75]
  const curY = Math.round(15 + (progressPercent / 100) * 60);
  const pathD = `M 50 18 C 100 22, 130 28, 160 32 C 210 38, 250 48, 300 52 C 340 56, 380 ${curY}, 410 ${curY}`;
  const fillD = `${pathD} L 410 75 L 50 75 Z`;

  const handleAdvance = (e, task) => {
    e.stopPropagation();
    if (task.status === 'backlog') {
      soundService.playChime('actionClick');
      onMoveTask(task.id, 'in_progress');
    } else if (task.status === 'in_progress') {
      soundService.playChime('stepAdvance');
      onMoveTask(task.id, 'done');
    } else if (task.status === 'done') {
      soundService.playChime('actionClick');
      onMoveTask(task.id, 'in_progress');
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      soundService.playChime(targetStatus === 'done' ? 'stepAdvance' : 'actionClick');
      onMoveTask(taskId, targetStatus);
    }
  };

  const columns = [
    {
      id: 'backlog',
      title: 'AI Ingested Backlog',
      icon: Sparkles,
      iconColor: 'text-zinc-400',
      badgeText: 'Auto-triaged',
      badgeColor: 'bg-zinc-800 text-zinc-300 border border-white/10',
      items: tasks.filter((t) => t.status === 'backlog'),
    },
    {
      id: 'in_progress',
      title: 'In Progress (Active)',
      icon: Zap,
      iconColor: 'text-[#FF5500]',
      badgeText: 'High Velocity',
      badgeColor: 'bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30',
      items: tasks.filter((t) => t.status === 'in_progress'),
    },
    {
      id: 'done',
      title: 'Shipped & Merged',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      badgeText: '100% Verified',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      items: tasks.filter((t) => t.status === 'done'),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Sprint Metrics HUD */}
      <div className="bg-zinc-900/60 rounded-2xl p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Sprint 48 Velocity
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FF5500]/20 text-[#FF5500] font-bold">
                {donePoints} / {totalPoints} pts ({progressPercent}%)
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-orange-400">
                {velocityMode === 'hyperscale'
                  ? '⚡ 4.2x Burndown'
                  : velocityMode === 'zerotrust'
                  ? '🛡️ SOC2 Gate'
                  : '🧠 AI Copilot'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Interactive simulator &bull; Drag cards or click action to advance
            </p>
          </div>
        </div>

        {/* Progress bar + Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="w-28 sm:w-40 h-2 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-[#FF5500] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Toggle Burndown Visualization */}
          <button
            type="button"
            onClick={() => {
              soundService.playChime('actionClick');
              setShowBurndown((prev) => !prev);
            }}
            title="Toggle Burndown Velocity Curve"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <Activity className="w-3 h-3 text-[#FF5500]" />
            <span className="hidden xs:inline">{showBurndown ? 'Hide Chart' : 'Burndown'}</span>
            {showBurndown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => {
              soundService.playChime('actionClick');
              onResetTasks();
            }}
            title="Reset sprint tickets to initial state"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Agile Sprint Burndown Curve SVG Visualization + Live Telemetry HUD */}
      {showBurndown && (
        <div className="bg-zinc-900/40 rounded-2xl p-3 sm:p-4 border border-white/10 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span className="text-white font-bold">BURNDOWN VELOCITY CURVE</span>
              <span className="text-slate-400 hidden sm:inline">(&bull; Ideal vs &bull; Actual)</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-slate-500 inline-block border-t border-dashed" /> Ideal
              </span>
              <span className="flex items-center gap-1 text-[#FF5500] font-semibold">
                <span className="w-3 h-0.5 bg-[#FF5500] inline-block" /> Actual ({remainingPoints} pts remaining)
              </span>
            </div>
          </div>

          {/* Responsive SVG Burndown Graph */}
          <div className="py-2 overflow-x-auto">
            <svg
              viewBox="0 0 500 90"
              className="w-full h-20 sm:h-24 select-none overflow-visible"
              aria-label="Sprint Burndown Chart"
            >
              <defs>
                <linearGradient id="burndownFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5500" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF5500" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="50" y1="18" x2="460" y2="18" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="50" y1="46" x2="460" y2="46" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="50" y1="75" x2="460" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="42" y="21" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end">24p</text>
              <text x="42" y="49" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end">12p</text>
              <text x="42" y="77" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end">0p</text>

              {/* Ideal Burndown Projection Line (Dashed) */}
              <line
                x1="50"
                y1="18"
                x2="460"
                y2="75"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Actual Velocity Curve (Gradient Fill + Glowing Stroke) */}
              <path d={fillD} fill="url(#burndownFill)" />
              <path
                d={pathD}
                fill="none"
                stroke="#FF5500"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255, 85, 0, 0.6))' }}
              />

              {/* Milestone Dots along actual path */}
              <circle cx="50" cy="18" r="3" fill="#FF5500" />
              <circle cx="160" cy="32" r="3" fill="#FF5500" />
              <circle cx="300" cy="52" r="3" fill="#FF5500" />
              <circle cx="410" cy={curY} r="4" fill="#FF5500" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />

              {/* X Axis Labels */}
              <text x="50" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 1</text>
              <text x="160" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 3</text>
              <text x="300" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 7</text>
              <text x="410" y="87" fill="#FF5500" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Today</text>
              <text x="460" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 10 (Target)</text>
            </svg>
          </div>

          {/* 3 Live Telemetry HUD Metrics (Matching Reference Comp) */}
          <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="text-slate-400 hidden xs:inline">Throughput:</span>
              <span className="font-bold text-white">3,220 req/s</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-slate-400 hidden xs:inline">CPU Load:</span>
              <span className="font-bold text-white">4.6%</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 hidden xs:inline">Queue Latency:</span>
              <span className="font-bold text-emerald-400">1.7ms</span>
            </div>
          </div>
        </div>
      )}

      {/* Celebratory Banner when Sprint is 100% complete */}
      {isSprintFinished && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-[#FF5500]/15 to-emerald-500/20 border border-emerald-500/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🎉</span>
            <div>
              <p className="text-xs font-bold text-emerald-300">
                Sprint 48 Complete! 100% Velocity Target Achieved
              </p>
              <p className="text-[11px] text-zinc-300">
                All 6 tickets verified with zero regressions. NOVA Copilot has auto-staged release v2.4.1.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playChime('actionClick');
              onResetTasks();
            }}
            className="px-3 py-1 text-xs font-bold bg-[#FF5500] text-black rounded-full hover:bg-[#ff6a1a] transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            Replay
          </button>
        </div>
      )}

      {/* 3 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const Icon = col.icon;
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="bg-zinc-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex flex-col min-h-[320px] shadow-lg"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${col.iconColor}`} />
                  {col.title} ({col.items.length})
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${col.badgeColor}`}>
                  {col.badgeText}
                </span>
              </div>

              {/* Column Items */}
              <div className="space-y-3 flex-1">
                {col.items.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-500 text-xs italic">
                    Drop tickets here
                  </div>
                ) : (
                  col.items.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onClick={() => onOpenDemo('task', { task })}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
                        task.status === 'done'
                          ? 'bg-zinc-950/60 border-white/5 opacity-70 hover:opacity-100 hover:border-emerald-500/40'
                          : task.status === 'in_progress'
                          ? 'bg-zinc-950/80 border-[#FF5500]/40 shadow-[0_0_20px_rgba(255,85,0,0.12)] hover:border-[#FF5500] hover:shadow-[0_0_25px_rgba(255,85,0,0.25)]'
                          : 'bg-zinc-950/80 border-white/10 hover:border-white/30 hover:shadow-lg'
                      }`}
                    >
                      {/* Ticket Meta */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${
                            task.status === 'done'
                              ? 'bg-zinc-900 text-zinc-500 line-through'
                              : task.status === 'in_progress'
                              ? 'bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30'
                              : 'bg-white/10 text-zinc-300 border border-white/10'
                          }`}
                        >
                          {task.id}
                        </span>
                        <span className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                          <Clock
                            className={`w-3 h-3 ${
                              task.status === 'in_progress' ? 'text-[#FF5500]' : 'text-zinc-500'
                            }`}
                          />{' '}
                          {task.points} pts
                        </span>
                      </div>

                      {/* Title */}
                      <p
                        className={`text-xs sm:text-[13px] font-semibold leading-snug transition-colors ${
                          task.status === 'done'
                            ? 'text-zinc-500 line-through'
                            : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {task.title}
                      </p>

                      {/* Badges / Branch info */}
                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px]">
                            {task.service}
                          </span>
                          {task.branch && (
                            <span className="flex items-center gap-1 text-zinc-400 text-[10px]">
                              <GitBranch className="w-2.5 h-2.5 text-[#FF5500]" />
                              {task.branch}
                            </span>
                          )}
                        </div>

                        {/* Interactive Advance Action Button */}
                        <button
                          type="button"
                          onClick={(e) => handleAdvance(e, task)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            task.status === 'backlog'
                              ? 'bg-white/10 hover:bg-[#FF5500] text-zinc-200 hover:text-black border border-white/10 hover:border-[#FF5500]'
                              : task.status === 'in_progress'
                              ? 'bg-[#FF5500] hover:bg-[#ff6a1a] text-black shadow-[0_0_12px_rgba(255,85,0,0.4)]'
                              : 'bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10'
                          }`}
                          title={
                            task.status === 'backlog'
                              ? 'Move to In Progress'
                              : task.status === 'in_progress'
                              ? 'Complete & Merge'
                              : 'Reopen Task'
                          }
                        >
                          {task.status === 'backlog' && (
                            <>
                              <span>Start</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </>
                          )}
                          {task.status === 'in_progress' && (
                            <>
                              <span>Merge</span>
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </>
                          )}
                          {task.status === 'done' && (
                            <>
                              <span>Reopen</span>
                              <RotateCcw className="w-2.5 h-2.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
