'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  User,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export function Header() {
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">RackUp</span>
        </Link>
          <div className="hidden md:flex items-center gap-2">
              <Link href="/explore"><Button variant="ghost">Explore</Button></Link>
              <Link href="/list-rack"><Button variant="ghost">List a Rack</Button></Link>
              {isLoggedIn && <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>}
          </div>
        <div className="flex items-center gap-2">
            {isLoggedIn && user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-12 gap-2 px-2">
                      <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || "https://placehold.co/100x100.png"} alt={user.displayName || "User Avatar"} data-ai-hint="user avatar" />
                      <AvatarFallback>{user.displayName?.substring(0,2) || 'U'}</AvatarFallback>
                      </Avatar>
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end" className="w-56">
                  <DropdownMenuLabel>{user.displayName || "My Account"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                  <Button variant="ghost" asChild>
                      <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                      <Link href="/signup">Sign Up</Button>
                  </Button>
              </>
            )}
        </div>
      </div>
    </header>
  );
}
