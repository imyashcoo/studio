
'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Package, ShieldCheck, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user?.isAdmin) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/listings', label: 'Listings', icon: Package },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/premium-inquiries', label: 'Premium Inquiries', icon: Mail },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-muted/40 border-r p-4 flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-8">
            <Image src="/logo.svg" alt="RackUp Logo" width={32} height={32} />
            <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-primary/10 text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/')}>
                <Home className="mr-2 h-4 w-4"/> Back to Site
            </Button>
             <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                Logout
            </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b">
           <div className="flex items-center gap-2">
                <ShieldCheck />
                <h1 className="text-xl font-bold">Admin</h1>
           </div>
            {/* Add mobile menu trigger here if needed */}
        </header>
        <main className="flex-1 p-4 md:p-8 bg-muted/40">
            {children}
        </main>
      </div>
    </div>
  );
}
