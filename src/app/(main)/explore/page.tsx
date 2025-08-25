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
import { Search } from 'lucide-react';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const filteredAndSortedRacks = useMemo(() => {
    let racks: Rack[] = [...mockRacks];

    // Filter by search term
    if (searchTerm) {
      racks = racks.filter(rack =>
        rack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rack.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rack.pincode.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      racks = racks.filter(rack => rack.status === statusFilter);
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
        // Assuming mockRacks is in some default order, maybe we can reverse for "recent"
        racks.reverse();
        break;
    }

    return racks;
  }, [searchTerm, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Racks</h1>
          <p className="text-muted-foreground">Find the perfect space for your products.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row p-4 border rounded-lg bg-card">
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
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Rented">Rented</SelectItem>
            </SelectContent>
          </Select>
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
      </div>

      {filteredAndSortedRacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedRacks.map(rack => (
            <RackCard key={rack.id} rack={rack} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No Racks Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
