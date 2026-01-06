'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Globe, Smartphone, Monitor, Home } from 'lucide-react';

export function Slide6UseCases() {
  const t = useTranslations('guidePage.slides.slide6');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Globe className="h-4 w-4" />
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
              <Globe className="h-5 w-5 text-rose-600" />
              {t('favicon.title')}
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('favicon.description')}
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">{t('favicon.implementation.title')}</h3>
                <code className="block bg-background rounded p-3 text-sm font-mono text-foreground overflow-x-auto">
                  {t('favicon.implementation.code')}
                </code>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{t('favicon.bestPractices.title')}</h3>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">{t(`favicon.bestPractices.items.${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-rose-600" />
              {t('appIcons.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-300 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t(`appIcons.items.${i}.title`)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(`appIcons.items.${i}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-rose-600" />
              {t('mobileApps.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-1">{t(`mobileApps.items.${i}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`mobileApps.items.${i}.description`)}</p>
                  <div className="mt-2 flex gap-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="text-xs bg-background px-2 py-1 rounded text-foreground">
                        {t(`mobileApps.items.${i}.sizes.${j}`)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-rose-600" />
              {t('desktopShortcuts.title')}
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {t('desktopShortcuts.description')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{t(`desktopShortcuts.items.${i}.icon`)}</div>
                    <div className="text-sm font-medium text-foreground">{t(`desktopShortcuts.items.${i}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
