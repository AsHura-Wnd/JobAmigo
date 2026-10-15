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
    big: 'text-base sm:text-lg text-stone-600 leading-relaxed',
    medium: 'text-sm sm:text-base text-stone-600 leading-relaxed',
    small: 'text-xs sm:text-sm text-stone-500 leading-normal',
  };

  return (
    <p className={cn(variantStyles[variant], className)}>
      {children}
    </p>
  );
}
