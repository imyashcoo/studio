import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Handshake, Eye, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const ownerFaqs = [
    {
        question: "What is RackUp and how does it help me as a rack owner?",
        answer: "RackUp is a marketplace that allows you to list your empty rack or shelf space and connect with brands or sellers who want to rent them. It helps you earn additional income from underutilized retail space."
    },
    {
        question: "How do I list a rack on RackUp?",
        answer: "You can create an account, go to “List a Rack,” and upload details such as photos, location, pincode, weekly rent, daily/weekly footfall, and sales potential."
    },
    {
        question: "Can I list multiple racks from my store?",
        answer: "Yes. You can list as many racks as you have available for rent."
    },
    {
        question: "How do I decide the rent amount?",
        answer: "You are free to set your own rent based on the location, size, and footfall of your store."
    },
    {
        question: "Is it mandatory to provide footfall and sales data?",
        answer: "It’s recommended but not mandatory. Providing these details helps attract more renters by giving them confidence in your store’s visibility."
    },
    {
        question: "How will renters contact me?",
        answer: "Interested renters can send you an enquiry through the app. You will receive their contact details to discuss terms directly."
    },
    {
        question: "Can I reject a rental request?",
        answer: "Yes, you have complete control to accept or reject requests based on your preference."
    },
    {
        question: "How do I get paid?",
        answer: "Payments are handled directly between you and the renter. RackUp does not process payments or take commissions."
    },
    {
        question: "What happens if the renter’s products are damaged or stolen?",
        answer: "RackUp is only a connecting platform. You and the renter must mutually agree on terms. RackUp holds no liability for damages, losses, or disputes."
    },
    {
        question: "Can I restrict certain types of products?",
        answer: "Yes. As the rack owner, you can decide which categories of products are allowed in your store."
    },
    {
        question: "Can I remove my rack listing?",
        answer: "Yes. You can edit, deactivate, or delete your listing at any time from your dashboard."
    },
    {
        question: "Am I responsible for the renter’s sales performance?",
        answer: "No. The renter is solely responsible for sales and product performance."
    },
    {
        question: "Can I terminate a rental agreement early?",
        answer: "Yes, but this should be agreed upon directly with the renter. RackUp does not intervene in such decisions."
    }
];

const renterFaqs = [
    {
        question: "What is RackUp and how does it help me as a renter?",
        answer: "RackUp connects you with shop owners who have available rack or shelf space so you can display your products and reach real retail customers."
    },
    {
        question: "Do I need an account to rent a rack?",
        answer: "Yes, you must create a free account to enquire, contact, and book racks."
    },
    {
        question: "How can I find the right rack for my products?",
        answer: "Use the search filters by location, pincode, rent amount, and footfall to discover racks that suit your needs."
    },
    {
        question: "How do I contact a rack owner?",
        answer: "Once you find a rack, click on “Enquire Now.” You will get the owner’s details to discuss directly."
    },
    {
        question: "Can I negotiate the rent?",
        answer: "Yes. All negotiations, terms, and conditions are directly between you and the rack owner."
    },
    {
        question: "How do I pay for the rack rental?",
        answer: "Payments are made directly to the rack owner. RackUp does not collect or hold payments."
    },
    {
        question: "What if the sales or footfall data shared by the store is not accurate?",
        answer: "RackUp only provides a platform for listings. Renters should verify details with the store owner before finalizing agreements."
    },
    {
        question: "Who is responsible if my products get damaged or stolen?",
        answer: "RackUp is not liable for product safety. You should discuss responsibility and security arrangements directly with the rack owner."
    },
    {
        question: "Can I display any product I want?",
        answer: "No. You must comply with the store owner’s rules and restrictions. Prohibited or illegal products are not allowed."
    },
    {
        question: "How do I track my product sales from the rented rack?",
        answer: "You should coordinate directly with the rack owner to track sales or place your own sales monitoring mechanism. RackUp does not monitor sales."
    },
    {
        question: "Is there a minimum rental duration?",
        answer: "This depends on the agreement you make with the rack owner. RackUp does not set duration limits."
    },
    {
        question: "Can I rent multiple racks across different stores?",
        answer: "Yes. You can rent as many racks as you wish, depending on availability."
    },
    {
        question: "What if the rack owner cancels my rental?",
        answer: "Any cancellations or disputes must be resolved directly with the rack owner. RackUp does not intervene."
    },
    {
        question: "Does RackUp charge me a fee for renting racks?",
        answer: "RackUp does not charge renters. Any payments are only between you and the rack owner."
    },
    {
        question: "Can I terminate my rental before the agreed period ends?",
        answer: "Yes, but you must discuss and agree directly with the rack owner."
    }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-16">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find answers to common questions about listing and renting racks on RackUp.
            </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
            <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">For Rack Owners</h2>
                 <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {ownerFaqs.map((faq, index) => (
                                <AccordionItem value={`owner-item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                 </Card>
            </section>

             <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">For Rack Renters</h2>
                  <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {renterFaqs.map((faq, index) => (
                                <AccordionItem value={`renter-item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                 </Card>
            </section>

            <section>
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                        <p className="font-semibold mt-2">Applies to Both Rack Owners & Renters</p>
                        <p className="mt-2 text-muted-foreground">
                        RackUp is only a marketplace platform to connect rack owners and renters. It does not:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                            <li>Guarantee sales or footfall.</li>
                            <li>Handle payments or commissions.</li>
                            <li>Take liability for disputes, damages, losses, or theft.</li>
                        </ul>
                        <p className="mt-2 text-muted-foreground">All agreements are strictly between the rack owner and rack renter.</p>
                    </AlertDescription>
                </Alert>
            </section>
        </div>

         {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
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
    </div>
  );
}
