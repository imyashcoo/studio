
'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { mockPremiumInquiries } from '@/lib/data';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  query: z.string().min(10, 'Query must be at least 10 characters long.'),
});

const premiumInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  designation: z.string().min(2, 'Designation is required.'),
  website: z.string().url('Please enter a valid website URL.'),
  goal: z.string().min(10, 'Goal must be at least 10 characters long.'),
  location: z.string().min(2, 'Location must be at least 2 characters.'),
  budget: z.string().min(2, 'Budget is required.'),
  numberOfRacks: z.coerce.number().int().positive('Please enter a valid number of racks.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});


type ContactFormValues = z.infer<typeof contactFormSchema>;
type PremiumInquiryValues = z.infer<typeof premiumInquirySchema>;


function ContactUsPageInternal() {
  const searchParams = useSearchParams();
  const isPremiumInquiry = searchParams.get('subject') === 'Premium';
  const { toast } = useToast();

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', phone: '', email: '', query: '' },
  });

  const premiumForm = useForm<PremiumInquiryValues>({
      resolver: zodResolver(premiumInquirySchema),
      defaultValues: { name: '', email: '', phone: '', designation: '', website: '', goal: '', location: '', budget: '', message: '' },
  });

  function onContactSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: 'Query Submitted!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    contactForm.reset();
  }

  function onPremiumSubmit(data: PremiumInquiryValues) {
    const newInquiry = { id: `inquiry-${Date.now()}`, ...data };
    mockPremiumInquiries.push(newInquiry);
    console.log('New Premium Inquiry:', newInquiry);
    toast({
      title: 'Sales Inquiry Submitted!',
      description: 'Thank you for your interest in Premium. Our team will get back to you shortly.',
    });
    premiumForm.reset();
  }


  const GeneralContactForm = () => (
     <Form {...contactForm}>
        <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-8">
            <FormField control={contactForm.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={contactForm.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="m@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={contactForm.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={contactForm.control} name="query" render={({ field }) => (
                <FormItem><FormLabel>Your Message</FormLabel><FormControl><Textarea placeholder="Please describe your query in detail..." className="min-h-32" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <Button type="submit">Submit</Button>
        </form>
    </Form>
  );

  const PremiumInquiryForm = () => (
      <Form {...premiumForm}>
        <form onSubmit={premiumForm.handleSubmit(onPremiumSubmit)} className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
                <FormField control={premiumForm.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={premiumForm.control} name="designation" render={({ field }) => (
                    <FormItem><FormLabel>Designation</FormLabel><FormControl><Input placeholder="e.g., Marketing Head" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
             </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={premiumForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="m@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={premiumForm.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
            <FormField control={premiumForm.control} name="website" render={({ field }) => (
                <FormItem><FormLabel>Company Website</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={premiumForm.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Target Location(s)</FormLabel><FormControl><Input placeholder="e.g., Delhi, Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={premiumForm.control} name="goal" render={({ field }) => (
                    <FormItem><FormLabel>Business Goal</FormLabel><FormControl><Input placeholder="e.g., Increase sales by 20%" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <FormField control={premiumForm.control} name="budget" render={({ field }) => (
                    <FormItem><FormLabel>Tentative Budget (₹)</FormLabel><FormControl><Input placeholder="e.g., 50,000" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={premiumForm.control} name="numberOfRacks" render={({ field }) => (
                    <FormItem><FormLabel>Number of Racks</FormLabel><FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <FormField control={premiumForm.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Tell us more about your brand and products." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <Button type="submit">Submit Inquiry</Button>
        </form>
    </Form>
  );


  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {isPremiumInquiry ? 'Premium Service Inquiry' : 'Contact Us'}
          </CardTitle>
          <CardDescription>
            {isPremiumInquiry 
                ? 'Tell us about your brand and we will get back to you with a tailored proposal.' 
                : 'Have a question or feedback? Fill out the form below to get in touch.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isPremiumInquiry ? <PremiumInquiryForm /> : <GeneralContactForm />}
        </CardContent>
      </Card>
      
       {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg -mx-4">
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


export default function ContactUsPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ContactUsPageInternal />
        </React.Suspense>
    )
}
