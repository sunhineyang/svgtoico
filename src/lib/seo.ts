import { routing } from '@/i18n/routing';

export const baseUrl = 'https://svgtoico.org';

/**
 * Constructs the canonical URL for a given locale and pathname.
 * Handles the 'as-needed' logic where default locale has no prefix.
 */
export function constructCanonicalUrl(locale: string, pathname: string = '') {
  // Ensure pathname starts with / if it's not empty
  let cleanPath = pathname;
  if (cleanPath && !cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  // Remove trailing slash if it exists and path is not just /
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  // If path is just /, treat it as empty for concatenation
  if (cleanPath === '/') {
    cleanPath = '';
  }

  if (locale === routing.defaultLocale) {
    return `${baseUrl}${cleanPath}`;
  } else {
    return `${baseUrl}/${locale}${cleanPath}`;
  }
}

/**
 * Generates the alternates (canonical + languages) object for Next.js Metadata.
 * Automatically includes x-default and all supported locales.
 */
export function getAlternates(locale: string, pathname: string = '') {
  const canonical = constructCanonicalUrl(locale, pathname);
  
  const languages: Record<string, string> = {};
  
  routing.locales.forEach((l) => {
    languages[l] = constructCanonicalUrl(l, pathname);
  });
  
  // x-default maps to the default locale (root)
  languages['x-default'] = constructCanonicalUrl(routing.defaultLocale, pathname);

  return {
    canonical,
    languages,
  };
}
