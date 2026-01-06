'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Image, Zap, Layers, Globe } from 'lucide-react';

export function Slide1WhatIsSVG() {
  const t = useTranslations('guidePage.slides.slide1');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Image className="h-4 w-4" />
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
              <Zap className="h-5 w-5 text-blue-600" />
              {t('definition.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('definition.content')}
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              {t('vectorVsRaster.title')}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">{t('vectorVsRaster.vector.title')}</strong>
                  <p className="text-sm text-muted-foreground">{t('vectorVsRaster.vector.content')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">{t('vectorVsRaster.raster.title')}</strong>
                  <p className="text-sm text-muted-foreground">{t('vectorVsRaster.raster.content')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              {t('advantages.title')}
            </h2>
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-muted-foreground">{t(`advantages.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">{t('useCases.title')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">{t(`useCases.items.${i}.icon`)}</div>
                  <div className="text-sm font-medium text-foreground">{t(`useCases.items.${i}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
