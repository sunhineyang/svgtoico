import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

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

          {/* 隐私政策内容 */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-8">
              {/* 概述 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('overview.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('overview.content')}
                </p>
              </section>

              {/* 信息收集 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('dataCollection.title')}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('dataCollection.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('dataCollection.item1')}</li>
                  <li>{t('dataCollection.item2')}</li>
                  <li>{t('dataCollection.item3')}</li>
                </ul>
              </section>

              {/* 数据使用 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('dataUsage.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('dataUsage.content')}
                </p>
              </section>

              {/* 数据安全 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('dataSecurity.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('dataSecurity.content')}
                </p>
              </section>

              {/* 第三方服务 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('thirdParty.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('thirdParty.content')}
                </p>
              </section>

              {/* 用户权利 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('userRights.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('userRights.content')}
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