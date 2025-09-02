import { NextIntlClientProvider } from 'next-intl';
import { HomeContent } from '@/components/pages/home-content';

// 直接导入英文翻译文件
import enMessages from '../../messages/en.json';

// 根页面：SEO友好，直接显示英文内容
export default function RootPage() {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={enMessages}
    >
      <HomeContent />
    </NextIntlClientProvider>
  );
}

// 元数据配置
export const metadata = {
  title: "SVG to ICO Converter - Free Online Tool",
  description: "Convert SVG files to ICO format online for free. High-quality conversion with multiple sizes and customizable settings.",
  keywords: "SVG to ICO, favicon converter, icon converter, online tool",
  alternates: {
    canonical: 'https://svgtoico.org',
    languages: {
      'en': 'https://svgtoico.org',
      'ko': 'https://svgtoico.org/ko',
      'ja': 'https://svgtoico.org/ja',
      'ru': 'https://svgtoico.org/ru',
    },
  },
  openGraph: {
    title: "SVG to ICO Converter - Free Online Tool",
    description: "Convert SVG files to ICO format online for free. High-quality conversion with multiple sizes and customizable settings.",
    type: "website",
  },
};
