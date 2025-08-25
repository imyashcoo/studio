'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockRacks, locations, businessCategories } from '@/lib/data';
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

function ExplorePageInternal() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'All');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    setSelectedState(searchParams.get('state') || 'All');
    setSelectedCity(searchParams.get('city') || 'All');
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

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
    
    // Filter by location
    if (selectedCity !== 'All') {
        racks = racks.filter(rack => rack.location.toLowerCase().includes(selectedCity.toLowerCase()));
    } else if (selectedState !== 'All') {
        const citiesInState = locations.find(l => l.state === selectedState)?.cities || [];
        racks = racks.filter(rack => citiesInState.some(city => rack.location.toLowerCase().includes(city.toLowerCase())));
    }

    // Filter by category
    if(selectedCategory !== 'All') {
        racks = racks.filter(rack => rack.category === selectedCategory)
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
  }, [searchTerm, statusFilter, sortBy, selectedState, selectedCity, selectedCategory]);

  const handleStateChange = (state: string) => {
      setSelectedState(state);
      setSelectedCity('All');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Racks</h1>
          <p className="text-muted-foreground">Find the perfect space for your products.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All States</SelectItem>
                  {locations.map(loc => <SelectItem key={loc.state} value={loc.state}>{loc.state}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={selectedState === 'All'}>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="All">All Cities</SelectItem>
                   {locations.find(loc => loc.state === selectedState)?.cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {businessCategories.map(cat => <SelectItem key={cat.main} value={cat.main}>{cat.main}</SelectItem>)}
                </SelectContent>
              </Select>
             <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectTrigger>
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


export default function ExplorePage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ExplorePageInternal />
        </React.Suspense>
    )
}
