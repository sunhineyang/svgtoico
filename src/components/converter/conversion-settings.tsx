"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useConverterStore, ConversionQuality, BackgroundType, IconSize } from '@/store/converter-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Settings, Palette, Scale, Zap } from 'lucide-react';

interface ConversionSettingsProps {
  className?: string;
}

export function ConversionSettings({ className }: ConversionSettingsProps) {
  const t = useTranslations('converter');
  const { settings, updateSettings } = useConverterStore();

  const qualityOptions = [
    { value: 0.6, label: t('settings.quality.low'), description: t('settings.quality.lowDesc') },
    { value: 0.8, label: t('settings.quality.medium'), description: t('settings.quality.mediumDesc') },
    { value: 0.95, label: t('settings.quality.high'), description: t('settings.quality.highDesc') }
  ];

  const backgroundOptions = [
    { value: 'transparent', label: t('settings.background.transparent'), color: null },
    { value: 'white', label: t('settings.background.white'), color: '#ffffff' },
    { value: 'black', label: t('settings.background.black'), color: '#000000' },
    { value: 'custom', label: t('settings.background.custom'), color: settings.customBackgroundColor }
  ];

  const sizePresets = [
    { sizes: [16], label: '16×16', description: t('settings.sizes.small') },
    { sizes: [32], label: '32×32', description: t('settings.sizes.medium') },
    { sizes: [48], label: '48×48', description: t('settings.sizes.large') },
    { sizes: [16, 32, 48], label: t('settings.sizes.multi'), description: t('settings.sizes.multiDesc') },
    { sizes: [16, 24, 32, 48, 64, 128, 256], label: t('settings.sizes.all'), description: t('settings.sizes.allDesc') }
  ];

  const handleQualityChange = (quality: number) => {
    const qualityMap: Record<number, ConversionQuality> = {
      0.95: 'high',
      0.7: 'medium',
      0.5: 'low'
    };
    updateSettings({ quality: qualityMap[quality] || 'high' });
  };

  const getQualityValue = (quality: ConversionQuality): number => {
    const valueMap: Record<ConversionQuality, number> = {
      'high': 0.95,
      'medium': 0.7,
      'low': 0.5
    };
    return valueMap[quality];
  };

  const handleBackgroundChange = (background: string) => {
    updateSettings({ background: background as BackgroundType });
  };

  const handleCustomBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customBackgroundColor = e.target.value;
    updateSettings({ customBackgroundColor, background: 'custom' });
  };

  const handleSizeChange = (sizes: number[]) => {
    updateSettings({ sizes: sizes as IconSize[] });
  };

  const isCurrentSizes = (sizes: number[]) => {
    return JSON.stringify(settings.sizes.sort()) === JSON.stringify(sizes.sort());
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 标题 */}
      <div className="flex items-center space-x-2">
        <Settings className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('settings.title')}</h3>
      </div>

      {/* 质量设置 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">{t('settings.quality.title')}</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {qualityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleQualityChange(option.value)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50",
                getQualityValue(settings.quality) === option.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-card"
              )}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 背景设置 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">{t('settings.background.title')}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {backgroundOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleBackgroundChange(option.value)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all duration-200 relative",
                "hover:border-primary/50 hover:bg-accent/50",
                settings.background === option.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center space-x-2">
                {option.color && (
                  <div
                    className="w-4 h-4 rounded border border-border flex-shrink-0"
                    style={{ backgroundColor: option.color }}
                  />
                )}
                {option.value === 'transparent' && (
                  <div className="w-4 h-4 rounded border border-border flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900" />
                )}
                <span className="text-sm font-medium truncate">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* 自定义颜色选择器 */}
        {settings.background === 'custom' && (
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-card">
            <label className="text-sm font-medium">{t('settings.background.customColor')}:</label>
            <input
              type="color"
              value={settings.customBackgroundColor || '#000000'}
              onChange={handleCustomBackgroundChange}
              className="w-8 h-8 rounded border border-border cursor-pointer"
            />
            <span className="text-xs text-muted-foreground font-mono">
              {settings.customBackgroundColor || '#000000'}
            </span>
          </div>
        )}
      </div>

      {/* 尺寸设置 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Scale className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">{t('settings.sizes.title')}</h4>
        </div>
        <div className="space-y-2">
          {sizePresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handleSizeChange(preset.sizes)}
              className={cn(
                "w-full p-3 rounded-lg border text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50",
                isCurrentSizes(preset.sizes)
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{preset.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{preset.description}</div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {preset.sizes.length} {preset.sizes.length === 1 ? 'size' : 'sizes'}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* 当前选择的尺寸显示 */}
        <div className="p-3 bg-accent/30 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">{t('settings.sizes.selected')}:</div>
          <div className="flex flex-wrap gap-1">
            {settings.sizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary font-mono"
              >
                {size}×{size}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 设置摘要 */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <h5 className="text-sm font-medium mb-2">{t('settings.summary.title')}</h5>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            <span className="font-medium">{t('settings.quality.title')}:</span>{' '}
            {qualityOptions.find(q => q.value === getQualityValue(settings.quality))?.label}
          </div>
          <div>
            <span className="font-medium">{t('settings.background.title')}:</span>{' '}
            {backgroundOptions.find(b => b.value === settings.background)?.label}
            {settings.background === 'custom' && ` (${settings.customBackgroundColor})`}
          </div>
          <div>
            <span className="font-medium">{t('settings.sizes.title')}:</span>{' '}
            {settings.sizes.length} {settings.sizes.length === 1 ? 'size' : 'sizes'}
          </div>
        </div>
      </div>
    </div>
  );
}