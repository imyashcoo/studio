'use client';

import type { Rack } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RackCardProps {
  rack: Rack;
}

export function RackCard({ rack }: RackCardProps) {
  return (
    <Link href={`/racks/${rack.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <Image
            src={rack.photos[0]}
            alt={rack.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="retail shelf"
          />
          <Badge
            className={cn(
              'absolute top-3 right-3',
              rack.status === 'Available' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
              'text-white'
            )}
            variant="default"
          >
            {rack.status}
          </Badge>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg leading-tight truncate group-hover:text-primary">{rack.title}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{rack.location}, {rack.pincode}</span>
          </div>
          <div className="mt-4 flex-grow space-y-2 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1.5 text-green-600" />
              <span>
                <span className="font-semibold">₹{rack.weeklyRent.toLocaleString()}</span> / week
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1.5 text-blue-600" />
              <span>
                <span className="font-semibold">{rack.dailyFootfall.toLocaleString()}</span> daily footfall
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex items-center gap-2">
            <Image
              src={rack.owner.avatarUrl}
              alt={rack.owner.name}
              width={24}
              height={24}
              className="rounded-full"
              data-ai-hint="person avatar"
            />
            <span className="text-xs text-muted-foreground">Listed by {rack.owner.name}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
