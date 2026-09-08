import { useState, useEffect } from 'react';
import { storageService } from '../services/StorageService';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = storageService.get('theme', null);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    storageService.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.add('theme-transitioning');

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
        });
      } else {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
      }

      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 550);
    } else {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
