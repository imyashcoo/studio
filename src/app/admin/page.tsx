
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRacks, mockUserDatabase } from '@/lib/data';
import { Package, Users, Hourglass, CheckCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function AdminDashboardPage() {
    const stats = useMemo(() => {
        const totalUsers = Object.keys(mockUserDatabase).length;
        const totalListings = mockRacks.length;
        const pendingListings = mockRacks.filter(r => r.status === 'Pending Approval').length;
        const activeListings = mockRacks.filter(r => r.status === 'Available').length;
        return { totalUsers, totalListings, pendingListings, activeListings };
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalListings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                        <Hourglass className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingListings}</div>
                        <p className="text-xs text-muted-foreground">Listings needing review</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeListings}</div>
                         <p className="text-xs text-muted-foreground">Live on the platform</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* In a real app, this would show a log of recent signups and listings */}
                    <p className="text-muted-foreground">Activity feed coming soon.</p>
                </CardContent>
            </Card>
        </div>
    )
}
