import { mockRacks, mockUserDatabase } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { MapPin, Users, IndianRupee, Calendar, TrendingUp, Phone, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RackCard } from '@/components/RackCard';

export default function RackDetailPage({ params }: { params: { id: string } }) {
  const rack = mockRacks.find(r => r.id === params.id);

  if (!rack) {
    notFound();
  }

  const owner = mockUserDatabase[rack.owner.id];
  const whatsappUrl = owner?.whatsapp ? `https://wa.me/${owner.whatsapp.replace(/[^0-9]/g, '')}` : '';
  const phoneUrl = owner?.mobile ? `tel:${owner.mobile}` : '';

  const similarRacks = mockRacks.filter(r => r.category === rack.category && r.id !== rack.id).slice(0, 3);


  return (
    <div className="space-y-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {rack.photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden rounded-lg">
                      <Image
                        src={photo}
                        alt={`${rack.title} - Photo ${index + 1}`}
                        width={800}
                        height={600}
                        className="aspect-video w-full object-cover"
                        data-ai-hint="store interior"
                      />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          <div className="space-y-6">
            <div>
              <Badge
                variant={rack.status === 'Available' ? 'default' : 'destructive'}
                className={cn(
                  'mb-2',
                  rack.status === 'Available'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600',
                  'text-white'
                )}
              >
                {rack.status}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight">{rack.title}</h1>
              <div className="mt-2 flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{rack.location}, {rack.pincode}</span>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <IndianRupee className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-semibold">₹{rack.weeklyRent.toLocaleString('en-IN')}</p>
                    <p className="text-muted-foreground">Weekly Rent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-semibold">{rack.weeklyFootfall.toLocaleString('en-IN')}</p>
                    <p className="text-muted-foreground">Weekly Footfall</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 mt-0.5 text-primary" />
                   <div>
                    <p className="font-semibold">₹{rack.weeklySales.toLocaleString('en-IN')}</p>
                    <p className="text-muted-foreground">Avg. Weekly Sales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-semibold">{rack.dailyFootfall.toLocaleString('en-IN')}</p>
                    <p className="text-muted-foreground">Daily Footfall</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="mt-2 text-muted-foreground">{rack.description}</p>
            </div>
            
            <Separator />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <h3 className="text-base font-semibold">Listed By</h3>
                <div className="mt-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={rack.owner.avatarUrl} alt={rack.owner.name} data-ai-hint="person avatar"/>
                    <AvatarFallback>{rack.owner.name.substring(0,2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{rack.owner.name}</p>
                    <p className="text-sm text-muted-foreground">{rack.owner.businessName || 'Individual Lister'}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                   <Button asChild variant="outline" className="flex-1 sm:flex-none">
                      <Link href={phoneUrl}>
                        <Phone className="mr-2 h-4 w-4" /> Contact
                      </Link>
                  </Button>
                  {whatsappUrl && (
                      <Button asChild className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600">
                          <Link href={whatsappUrl} target="_blank">
                              <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                          </Link>
                      </Button>
                  )}
              </div>
            </div>
            
            <Button size="lg" className="w-full" disabled={rack.status === 'Rented'}>
              {rack.status === 'Available' ? 'Enquire Now' : 'This rack is currently rented'}
            </Button>
          </div>
        </div>
      </div>

       {similarRacks.length > 0 && (
        <div className="max-w-6xl mx-auto">
            <Separator className="my-12" />
            <h2 className="text-2xl font-bold mb-8">Similar Racks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {similarRacks.map(similarRack => (
                    <RackCard key={similarRack.id} rack={similarRack} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
