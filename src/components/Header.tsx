
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // No need to push, the auth hook handles it.
  };
  
  const navLinks = [
      { href: "/explore", label: "Explore" },
      { href: "/list-rack", label: "List Your Rack" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Mountain className="h-6 w-6" />
          <span className="text-xl font-bold">RackUp</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {navLinks.map(link => (
                 <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                    {link.label}
                 </Link>
             ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <Mountain className="h-6 w-6" />
                            <span>RackUp</span>
                        </Link>
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {link.label}
                            </Link>
                        ))}
                         <div className="flex flex-col gap-4 mt-4">
                          {user ? (
                            <>
                              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                                Dashboard
                              </Button>
                              <Button onClick={handleLogout}>Logout</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" asChild>
                                <Link href="/login">Log In</Link>
                              </Button>
                              <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                              </Button>
                            </>
                          )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
