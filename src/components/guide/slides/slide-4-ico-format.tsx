'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Layers, Image as ImageIcon, Code } from 'lucide-react';

export function Slide4ICOFormat() {
  const t = useTranslations('guidePage.slides.slide4');

  return (
    <article className="h-full flex flex-col p-8 lg:p-12 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FileText className="h-4 w-4" />
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
              <Code className="h-5 w-5 text-orange-600" />
              {t('structure.title')}
            </h2>
            <div className="space-y-3">
              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="font-semibold text-foreground">{t('structure.header.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('structure.header.content')}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-foreground">{t('structure.directory.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('structure.directory.content')}</p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="font-semibold text-foreground">{t('structure.data.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('structure.data.content')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-orange-600" />
              {t('multiSize.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('multiSize.content')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['16x16', '32x32', '48x48'].map((size) => (
                <div key={size} className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2 flex items-center justify-center text-orange-600 dark:text-orange-300 font-bold">
                    {size}
                  </div>
                  <div className="text-xs text-muted-foreground">{size}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-orange-600" />
              {t('comparison.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold text-foreground">{t('comparison.format')}</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground">{t('comparison.ico')}</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground">{t('comparison.png')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-3 text-foreground">{t(`comparison.rows.${i}.feature`)}</td>
                      <td className="py-2 px-3 text-green-600">{t(`comparison.rows.${i}.ico`)}</td>
                      <td className="py-2 px-3 text-muted-foreground">{t(`comparison.rows.${i}.png`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">{t('advantages.title')}</h2>
            <ul className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">★</span>
                  <span className="text-muted-foreground">{t(`advantages.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
