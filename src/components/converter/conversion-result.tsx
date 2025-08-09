"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useConverterStore } from '@/store/converter-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, FileImage, CheckCircle, RotateCcw, ExternalLink } from 'lucide-react';

interface ConversionResultProps {
  className?: string;
}

export function ConversionResult({ className }: ConversionResultProps) {
  const t = useTranslations('converter');
  const { result, status, settings, reset } = useConverterStore();

  if (status !== 'success' || !result) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    if (result.blob && result.filename) {
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handlePreview = () => {
    if (result.blob) {
      const url = URL.createObjectURL(result.blob);
      window.open(url, '_blank');
      // 延迟释放URL，给浏览器时间加载
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 成功标题 */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
            {t('result.success')}
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            {t('result.successDesc')}
          </p>
        </div>
      </div>

      {/* 结果文件信息 */}
      <div className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50/50 dark:bg-green-900/10">
        <div className="flex items-start space-x-4">
          {/* 文件图标 */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 border border-green-200 dark:border-green-700 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/30">
              <FileImage className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          {/* 文件信息 */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-green-900 dark:text-green-100 truncate">
              {result.filename}
            </h4>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              {formatFileSize(result.size)} • ICO • {settings.sizes.length} {settings.sizes.length === 1 ? 'size' : 'sizes'}
            </p>
            
            {/* 尺寸信息 */}
            <div className="mt-2 flex flex-wrap gap-1">
              {settings.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-mono"
                >
                  {size}×{size}
                </span>
              ))}
            </div>
            
            {/* 转换时间 */}
            <div className="mt-2">
              <div className="text-xs text-green-600 dark:text-green-400">
                {t('result.convertedAt')} {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleDownload}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('result.download')}
        </Button>
        
        <Button
          onClick={handlePreview}
          variant="outline"
          className="flex-1 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
          size="lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {t('result.preview')}
        </Button>
      </div>

      {/* 转换新文件 */}
      <div className="pt-4 border-t border-green-200 dark:border-green-800">
        <Button
          onClick={reset}
          variant="ghost"
          className="w-full text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {t('result.convertAnother')}
        </Button>
      </div>

      {/* 提示信息 */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          {t('result.tips.title')}
        </h5>
        <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
          <li>• {t('result.tips.tip1')}</li>
          <li>• {t('result.tips.tip2')}</li>
          <li>• {t('result.tips.tip3')}</li>
        </ul>
      </div>
    </div>
  );
}