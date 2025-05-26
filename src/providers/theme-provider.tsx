
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme; // Actual theme being used (resolves 'system')
};

const initialState: ThemeProviderState = {
  theme: 'light', // This 'theme' can be 'system', 'light', or 'dark' from user choice
  setTheme: () => null,
  resolvedTheme: 'light', // This is always 'light' or 'dark'
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light', // This is the fallback if no system/stored preference
  storageKey = 'devspot-theme',
}: ThemeProviderProps) {
  // `userTheme` stores the user's explicit choice: 'light', 'dark', or potentially 'system'
  const [userTheme, setUserTheme] = useState<Theme | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(storageKey) as Theme | 'system' | null;
      if (storedTheme) {
        return storedTheme;
      }
      // If no stored theme, default to 'system' to respect OS preference initially
      // Or you can default to `defaultTheme` directly. Let's use `defaultTheme` for simplicity now.
      return defaultTheme; 
    }
    return defaultTheme;
  });

  // `resolvedTheme` is always 'light' or 'dark', derived from `userTheme` or system preference
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let currentTheme: Theme;
      if (userTheme === 'dark') {
        currentTheme = 'dark';
      } else { // userTheme is 'light'
        currentTheme = 'light';
      }
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(currentTheme);
      setResolvedTheme(currentTheme);
      localStorage.setItem(storageKey, userTheme);
    }
  }, [userTheme, storageKey]);
  
  // Effect to listen to system theme changes IF userTheme is 'system'
  // For this iteration, we are not supporting 'system' theme explicitly via UI.
  // The initial load might check system preference if no localStorage item is found.

  const value = {
    theme: userTheme, // This is what the user selected ('light' or 'dark')
    setTheme: (newThemeChoice: Theme) => { // newThemeChoice is 'light' or 'dark'
      setUserTheme(newThemeChoice);
    },
    resolvedTheme, // This is the actual theme applied ('light' or 'dark')
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
