import React from 'react';
import { cn } from '@/lib/utils';

export default function Heading({
  children,
  as: Tag = 'h2',
  variant = 'medium',
  className,
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'big' | 'medium' | 'small';
  className?: string;
}) {
  const variantStyles = {
    big: 'text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight',
    medium: 'text-2xl sm:text-4xl font-bold tracking-tight',
    small: 'text-xl sm:text-2xl font-bold tracking-tight',
  };

  return (
    <Tag className={cn(variantStyles[variant], 'text-stone-900 dark:text-stone-100 transition-colors', className)}>
      {children}
    </Tag>
  );
}
