import React from 'react';
import { useTranslations } from 'next-intl';
// import { useConversionHistory } from '@/hooks/use-conversion-history';
import { HistoryStats } from '@/components/history/history-stats';
import { HistoryCard } from '@/components/history/history-card';
import { HistoryEmpty } from '@/components/history/history-empty';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw } from 'lucide-react';

interface HistoryContentProps {
  className?: string;
}

export function HistoryContent({ className }: HistoryContentProps) {
  const t = useTranslations('history');
  // const { history, isLoading, stats, deleteItem, clearAll, refreshHistory } = useConversionHistory();

  const history: any[] = [];
  const isLoading = false;
  const stats = {
    totalConversions: 0,
    totalSize: 0,
    lastConversion: null,
  };

  const handleClearAll = () => {
    if (window.confirm(t('confirmClearAll'))) {
      // clearAll();
      alert('Clear all feature coming soon...');
    }
  };

  const refreshHistory = () => {
    // refreshHistory();
    alert('Refresh feature coming soon...');
  };

  const deleteItem = (id: string) => {
    // deleteItem(id);
    alert('Delete feature coming soon...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return <HistoryEmpty />;
  }

  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="mb-8">
        <HistoryStats
          totalConversions={stats.totalConversions}
          totalSize={stats.totalSize}
          lastConversion={stats.lastConversion}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          {t('recentConversions')}
        </h2>

        <div className="flex items-center gap-2">
          <Button
            onClick={refreshHistory}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {t('refresh')}
          </Button>

          <Button
            onClick={handleClearAll}
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            {t('clearAll')}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <HistoryCard
            key={item.id}
            item={item}
            onDelete={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}
