import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return true;

  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    return saved === 'true';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyThemeClass = (isDark: boolean) => {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#0F0F0F' : '#F3F6F8');
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    applyThemeClass(darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Follow system preference only when user hasn't chosen manually yet
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkModeState(event.matches);
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    setDarkModeState(value);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
