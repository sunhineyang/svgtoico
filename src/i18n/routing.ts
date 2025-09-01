import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ru', 'ko', 'ja'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Only add locale prefix for non-default locales (ru, ko, ja)
  localePrefix: 'as-needed',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be provided for all locales
    '/': '/'
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];