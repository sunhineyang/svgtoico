import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// 动态生成metadata函数
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // 根据语言生成正确的canonical URL
  const canonicalUrl = locale === 'en' 
    ? 'https://svgtoico.org'
    : `https://svgtoico.org/${locale}`;
  
  return {
    title: "SVG to ICO Converter | PNG to ICO | JPG to ICO - Free Online Tool",
    description: "Convert SVG to ICO, PNG to ICO, JPG to ICO online for free. High-quality image conversion with multiple sizes and customizable settings. Fast and secure.",
    keywords: "svg to ico, png to ico, jpg to ico, image converter, icon converter, favicon generator, online converter, free tool",
    icons: {
      icon: '/logo.ico',
      shortcut: '/logo.ico',
      apple: '/logo.png',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://svgtoico.org',
        'ru': 'https://svgtoico.org/ru',
        'ko': 'https://svgtoico.org/ko',
        'ja': 'https://svgtoico.org/ja',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // 验证语言是否支持
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  // 获取当前语言的翻译消息
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

// 生成静态参数，用于预渲染所有支持的语言
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}