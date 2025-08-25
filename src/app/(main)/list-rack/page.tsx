'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const rackFormSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
  location: z.string().min(3, 'Location is required.'),
  pincode: z.string().regex(/^\d{6}$/, 'Must be a valid 6-digit pincode.'),
  weeklyRent: z.coerce.number().positive('Weekly rent must be a positive number.'),
  dailyFootfall: z.coerce.number().int().positive('Daily footfall must be a positive number.'),
  weeklyFootfall: z.coerce.number().int().positive('Weekly footfall must be a positive number.'),
  dailySales: z.coerce.number().positive('Daily sales must be a positive number.'),
  weeklySales: z.coerce.number().positive('Weekly sales must be a positive number.'),
  // photos: z.any(), // File upload handling is complex for this example
});

type RackFormValues = z.infer<typeof rackFormSchema>;

export default function ListRackPage() {
  const { toast } = useToast();
  const form = useForm<RackFormValues>({
    resolver: zodResolver(rackFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      pincode: '',
    },
  });

  function onSubmit(data: RackFormValues) {
    console.log(data);
    toast({
      title: 'Listing Submitted!',
      description: 'Your rack has been successfully listed for review.',
      variant: 'default',
    });
    form.reset();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">List Your Rack</CardTitle>
          <p className="text-muted-foreground">Fill in the details below to put your rack on the market.</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rack Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Prime Aisle End-Cap in Supermarket" {...field} />
                    </FormControl>
                    <FormDescription>A catchy and descriptive title for your listing.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your rack space, its benefits, and the surrounding environment." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormItem>
                <FormLabel>Rack Photos</FormLabel>
                <FormControl>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground"/>
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple />
                        </label>
                    </div> 
                </FormControl>
                 <FormDescription>Upload multiple clear photos of your rack space.</FormDescription>
              </FormItem>
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input placeholder="e.g., Downtown, Metro City" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl><Input placeholder="e.g., 110001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                 <FormField
                  control={form.control}
                  name="weeklyRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weekly Rent (₹)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 2500" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="dailyFootfall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Daily Footfall</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 1200" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="weeklyFootfall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Weekly Footfall</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 8400" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dailySales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Daily Sales (Store, ₹)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weeklySales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Weekly Sales (Store, ₹)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 105000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Submit Listing</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
