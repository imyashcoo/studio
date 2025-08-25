'use client';

import { useState, useMemo } from 'react';
import { mockRacks } from '@/lib/data';
import type { Rack } from '@/types';
import { RackCard } from '@/components/RackCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const activeRacks = useMemo(() => {
    let racks: Rack[] = mockRacks.filter(r => r.status === 'Available');

    // Filter by search term
    if (searchTerm) {
      racks = racks.filter(rack =>
        rack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rack.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rack.pincode.includes(searchTerm)
      );
    }

    // Sort
    switch (sortBy) {
      case 'rent_asc':
        racks.sort((a, b) => a.weeklyRent - b.weeklyRent);
        break;
      case 'rent_desc':
        racks.sort((a, b) => b.weeklyRent - a.weeklyRent);
        break;
      case 'footfall_desc':
        racks.sort((a, b) => b.dailyFootfall - a.dailyFootfall);
        break;
      case 'recent':
      default:
        racks.reverse();
        break;
    }

    return racks;
  }, [searchTerm, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="RackUp Logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">RackUp</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 sm:py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground">
            Rent & List Retail Racks with Ease
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            The premier marketplace connecting brands with retail spaces. Find the perfect spot for your products or monetize your empty racks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/explore">
                Explore All Racks <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/list-rack">List Your Rack</Link>
            </Button>
          </div>
        </section>
        
        <div className="flex flex-col gap-4 md:flex-row p-4 border rounded-lg bg-card mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, location, or pincode..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rent_asc">Rent: Low to High</SelectItem>
              <SelectItem value="rent_desc">Rent: High to Low</SelectItem>
              <SelectItem value="footfall_desc">Footfall: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeRacks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {activeRacks.map(rack => (
              <RackCard key={rack.id} rack={rack} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No Racks Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RackUp. All rights reserved.</p>
      </footer>
    </div>
  );
}
