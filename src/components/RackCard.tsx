'use client';

import type { Rack } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, IndianRupee, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface RackCardProps {
  rack: Rack;
}

export function RackCard({ rack }: RackCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rack.location + " " + rack.pincode)}`;
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = () => {
    if (user) {
      router.push(`/racks/${rack.id}`);
    } else {
      toast({
        title: 'Please Log In',
        description: 'You need to be logged in to view rack details.',
        variant: 'destructive'
      });
      router.push('/login');
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group/rackcard rounded-lg border-border/60">
      <div className="relative">
        <div onClick={handleViewDetails} className="cursor-pointer">
          <Image
            src={rack.photos[0]}
            alt={rack.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover/rackcard:scale-105 transition-transform duration-300"
            data-ai-hint="retail shelf"
          />
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover/rackcard:opacity-100 transition-opacity duration-300">
           <Button variant="ghost" size="icon" className="h-9 w-9 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
              <Heart className="h-4 w-4 text-gray-700" />
           </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
              <Share2 className="h-4 w-4 text-gray-700" />
           </Button>
        </div>
        <Badge className="absolute bottom-3 left-3 bg-black/50 text-white backdrop-blur-sm">{rack.category}</Badge>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col bg-card">
        <h3 className="font-semibold text-base leading-tight truncate group-hover/rackcard:text-primary">{rack.title}</h3>
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center text-xs text-muted-foreground hover:text-primary"
          onClick={(e) => e.stopPropagation()} // Prevents card click handler
        >
          <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" />
          <span className="truncate">{rack.location}</span>
        </a>
        <div className="mt-4 flex-grow space-y-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <IndianRupee className="h-4 w-4 mr-2 text-primary/80" />
            <span className="font-semibold text-foreground text-base">₹{rack.weeklyRent.toLocaleString('en-IN')}</span>
            <span className="text-xs ml-1">/ week</span>
          </div>
          <div className="flex items-center text-muted-foreground text-xs">
            <Users className="h-4 w-4 mr-2 text-primary/80" />
            <span>
              <span className="font-bold text-foreground">{rack.dailyFootfall.toLocaleString('en-IN')}</span> daily footfall
            </span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="secondary" onClick={handleViewDetails}>View Details</Button>
      </CardContent>
    </Card>
  );
}
