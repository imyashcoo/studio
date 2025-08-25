import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SellerCardProps {
    name: string;
    status: string;
    location: string;
    avatar: string;
    dataAiHint: string;
}

export function SellerCard({ name, status, location, avatar, dataAiHint }: SellerCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
                <Image src={avatar} alt={name} width={64} height={64} className="rounded-full" data-ai-hint={dataAiHint} />
                <div className="flex-grow">
                    <p className="font-semibold">{name}</p>
                    <Badge variant={status === 'Rack Up Pro' ? 'default' : 'secondary'} className="my-1">{status}</Badge>
                    <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{location}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

    