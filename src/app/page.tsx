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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get Your Brand on Local Shelves. Instantly.</h1>
            <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">The easiest way to find and rent retail shelf space in high-footfall stores near you.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild><Link href="/explore">Find a Rack</Link></Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild><Link href="/list-rack">List Your Rack</Link></Button>
            </div>
          </div>
        </section>

        {/* Featured Racks Section */}
        <section className="py-16 -mx-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-center sm:text-left">Featured Racks</h2>
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

        {/* Benefits Section */}
        <section className="py-16 bg-muted -mx-4">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose RackUp?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Affordable Visibility</h3>
                <p className="text-muted-foreground mt-2 text-sm">Get your products on shelves at a fraction of the cost of traditional advertising.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Instant Market Presence</h3>
                <p className="text-muted-foreground mt-2 text-sm">Launch in new locations quickly and reach customers where they already shop.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                 <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Handshake className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Direct Connections</h3>
                <p className="text-muted-foreground mt-2 text-sm">We connect you directly with store owners to make renting simple and transparent.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner for Owners */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-primary-foreground -mx-4">
            <div className="container py-12 text-center flex flex-col items-center">
                 <h2 className="text-3xl font-bold">Have an Empty Rack?</h2>
                 <p className="mt-2 text-lg text-muted-foreground">Turn your unused shelf space into a new revenue stream.</p>
                <Button size="lg" variant="secondary" asChild className="mt-6"><Link href="/list-rack">List Your Rack For Free &rarr;</Link></Button>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-muted -mx-4">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
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
