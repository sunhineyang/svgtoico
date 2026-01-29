'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SvgToIcoConverter } from '@/components/converter/svg-to-ico-converter';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileImage, Zap, Shield, Download, Star, Users, Clock, HelpCircle, Upload, Settings, ArrowRight } from 'lucide-react';
import { useConverterStore } from '@/store/converter-store';

export function HomeContent() {
  const t = useTranslations();
  const locale = useLocale();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <FileImage className="h-4 w-4" />
                <span>{t('hero.badge')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  SVG to ICO & ICO Converter Online
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="min-w-[200px]"
                  onClick={() => {
                    const converterSection = document.getElementById('converter');
                    if (converterSection) {
                      converterSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t('hero.cta.primary')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Converter Section */}
        <section id="converter" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SvgToIcoConverter />
          </div>
        </section>

        {/* Guide Section */}
        <section id="guide" className="py-16 lg:py-24 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">{t('guide.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('guide.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center space-y-6 p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="p-6 bg-primary/10 rounded-full">
                        <Upload className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{t('guide.step1.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t('guide.step1.description')}</p>
                  </div>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center space-y-6 p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="p-6 bg-primary/10 rounded-full">
                        <Settings className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{t('guide.step2.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t('guide.step2.description')}</p>
                  </div>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="text-center space-y-6 p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="p-6 bg-primary/10 rounded-full">
                        <Download className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{t('guide.step3.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t('guide.step3.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="min-w-[200px]"
                onClick={() => {
                  const converterSection = document.getElementById('converter');
                  if (converterSection) {
                    converterSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('hero.cta.primary')}
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileImage className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">{t('stats.conversions')}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">{t('stats.users')}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-muted-foreground">{t('stats.rating')}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">{t('stats.availability')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">{t('features.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('features.quality.title')}</h3>
                <p className="text-muted-foreground">{t('features.quality.description')}</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FileImage className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('multiFormatConverter.supportedFormats.title')}</h3>
                <p className="text-muted-foreground">{t('multiFormatConverter.description')}</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('features.secure.title')}</h3>
                <p className="text-muted-foreground">{t('features.secure.description')}</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('features.fast.title')}</h3>
                <p className="text-muted-foreground">{t('features.fast.description')}</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('stats.rating')}</h3>
                <p className="text-muted-foreground">{t('faq.q5.answer')}</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('hero.badge')}</h3>
                <p className="text-muted-foreground">{t('common.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">{t('faq.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('faq.description')}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q1.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q1.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q2.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q2.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q3.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q3.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q4.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q4.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q5.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q5.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q6.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q6.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q7.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q7.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q8.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q8.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q9.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q9.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q10.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q10.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-11" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q11.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q11.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-12" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q12.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q12.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-13" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q13.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q13.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-14" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q14.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q14.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-15" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('faq.q15.question')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t('faq.q15.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}