"use client";

import { useTranslations } from 'next-intl';
// import { HistoryContent } from '@/components/pages/history-content';

interface HistoryPageProps {
  params: {
    locale: string;
  };
}

export default function HistoryPage() {
  const t = useTranslations('history');
  
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
          <p className="text-muted-foreground mt-4">Coming soon...</p>
        </div>
      </div>
    </main>
  );
}
