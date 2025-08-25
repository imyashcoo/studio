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

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  query: z.string().min(10, 'Query must be at least 10 characters long.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      query: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: 'Query Submitted!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Contact Us</CardTitle>
          <CardDescription>Have a question or feedback? Fill out the form below to get in touch with our team.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 12345 67890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Please describe your query in detail..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
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
