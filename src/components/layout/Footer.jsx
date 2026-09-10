import React, { useState } from 'react';
import { footerLinks } from '../../data/navigation';
import { securityService } from '../../services/SecurityService';
import { soundService } from '../../services/SoundService';
import { smoothScrollService } from '../../services/SmoothScrollService';
import { ArrowRight, Check, AlertCircle, MessageSquare } from 'lucide-react';

export function Footer({ onOpenModal }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = securityService.sanitizeString(email, 120);

    if (!cleanEmail) {
      setError('Please enter your work email.');
      return;
    }

    if (!securityService.validateEmail(cleanEmail)) {
      setError('Please enter a valid email format.');
      return;
    }

    setIsLoading(true);
    soundService.playChime('actionClick');
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 500);
  };

  const handleFooterClick = (e, item) => {
    e.preventDefault();
    soundService.playChime('actionClick');

    if (item.href && item.href.startsWith('#') && item.href.length > 1) {
      try {
        const el = document.querySelector(item.href);
        if (el) {
          smoothScrollService.scrollTo(el, { offset: -80, duration: 1.5 });
          return;
        }
      } catch {
        // Fallthrough
      }
    }

    if (!onOpenModal) return;

    const lower = item.name.toLowerCase();
    if (lower.includes('documentation') || lower.includes('api reference')) {
      onOpenModal('docs');
    } else if (lower.includes('status')) {
      onOpenModal('status');
    } else if (lower.includes('changelog') || lower.includes('roadmap')) {
      onOpenModal('changelog');
    } else if (
      lower.includes('security') ||
      lower.includes('privacy') ||
      lower.includes('terms') ||
      lower.includes('careers') ||
      lower.includes('compliance')
    ) {
      onOpenModal('contact');
    } else if (lower.includes('discord')) {
      window.open('https://discord.com', '_blank');
    } else {
      onOpenModal('backlog');
    }
  };

  return (
    <footer id="footer" className="bg-slate-50/70 dark:bg-[#05060A] backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/10 pt-16 pb-8 text-slate-800 dark:text-white transition-colors relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid: Brand (4 cols) + Navigation Columns (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12">
          {/* Brand & Newsletter Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollService.scrollTo(0, { duration: 1.5 });
              }}
              className="inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#FF5500] group-hover:rotate-90 transition-transform duration-500">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M4.919 20.0389L6.967 17.9751H13.918V24.9797L11.87 27.0435C8.72 30.2174 4.453 31.9999 0 31.9999C0 27.5126 1.769 23.2129 4.919 20.0389Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.87 4.95635L13.918 7.0202V14.0248H6.967L4.919 11.9609C1.769 8.78697 0 4.4873 0 0C4.453 0 8.72 1.78241 11.87 4.95635Z"
                    fill="currentColor"
                  />
                  <path
                    d="M26.843 11.9609L24.795 14.0248H17.844V7.0202L19.892 4.95635C23.042 1.78241 27.308 0 31.761 0C31.761 4.4873 29.993 8.78697 26.848 11.9609"
                    fill="currentColor"
                  />
                  <path
                    d="M19.892 27.0489L17.844 24.985V17.9805H24.795L26.843 20.0443C29.993 23.2183 31.761 27.5179 31.761 32.0052C27.308 32.0052 23.042 30.2228 19.892 27.0489Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl font-black tracking-widest uppercase text-slate-900 dark:text-white">
                NOVA
              </span>
            </a>

            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm font-normal">
              Autonomous sprint intelligence and automated PR reviews for high-velocity engineering squads.
            </p>

            {/* Live Uptime Status Indicator */}
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('status')}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational &bull; 99.99%</span>
            </button>

            {/* Minimalist Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Engineering Dispatch
              </p>
              {isSubmitted ? (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2.5">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Subscribed to bi-weekly engineering updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5 max-w-sm">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter work email..."
                      className={`w-full pl-3.5 pr-24 py-2 text-xs rounded-xl bg-white dark:bg-zinc-950 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF5500] transition-colors ${
                        error
                          ? 'border-rose-500'
                          : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-1 px-3 py-1 text-xs font-bold rounded-lg bg-[#FF5500] text-black hover:bg-[#FF6600] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
                    >
                      {isLoading ? (
                        <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Join <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Clean Link Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Product
              </p>
              <ul className="space-y-2.5">
                {footerLinks.product.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterClick(e, item)}
                      className="text-xs text-slate-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Solutions
              </p>
              <ul className="space-y-2.5">
                {footerLinks.solutions.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterClick(e, item)}
                      className="text-xs text-slate-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Resources
              </p>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterClick(e, item)}
                      className="text-xs text-slate-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Company
              </p>
              <ul className="space-y-2.5">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterClick(e, item)}
                      className="text-xs text-slate-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Minimalist Bottom Bar: Copyright + Legal + Socials */}
        <div className="pt-8 border-t border-slate-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} NOVA Technologies Inc. All rights reserved.
          </p>

          {/* Quick Legal Links */}
          <div className="flex items-center gap-4 text-slate-500 dark:text-zinc-400">
            <button
              onClick={() => onOpenModal && onOpenModal('contact')}
              className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onOpenModal && onOpenModal('contact')}
              className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onOpenModal && onOpenModal('contact')}
              className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              Security
            </button>
          </div>

          {/* Monochrome Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X profile"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord community"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
