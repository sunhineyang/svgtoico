import React from 'react';
import { useTranslations } from 'next-intl';
// import { HistoryItem, getHistoryBlob } from '@/lib/history-utils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, Trash2, FileImage, Clock, HardDrive } from 'lucide-react';

interface HistoryItem {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  settings: {
    sizes: number[];
  };
}

interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: string) => void;
  className?: string;
}

export function HistoryCard({ item, onDelete, className }: HistoryCardProps) {
  const t = useTranslations('history');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDownload = () => {
    // const blob = getHistoryBlob(item);
    // if (blob) {
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = item.filename;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(url);
    // }
    alert('Download feature coming soon...');
  };

  const handleDelete = () => {
    if (window.confirm(t('confirmDelete'))) {
      onDelete(item.id);
    }
  };

  return (
    <div className={cn(
      "border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors",
      className
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center bg-muted">
              <FileImage className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-foreground truncate">
              {item.filename}
            </h4>

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <HardDrive className="h-3 w-3" />
                <span>{formatFileSize(item.size)}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {item.settings.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-mono"
                  >
                    {size}×{size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleDownload}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title={t('download')}
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            title={t('delete')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
