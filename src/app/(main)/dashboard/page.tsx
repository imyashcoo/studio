

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
import { mockRacks, mockBids } from '@/lib/data';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import type { Rack, Bid } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';


export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // State to manage racks data locally
  const [allRacks, setAllRacks] = useState<Rack[]>(mockRacks);
  const [allBids, setAllBids] = useState<Bid[]>(mockBids);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRack, setSelectedRack] = useState<Rack | null>(null);
  const [newStatus, setNewStatus] = useState<Rack['status']>('Available');


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  const userRacks = useMemo(() => {
    if (!user) return [];
    return allRacks.filter(rack => rack.owner.id === user.uid);
  }, [allRacks, user]);

  const receivedBids = useMemo(() => {
      if(!user) return [];
      return allBids.filter(bid => bid.ownerId === user.uid && bid.status === 'Pending');
  }, [allBids, user]);

  const rentedRacks = useMemo(() => {
    if (!user) return [];
    // This is mock data, in real app it would be a separate list of rented racks for the user
    return allRacks.filter(r => (r.id === 'rack-3' || r.id === 'rack-6') && r.status === 'Rented');
  }, [allRacks, user]);


  const handleDeleteRack = (rackId: string) => {
    // In a real app, this would be an API call.
    setAllRacks(prevRacks => prevRacks.filter(rack => rack.id !== rackId));
    toast({
      title: "Rack Deleted",
      description: "Your rack listing has been successfully removed.",
    });
  };
  
  const handleOpenEditDialog = (rack: Rack) => {
      setSelectedRack(rack);
      setNewStatus(rack.status);
      setIsEditDialogOpen(true);
  }

  const handleUpdateStatus = () => {
    if (!selectedRack) return;

    setAllRacks(prevRacks =>
      prevRacks.map(rack =>
        rack.id === selectedRack.id ? { ...rack, status: newStatus } : rack
      )
    );
    
    toast({
      title: 'Status Updated',
      description: `The rack "${selectedRack.title}" is now ${newStatus}.`,
    });
    
    setIsEditDialogOpen(false);
    setSelectedRack(null);
  };
  
  const handleBidResponse = (bidId: string, response: 'Accepted' | 'Rejected') => {
      setAllBids(prevBids => prevBids.map(bid => bid.id === bidId ? { ...bid, status: response } : bid));
      toast({
          title: `Bid ${response}`,
          description: `You have ${response.toLowerCase()} the bid.`
      })
  }


  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, rentals, and profile.</p>
        </div>
        <Tabs defaultValue="my-listings" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 h-auto sm:h-10">
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="bids-received">Bids Received</TabsTrigger>
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
                                : rack.status === 'Rented'
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : rack.status === 'Pending Approval'
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : 'bg-red-500 hover:bg-red-600',
                              'text-white'
                            )}
                          >
                            {rack.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{rack.weeklyRent.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="flex gap-2">
                           <Button variant="outline" size="icon" onClick={() => handleOpenEditDialog(rack)}>
                              <Edit className="h-4 w-4" />
                           </Button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your rack listing.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteRack(rack.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bids-received">
            <Card>
                <CardHeader>
                    <CardTitle>Bids Received</CardTitle>
                    <CardDescription>Review and respond to bids on your racks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rack Title</TableHead>
                                    <TableHead>Bidder</TableHead>
                                    <TableHead>Offer (₹/wk)</TableHead>
                                    <TableHead>Tenure (wks)</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {receivedBids.map(bid => (
                                    <TableRow key={bid.id}>
                                        <TableCell className="font-medium whitespace-nowrap">{bid.rackTitle}</TableCell>
                                        <TableCell>{bid.bidder.name}</TableCell>
                                        <TableCell>₹{bid.amount.toLocaleString('en-IN')}</TableCell>
                                        <TableCell>{bid.tenure}</TableCell>
                                        <TableCell className="text-right flex gap-2 justify-end">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleBidResponse(bid.id, 'Accepted')}>
                                                <Check className="h-4 w-4 mr-1"/> Accept
                                            </Button>
                                             <Button size="sm" variant="destructive" onClick={() => handleBidResponse(bid.id, 'Rejected')}>
                                                <X className="h-4 w-4 mr-1"/> Deny
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     {receivedBids.length === 0 && <p className="text-center text-muted-foreground mt-4">No pending bids.</p>}
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
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push(`/racks/${rack.id}`)}>View Details</Button>
                  </div>
                ))}
                </div>
                 {rentedRacks.length === 0 && <p className="text-center text-muted-foreground">You have not rented any racks yet.</p>}
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
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Edit Rack Status</DialogTitle>
                  <DialogDescription>
                      Update the status of your rack. Mark it as "Rented" if it's currently occupied.
                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">Status</Label>
                      <Select onValueChange={(value: Rack['status']) => setNewStatus(value)} defaultValue={selectedRack?.status}>
                          <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Available">Available</SelectItem>
                              <SelectItem value="Rented">Rented</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>
              <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" onClick={handleUpdateStatus}>Save changes</Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
