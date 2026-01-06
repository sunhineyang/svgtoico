'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Star, Zap, Eye, Settings } from 'lucide-react';

export function Slide5QualityComparison() {
  const t = useTranslations('guidePage.slides.slide5');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Star className="h-4 w-4" />
          <span>{t('badge')}</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-600" />
              {t('qualityLevels.title')}
            </h2>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{t(`qualityLevels.items.${i}.title`)}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 - i }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(`qualityLevels.items.${i}.description`)}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {t(`qualityLevels.items.${i}.size`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-600" />
              {t('sizeRecommendations.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center text-sm font-mono text-foreground flex-shrink-0">
                    {t(`sizeRecommendations.items.${i}.size`)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{t(`sizeRecommendations.items.${i}.title`)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(`sizeRecommendations.items.${i}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-cyan-600" />
              {t('backgroundHandling.title')}
            </h2>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{t(`backgroundHandling.items.${i}.title`)}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t(`backgroundHandling.items.${i}.description`)}</p>
                  <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-8 h-8 rounded ${
                          i === 0 ? 'bg-transparent border-2 border-dashed border-border' :
                          i === 1 ? 'bg-white border border-border' :
                          'bg-black'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">{t('tips.title')}</h2>
            <ul className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-600 mt-1">💡</span>
                  <span className="text-muted-foreground">{t(`tips.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
