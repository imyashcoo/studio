
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    // No need to push, the auth hook handles it.
  };
  
  const navLinks = [
      { href: "/explore", label: "explore racks" },
      { href: "/list-rack", label: "list racks" },
      { href: "/premium", label: "premium" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image src="/logo.svg" alt="RackUp Logo" width={32} height={32} className="h-8 w-auto" />
          <span className="text-xl font-bold">RackUp</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
             {navLinks.map(link => (
                 <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                        "transition-all hover:text-primary capitalize px-3 py-2 rounded-md",
                        pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                 >
                    {link.label}
                 </Link>
             ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user?.isAdmin && (
            <Button variant="outline" size="sm" onClick={() => router.push('/admin')}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          )}
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
                    <SheetHeader className="sr-only">
                      <SheetTitle>Mobile Menu</SheetTitle>
                      <SheetDescription>Navigation links for mobile users.</SheetDescription>
                    </SheetHeader>
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <Image src="/logo.svg" alt="RackUp Logo" width={32} height={32} className="h-8 w-auto"/>
                            <span>RackUp</span>
                        </Link>
                        {navLinks.map(link => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className={cn(
                                    "transition-all hover:text-primary capitalize p-2",
                                    pathname === link.href ? "bg-muted text-primary rounded-md" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                         <div className="flex flex-col gap-4 mt-4">
                          {user?.isAdmin && (
                            <Button variant="outline" onClick={() => router.push('/admin')}>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Admin Panel
                            </Button>
                          )}
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
