'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SlideContainer } from '@/components/guide/slide-container';
import { ProgressIndicator } from '@/components/guide/progress-indicator';
import { ControlButtons } from '@/components/guide/control-buttons';
import { Slide1WhatIsSVG } from '@/components/guide/slides/slide-1-what-is-svg';
import { Slide2WhatIsICO } from '@/components/guide/slides/slide-2-what-is-ico';
import { Slide3WhyConvert } from '@/components/guide/slides/slide-3-why-convert';
import { Slide4ICOFormat } from '@/components/guide/slides/slide-4-ico-format';
import { Slide5QualityComparison } from '@/components/guide/slides/slide-5-quality-comparison';
import { Slide6UseCases } from '@/components/guide/slides/slide-6-use-cases';
import { Slide7FAQ } from '@/components/guide/slides/slide-7-faq';
import { cn } from '@/lib/utils';

const slides = [
  Slide1WhatIsSVG,
  Slide2WhatIsICO,
  Slide3WhyConvert,
  Slide4ICOFormat,
  Slide5QualityComparison,
  Slide6UseCases,
  Slide7FAQ,
];

const AUTO_PLAY_INTERVAL = 5000;
const STORAGE_KEY = 'svg-ico-guide-preferences';

interface GuidePreferences {
  autoPlay: boolean;
  autoplaySpeed: number;
}

export function GuidePage() {
  const t = useTranslations('guidePage');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAllViewMode, setIsAllViewMode] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadPreferences = useCallback((): GuidePreferences => {
    if (typeof window === 'undefined') return { autoPlay: false, autoplaySpeed: AUTO_PLAY_INTERVAL };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { autoPlay: false, autoplaySpeed: AUTO_PLAY_INTERVAL };
    } catch {
      return { autoPlay: false, autoplaySpeed: AUTO_PLAY_INTERVAL };
    }
  }, []);

  const savePreferences = useCallback((prefs: GuidePreferences) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Failed to save preferences:', e);
    }
  }, []);

  useEffect(() => {
    const prefs = loadPreferences();
    setIsAutoPlaying(prefs.autoPlay);
  }, [loadPreferences]);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return;
    setDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  }, [currentIndex, goToSlide, isAutoPlaying]);

  const previousSlide = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, goToSlide]);

  const toggleAutoPlay = useCallback(() => {
    const newState = !isAutoPlaying;
    setIsAutoPlaying(newState);
    savePreferences({ autoPlay: newState, autoplaySpeed: AUTO_PLAY_INTERVAL });
  }, [isAutoPlaying, savePreferences]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: t('title'), url });
        showToastMessage(t('controls.shareSuccess'));
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  }, [t]);

  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      showToastMessage(t('controls.linkCopied'));
    }).catch(() => {
      showToastMessage(t('controls.copyFailed'));
    });
  }, [t]);

  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        previousSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previousSlide, nextSlide, toggleAutoPlay, toggleFullscreen]);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const ActiveSlide = slides[currentIndex];

  return (
    <div className="min-h-screen flex flex-col" ref={containerRef}>
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className={cn(
          "flex-1 relative overflow-hidden",
          isFullscreen && "h-screen"
        )}>
          {isAllViewMode ? (
            <div className="h-full overflow-y-auto p-4 lg:p-8 space-y-8">
              {slides.map((Slide, index) => (
                <div key={index} className="mb-8">
                  <Slide />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full relative">
              {slides.map((Slide, index) => (
                <SlideContainer
                  key={index}
                  isActive={index === currentIndex}
                  direction={index === currentIndex ? 'none' : direction}
                >
                  <Slide />
                </SlideContainer>
              ))}
            </div>
          )}
        </div>

        <div className="bg-background/95 backdrop-blur border-t border-border p-4 lg:p-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground min-w-[100px]">
                {!isAllViewMode && (
                  <>{t('controls.slide')} {currentIndex + 1} / {slides.length}</>
                )}
              </div>

              <ControlButtons
                currentIndex={currentIndex}
                totalSlides={slides.length}
                isAutoPlaying={isAutoPlaying}
                isFullscreen={isFullscreen}
                isAllViewMode={isAllViewMode}
                onPrevious={previousSlide}
                onNext={nextSlide}
                onToggleAutoPlay={toggleAutoPlay}
                onToggleFullscreen={toggleFullscreen}
                onShare={handleShare}
              />

              <div className="min-w-[100px] flex justify-end">
                {!isAllViewMode && (
                  <ProgressIndicator
                    total={slides.length}
                    current={currentIndex}
                    onDotClick={goToSlide}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {toastMessage}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
