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
