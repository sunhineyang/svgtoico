"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Languages, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

export function LanguageToggle({ className }: LanguageToggleProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = React.useCallback((langCode: string) => {
    setIsOpen(false);
    
    if (langCode === locale) {
      return;
    }
    
    // Use the framework router to switch locale while preserving path
    // This automatically handles the URL generation (e.g. /de/path or /path for en)
    router.push(pathname, { locale: langCode });
  }, [locale, pathname, router]);

  // Main button click handler
  const handleMainButtonClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Language option click handler
  const handleLanguageOptionClick = React.useCallback((e: React.MouseEvent, langCode: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleLanguageChange(langCode);
  }, [handleLanguageChange]);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={handleMainButtonClick}
        className="justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-xs flex items-center space-x-2 h-9 px-3 cursor-pointer"
        aria-label={t('language')}
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={(e) => handleLanguageOptionClick(e, language.code)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors cursor-pointer",
                  "hover:bg-accent hover:text-accent-foreground",
                  locale === language.code
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {locale === language.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}