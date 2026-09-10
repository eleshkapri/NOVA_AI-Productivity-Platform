import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, RotateCcw, Sparkles, CheckCircle2, ShieldCheck, Zap, Play } from 'lucide-react';
import { soundService } from '../../../services/SoundService';

const PRESET_COMMANDS = [
  {
    cmd: 'nova sprint triage',
    label: 'Sprint Triage',
    desc: 'Auto-calibrate story points & dependencies',
    icon: Sparkles,
  },
  {
    cmd: 'nova copilot diff #142',
    label: 'Copilot Diff #142',
    desc: 'AST semantic diff & zero-trust security audit',
    icon: ShieldCheck,
  },
  {
    cmd: 'nova test --coverage',
    label: 'Test Matrix',
    desc: 'Run distributed unit & integration safety checks',
    icon: CheckCircle2,
  },
  {
    cmd: 'nova status --mesh',
    label: 'Edge Mesh Status',
    desc: 'Inspect multi-region edge node latency',
    icon: Zap,
  },
];

const INITIAL_LOGS = [
  {
    type: 'banner',
    lines: [
      'NOVA Intelligent Developer CLI &bull; v2.4.0 (x86_64-edge-runtime)',
      'Zero-trust mesh connected: iad-01 (latency: 18ms) &bull; SOC2 Type II active',
      'Type a command or click a quick-action pill below to execute:',
    ],
  },
];

export function HeroTerminal({ onOpenDemo }) {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed || isExecuting) return;

    soundService.playChime('actionClick');
    setIsExecuting(true);
    setInputVal('');

    const newCmdEntry = {
      type: 'command',
      text: trimmed,
      time: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [...prev, newCmdEntry]);

    setTimeout(() => {
      let outputLines = [];

      if (trimmed === 'nova demo' || trimmed === 'demo' || trimmed === 'studio') {
        outputLines = [
          { tag: 'LAUNCH', color: 'text-emerald-400', text: 'Opening NOVA Interactive Demo Studio...' },
          { tag: 'SUCCESS', color: 'text-[#FF5500]', text: 'Interactive walkthrough initialized.' },
        ];
        onOpenDemo('walkthrough');
      } else if (trimmed === 'nova sprint triage') {
        outputLines = [
          { tag: 'INFO', color: 'text-blue-400', text: 'Ingesting repository metadata across 14 connected services...' },
          { tag: 'AI-TRIAGE', color: 'text-[#FF5500]', text: 'Analyzed 6 active backlog items against historical squad velocity.' },
          { tag: 'ESTIMATION', color: 'text-orange-400', text: 'Fibonacci calibrated: NOV-249 (3 pts), NOV-251 (5 pts), NOV-246 (8 pts).' },
          { tag: 'SUCCESS', color: 'text-emerald-400', text: 'Sprint 48 backlog balanced. 0 circular blocking dependencies detected.' },
        ];
      } else if (trimmed === 'nova copilot diff #142') {
        outputLines = [
          { tag: 'COPILOT', color: 'text-[#FF5500]', text: 'Inspecting AST semantic diff for PR #142 (feat/pr-summarizer)...' },
          { tag: 'SECURITY', color: 'text-emerald-400', text: 'AES-GCM signed token rotation verified. Replay attack resistance: 100%.' },
          { tag: 'PERFORMANCE', color: 'text-[#FF5500]', text: 'Projected latency reduction: -64% (210ms -> 75ms) via edge geoRouter.' },
          { tag: 'SUCCESS', color: 'text-emerald-400', text: 'Passed all static security audits. Safe for zero-downtime deployment.' },
        ];
      } else if (trimmed === 'nova test --coverage') {
        outputLines = [
          { tag: 'TEST-RUNNER', color: 'text-blue-400', text: 'Dispatching test matrix to 4 edge execution sandboxes...' },
          { tag: 'UNIT', color: 'text-emerald-400', text: '42 / 42 Unit Tests Passed (142ms).' },
          { tag: 'INTEGRATION', color: 'text-emerald-400', text: '16 / 16 Integration Flows Verified (218ms).' },
          { tag: 'COVERAGE', color: 'text-[#FF5500]', text: 'Code Coverage: 98.4% (Threshold: >= 95.0%).' },
          { tag: 'SUCCESS', color: 'text-emerald-400', text: 'Zero regressions detected. Production deployment gate unlocked.' },
        ];
      } else if (trimmed === 'nova status --mesh') {
        outputLines = [
          { tag: 'MESH-NODE', color: 'text-blue-400', text: 'Inspecting 12 globally replicated edge clusters...' },
          { tag: 'NODES', color: 'text-slate-300', text: 'iad-01 (US-East: 14ms) &bull; sfo-02 (US-West: 22ms) &bull; fra-01 (EU-Central: 31ms).' },
          { tag: 'HEALTH', color: 'text-emerald-400', text: 'Core API Gateway: 99.999% uptime &bull; Active WebSocket sessions: 14,820.' },
          { tag: 'SUCCESS', color: 'text-emerald-400', text: 'All edge clusters nominal. Zero latency spikes reported.' },
        ];
      } else {
        outputLines = [
          { tag: 'CLI-EXEC', color: 'text-[#FF5500]', text: `Executing custom query: "${trimmed}"` },
          { tag: 'AI-REASON', color: 'text-orange-400', text: 'Contextual code repository index consulted. Zero anomalies detected.' },
          { tag: 'COMPLETED', color: 'text-emerald-400', text: 'Command processed cleanly with exit code 0.' },
        ];
      }

      setLogs((prev) => [
        ...prev,
        {
          type: 'output',
          lines: outputLines,
          duration: `${Math.floor(Math.random() * 80) + 120}ms`,
        },
      ]);
      setIsExecuting(false);
    }, 400);
  };

  const handleClear = () => {
    soundService.playChime('actionClick');
    setLogs(INITIAL_LOGS);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="space-y-4">
      {/* Terminal Title Bar */}
      <div className="bg-zinc-900/80 rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-[#FF5500]">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">nova-cli-sandbox</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                ● Live 18ms
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Interactive terminal runtime with real-time AI log streaming
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onOpenDemo('walkthrough')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Launch full interactive demo studio"
          >
            <Play className="w-3 h-3 text-[#FF5500] fill-current" />
            <span className="hidden xs:inline">Studio Demo</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Clear terminal buffer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Preset Quick-Action Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-mono text-slate-400 shrink-0 select-none">Presets:</span>
        {PRESET_COMMANDS.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.cmd}
              onClick={() => executeCommand(preset.cmd)}
              disabled={isExecuting}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF5500]/50 text-slate-300 hover:text-white transition-all text-xs font-mono shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title={preset.desc}
            >
              <Icon className="w-3 h-3 text-[#FF5500]" />
              <span>{preset.cmd}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Screen */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="rounded-xl border border-white/10 bg-zinc-950 p-4 font-mono text-xs shadow-inner h-80 overflow-y-auto space-y-3 cursor-text"
      >
        {logs.map((entry, idx) => {
          if (entry.type === 'banner') {
            return (
              <div key={idx} className="pb-3 mb-2 border-b border-white/10 text-slate-400 space-y-1 text-[11px]">
                {entry.lines.map((line, lIdx) => (
                  <p key={lIdx} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </div>
            );
          }

          if (entry.type === 'command') {
            return (
              <div key={idx} className="flex items-center gap-2 text-white pt-1">
                <span className="text-[#FF5500] font-bold select-none">&gt;</span>
                <span className="text-white font-semibold">{entry.text}</span>
                <span className="text-[10px] text-slate-500 ml-auto select-none">{entry.time}</span>
              </div>
            );
          }

          if (entry.type === 'output') {
            return (
              <div key={idx} className="space-y-1.5 pl-3 border-l-2 border-[#FF5500]/30 my-2">
                {entry.lines.map((line, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                    <span className={`font-bold shrink-0 ${line.color}`}>[{line.tag}]</span>
                    <span className="text-slate-300">{line.text}</span>
                  </div>
                ))}
                <div className="text-[10px] text-slate-500 pt-0.5">
                  &bull; Executed in <span className="text-[#FF5500]">{entry.duration}</span>
                </div>
              </div>
            );
          }

          return null;
        })}

        {isExecuting && (
          <div className="flex items-center gap-2 text-xs text-[#FF5500] animate-pulse pl-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
            <span>Processing command with AI reasoning engine...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Command Input Prompt Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <span className="absolute left-3.5 text-xs font-mono font-bold text-[#FF5500] select-none">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Try typing: nova sprint triage  or  nova test --coverage"
          disabled={isExecuting}
          className="w-full pl-8 pr-12 py-2.5 rounded-xl bg-zinc-900 border border-white/15 focus:border-[#FF5500] text-xs font-mono text-white placeholder:text-slate-500 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isExecuting}
          className="absolute right-2 px-2.5 py-1.5 rounded-lg bg-[#FF5500] text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#ff6a1a] transition-all cursor-pointer font-bold"
          title="Run command"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
