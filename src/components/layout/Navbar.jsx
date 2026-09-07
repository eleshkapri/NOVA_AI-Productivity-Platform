import React, { useState, useEffect, useRef } from 'react';
import { navLinks } from '../../data/navigation';
import { Button } from '../common/Button';
import { Sun, Moon, Menu, X, ArrowRight, Search } from 'lucide-react';

export function Navbar({ isDark, toggleTheme, onOpenDemo, onOpenTrial, onOpenCommandPalette }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Magnetic Nav Pill / Active-Item Halo state
  const navContainerRef = useRef(null);
  const [haloStyle, setHaloStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollThreshold = 8;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 20);

          if (currentScrollY > 60) {
            if (currentScrollY > lastScrollY + scrollThreshold) {
              // Scrolling down the page -> hide navbar with smooth slide up
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY - scrollThreshold) {
              // Scrolling up the page -> reveal navbar with smooth slide down
              setIsVisible(true);
            }
          } else {
            // At the top of the page -> always visible
            setIsVisible(true);
          }

          lastScrollY = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkHover = (e) => {
    const target = e.currentTarget;
    if (navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setHaloStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  };

  const handleNavLeave = () => {
    setHaloStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } catch {
      // Ignore invalid query selector
    }
  };

  return (
    <header
      style={{ borderBottom: 'none' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform border-none ${
        isVisible || isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#050614]/95 backdrop-blur-xl shadow-lg dark:shadow-2xl dark:shadow-black/70 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo with Soufflet-style Totem Emblem */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] rounded-lg p-1"
          >
            <div className="w-9 h-9 flex items-center justify-center text-[#a1741a] dark:text-[#D8B452] transition-transform duration-500 group-hover:rotate-90">
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
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest uppercase text-slate-900 dark:text-white">
                NOVA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a1741a] dark:text-[#D8B452] font-bold -mt-1">
                AI Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Magnetic Pill / Active-Item Halo */}
          <div
            ref={navContainerRef}
            onMouseLeave={handleNavLeave}
            className="hidden md:flex items-center relative rounded-full p-1 border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-[#0b0c33]/60 backdrop-blur-md"
          >
            {/* The Gliding Magnetic Halo Pill */}
            <div
              className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none bg-[#D8B452]/20 border border-[#b8860b]/30 dark:bg-[#D8B452]/15 dark:border-[#D8B452]/40 shadow-xs"
              style={{
                transform: `translateX(${haloStyle.left}px)`,
                width: `${haloStyle.width}px`,
                opacity: haloStyle.opacity,
              }}
            />

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={handleLinkHover}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative z-10 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:text-[#a1741a] dark:hover:text-[#D8B452] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#roi-calculator"
              onMouseEnter={handleLinkHover}
              onClick={(e) => handleNavClick(e, '#roi-calculator')}
              className="relative z-10 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-[#a1741a] dark:text-[#D8B452] hover:text-black dark:hover:text-white transition-colors"
            >
              ROI Calculator
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette"
              title="Search / Command Palette (⌘K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0c33] text-slate-600 dark:text-slate-400 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:border-[#D8B452]/40 transition-colors text-xs cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-[#a1741a] dark:text-[#D8B452]" />
              <span className="text-[11px] font-mono font-semibold">⌘K</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0c33] text-slate-700 dark:text-slate-300 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:border-[#D8B452]/40 transition-colors cursor-pointer shadow-xs"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D8B452]" /> : <Moon className="w-4 h-4 text-[#a1741a]" />}
            </button>

            {/* Watch Demo CTA */}
            <Button variant="ghost" size="sm" onClick={onOpenDemo} className="text-slate-700 dark:text-slate-300 hover:text-[#8E6FFF] dark:hover:text-[#A78BFA]">
              Demo
            </Button>

            {/* Primary CTA with Orchid Violet Style */}
            <Button
              variant="orchid"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onOpenTrial || onOpenDemo}
            >
              Free Trial
            </Button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCommandPalette}
              aria-label="Search"
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-[#a1741a] dark:text-[#D8B452]"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D8B452]" /> : <Moon className="w-4 h-4 text-[#a1741a]" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-800 dark:text-slate-200 hover:text-[#D8B452] cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white/98 dark:bg-[#050614]/98 backdrop-blur-2xl border-b border-slate-200 dark:border-[#D8B452]/20 shadow-2xl px-5 pt-5 pb-8 mt-3 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#roi-calculator"
              onClick={(e) => handleNavClick(e, '#roi-calculator')}
              className="px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase text-[#a1741a] dark:text-[#D8B452] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              ROI Calculator
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setIsOpen(false);
                onOpenDemo();
              }}
            >
              Watch Interactive Demo
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setIsOpen(false);
                if (onOpenTrial) {
                  onOpenTrial();
                } else {
                  onOpenDemo();
                }
              }}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
