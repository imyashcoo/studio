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
  Home,
  ListPlus,
  LayoutDashboard,
  User,
  LogOut,
  Bell,
  Search,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { businessCategories, locations } from '@/lib/data';

export function Header() {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        const query = new URLSearchParams();
        if (selectedState) query.set('state', selectedState);
        if (selectedCity) query.set('city', selectedCity);
        if (selectedCategory) query.set('category', selectedCategory);
        router.push(`/explore?${query.toString()}`);
    }

  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">RackUp</span>
          </Link>
           <div className="hidden md:flex items-center gap-2">
                <Link href="/explore"><Button variant="ghost">Explore</Button></Link>
                <Link href="/list-rack"><Button variant="ghost">List a Rack</Button></Link>
                <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
                <Link href="/about"><Button variant="ghost">About Us</Button></Link>
           </div>
          <div className="flex items-center gap-2">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 gap-2 px-2">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log In</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
  );
}
