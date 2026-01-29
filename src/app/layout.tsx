import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from '@/components/common/theme-provider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'SVG to ICO Converter',
  description: 'Convert SVG files to ICO format online for free',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
    shortcut: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="shortcut icon" href="/logo.svg" />
        {/* Adsterra Popunder */}
        <Script
          id="adsterra-popunder"
          strategy="afterInteractive"
          src="https://pl27845680.effectivegatecpm.com/fe/94/06/fe94064d80d74690b289cde23b4fe784.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Adsterra Social Bar */}
        <Script
          id="adsterra-social-bar"
          strategy="afterInteractive"
          src="https://pl28593988.effectivegatecpm.com/73/e5/4b/73e54b6f942016df981c9be2ee045aef.js"
        />
      </body>
    </html>
  );
}
