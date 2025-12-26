import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths except static files and API routes
  // Include locale paths like /ru, /en etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/', '/(de|en|es|ja|ko|ru)/:path*'],
};