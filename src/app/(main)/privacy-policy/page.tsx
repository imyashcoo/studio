import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:py-20 space-y-16">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Privacy Policy
            </h1>
            <p className="mt-2 text-muted-foreground">Last Updated: 25th Aug 2025</p>
          </div>

          <div className="space-y-10 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Welcome to RackUp (“we”, “our”, “us”). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the RackUp mobile application, website, and related services (collectively, the “Platform”). By using RackUp, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of the Platform.
            </p>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
              <p>We collect the following types of information when you use RackUp:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Personal Information:</strong> Name, phone number, email address, password. Business details (optional) such as shop name, address, and pincode.</li>
                <li><strong>Listing Information:</strong> Photos, descriptions, location, pincode, rent amount, footfall, sales data you provide when listing racks.</li>
                <li><strong>Usage Data:</strong> Device information (mobile, OS, IP address). App activity such as searches, listings viewed, and enquiries made.</li>
                <li><strong>Location Information:</strong> Approximate or precise location (when enabled) to show nearby racks.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Provide, operate, and improve the RackUp Platform.</li>
                <li>Enable rack listing, searching, and renting.</li>
                <li>Communicate with you regarding enquiries, updates, and transactions.</li>
                <li>Send push notifications, alerts, and promotional messages (with consent).</li>
                <li>Ensure safety, security, and fraud prevention.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. Sharing of Information</h2>
              <p>We do not sell your personal data. We may share your information only in these cases:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>With other users:</strong> Limited details (e.g., name, contact info) when you list or enquire about a rack.</li>
                <li><strong>With service providers:</strong> For hosting, analytics, payment processing, or communication tools.</li>
                <li><strong>For legal reasons:</strong> To comply with law, regulation, or government request.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Storage & Security</h2>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Your data is stored securely on our servers and protected with encryption.</li>
                <li>We implement industry-standard safeguards to prevent unauthorized access.</li>
                <li>While we take all precautions, no method of storage is 100% secure.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Rights</h2>
              <p>You have the right to:</p>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Access, update, or correct your information.</li>
                <li>Delete your account and data (subject to legal or transactional requirements).</li>
                <li>Opt-out of marketing communications.</li>
              </ul>
              <p className="mt-2">Requests can be made by contacting us at hi@rackup.world.</p>
            </div>

             <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">6. Cookies & Tracking</h2>
               <ul className="list-disc list-inside space-y-2 mt-2">
                <li>We may use cookies or similar technologies to improve app performance and personalize your experience.</li>
                <li>You can disable cookies in your browser/app settings, but some features may not work properly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">7. Children’s Privacy</h2>
              <p>RackUp is not intended for children under 18. We do not knowingly collect data from minors.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">8. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted in the app/website with the updated “Last Updated” date.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">9. Contact Us</h2>
              <p>For any questions about this Privacy Policy, please contact us at: 📧 hi@rackup.world</p>
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
