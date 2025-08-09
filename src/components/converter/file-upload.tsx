"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConverterStore } from '@/store/converter-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  className?: string;
}

export function FileUpload({ className }: FileUploadProps) {
  const t = useTranslations('converter');
  const { selectedFile, filePreview, setSelectedFile, setError } = useConverterStore();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // 处理拒绝的文件
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError(t('errors.fileTooBig'));
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError(t('errors.invalidFormat'));
      } else {
        setError(t('errors.unknownError'));
      }
      return;
    }

    // 处理接受的文件
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setError(null);
    }
  }, [setSelectedFile, setError, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            "hover:border-primary/50 hover:bg-accent/50",
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border bg-background"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={cn(
              "p-4 rounded-full transition-colors",
              isDragActive ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            )}>
              <Upload className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {isDragActive ? t('dropzone.dragActive') : t('dropzone.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('dropzone.subtitle')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('dropzone.supportedFormats')}
              </p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-4">
              {t('common.browse')}
            </Button>
          </div>
          
          {/* 装饰性动画 */}
          <div className={cn(
            "absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none",
            isDragActive ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-2 border-2 border-primary rounded-lg animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-start space-x-4">
            {/* 文件预览 */}
            <div className="flex-shrink-0">
              {filePreview ? (
                <div className="w-16 h-16 border border-border rounded-lg overflow-hidden bg-background">
                  <img
                    src={filePreview}
                    alt={`Preview of ${selectedFile.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 border border-border rounded-lg flex items-center justify-center bg-accent">
                  <FileImage className="h-8 w-8 text-accent-foreground" />
                </div>
              )}
            </div>
            
            {/* 文件信息 */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">
                {selectedFile.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
              </p>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground">
                  {t('common.upload')} {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            {/* 删除按钮 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* 重新上传区域 */}
          <div className="mt-4 pt-4 border-t border-border">
            <div
              {...getRootProps()}
              className="text-center py-2 px-4 border border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
            >
              <input {...getInputProps()} />
              <p className="text-xs text-muted-foreground">
                {t('dropzone.subtitle')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}