"use client";

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { LanguageToggle } from '@/components/common/language-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Github, Heart } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const t = useTranslations('navigation');
  const tAlt = useTranslations('alt');
  const locale = useLocale();

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo和标题 */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg overflow-hidden">
              <Image
                src="/logo.svg"
                alt={tAlt('logo')}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('title')}
              </div>
              <p className="text-xs text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>
          </Link>

          {/* 导航链接 */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/#converter"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              SVG to ICO
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('faq')}
            </a>
            <Link
              href="/svg-ico-guide"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('guide')}
            </Link>
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-2">
            {/* GitHub链接 - 暂时隐藏 */}
            {/* <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:inline-flex"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button> */}

            {/* 赞助按钮 - 暂时隐藏 */}
            {/* <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden lg:inline-flex text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
            >
              <a
                href="#sponsor"
                className="flex items-center space-x-1"
              >
                <Heart className="h-4 w-4" />
                <span className="text-sm">{t('sponsor')}</span>
              </a>
            </Button> */}

            {/* 分隔线 */}
            {/* <div className="w-px h-6 bg-border" /> */}

            {/* 主题切换 */}
            <ThemeToggle />

            {/* 语言切换 */}
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}