import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … or ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)'
  ]
};
