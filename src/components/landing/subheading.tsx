import React from 'react';
import { cn } from '@/lib/utils';

export default function SubHeading({
  children,
  variant = 'medium',
  className,
}: {
  children: React.ReactNode;
  variant?: 'small' | 'medium' | 'big';
  className?: string;
}) {
  const variantStyles = {
    big: 'text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors',
    medium: 'text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed transition-colors',
    small: 'text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-normal transition-colors',
  };

  return (
    <p className={cn(variantStyles[variant], className)}>
      {children}
    </p>
  );
}
