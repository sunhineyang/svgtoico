'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FileImage, Monitor, Layers, Globe } from 'lucide-react';

export function Slide2WhatIsICO() {
  const t = useTranslations('guidePage.slides.slide2');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FileImage className="h-4 w-4" />
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
              <Monitor className="h-5 w-5 text-purple-600" />
              {t('formatIntro.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('formatIntro.content')}
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-600" />
              {t('whyNeeded.title')}
            </h2>
            <ul className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span className="text-muted-foreground">{t(`whyNeeded.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">{t('fileStructure.title')}</h2>
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-mono text-sm mb-2 text-foreground">ICO File Header</div>
                <div className="text-xs text-muted-foreground">{t('fileStructure.header')}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-mono text-sm mb-2 text-foreground">Image Directory</div>
                <div className="text-xs text-muted-foreground">{t('fileStructure.directory')}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-mono text-sm mb-2 text-foreground">Image Data</div>
                <div className="text-xs text-muted-foreground">{t('fileStructure.data')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              {t('useCases.title')}
            </h2>
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
