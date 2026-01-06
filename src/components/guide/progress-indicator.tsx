'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function ProgressIndicator({ total, current, onDotClick, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} role="tablist" aria-label="Slide navigation">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
            current === index
              ? "bg-primary scale-110"
              : "bg-muted hover:bg-muted-foreground/50"
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={current === index}
          role="tab"
          tabIndex={current === index ? 0 : -1}
        />
      ))}
    </div>
  );
}
