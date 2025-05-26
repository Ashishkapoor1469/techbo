
'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';

export function ThemeToggle() {
  // `theme` here is the user's choice ('light', 'dark')
  // `resolvedTheme` is the actual theme applied after considering system preference if theme is 'system'
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      id="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* We use resolvedTheme for display to accurately show sun/moon based on what's active */}
      {resolvedTheme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out transform " />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out transform " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
