import { HomeContent } from '@/components/pages/home-content';
import { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'SVG to ICO Converter - Free Online Tool',
    description: 'Convert SVG files to ICO format online for free. High-quality conversion with multiple sizes and customizable settings.',
    keywords: 'SVG to ICO, favicon converter, icon converter, online tool',
    alternates: getAlternates(locale, ''),
  };
}

export default function Home() {
  return <HomeContent />;
}
