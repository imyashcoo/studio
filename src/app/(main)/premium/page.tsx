
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart2, Truck, Star } from 'lucide-react';
import Link from 'next/link';

export default function PremiumPage() {
  const benefits = [
    {
      icon: Star,
      title: 'Hassle-Free Placement',
      description: 'We find the best racks and place your products for you. No negotiations, no hassle.',
    },
    {
      icon: BarChart2,
      title: 'Data-Driven Analytics',
      description: 'Get detailed insights on sales, inventory, and rack performance directly on your dashboard.',
    },
    {
      icon: Truck,
      title: 'End-to-End Logistics',
      description: 'We handle the pickup from your factory to the store shelf, powered by our logistics partners.',
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Placements',
      description: 'Leverage our network of pre-vetted, high-footfall locations for guaranteed visibility.',
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            RackUp Premium
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your Brand, Our Expertise. We handle everything from placement to analytics, so you can focus on growth.
          </p>
           <Button size="lg" className="mt-8" asChild>
              <Link href="/contact?subject=Premium">Get Started</Link>
            </Button>
        </section>

        {/* Benefits Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Why Go Premium?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 transition-all hover:shadow-xl hover:-translate-y-1 bg-card">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted -mx-4 px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">A Simple Path to Retail Success</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">1.</div>
                <h3 className="text-xl font-semibold mb-2">Tell Us Your Goal</h3>
                <p className="text-muted-foreground">We start with a consultation to understand your brand, target audience, and sales objectives.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">2.</div>
                <h3 className="text-xl font-semibold mb-2">We Execute</h3>
                <p className="text-muted-foreground">Our team selects prime locations, handles logistics, and ensures your products are perfectly displayed.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">3.</div>
                <h3 className="text-xl font-semibold mb-2">You Track Performance</h3>
                <p className="text-muted-foreground">Log in to your dashboard to see real-time sales data, inventory levels, and customer insights.</p>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
          <h2 className="text-3xl font-bold mb-2">Ready to scale your brand effortlessly?</h2>
          <p className="text-lg mb-8">Let RackUp Premium be your unfair advantage in retail.</p>
          <div className="flex justify-center gap-4">
             <Button size="lg" variant="secondary" asChild>
                <Link href="/contact?subject=Premium">Contact Sales</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/explore">Explore Racks</Link>
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
}
