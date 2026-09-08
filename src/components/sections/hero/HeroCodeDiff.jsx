import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Columns,
  AlignLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';

const LEGACY_CODE_LINES = [
  { num: 1, text: '// Legacy OAuth refresh - single region, no retry' },
  { num: 2, text: 'async function refreshToken(token: string) {' },
  { num: 3, text: '  const res = await fetch("/api/v1/auth", {' },
  { num: 4, text: '    method: "POST",' },
  { num: 5, text: '    body: JSON.stringify({ token })' },
  { num: 6, text: '  });' },
  { num: 7, text: '  // WARNING: unhandled timeout & replay vulnerability' },
  { num: 8, text: '  return await res.json();' },
  { num: 9, text: '}' },
];

const REFACTORED_CODE_LINES = [
  { num: 1, text: '// NOVA AI Zero-Trust Multi-Region Circuit Breaker' },
  { num: 2, text: 'export async function rotateToken(session: SessionToken): Promise<SecureToken> {' },
  { num: 3, text: '  return circuitBreaker.execute(async () => {' },
  { num: 4, text: '    const payload = await securityService.signAESGCM(session);' },
  { num: 5, text: '    const replica = await geoRouter.getFastestReplica();' },
  { num: 6, text: '    return await replica.post("/api/v2/auth/rotate", payload, {' },
  { num: 7, text: '      timeoutMs: 1200,' },
  { num: 8, text: '      retryPolicy: "exponential-backoff",' },
  { num: 9, text: '      maxAttempts: 3' },
  { num: 10, text: '    });' },
  { num: 11, text: '  });' },
  { num: 12, text: '}' },
];

const UNIFIED_DIFF_LINES = [
  { type: 'context', oldNum: 1, newNum: 1, text: ' import { securityService, geoRouter } from "@nova/core";' },
  { type: 'context', oldNum: 2, newNum: 2, text: ' import { circuitBreaker } from "./circuitBreaker";' },
  { type: 'del', oldNum: 3, newNum: null, text: '-// Legacy OAuth refresh - single region, no retry' },
  { type: 'del', oldNum: 4, newNum: null, text: '-async function refreshToken(token: string) {' },
  { type: 'del', oldNum: 5, newNum: null, text: '-  const res = await fetch("/api/v1/auth", {' },
  { type: 'del', oldNum: 6, newNum: null, text: '-    method: "POST",' },
  { type: 'del', oldNum: 7, newNum: null, text: '-    body: JSON.stringify({ token })' },
  { type: 'del', oldNum: 8, newNum: null, text: '-  });' },
  { type: 'del', oldNum: 9, newNum: null, text: '-  return await res.json();' },
  { type: 'del', oldNum: 10, newNum: null, text: '-}' },
  { type: 'add', oldNum: null, newNum: 3, text: '+// NOVA AI Zero-Trust Multi-Region Circuit Breaker' },
  { type: 'add', oldNum: null, newNum: 4, text: '+export async function rotateToken(session: SessionToken): Promise<SecureToken> {' },
  { type: 'add', oldNum: null, newNum: 5, text: '+  return circuitBreaker.execute(async () => {' },
  { type: 'add', oldNum: null, newNum: 6, text: '+    const payload = await securityService.signAESGCM(session);' },
  { type: 'add', oldNum: null, newNum: 7, text: '+    const replica = await geoRouter.getFastestReplica();' },
  { type: 'add', oldNum: null, newNum: 8, text: '+    return await replica.post("/api/v2/auth/rotate", payload, {' },
  { type: 'add', oldNum: null, newNum: 9, text: '+      timeoutMs: 1200,' },
  { type: 'add', oldNum: null, newNum: 10, text: '+      retryPolicy: "exponential-backoff",' },
  { type: 'add', oldNum: null, newNum: 11, text: '+      maxAttempts: 3' },
  { type: 'add', oldNum: null, newNum: 12, text: '+    });' },
  { type: 'add', oldNum: null, newNum: 13, text: '+  });' },
  { type: 'add', oldNum: null, newNum: 14, text: '+}' },
];

export function HeroCodeDiff({ isPrMerged, onMergePr, onOpenDemo }) {
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'unified'
  const [ciStatus, setCiStatus] = useState('idle'); // 'idle' | 'running' | 'passed'
  const [copied, setCopied] = useState(false);

  const handleRunCI = () => {
    soundService.playChime('actionClick');
    setCiStatus('running');
    setTimeout(() => {
      setCiStatus('passed');
      soundService.playChime('actionClick');
    }, 450);
  };

  const handleMerge = () => {
    if (isPrMerged) return;
    onMergePr();
  };

  const handleCopyCode = () => {
    const codeString = REFACTORED_CODE_LINES.map((l) => l.text).join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeString).catch(() => {});
    }
    soundService.playChime('actionClick');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top PR Header Bar */}
      <div className="bg-[#0b0c33]/80 rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#6833FF]/20 border border-[#8E6FFF]/30 text-[#A78BFA]">
            <GitPullRequest className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#D8B452]">PR #142</span>
              <span className="text-xs font-bold text-white">
                feat(auth): zero-trust token rotation & multi-region failover
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                  isPrMerged
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#D8B452]/20 text-[#D8B452] border border-[#D8B452]/30'
                }`}
              >
                {isPrMerged ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Merged into main
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8B452] animate-pulse" /> Open for Review
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Authored by <span className="text-slate-300 font-mono">nova-copilot-bot</span> &bull; Branch{' '}
              <span className="text-[#8E6FFF] font-mono">feat/pr-summarizer</span> &rarr;{' '}
              <span className="text-emerald-400 font-mono">main</span>
            </p>
          </div>
        </div>

        {/* View Mode Switches & Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Split / Unified Toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'split' ? 'bg-[#D8B452] text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Side-by-side comparison"
            >
              <Columns className="w-3 h-3" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'unified' ? 'bg-[#D8B452] text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Unified inline diff"
            >
              <AlignLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Unified</span>
            </button>
          </div>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Copy refactored code to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Action Ribbon */}
      <div className="bg-[#0b0c33]/60 rounded-xl p-3 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          {ciStatus === 'idle' && (
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D8B452]" /> CI Matrix: Ready to verify (18 tests pending)
            </span>
          )}
          {ciStatus === 'running' && (
            <span className="text-[#8E6FFF] flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#8E6FFF] animate-spin" /> Running test suite across 4 edge replicas...
            </span>
          )}
          {ciStatus === 'passed' && (
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CI Matrix Passed: 18 unit &bull; 4 integration &bull; 0 regressions (340ms)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleRunCI}
            disabled={ciStatus === 'running'}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-[#D8B452] fill-current" />
            <span>{ciStatus === 'passed' ? 'Re-run CI' : 'Run CI Tests'}</span>
          </button>

          <button
            onClick={handleMerge}
            disabled={isPrMerged}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isPrMerged
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-[#D8B452] to-[#B38722] hover:scale-105 active:scale-95 text-black'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isPrMerged ? 'Merged to main' : 'Approve & Merge'}</span>
          </button>
        </div>
      </div>

      {/* Merged Banner */}
      {isPrMerged && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-3 animate-fade-in text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300">
              PR #142 successfully merged into <strong className="font-mono">main</strong>. Sprint velocity updated and deployment synchronized!
            </span>
          </div>
          <button
            onClick={() => onOpenDemo('changelog')}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer shrink-0"
          >
            View Changelog &rarr;
          </button>
        </div>
      )}

      {/* Code Diff Display Container */}
      <div className="rounded-xl border border-white/10 bg-[#050614] overflow-hidden shadow-inner font-mono text-xs">
        {viewMode === 'split' ? (
          /* Split View */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Left: Legacy Code */}
            <div className="p-3 sm:p-4 bg-rose-950/15">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-500/20 text-[11px] text-rose-400 font-bold uppercase tracking-wider">
                <span>Legacy (Single Point of Failure)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">-9 lines</span>
              </div>
              <div className="space-y-1 overflow-x-auto text-[11px] leading-relaxed">
                {LEGACY_CODE_LINES.map((line) => (
                  <div key={line.num} className="flex items-start gap-2 hover:bg-rose-500/10 px-1.5 py-0.5 rounded">
                    <span className="text-rose-500/60 select-none w-5 text-right shrink-0">{line.num}</span>
                    <span className="text-rose-400/80 select-none">-</span>
                    <span className="text-rose-200 whitespace-pre">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Refactored Code */}
            <div className="p-3 sm:p-4 bg-emerald-950/15">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-500/20 text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D8B452]" /> NOVA AI Zero-Trust Refactor
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">+12 lines</span>
              </div>
              <div className="space-y-1 overflow-x-auto text-[11px] leading-relaxed">
                {REFACTORED_CODE_LINES.map((line) => (
                  <div key={line.num} className="flex items-start gap-2 hover:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    <span className="text-emerald-500/60 select-none w-5 text-right shrink-0">{line.num}</span>
                    <span className="text-emerald-400 select-none">+</span>
                    <span className="text-emerald-200 whitespace-pre">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Unified View */
          <div className="p-3 sm:p-4 overflow-x-auto text-[11px] leading-relaxed space-y-1">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[11px] text-slate-400 font-bold">
              <span>auth/tokenService.ts</span>
              <span className="text-[10px] text-slate-400 font-mono">@@ -1,9 +1,12 @@</span>
            </div>
            {UNIFIED_DIFF_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 px-2 py-0.5 rounded ${
                  line.type === 'del'
                    ? 'bg-rose-950/30 text-rose-300 hover:bg-rose-950/50'
                    : line.type === 'add'
                    ? 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="w-6 text-right select-none text-slate-600 shrink-0">
                  {line.oldNum || ''}
                </span>
                <span className="w-6 text-right select-none text-slate-600 shrink-0">
                  {line.newNum || ''}
                </span>
                <span className="select-none font-bold shrink-0">
                  {line.type === 'del' ? '-' : line.type === 'add' ? '+' : ' '}
                </span>
                <span className="whitespace-pre flex-1">{line.text.replace(/^[+-]/, '')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
