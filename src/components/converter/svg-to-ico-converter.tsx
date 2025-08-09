"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useConverterStore } from '@/store/converter-store';
import { FileUpload } from './file-upload';
import { ConversionSettings } from './conversion-settings';
import { ConversionProgress } from './conversion-progress';
import { ConversionResult } from './conversion-result';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, AlertCircle, RotateCcw } from 'lucide-react';

interface SvgToIcoConverterProps {
  className?: string;
}

export function SvgToIcoConverter({ className }: SvgToIcoConverterProps) {
  const t = useTranslations('converter');
  const {
    selectedFile,
    status,
    error,
    result,
    convertFile,
    reset,
    setError
  } = useConverterStore();

  const handleConvert = async () => {
    if (!selectedFile) {
      setError(t('errors.noFile'));
      return;
    }

    try {
      await convertFile();
    } catch (err) {
      console.error('Conversion failed:', err);
      setError(t('errors.conversionFailed'));
    }
  };

  const canConvert = selectedFile && status === 'idle';
  const isConverting = status === 'converting';
  const hasResult = status === 'success' && result;
  const hasError = status === 'error' && error;

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-8", className)}>
      {/* 错误提示 */}
      {hasError && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-destructive">
                {t('errors.title')}
              </h4>
              <p className="text-sm text-destructive/80 mt-1">
                {error}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="text-destructive hover:text-destructive/80"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：文件上传和设置 */}
        <div className="space-y-6">
          {/* 文件上传 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t('upload.title')}</h2>
            <FileUpload />
          </div>

          {/* 转换设置 */}
          {selectedFile && !isConverting && !hasResult && (
            <ConversionSettings />
          )}

          {/* 转换按钮 */}
          {selectedFile && !isConverting && !hasResult && (
            <div className="space-y-3">
              <Button
                onClick={handleConvert}
                disabled={!canConvert}
                size="lg"
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                {t('actions.convert')}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                {t('actions.convertDesc')}
              </p>
            </div>
          )}
        </div>

        {/* 右侧：进度、结果或占位符 */}
        <div className="space-y-6">
          {/* 转换进度 */}
          {isConverting && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t('progress.title')}</h2>
              <ConversionProgress />
            </div>
          )}

          {/* 转换结果 */}
          {hasResult && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t('result.title')}</h2>
              <ConversionResult />
            </div>
          )}

          {/* 占位符（当没有文件时） */}
          {!selectedFile && !isConverting && !hasResult && (
            <div className="h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    {t('placeholder.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('placeholder.description')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作区域 */}
      {(hasResult || hasError) && (
        <div className="pt-6 border-t border-border">
          <div className="flex justify-center">
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('actions.convertAnother')}
            </Button>
          </div>
        </div>
      )}

      {/* 使用提示 */}
      {!selectedFile && (
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
          <h3 className="text-lg font-medium mb-4">{t('guide.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <h4 className="font-medium">{t('guide.step1.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('guide.step1.description')}</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <h4 className="font-medium">{t('guide.step2.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('guide.step2.description')}</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <h4 className="font-medium">{t('guide.step3.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('guide.step3.description')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}