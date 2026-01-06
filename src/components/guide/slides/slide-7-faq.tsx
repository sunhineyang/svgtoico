'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HelpCircle, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export function Slide7FAQ() {
  const t = useTranslations('guidePage.slides.slide7');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <HelpCircle className="h-4 w-4" />
          <span>{t('badge')}</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 items-start overflow-y-auto">
        <section className="space-y-4">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-violet-600" />
              {t('troubleshooting.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors list-none flex items-center justify-between">
                    {t(`troubleshooting.items.${i}.question`)}
                    <span className="text-violet-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground pl-4 border-l-2 border-violet-600">
                    {t(`troubleshooting.items.${i}.answer`)}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-violet-600" />
              {t('optimization.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-300 flex-shrink-0 text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t(`optimization.items.${i}.title`)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(`optimization.items.${i}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-violet-600" />
              {t('commonQuestions.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors list-none flex items-center justify-between">
                    {t(`commonQuestions.items.${i}.question`)}
                    <span className="text-violet-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground pl-4 border-l-2 border-violet-600">
                    {t(`commonQuestions.items.${i}.answer`)}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">{t('quickTips.title')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <div className="text-2xl mb-1">💡</div>
                  <div className="text-sm font-medium text-foreground">{t(`quickTips.items.${i}`)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
            <h2 className="text-xl font-semibold mb-3 text-foreground">{t('needHelp.title')}</h2>
            <p className="text-sm text-muted-foreground mb-3">{t('needHelp.description')}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
            >
              {t('needHelp.cta')}
              <span>→</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
