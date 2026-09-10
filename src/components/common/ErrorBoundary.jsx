import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw, Home } from 'lucide-react';

/**
 * Production-Grade Error Boundary for NOVA AI Platform
 * Catches JavaScript errors anywhere in child component tree,
 * logs error information, and displays a graceful cybernetic fallback UI.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Production telemetry / logging hook point
    if (process.env.NODE_ENV === 'development') {
      console.error('[NOVA ErrorBoundary] Uncaught runtime exception:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetSession = () => {
    try {
      localStorage.removeItem('nova_active_workspace');
      localStorage.removeItem('nova_user_team_size');
      localStorage.removeItem('nova_user_avg_salary');
    } catch {
      // storage non-blocking
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05060A] text-slate-900 dark:text-white flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#FF5500]/20 selection:text-[#FF5500]">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-6 text-center">
            {/* Holographic Alert Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5500] shadow-lg shadow-orange-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-black uppercase tracking-widest text-orange-600 dark:text-[#FF5500]">
                Runtime Protection Circuit Engaged
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Application Exception Intercepted
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                NOVA&apos;s Zero-Trust client architecture isolated an unexpected rendering anomaly to protect your active workspace state.
              </p>
            </div>

            {/* Collapsible Error Log (Non-intrusive) */}
            {this.state.error && (
              <details className="text-left rounded-xl bg-slate-900 text-slate-300 p-3.5 text-xs font-mono border border-white/10 overflow-x-auto cursor-pointer group">
                <summary className="font-bold text-slate-400 hover:text-[#FF5500] select-none transition-colors">
                  Diagnostic Telemetry Details
                </summary>
                <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-rose-400 space-y-1">
                  <p className="font-bold">{this.state.error.toString()}</p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-slate-400 text-[10px] whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetSession}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Session</span>
              </button>

              <a
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/30 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
