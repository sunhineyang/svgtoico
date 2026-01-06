'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  direction?: 'left' | 'right' | 'none';
}

export function SlideContainer({ children, className, isActive, direction = 'none' }: SlideContainerProps) {
  return (
    <div
      className={cn(
        "w-full h-full transition-all duration-500 ease-in-out overflow-y-auto",
        "absolute inset-0",
        isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0",
        direction === 'left' && !isActive && "-translate-x-full",
        direction === 'right' && !isActive && "translate-x-full",
        className
      )}
      aria-hidden={!isActive}
      role="region"
    >
      {children}
    </div>
  );
}
