import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = locale === 'en' 
    ? 'https://svgtoico.org/terms'
    : `https://svgtoico.org/${locale}/terms`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://svgtoico.org/terms',
        'ko': 'https://svgtoico.org/ko/terms',
        'ja': 'https://svgtoico.org/ja/terms',
        'ru': 'https://svgtoico.org/ru/terms',
      },
    },
  };
}

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>{t('backToHome')}</span>
              </Link>
            </Button>
          </div>

          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg text-muted-foreground">{t('lastUpdated')}</p>
          </div>

          {/* 服务条款内容 */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-8">
              {/* 接受条款 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('acceptance.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('acceptance.content')}
                </p>
              </section>

              {/* 服务描述 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('serviceDescription.title')}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('serviceDescription.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('serviceDescription.item1')}</li>
                  <li>{t('serviceDescription.item2')}</li>
                  <li>{t('serviceDescription.item3')}</li>
                </ul>
              </section>

              {/* 用户责任 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('userResponsibilities.title')}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('userResponsibilities.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('userResponsibilities.item1')}</li>
                  <li>{t('userResponsibilities.item2')}</li>
                  <li>{t('userResponsibilities.item3')}</li>
                  <li>{t('userResponsibilities.item4')}</li>
                </ul>
              </section>

              {/* 免责声明 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('disclaimer.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('disclaimer.content')}
                </p>
              </section>

              {/* 责任限制 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('limitation.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('limitation.content')}
                </p>
              </section>

              {/* 知识产权 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('intellectualProperty.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('intellectualProperty.content')}
                </p>
              </section>

              {/* 服务变更 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('serviceChanges.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('serviceChanges.content')}
                </p>
              </section>

              {/* 终止服务 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('termination.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('termination.content')}
                </p>
              </section>

              {/* 适用法律 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('governingLaw.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('governingLaw.content')}
                </p>
              </section>

              {/* 联系我们 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.content')}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}