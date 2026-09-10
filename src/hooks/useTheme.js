import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/StorageService';

export function useTheme() {
  // Initialize theme: if user previously explicitly picked a theme, honor it; otherwise match OS/device
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = storageService.get('theme', null);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Track if the user has explicitly selected a manual override
  const [isManualOverride, setIsManualOverride] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = storageService.get('theme', null);
      return saved === 'dark' || saved === 'light';
    }
    return false;
  });

  // Synchronize document classes and CSS theme attributes with current theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Listen to OS/device system preference changes (e.g. device schedule changes day/night)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // If the user hasn't explicitly locked a theme, follow the device
      if (!storageService.get('theme', null)) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setThemeState(systemTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const setTheme = useCallback((nextTheme) => {
    const resolvedTheme = typeof nextTheme === 'function' ? nextTheme(theme) : nextTheme;
    setIsManualOverride(true);
    storageService.set('theme', resolvedTheme);
    setThemeState(resolvedTheme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setIsManualOverride(true);
    storageService.set('theme', next);

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.add('theme-transitioning');

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setThemeState(next);
        });
      } else {
        setThemeState(next);
      }

      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 550);
    } else {
      setThemeState(next);
    }
  }, [theme]);

  // Reset to device system preference
  const resetToSystemTheme = useCallback(() => {
    storageService.remove('theme');
    setIsManualOverride(false);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setThemeState(systemTheme);
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isManualOverride,
    toggleTheme,
    setTheme,
    resetToSystemTheme,
  };
}

