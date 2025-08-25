import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ListPlus, Store, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ShelfShare Logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">ShelfShare</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            Rent & List Retail Racks with Ease
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            The premier marketplace connecting brands with retail spaces. Find the perfect spot for your products or monetize your empty racks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/explore">
                Explore Racks <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/list-rack">List Your Rack</Link>
            </Button>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Discover Racks</h3>
                  <p className="mt-2 text-muted-foreground">
                    Search and filter through thousands of rack spaces in top locations to find your perfect match.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 flex flex-col items-center text-center">
                   <div className="p-4 bg-primary/10 rounded-full">
                    <ListPlus className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">List Your Space</h3>
                  <p className="mt-2 text-muted-foreground">
                    Easily list your available rack space, set your price, and connect with potential renters.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 flex flex-col items-center text-center">
                   <div className="p-4 bg-primary/10 rounded-full">
                    <Store className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Grow Your Brand</h3>
                  <p className="mt-2 text-muted-foreground">
                    Get your products in front of more customers by renting prime retail space without the long-term commitment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ShelfShare. All rights reserved.</p>
      </footer>
    </div>
  );
}
