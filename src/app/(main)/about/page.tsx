import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Eye, Handshake, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:py-20 space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
            We believe every product deserves the right spotlight.
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Our platform is a marketplace that connects shop owners with businesses and brands, making it easier than ever to list, rent, and utilize retail racks.
          </p>
        </section>

        {/* What we offer Section */}
        <section>
             <h2 className="text-3xl font-bold text-center mb-10">What We Offer</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                 <Card className="text-center p-6">
                    <CardContent className="flex flex-col items-center gap-4">
                        <Briefcase className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold">Seamless Platform</h3>
                        <p className="text-muted-foreground">List racks with details like location, footfall, rent, and sales potential effortlessly.</p>
                    </CardContent>
                 </Card>
                 <Card className="text-center p-6">
                    <CardContent className="flex flex-col items-center gap-4">
                        <Eye className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold">Smart Search</h3>
                        <p className="text-muted-foreground">Smart search & filters to help businesses find racks that match their exact needs.</p>
                    </CardContent>
                 </Card>
                 <Card className="text-center p-6">
                    <CardContent className="flex flex-col items-center gap-4">
                        <Handshake className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold">Single Login</h3>
                        <p className="text-muted-foreground">A unified login experience for both listing your valuable rack space and renting new ones.</p>
                    </CardContent>
                 </Card>
             </div>
        </section>


        {/* Mission Section */}
        <section className="bg-muted -mx-4 px-4 py-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To democratize retail visibility by creating opportunities for both shopkeepers and businesses through a simple, transparent, and tech-enabled rack rental marketplace.
              </p>
            </div>
            <div className="flex justify-center">
              <Target className="w-32 h-32 text-primary" />
            </div>
          </div>
        </section>


        {/* Why RackUp Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">Why RackUp?</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                <Handshake className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Unlock New Income</h3>
                <p className="text-muted-foreground mt-1">
                  We provide a reliable platform for shopkeepers to unlock new income streams from their existing retail space.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
               <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                <Eye className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Affordable Visibility</h3>
                <p className="text-muted-foreground mt-1">
                  We offer an affordable and scalable way for brands to gain offline visibility and reach new customers directly.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-6">
               <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                <Briefcase className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Bridge the Gap</h3>
                <p className="text-muted-foreground mt-1">
                  We bridge the gap between unused retail space and the thousands of growing businesses looking to expand their footprint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-2">It’s not just about renting space—it’s about growing together.</h2>
          <p className="text-lg mb-8">Join the RackUp community today.</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/list-rack">List Your Rack</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/explore">Find a Rack</Link>
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
}
