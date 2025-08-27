
'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { mockRacks } from '@/lib/data';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // Render nothing or a loading spinner while checking auth state.
    // This prevents any dashboard content from flashing for unauthenticated users.
    return (
      <div className="flex items-center justify-center h-full">
        <div>Loading...</div>
      </div>
    );
  }
  
  // This is mock data logic. In a real app, you would fetch this from your backend.
  // const userRacks = mockRacks.filter(rack => rack.owner.id === user.uid);
  const userRacks = mockRacks.slice(0, 2); // Mock
  const rentedRacks = [mockRacks[2]]; // Mock data for rented racks

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, rentals, and profile.</p>
        </div>
      <Tabs defaultValue="my-listings" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          <TabsTrigger value="my-rentals">My Rentals</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="my-listings">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>
                A list of all racks you have listed on RackUp.
              </CardDescription>
            </CardHeader>
            <CardContent>
             <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rack Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Weekly Rent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRacks.map(rack => (
                    <TableRow key={rack.id}>
                      <TableCell className="font-medium whitespace-nowrap">{rack.title}</TableCell>
                      <TableCell>
                        <Badge
                           variant={rack.status === 'Available' ? 'default' : 'destructive'}
                           className={cn(
                             rack.status === 'Available'
                               ? 'bg-green-500 hover:bg-green-600'
                               : 'bg-red-500 hover:bg-red-600',
                             'text-white'
                           )}
                        >
                          {rack.status}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{rack.weeklyRent.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-rentals">
          <Card>
             <CardHeader>
              <CardTitle>My Rentals</CardTitle>
              <CardDescription>
                A list of all racks you have rented or enquired about.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {rentedRacks.map(rack => (
                <div key={rack.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Image src={rack.photos[0]} alt={rack.title} width={80} height={60} className="rounded-md object-cover" data-ai-hint="retail shelf"/>
                    <div>
                      <p className="font-semibold">{rack.title}</p>
                      <p className="text-sm text-muted-foreground">{rack.location}</p>
                    </div>
                  </div>
                   <Button variant="outline" className="w-full sm:w-auto">View Details</Button>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal and business information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email || ''} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user.mobile || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name (Optional)</Label>
                <Input id="business-name" defaultValue={user.businessName || ''}/>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
