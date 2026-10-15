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
    big: 'text-base sm:text-lg text-slate-300 leading-relaxed',
    medium: 'text-sm sm:text-base text-slate-400 leading-relaxed',
    small: 'text-xs sm:text-sm text-slate-500 leading-normal',
  };

  return (
    <p className={cn(variantStyles[variant], className)}>
      {children}
    </p>
  );
}
