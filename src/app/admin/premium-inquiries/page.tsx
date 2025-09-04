
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockPremiumInquiries } from '@/lib/data';
import type { PremiumInquiry } from '@/types';
import { useMemo } from 'react';
import Link from 'next/link';

export default function AdminPremiumInquiriesPage() {
    const inquiries: PremiumInquiry[] = useMemo(() => mockPremiumInquiries, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Premium Service Inquiries</h1>
             <Card>
                <CardHeader>
                    <CardTitle>All Inquiries</CardTitle>
                    <CardDescription>A list of all sales inquiries for the RackUp Premium service.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Contact Person</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Target Location</TableHead>
                                    <TableHead>Goal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.map(inquiry => (
                                    <TableRow key={inquiry.id}>
                                        <TableCell>
                                            <div className="font-medium">{inquiry.name}</div>
                                            <div className="text-xs text-muted-foreground">{inquiry.designation}</div>
                                            <div className="text-xs text-muted-foreground mt-1">{inquiry.email}</div>
                                            <div className="text-xs text-muted-foreground">{inquiry.phone}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={inquiry.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                {inquiry.website}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{inquiry.location}</TableCell>
                                        <TableCell>{inquiry.goal}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     {inquiries.length === 0 && (
                        <p className="text-center text-muted-foreground mt-4">No premium inquiries yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
