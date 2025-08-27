
'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';

export function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
