import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileImage, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HistoryEmptyProps {
  className?: string;
}

export function HistoryEmpty({ className }: HistoryEmptyProps) {
  const t = useTranslations('history');

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-4",
      className
    )}>
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileImage className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        {t('empty.title')}
      </h3>

      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        {t('empty.description')}
      </p>

      <Link href="/">
        <Button className="gap-2">
          {t('empty.startConverting')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
