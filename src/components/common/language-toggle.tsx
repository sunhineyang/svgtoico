"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Languages, Check } from 'lucide-react';
// import { Button } from '@/components/ui/button'; // 暂时不使用Button组件
import { cn } from '@/lib/utils';

// 确保组件在客户端正确初始化
const isBrowser = typeof window !== 'undefined';

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

  // 组件挂载时的调试信息
  React.useEffect(() => {
    console.log('🎯 LanguageToggle 组件已挂载', {
      locale,
      pathname,
      isBrowser,
      currentLanguage: currentLanguage.code
    });
  }, [locale, pathname, currentLanguage.code]);

  const handleLanguageChange = React.useCallback((langCode: string) => {
    console.log('🔄 语言切换开始:', { 
      from: locale, 
      to: langCode, 
      isBrowser, 
      currentPathname: pathname
    });
    
    // 立即关闭菜单
    setIsOpen(false);
    
    // 如果是相同语言，直接返回
    if (langCode === locale) {
      console.log('⚠️ 相同语言，跳过切换');
      return;
    }
    
    // 确保在浏览器环境中执行
    if (!isBrowser) {
      console.error('❌ 不在浏览器环境中，无法切换语言');
      return;
    }
    
    try {
      // SEO友好的URL结构：英文使用根路径 /，其他语言使用 /语言代码
      const targetUrl = langCode === 'en' 
        ? window.location.origin + '/'
        : window.location.origin + '/' + langCode;
      
      const languageNames = { en: '英语', de: '德语', es: '西班牙语', ja: '日语', ko: '韩语', ru: '俄语' };
      console.log(`🌍 切换到${languageNames[langCode as keyof typeof languageNames]}，跳转到 ${langCode === 'en' ? '/' : '/' + langCode}`);
      console.log('🎯 目标URL:', targetUrl);
      console.log('🚀 执行页面跳转');
      
      // 立即执行跳转
      window.location.href = targetUrl;
      
    } catch (error) {
      console.error('❌ 语言切换失败:', error);
      // 备用方案
      const fallbackUrl = langCode === 'en' ? '/' : `/${langCode}`;
      console.log('🔄 使用备用方案:', fallbackUrl);
      window.location.replace(fallbackUrl);
    }
  }, [locale, pathname]);

  // 主按钮点击处理
  const handleMainButtonClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ 主按钮点击事件触发', { isOpen, isBrowser });
    setIsOpen(!isOpen);
    console.log('📋 菜单状态将变为:', !isOpen);
  }, [isOpen]);

  // 语言选项点击处理
  const handleLanguageOptionClick = React.useCallback((e: React.MouseEvent, langCode: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ 语言选项点击:', langCode, { isBrowser });
    handleLanguageChange(langCode);
  }, [handleLanguageChange]);

  return (
    <div className={cn("relative", className)}>
      {/* 使用原生button而不是Button组件 */}
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
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
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