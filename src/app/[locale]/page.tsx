import { HomeContent } from '@/components/pages/home-content';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = locale === 'en' 
    ? 'https://svgtoico.org'
    : `https://svgtoico.org/${locale}`;

  return {
    title: 'SVG to ICO Converter - Free Online Tool',
    description: 'Convert SVG files to ICO format online for free. High-quality conversion with multiple sizes and customizable settings.',
    keywords: 'SVG to ICO, favicon converter, icon converter, online tool',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://svgtoico.org',
        'ko': 'https://svgtoico.org/ko',
        'ja': 'https://svgtoico.org/ja',
        'ru': 'https://svgtoico.org/ru',
      },
    },
  };
}

export default function Home() {
  return <HomeContent />;
}
