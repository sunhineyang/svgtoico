import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { GuidePage } from '@/components/pages/guide-page';
import { Slide1WhatIsSVG } from '@/components/guide/slides/slide-1-what-is-svg';
import { Slide2WhatIsICO } from '@/components/guide/slides/slide-2-what-is-ico';
import { Slide3WhyConvert } from '@/components/guide/slides/slide-3-why-convert';
import { Slide4ICOFormat } from '@/components/guide/slides/slide-4-ico-format';
import { Slide5QualityComparison } from '@/components/guide/slides/slide-5-quality-comparison';
import { Slide6UseCases } from '@/components/guide/slides/slide-6-use-cases';
import { Slide7FAQ } from '@/components/guide/slides/slide-7-faq';
import { getAlternates, constructCanonicalUrl } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pathname = 'svg-ico-guide';
  const canonicalUrl = constructCanonicalUrl(locale, pathname);
  
  return {
    title: "SVG to ICO Guide - Complete Guide to SVG and ICO Conversion",
    description: "Learn everything about SVG and ICO file formats. Complete guide covering what is SVG, what is ICO, why convert SVG to ICO, ICO format details, quality comparison, use cases, and FAQ.",
    keywords: "svg guide, ico guide, svg to ico conversion, favicon guide, icon format tutorial, svg tutorial, ico tutorial",
    openGraph: {
      title: "SVG to ICO Guide - Complete Guide to SVG and ICO Conversion",
      description: "Learn everything about SVG and ICO file formats. Complete guide covering what is SVG, what is ICO, why convert SVG to ICO, ICO format details, quality comparison, use cases, and FAQ.",
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "SVG to ICO Guide - Complete Guide to SVG and ICO Conversion",
      description: "Learn everything about SVG and ICO file formats.",
    },
    alternates: getAlternates(locale, pathname),
  };
}

export default function Guide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "SVG to ICO Guide - Complete Guide to SVG and ICO Conversion",
            "description": "Learn everything about SVG and ICO file formats. Complete guide covering what is SVG, what is ICO, why convert SVG to ICO, ICO format details, quality comparison, use cases, and FAQ.",
            "author": {
              "@type": "Organization",
              "name": "SVG to ICO Converter"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SVG to ICO Converter",
              "logo": {
                "@type": "ImageObject",
                "url": "https://svgtoico.org/logo.svg"
              }
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://svgtoico.org/svg-ico-guide"
            }
          })
        }}
      />
      <GuidePage />
    </>
  );
}
