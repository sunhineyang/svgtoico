import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: "SVG to ICO Converter - Free Online Tool",
  description: "Convert SVG files to ICO format online for free. High-quality conversion with multiple sizes and customizable settings.",
};

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