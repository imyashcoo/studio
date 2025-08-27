'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, DollarSign, Sparkles, Handshake } from 'lucide-react';
import { mockRacks } from '@/lib/data';
import { RackCard } from '@/components/RackCard';
import { SellerCard } from '@/components/SellerCard';
import { TestimonialCard } from '@/components/TestimonialCard';

export default function LandingPage() {
  const popularLocalities = ["Gomti Nagar", "Indira Nagar", "Mahanagar", "Chinhat"];
  const recommendedSellers = [
    { name: "Sidharth Singh", status: "Rack Up Pro", location: "Gomti Nagar", avatar: "https://placehold.co/100x100.png", dataAiHint: "person avatar" },
    { name: "Aradhana Pandey", status: "Rack Up Edge", location: "Mahanagar", avatar: "https://placehold.co/100x100.png", dataAiHint: "person avatar" }
  ];
   const testimonials = [
    {
      name: "Rishabh Arora",
      reviews: 2,
      rating: 5,
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      text: "Rackup gave our brand instant visibility in local shops without spending lakhs on ads. It was affordable, easy to set up, and we could track sales in real time."
    },
    {
      name: "khira",
      reviews: 2,
      rating: 4,
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "woman portrait",
      text: "Within weeks, we saw a significant increase in awareness and customer engagement."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/80 to-accent text-primary-foreground -mx-4">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get Your Brand on Local Shelves</h1>
            <p className="mt-4 text-lg md:text-xl font-light">Instantly.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild><Link href="/explore">Find a Rack</Link></Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild><Link href="/list-rack">List Your Rack</Link></Button>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="py-16 bg-muted -mx-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-center sm:text-left">Marketplace (Browse Shelves)</h2>
              <Button variant="ghost" asChild>
                <Link href="/explore">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRacks.slice(0, 4).map(rack => (
                <RackCard key={rack.id} rack={rack} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground -mx-4">
            <div className="container py-8 text-center">
                <Link href="/list-rack" className="text-lg md:text-xl font-semibold hover:underline">
                    Are you an owner? List Your Rack For Free &rarr;
                </Link>
            </div>
        </section>

        {/* Popular Localities */}
        <section className="py-16 bg-muted -mx-4">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Localities</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {popularLocalities.map(loc => (
                <Button key={loc} variant="outline" className="rounded-full px-6 bg-white">{loc}</Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Exclusive Listing Section */}
        <section className="py-16 bg-background -mx-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-center sm:text-left">Exclusive Listing <Badge className="ml-2 bg-primary text-primary-foreground">RackUP Plus</Badge></h2>
              <Button variant="ghost" asChild>
                <Link href="/explore?plan=plus">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRacks.slice(1, 5).map(rack => (
                 <RackCard key={rack.id} rack={rack} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted -mx-4">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Rack UP Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Low-cost entry</h3>
                <p className="text-muted-foreground mt-2">Affordable shelf rentals vs ads.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Instant market presence</h3>
                <p className="text-muted-foreground mt-2">Quick retail visibility.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                 <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Handshake className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Boost availability</h3>
                <p className="text-muted-foreground mt-2">Direct engagement with local customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Sellers Section */}
        <section className="py-16 bg-background -mx-4">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8 text-center">Recommended Sellers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {recommendedSellers.map((seller, index) => (
                        <SellerCard key={index} {...seller} />
                    ))}
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-16 bg-muted -mx-4">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>

      </main>

    </div>
  );
}
