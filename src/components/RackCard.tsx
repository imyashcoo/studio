'use client';

import type { Rack } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, DollarSign, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface RackCardProps {
  rack: Rack;
}

export function RackCard({ rack }: RackCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group/rackcard">
      <div className="relative">
        <Link href={`/racks/${rack.id}`}>
          <Image
            src={rack.photos[0]}
            alt={rack.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="retail shelf"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
           <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full">
              <Heart className="h-4 w-4 text-gray-700" />
           </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full">
              <Share2 className="h-4 w-4 text-gray-700" />
           </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg leading-tight truncate group-hover/rackcard:text-primary">{rack.title}</h3>
        <div className="mt-1 flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{rack.location}</span>
        </div>
        <div className="mt-4 flex-grow space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1.5 text-primary" />
            <span>
              <span className="font-bold text-foreground">₹{rack.weeklyRent.toLocaleString('en-IN')}</span> / week
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1.5 text-primary" />
            <span>
              <span className="font-bold text-foreground">{rack.dailyFootfall.toLocaleString('en-IN')}</span> avg daily footfall
            </span>
          </div>
           <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1.5 text-primary" />
             <span>
              <span className="font-bold text-foreground">{rack.weeklySales.toLocaleString('en-IN')}</span> avg weekly sales
            </span>
          </div>
        </div>
        <Link href={`/racks/${rack.id}`} className="w-full mt-4">
            <Button className="w-full">View Shelf Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
