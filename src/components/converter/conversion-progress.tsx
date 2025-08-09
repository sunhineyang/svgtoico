"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useConverterStore } from '@/store/converter-store';
import { cn } from '@/lib/utils';
import { Loader2, Zap, Image, Download } from 'lucide-react';

interface ConversionProgressProps {
  className?: string;
}

export function ConversionProgress({ className }: ConversionProgressProps) {
  const t = useTranslations('converter');
  const { status, selectedFile, settings } = useConverterStore();

  const steps = [
    {
      id: 'reading',
      icon: Image,
      title: t('progress.reading'),
      description: t('progress.readingDesc')
    },
    {
      id: 'processing',
      icon: Zap,
      title: t('progress.processing'),
      description: t('progress.processingDesc')
    },
    {
      id: 'generating',
      icon: Download,
      title: t('progress.generating'),
      description: t('progress.generatingDesc')
    }
  ];

  // 模拟进度步骤（实际项目中可以根据真实进度来显示）
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (status === 'converting') {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, steps.length]);

  if (status !== 'converting') {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 主要进度指示器 */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">{t('progress.title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t('progress.subtitle')}
          </p>
        </div>
      </div>

      {/* 文件信息 */}
      {selectedFile && (
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Image className="h-5 w-5 text-primary" aria-label="File icon" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{selectedFile.name}</div>
              <div className="text-xs text-muted-foreground">
                {settings.sizes.length} {settings.sizes.length === 1 ? 'size' : 'sizes'} • 
                {settings.background === 'transparent' ? t('settings.background.transparent') : 
                 settings.background === 'white' ? t('settings.background.white') :
                 settings.background === 'black' ? t('settings.background.black') :
                 t('settings.background.custom')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 步骤进度 */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center space-x-4 p-3 rounded-lg transition-all duration-500",
                isActive && "bg-primary/5 border border-primary/20",
                isCompleted && "bg-green-50 dark:bg-green-900/20",
                isPending && "opacity-50"
              )}
            >
              {/* 步骤图标 */}
              <div className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                isActive && "bg-primary text-primary-foreground animate-pulse",
                isCompleted && "bg-green-500 text-white",
                isPending && "bg-muted text-muted-foreground"
              )}>
                {isActive ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              
              {/* 步骤内容 */}
              <div className="flex-1">
                <div className={cn(
                  "text-sm font-medium transition-colors",
                  isActive && "text-primary",
                  isCompleted && "text-green-700 dark:text-green-300",
                  isPending && "text-muted-foreground"
                )}>
                  {step.title}
                </div>
                <div className={cn(
                  "text-xs mt-1 transition-colors",
                  isActive && "text-primary/70",
                  isCompleted && "text-green-600 dark:text-green-400",
                  isPending && "text-muted-foreground"
                )}>
                  {step.description}
                </div>
              </div>
              
              {/* 状态指示器 */}
              <div className="flex-shrink-0">
                {isCompleted && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                {isActive && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
                {isPending && (
                  <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t('progress.step')} {currentStep + 1} / {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 提示信息 */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {t('progress.tip')}
        </p>
      </div>
    </div>
  );
}