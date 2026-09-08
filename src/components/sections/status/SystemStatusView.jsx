import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Send,
  Bell,
  Clock,
} from 'lucide-react';
import { soundService } from '../../../services/SoundService';

const INITIAL_REGIONS = [
  { id: 'iad-01', name: 'US-East (N. Virginia)', basePing: 14, status: 'Operational', uptime: '99.999%' },
  { id: 'sfo-02', name: 'US-West (Oregon)', basePing: 21, status: 'Operational', uptime: '100%' },
  { id: 'fra-01', name: 'EU-Central (Frankfurt)', basePing: 28, status: 'Operational', uptime: '99.995%' },
  { id: 'nrt-01', name: 'AP-Northeast (Tokyo)', basePing: 42, status: 'Operational', uptime: '100%' },
  { id: 'bom-01', name: 'AP-South (Mumbai)', basePing: 33, status: 'Operational', uptime: '99.99%' },
  { id: 'syd-01', name: 'AU-East (Sydney)', basePing: 58, status: 'Operational', uptime: '100%' },
];

const PAST_INCIDENTS = [
  {
    id: 'INC-104',
    title: 'Scheduled Maintenance: Global Edge Router TLS 1.3 Key Rotation',
    date: '3 days ago',
    duration: '8 mins (Zero downtime achieved)',
    status: 'Resolved',
    impact: 'None',
  },
  {
    id: 'INC-101',
    title: 'Upstream Webhook Throttling from GitHub Events API',
    date: '18 days ago',
    duration: '4 mins',
    status: 'Resolved',
    impact: 'Minor delay on commit webhooks (<2.1s queued, zero loss)',
  },
];

export function SystemStatusView({ onClose: _onClose }) {
  const [regions, setRegions] = useState(INITIAL_REGIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chaosState, setChaosState] = useState('idle'); // 'idle' | 'simulating' | 'rerouted' | 'recovered'
  const [chaosLogs, setChaosLogs] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Subtle live ping heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setRegions((prev) =>
        prev.map((reg) => {
          if (reg.status === 'Degraded (Simulated)') return reg;
          const jitter = Math.floor(Math.random() * 5) - 2;
          return { ...reg, basePing: Math.max(10, reg.basePing + jitter) };
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshPing = () => {
    soundService.playChime('actionClick');
    setIsRefreshing(true);
    setTimeout(() => {
      setRegions((prev) =>
        prev.map((reg) => ({
          ...reg,
          basePing: Math.max(10, reg.basePing + Math.floor(Math.random() * 4) - 2),
        }))
      );
      setIsRefreshing(false);
      soundService.playChime('actionClick');
    }, 500);
  };

  const handleChaosTest = () => {
    if (chaosState === 'simulating' || chaosState === 'rerouted') return;

    soundService.playChime('alert');
    setChaosState('simulating');
    setChaosLogs([
      '[CHAOS TEST] Injecting simulated regional network cut into US-East (iad-01)...',
    ]);

    // Drop US-East to degraded
    setRegions((prev) =>
      prev.map((r) =>
        r.id === 'iad-01' ? { ...r, status: 'Degraded (Simulated)', basePing: 380 } : r
      )
    );

    setTimeout(() => {
      soundService.playChime('actionClick');
      setChaosState('rerouted');
      setChaosLogs((prev) => [
        ...prev,
        '[FAILOVER] Zero-Trust Circuit Breaker triggered on iad-01!',
        '[GEO-ROUTER] Rerouting 4,280 active sessions to US-West (sfo-02) in 12ms...',
        '[HEALTH] 0 packets dropped. Synthetic canary checks verified 100% healthy.',
      ]);

      setTimeout(() => {
        soundService.playChime('stepAdvance');
        setChaosState('recovered');
        setChaosLogs((prev) => [
          ...prev,
          '[HEALED] iad-01 connectivity restored. Load redistributed across primary cluster.',
        ]);
        setRegions(INITIAL_REGIONS);

        setTimeout(() => {
          setChaosState('idle');
          setChaosLogs([]);
        }, 5000);
      }, 3000);
    }, 1500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) return;
    soundService.playChime('stepAdvance');
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
    setEmailInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#0b0c33] to-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-4 w-4 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                All Global Systems Operational
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                99.995% SLA
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Continuous multi-region zero-trust health monitoring across 6 global edge clusters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={handleRefreshPing}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#D8B452]' : ''}`} />
            <span>{isRefreshing ? 'Pinging...' : 'Ping Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Live System Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Webhook Ingestion</span>
            <Activity className="w-3.5 h-3.5 text-[#D8B452]" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
            14,820 <span className="text-xs font-normal text-slate-400">msg/s</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">● 8.4ms P99 latency</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>AI P99 Inference</span>
            <Zap className="w-3.5 h-3.5 text-[#8E6FFF]" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
            72 <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">● 0 queue backlog</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active WebSockets</span>
            <Server className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
            98,410 <span className="text-xs font-normal text-slate-400">conns</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">● 100% pool capacity</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Security Compliance</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
            SOC2 <span className="text-xs font-normal text-slate-400">Type II</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">● 0 audit findings</span>
        </div>
      </div>

      {/* Global Edge Regions Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-[#D8B452]" />
            Global Edge Node Mesh (6 Clusters)
          </h5>
          <span className="text-[11px] text-slate-500 font-mono">Last ping: Just now</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {regions.map((reg) => (
            <div
              key={reg.id}
              className={`p-3.5 rounded-xl border transition-all ${
                reg.status.includes('Degraded')
                  ? 'bg-rose-950/20 border-rose-500/50 text-rose-300'
                  : 'bg-slate-50 dark:bg-[#050614] border-slate-200 dark:border-white/10 hover:border-[#D8B452]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900 dark:text-white">{reg.id}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    reg.status.includes('Degraded')
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      reg.status.includes('Degraded') ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'
                    }`}
                  />
                  {reg.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-2 font-sans">
                {reg.name}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200 dark:border-white/5">
                <span className="text-slate-400 font-sans">Ping Latency</span>
                <span
                  className={`font-bold ${
                    reg.basePing > 100 ? 'text-rose-400' : 'text-[#D8B452]'
                  }`}
                >
                  {reg.basePing}ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chaos Simulator: Interactive Multi-Region Failover Demo */}
      <div className="p-4 rounded-xl bg-[#07081e] border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D8B452]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Chaos Resilience Playground
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                Zero-Downtime Test
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Simulate dropping the US-East cluster to observe NOVA's autonomous zero-loss circuit-breaker failover in real time.
            </p>
          </div>

          <button
            onClick={handleChaosTest}
            disabled={chaosState === 'simulating' || chaosState === 'rerouted'}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D8B452] hover:bg-[#b5953f] text-black transition-all cursor-pointer disabled:opacity-50 shrink-0 shadow-sm"
          >
            {chaosState === 'simulating'
              ? 'Cutting iad-01...'
              : chaosState === 'rerouted'
              ? 'Auto-Rerouting...'
              : chaosState === 'recovered'
              ? 'Self-Healed!'
              : 'Trigger Chaos Failover'}
          </button>
        </div>

        {/* Chaos Event Terminal Output */}
        {chaosLogs.length > 0 && (
          <div className="p-3 rounded-lg bg-[#040510] border border-white/10 font-mono text-[11px] space-y-1 text-slate-300 animate-fade-in">
            {chaosLogs.map((log, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  log.includes('FAILOVER') || log.includes('CHAOS')
                    ? 'text-rose-400'
                    : log.includes('HEALED')
                    ? 'text-emerald-400'
                    : 'text-[#D8B452]'
                }`}
              >
                <span>&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 90-Day Uptime Histogram Grid */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            90 Days Uptime History
          </span>
          <span className="font-mono text-emerald-500 font-bold">100% Operational</span>
        </div>
        {/* Continuous Bar Histogram */}
        <div className="grid grid-cols-45 sm:grid-cols-90 gap-0.5 h-8 items-end py-1">
          {Array.from({ length: 90 }).map((_, i) => (
            <div
              key={i}
              title={`Day ${90 - i} ago: 100% Uptime (Zero incidents)`}
              className="w-full bg-emerald-500/80 hover:bg-emerald-400 h-6 hover:h-7 rounded-[1px] transition-all cursor-pointer"
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
          <span>90 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Past Incident Log & Subscribe to Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Incident History */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D8B452]" /> Past Incidents (Last 30 Days)
            </span>
            <span className="text-[10px] text-emerald-500 font-bold">All Resolved</span>
          </div>

          <div className="space-y-2.5">
            {PAST_INCIDENTS.map((inc) => (
              <div
                key={inc.id}
                className="p-2.5 rounded-lg bg-white dark:bg-[#0b0c33] border border-slate-200 dark:border-white/5 space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#D8B452] font-bold">{inc.id}</span>
                  <span className="text-[10px] text-slate-400">{inc.date}</span>
                </div>
                <p className="text-xs font-medium text-slate-900 dark:text-white leading-snug">
                  {inc.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> {inc.status}
                  </span>
                  <span>{inc.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe to Status Updates */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050614] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Bell className="w-3.5 h-3.5 text-[#D8B452]" />
              Subscribe to Status Alerts
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Receive automated instant incident reports, multi-region failover alerts, and scheduled maintenance notifications directly in your inbox or webhook.
            </p>
          </div>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed! You will receive live incident alerts.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="dev-ops@company.com"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#07081e] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D8B452]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#D8B452] hover:bg-[#b5953f] text-black text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 block">
                Zero spam &bull; Unsubscribe with a single click anytime
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
