
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/lib/auth';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';
import { Suspense } from 'react';
import { AppContent } from './AppContent';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'RackUp',
  description: 'A marketplace for renting and listing retail racks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          inter.variable
        )}
      >
        <Suspense>
          <GoogleTagManager />
          <GoogleAnalytics />
        </Suspense>
        <AuthProvider>
            <AppContent>
              {children}
            </AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
