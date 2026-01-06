'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, AlertCircle, Settings, Shield } from 'lucide-react';

export function Slide3WhyConvert() {
  const t = useTranslations('guidePage.slides.slide3');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <CheckCircle className="h-4 w-4" />
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
              <Shield className="h-5 w-5 text-green-600" />
              {t('compatibility.title')}
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">{t(`compatibility.items.${i}.title`)}</strong>
                    <p className="text-sm text-muted-foreground mt-1">{t(`compatibility.items.${i}.content`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-green-600" />
              {t('bestPractices.title')}
            </h2>
            <ul className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-muted-foreground">{t(`bestPractices.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              {t('technicalRequirements.title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">{t('technicalRequirements.sizes.title')}</h3>
                <div className="flex flex-wrap gap-2">
                  {['16x16', '32x32', '48x48', '64x64', '128x128', '256x256'].map((size) => (
                    <span key={size} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">{t('technicalRequirements.colorDepth.title')}</h3>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600" />
                      <span className="text-sm text-muted-foreground">{t(`technicalRequirements.colorDepth.items.${i}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">{t('technicalRequirements.optimization.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('technicalRequirements.optimization.content')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
