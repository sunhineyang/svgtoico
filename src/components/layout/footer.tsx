"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const t = useTranslations('footer');
  const tAlt = useTranslations('alt');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:0992sunshine@gmail.com',
      icon: Mail,
      external: false
    },
    {
      name: t('svgToPngApp'),
      href: 'https://svgtopng.app',
      icon: ExternalLink,
      external: true
    },
    {
      name: 'AI Face Rate',
      href: 'https://aifacerate.com',
      icon: ExternalLink,
      external: true
    }
  ];

  return (
    <footer className={cn("border-t border-border bg-background", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区域 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg overflow-hidden">
                <Image
                src="/logo.svg"
                alt={tAlt('logo')}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              </div>
              <span className="text-lg font-bold">{t('brand.title')}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('brand.description')}
            </p>
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-border" />

        {/* 底部信息 */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} {t('copyright.text')}
            </p>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <p>
              {t('copyright.madeWith')} <Heart className="inline h-3 w-3 text-pink-500 mx-1" /> {t('copyright.by')}
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {t('legal.privacy')}
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {t('legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}