'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ControlButtonsProps {
  currentIndex: number;
  totalSlides: number;
  isAutoPlaying: boolean;
  isFullscreen: boolean;
  isAllViewMode: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  onToggleFullscreen: () => void;
  onShare: () => void;
  className?: string;
}

export function ControlButtons({
  currentIndex,
  totalSlides,
  isAutoPlaying,
  isFullscreen,
  isAllViewMode,
  onPrevious,
  onNext,
  onToggleAutoPlay,
  onToggleFullscreen,
  onShare,
  className
}: ControlButtonsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2 flex-wrap", className)}>
      {!isAllViewMode && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onToggleAutoPlay}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-8 bg-border mx-2" />
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onShare}
        aria-label="Share this guide"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
