import React, { useState } from 'react';
import {
  GitPullRequest,
  Search,
  Sparkles,
  Tag,
  Check,
  ChevronDown,
  ChevronUp,
  Rss,
  Calendar,
  Layers,
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';

const RELEASES = [
  {
    version: 'v2.4.1',
    isLatest: true,
    tag: 'Latest Release',
    date: 'Released Today',
    categories: ['AI Copilot', 'Core Engine', 'Interactive Studio'],
    summary:
      'Hero Console interactive playground with real-time sprint Kanban, live PR diff inspector, developer CLI terminal sandbox, and multi-region failover resilience.',
    changes: [
      { type: 'feat', text: 'Interactive Active Sprint Kanban with autonomous story point calculation and velocity tracking.' },
      { type: 'feat', text: 'Live PR Code Diff Inspector with split/unified views and CI check matrix runner.' },
      { type: 'feat', text: 'AI CLI Developer Sandbox supporting dynamic command evaluation and ANSI-style log streaming.' },
      { type: 'perf', text: 'Zero-dependency optimization: purged unused code, reducing production build times to <400ms.' },
    ],
    stats: {
      diff: '+1,041 / -267 lines',
      components: '4 components',
      pr: 'PR #142',
    },
    author: 'NOVA Core Platform Squad',
  },
  {
    version: 'v2.4.0',
    isLatest: false,
    tag: 'Major Feature',
    date: '3 days ago',
    categories: ['AI Copilot', 'Security'],
    summary:
      'Multi-Agent PR Review Heuristics with AST-level circular dependency detection and automated Fibonacci story point calibration.',
    changes: [
      { type: 'feat', text: 'Deep AST parsing for TypeScript/React repositories detecting unhandled Promise rejections and circular dependencies.' },
      { type: 'feat', text: 'Historical sprint velocity calibration algorithm estimating tickets within 95% accuracy.' },
      { type: 'security', text: 'Replay attack prevention on webhook ingress payloads with AES-GCM verification.' },
    ],
    stats: {
      diff: '+840 / -112 lines',
      components: '6 components',
      pr: 'PR #138',
    },
    author: 'Autonomous AI Agent & Security Team',
  },
  {
    version: 'v2.3.8',
    isLatest: false,
    tag: 'Maintenance & UI',
    date: '12 days ago',
    categories: ['Infrastructure', 'Design System'],
    summary:
      'Zero-downtime database session migration across 12 replica database shards and luxury design token synchronization.',
    changes: [
      { type: 'infra', text: 'Zero-downtime migration scripts executed with zero session lockouts.' },
      { type: 'ui', text: 'Seamless dark/light theme transition with liquid gold progress indicators and custom cursor interactions.' },
      { type: 'perf', text: 'Optimized AudioContext singleton with graceful browser autoplay unlock heuristics.' },
    ],
    stats: {
      diff: '+310 / -85 lines',
      components: '3 components',
      pr: 'PR #126',
    },
    author: 'Infra & UX Engineering',
  },
  {
    version: 'v2.3.0',
    isLatest: false,
    tag: 'Security & Platform',
    date: '25 days ago',
    categories: ['Security', 'Integrations'],
    summary:
      '60-second GitHub & GitLab OAuth onboarding with SOC2 Type II automated continuous compliance reporting.',
    changes: [
      { type: 'feat', text: 'Automated repository indexing via GitHub App and GitLab Webhooks.' },
      { type: 'security', text: 'SOC2 Type II continuous evidence collection and zero-knowledge telemetry logging.' },
      { type: 'feat', text: 'Multi-region edge cluster routing with automated latency health probes.' },
    ],
    stats: {
      diff: '+1,250 / -430 lines',
      components: '8 components',
      pr: 'PR #110',
    },
    author: 'Enterprise Security Squad',
  },
];

const CATEGORIES = ['All Updates', 'AI Copilot', 'Core Engine', 'Infrastructure', 'Security', 'Design System'];

export function ChangelogView({ onClose: _onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Updates');
  const [expandedVersions, setExpandedVersions] = useState({ 'v2.4.1': true, 'v2.4.0': true });
  const [copiedRss, setCopiedRss] = useState(false);

  const toggleExpand = (version) => {
    soundService.playChime('actionClick');
    setExpandedVersions((prev) => ({ ...prev, [version]: !prev[version] }));
  };

  const handleCopyRss = () => {
    const rssUrl = `${window.location.origin}/releases.xml`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rssUrl).catch(() => {});
    }
    soundService.playChime('actionClick');
    setCopiedRss(true);
    setTimeout(() => setCopiedRss(false), 2000);
  };

  const filteredReleases = RELEASES.filter((rel) => {
    const matchesCategory =
      selectedCategory === 'All Updates' || rel.categories.includes(selectedCategory);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      rel.version.toLowerCase().includes(q) ||
      rel.summary.toLowerCase().includes(q) ||
      rel.changes.some((c) => c.text.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#6833FF]/15 via-zinc-950 to-[#FF5500]/15 border border-[#8E6FFF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-[#FF5500] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                NOVA Engine Release History
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-500/20 text-[#FF5500] font-mono font-bold">
                Latest: v2.4.1
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Continuous deployment pipeline with zero-downtime updates and semantic versioning
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyRss}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 active:scale-95"
          title="Copy RSS Feed URL"
        >
          {copiedRss ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied RSS!</span>
            </>
          ) : (
            <>
              <Rss className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>RSS Feed</span>
            </>
          )}
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundService.playChime('actionClick');
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF5500] text-black shadow-xs font-bold'
                  : 'bg-slate-100 dark:bg-zinc-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search releases..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500]"
          />
        </div>
      </div>

      {/* Release Items Timeline */}
      <div className="space-y-4">
        {filteredReleases.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 text-slate-500 text-xs italic">
            No release notes match your search criteria.
          </div>
        ) : (
          filteredReleases.map((rel) => {
            const isExpanded = expandedVersions[rel.version] !== false;
            return (
              <div
                key={rel.version}
                className={`rounded-2xl border transition-all ${
                  rel.isLatest
                    ? 'bg-slate-50 dark:bg-zinc-900/60 border-[#FF5500]/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(rel.version)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                        {rel.version}
                      </span>
                      {rel.isLatest && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Latest
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6833FF]/20 text-[#A78BFA] font-semibold">
                        {rel.tag}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#FF5500]" /> {rel.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hidden md:flex">
                      <GitPullRequest className="w-3 h-3 text-[#FF5500]" />
                      <span>{rel.stats.pr}</span>
                    </div>

                    <button
                      type="button"
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-200 dark:border-white/5 space-y-3">
                    {/* Category Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> Tags:
                      </span>
                      {rel.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Change list */}
                    <div className="space-y-1.5 font-mono text-xs">
                      {rel.changes.map((change, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <span
                            className={`px-1.5 py-0.2 rounded font-bold uppercase text-[9px] shrink-0 mt-0.5 ${
                              change.type === 'feat'
                                ? 'bg-orange-500/20 text-[#FF5500]'
                                : change.type === 'security'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : change.type === 'perf'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}
                          >
                            {change.type}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 font-sans">
                            {change.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-white/5 font-sans">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400">{rel.stats.diff}</span>
                        <span>&bull;</span>
                        <span>{rel.stats.components}</span>
                      </div>
                      <div>
                        <span>Author: </span>
                        <strong className="text-slate-700 dark:text-slate-300">{rel.author}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
