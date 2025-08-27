
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRacks } from '@/lib/data';
import type { Rack } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const getStatusBadgeVariant = (status: Rack['status']) => {
    switch (status) {
        case 'Available': return 'bg-green-500';
        case 'Rented': return 'bg-blue-500';
        case 'Pending Approval': return 'bg-yellow-500';
        case 'Rejected': return 'bg-red-500';
        default: return 'secondary';
    }
}

export default function AdminListingsPage() {
    // In a real app, you'd use state that re-renders the component on change.
    // For this mock app, we'll force a re-render with a simple state update.
    const [_, setForceRender] = useState(0); 
    const { toast } = useToast();

    const listings = useMemo(() => {
        // Show pending listings first, then by date or other logic
        return [...mockRacks].sort((a, b) => {
            if (a.status === 'Pending Approval' && b.status !== 'Pending Approval') return -1;
            if (a.status !== 'Pending Approval' && b.status === 'Pending Approval') return 1;
            return 0; // Keep original order for others
        });
    }, [_]);

    const handleUpdateStatus = (id: string, newStatus: 'Available' | 'Rejected') => {
        const rackIndex = mockRacks.findIndex(r => r.id === id);
        if (rackIndex > -1) {
            mockRacks[rackIndex].status = newStatus;
            setForceRender(val => val + 1); // Trigger re-render
            toast({
                title: `Listing ${newStatus === 'Available' ? 'Approved' : 'Rejected'}`,
                description: `The listing "${mockRacks[rackIndex].title}" has been updated.`,
            });
        }
    };


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Listing Management</h1>
             <Card>
                <CardHeader>
                    <CardTitle>All Listings</CardTitle>
                    <CardDescription>Review, approve, or reject rack listings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Listing</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings.map(rack => (
                                <TableRow key={rack.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Image src={rack.photos[0]} alt={rack.title} width={60} height={40} className="rounded-md object-cover"/>
                                            <div>
                                                <p className="font-semibold">{rack.title}</p>
                                                <p className="text-xs text-muted-foreground">{rack.location}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{rack.owner.name}</TableCell>
                                    <TableCell>
                                        <Badge className={cn("text-white hover:text-black", getStatusBadgeVariant(rack.status))}>
                                            {rack.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {rack.status === 'Pending Approval' ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button size="sm" variant="outline" className="bg-green-100 border-green-400 text-green-700 hover:bg-green-200 hover:text-green-800" onClick={() => handleUpdateStatus(rack.id, 'Available')}>
                                                    <Check className="h-4 w-4 mr-1"/> Approve
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(rack.id, 'Rejected')}>
                                                     <X className="h-4 w-4 mr-1"/> Reject
                                                </Button>
                                            </div>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => alert('Viewing details...')}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert('Contacting owner...')}>Contact Owner</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
