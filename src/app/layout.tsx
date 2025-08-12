import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SVG to ICO Converter | PNG to ICO | JPG to ICO - Free Online Tool",
  description: "Convert SVG to ICO, PNG to ICO, JPG to ICO online for free. High-quality image conversion with multiple sizes and customizable settings. Fast and secure.",
  keywords: "svg to ico, png to ico, jpg to ico, image converter, icon converter, favicon generator, online converter, free tool",
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.png',
  },
  alternates: {
    canonical: 'https://svgtoico.org',
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
        <link rel="icon" href="/logo.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
      </body>
    </html>
  );
}
