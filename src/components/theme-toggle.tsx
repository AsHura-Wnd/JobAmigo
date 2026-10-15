'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

export default function ThemeToggle({ className = '', showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-1.5 rounded-xl border transition-all duration-200 select-none ${
        isDark
          ? 'bg-stone-900 border-yellow-500/40 text-yellow-400 hover:border-yellow-400 hover:bg-stone-800'
          : 'bg-stone-100 border-stone-200 text-stone-700 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900'
      } ${className}`}
      title={
        isDark
          ? 'Dark Mode Active (White Cards). Click for Light Mode (Black Cards)'
          : 'Light Mode Active (Black Cards). Click for Dark Mode (White Cards)'
      }
      aria-label="Toggle theme mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-yellow-400 animate-in spin-in-90 duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-stone-800 animate-in spin-in-90 duration-300" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold pr-1.5">
          {isDark ? 'Dark (White Cards)' : 'Light (Black Cards)'}
        </span>
      )}
    </button>
  );
}
