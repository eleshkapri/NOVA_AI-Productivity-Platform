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

export function HeroKanban({ tasks, onMoveTask, onResetTasks, onOpenDemo }) {
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
      iconColor: 'text-[#D8B452]',
      badgeText: 'Auto-triaged',
      badgeColor: 'bg-[#D8B452]/20 text-[#D8B452]',
      items: tasks.filter((t) => t.status === 'backlog'),
    },
    {
      id: 'in_progress',
      title: 'In Progress (Active)',
      icon: Zap,
      iconColor: 'text-[#8E6FFF]',
      badgeText: 'High Velocity',
      badgeColor: 'bg-[#6833FF]/25 text-[#A78BFA]',
      items: tasks.filter((t) => t.status === 'in_progress'),
    },
    {
      id: 'done',
      title: 'Shipped & Merged',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      badgeText: '100% Verified',
      badgeColor: 'bg-emerald-500/20 text-emerald-400',
      items: tasks.filter((t) => t.status === 'done'),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Sprint Metrics HUD */}
      <div className="bg-zinc-900/60 rounded-2xl p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-[#D8B452]/10 border border-[#D8B452]/30 text-[#D8B452]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Sprint 48 Velocity
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#F3D887] font-bold">
                {donePoints} / {totalPoints} pts ({progressPercent}%)
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
              className="h-full bg-gradient-to-r from-[#6833FF] via-[#8E6FFF] to-[#D8B452] transition-all duration-500 rounded-full"
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
            <Activity className="w-3 h-3 text-[#D8B452]" />
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
              <span className="w-2 h-2 rounded-full bg-[#D8B452] animate-pulse" />
              <span className="text-white font-bold">BURNDOWN VELOCITY CURVE</span>
              <span className="text-slate-400 hidden sm:inline">(&bull; Ideal vs &bull; Actual)</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-slate-500 inline-block border-t border-dashed" /> Ideal
              </span>
              <span className="flex items-center gap-1 text-[#D8B452] font-semibold">
                <span className="w-3 h-0.5 bg-[#D8B452] inline-block" /> Actual ({remainingPoints} pts remaining)
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
                  <stop offset="0%" stopColor="#D8B452" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D8B452" stopOpacity="0.0" />
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
                stroke="#D8B452"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(216, 180, 82, 0.6))' }}
              />

              {/* Milestone Dots along actual path */}
              <circle cx="50" cy="18" r="3" fill="#D8B452" />
              <circle cx="160" cy="32" r="3" fill="#D8B452" />
              <circle cx="300" cy="52" r="3" fill="#D8B452" />
              <circle cx="410" cy={curY} r="4" fill="#D8B452" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />

              {/* X Axis Labels */}
              <text x="50" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 1</text>
              <text x="160" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 3</text>
              <text x="300" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 7</text>
              <text x="410" y="87" fill="#D8B452" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Today</text>
              <text x="460" y="87" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Day 10 (Target)</text>
            </svg>
          </div>

          {/* 3 Live Telemetry HUD Metrics (Matching Reference Comp) */}
          <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#D8B452]" />
              <span className="text-slate-400 hidden xs:inline">Throughput:</span>
              <span className="font-bold text-white">3,220 req/s</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#8E6FFF]" />
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
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-[#D8B452]/15 to-emerald-500/20 border border-emerald-500/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🎉</span>
            <div>
              <p className="text-xs font-bold text-emerald-300">
                Sprint 48 Complete! 100% Velocity Target Achieved
              </p>
              <p className="text-[11px] text-slate-300">
                All 6 tickets verified with zero regressions. NOVA Copilot has auto-staged release v2.4.1.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playChime('actionClick');
              onResetTasks();
            }}
            className="px-3 py-1 text-xs font-bold bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer shadow-sm"
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
              className="bg-[#0b0c33]/70 p-4 rounded-xl border border-white/5 flex flex-col min-h-[300px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${col.iconColor}`} />
                  {col.title} ({col.items.length})
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${col.badgeColor}`}>
                  {col.badgeText}
                </span>
              </div>

              {/* Column Items */}
              <div className="space-y-3 flex-1">
                {col.items.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center text-slate-500 text-xs italic">
                    Drop tickets here
                  </div>
                ) : (
                  col.items.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onClick={() => onOpenDemo('task', { task })}
                      className={`p-3.5 bg-[#050614] rounded-lg border transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
                        task.status === 'done'
                          ? 'border-white/10 opacity-80 hover:opacity-100 hover:border-emerald-500/40'
                          : task.status === 'in_progress'
                          ? 'border-[#8E6FFF]/40 hover:border-[#D8B452] shadow-xs hover:shadow-lg hover:shadow-[#6833FF]/20'
                          : 'border-white/10 hover:border-[#D8B452] shadow-xs hover:shadow-lg hover:shadow-[#D8B452]/10'
                      }`}
                    >
                      {/* Ticket Meta */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span
                          className={`font-mono font-bold group-hover:underline ${
                            task.status === 'done' ? 'text-slate-500 line-through' : 'text-[#D8B452]'
                          }`}
                        >
                          {task.id}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3 h-3 text-[#D8B452]" /> {task.points} pts
                        </span>
                      </div>

                      {/* Title */}
                      <p
                        className={`text-xs font-semibold leading-snug transition-colors ${
                          task.status === 'done'
                            ? 'text-slate-400 line-through'
                            : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {task.title}
                      </p>

                      {/* Badges / Branch info */}
                      <div className="mt-2.5 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                            {task.service}
                          </span>
                          {task.branch && (
                            <span className="flex items-center gap-1 text-slate-400">
                              <GitBranch className="w-2.5 h-2.5 text-[#D8B452]" />
                              {task.branch}
                            </span>
                          )}
                        </div>

                        {/* Interactive Advance Action Button */}
                        <button
                          type="button"
                          onClick={(e) => handleAdvance(e, task)}
                          className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            task.status === 'backlog'
                              ? 'bg-[#D8B452]/20 hover:bg-[#D8B452] text-[#D8B452] hover:text-black'
                              : task.status === 'in_progress'
                              ? 'bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black'
                              : 'bg-white/10 hover:bg-white/20 text-slate-300'
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
                              <Check className="w-2.5 h-2.5" />
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
