import React from 'react';
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
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';

export function HeroKanban({ tasks, onMoveTask, onResetTasks, onOpenDemo }) {
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const donePoints = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.points, 0);
  const progressPercent = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;
  const isSprintFinished = progressPercent === 100;

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
      <div className="bg-[#0b0c33]/80 rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-lg bg-[#D8B452]/10 border border-[#D8B452]/30 text-[#D8B452]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Sprint 48 Velocity
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#D8B452]/20 text-[#D8B452] font-semibold">
                {donePoints} / {totalPoints} pts ({progressPercent}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Interactive simulator &bull; Drag cards or click action to advance
            </p>
          </div>
        </div>

        {/* Progress bar + Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="w-32 sm:w-44 h-2 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#6833FF] via-[#8E6FFF] to-[#D8B452] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

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
