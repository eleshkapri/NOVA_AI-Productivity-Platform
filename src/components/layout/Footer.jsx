import React, { useState } from 'react';
import { footerLinks } from '../../data/navigation';
import { ArrowRight, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your corporate email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please provide a valid email format (e.g. name@company.com).');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 600);
  };

  return (
    <footer id="footer" className="bg-slate-100/90 dark:bg-[#050614] border-t border-slate-200 dark:border-white/10 pt-20 pb-14 text-slate-800 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-[#a1741a] dark:text-[#D8B452]">
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
              <span className="text-2xl font-black tracking-widest uppercase text-slate-900 dark:text-white">
                NOVA
              </span>
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-normal">
              NOVA is the autonomous AI productivity platform engineered for elite engineering squads to master backlogs, eliminate developer toil, and ship with unmatched precision.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-[#D8B452]"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                All Systems Operational &bull; 99.99% Uptime
              </span>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0b0c33]/70 p-7 sm:p-9 rounded-3xl border border-slate-200 dark:border-[#D8B452]/20 shadow-md dark:shadow-xl backdrop-blur-2xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
              Stay ahead with the AI Engineering Dispatch
            </h4>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 font-normal">
              Join 42,000+ developers receiving our bi-weekly breakdown on AI sprint automation, PR velocity, and developer tooling.
            </p>

            {isSubmitted ? (
              <div className="mt-6 p-4.5 rounded-2xl bg-amber-50 dark:bg-[#D8B452]/10 border border-[#a1741a]/30 dark:border-[#D8B452]/30 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Subscription Confirmed
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    We just dispatched our Engineering Velocity Playbook directly to your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="alex@company.com"
                      className={`w-full px-5 py-3 text-sm rounded-full bg-slate-50 dark:bg-[#050614] border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8B452] transition-all ${
                        error
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                          : 'border-slate-200 dark:border-white/10 hover:border-[#a1741a]/30'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#D8B452] to-[#B88A23] text-black shadow-md shadow-[#D8B452]/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1.5 mt-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  Zero spam. Unsubscribe at any time with a single click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-5">
              Product
            </h5>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-5">
              Solutions
            </h5>
            <ul className="space-y-3">
              {footerLinks.solutions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-5">
              Resources
            </h5>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-5">
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Socials */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} NOVA Technologies Inc. Inspired by Soufflet Malt luxury architecture.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
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
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
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
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
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
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
