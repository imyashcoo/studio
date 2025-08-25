
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:py-20 space-y-16">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Terms of Service
            </h1>
            <p className="mt-2 text-muted-foreground">Effective Date: 25th Aug 2025</p>
          </div>

          <div className="space-y-10 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Welcome to RackUp! These Terms of Service (“Terms”) govern your access to and use of the RackUp platform, mobile application, website, and services (collectively, the “Platform”). Please read them carefully before using RackUp. By accessing or using RackUp, you agree to these Terms. If you do not agree, please do not use our Platform.
            </p>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. About RackUp</h2>
              <p>RackUp is a digital marketplace that connects rack owners (store owners who want to rent out shelf/rack space) with rack renters (brands, product owners, or businesses looking to display their products on rented racks).</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>RackUp does not own, sell, or rent racks.</li>
                <li>RackUp is not a party to any rental agreement entered between rack owners and rack renters.</li>
                <li>RackUp only facilitates discovery and connection between users.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. Eligibility</h2>
              <p>You must:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Be at least 18 years old.</li>
                <li>Register using a valid mobile number, email ID, and password.</li>
                <li>Provide accurate and up-to-date information.</li>
              </ul>
              <p className="mt-2">RackUp reserves the right to suspend or terminate accounts that provide false information or violate these Terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Accounts</h2>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                <li>You are responsible for all activities under your account.</li>
                <li>Notify RackUp immediately if you suspect unauthorized access.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Role of RackUp</h2>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>RackUp is a platform only.</li>
                <li>We do not verify rack conditions, footfall, sales data, or any information shared by users.</li>
                <li>Any disputes, negotiations, payments, or damages are solely between rack owners and rack renters.</li>
                <li>RackUp is not liable for any losses, damages, fraud, or disputes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">5. Listings (Rack Owners)</h2>
              <p>Rack Owners may list rack space by providing:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Rack photos</li>
                <li>Location & pincode</li>
                <li>Weekly rent</li>
                <li>Footfall (daily/weekly)</li>
                <li>Sales metrics (if any)</li>
              </ul>
              <p className="mt-2">Rack Owners are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Accuracy of information</li>
                <li>Condition and availability of racks</li>
                <li>Compliance with local laws</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">6. Renting (Rack Renters)</h2>
              <p>Rack Renters may browse, filter, and contact Rack Owners to rent space. Rack Renters are responsible for:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Verifying rack details before renting</li>
                <li>Negotiating terms directly with Rack Owners</li>
                <li>Compliance with laws, licenses, and product display rules</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">7. Payments</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>RackUp may provide payment facilitation tools (if enabled in future).</li>
                <li>All financial terms are directly between Rack Owners and Renters.</li>
                <li>RackUp is not responsible for payment defaults, refunds, or chargebacks.</li>
              </ul>
            </div>

             <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">8. Prohibited Activities</h2>
              <p>Users agree not to:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Post false, misleading, or fraudulent information.</li>
                <li>Use the Platform for illegal activities.</li>
                <li>Circumvent the Platform to avoid service fees (if applicable).</li>
                <li>Infringe on third-party rights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">9. Liability Disclaimer</h2>
              <p>RackUp is a neutral platform. By using RackUp, you acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>RackUp is not liable for rack conditions, business outcomes, or financial losses.</li>
                <li>All agreements, risks, and responsibilities rest with Rack Owners and Rack Renters.</li>
                <li>RackUp provides no warranties regarding accuracy, reliability, or availability of listings.</li>
              </ul>
            </div>

             <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">10. Termination</h2>
              <p>RackUp may suspend or terminate accounts that:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Violate these Terms</li>
                <li>Post illegal or fraudulent listings</li>
                <li>Abuse the platform or other users</li>
              </ul>
            </div>

             <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">11. Intellectual Property</h2>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>All content on RackUp (logo, design, app features) belongs to RackUp.</li>
                <li>Users retain ownership of content they post but grant RackUp a license to display it on the platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to Terms</h2>
              <p>RackUp may update these Terms at any time. Continued use of the Platform after updates constitutes acceptance of the revised Terms.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">13. Governing Law</h2>
              <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Lucknow, India.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">14. Contact Us</h2>
              <p>For any questions about these Terms, please contact: hi@rackup.world</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg -mx-4">
          <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join the RackUp community and find your perfect retail space or lister.</p>
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
