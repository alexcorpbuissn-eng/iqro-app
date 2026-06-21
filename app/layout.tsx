import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/lib/i18n-context';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "IQRO — O'quv Markazi",
  description: "IQRO o'quv markazi — ota-onalar va o'quvchilar uchun raqamli kabinet. Davomat, uy vazifasi, to'lovlar.",
  keywords: ['IQRO', 'oquv markazi', 'English', 'Mental Arifmetika', 'Yangihayot', 'Toshkent'],
  authors: [{ name: 'IQRO Academy' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'IQRO',
  },
  openGraph: {
    title: "IQRO — O'quv Markazi",
    description: "Davomat, uy vazifasi, to'lovlar — hamma narsa bir joyda",
    type: 'website',
    locale: 'uz_UZ',
  },
};

export const viewport: Viewport = {
  themeColor: '#C0181B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { OnboardingGate } from '@/components/shared/OnboardingGate';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={inter.className}>
        <LangProvider>
          <OnboardingGate>
            {children}
          </OnboardingGate>
        </LangProvider>
      </body>
    </html>
  );
}
