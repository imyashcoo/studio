import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
    name: string;
    reviews: number;
    rating: number;
    avatar: string;
    dataAiHint: string;
    text: string;
}

export function TestimonialCard({ name, reviews, rating, avatar, dataAiHint, text }: TestimonialCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Image src={avatar} alt={name} width={56} height={56} className="rounded-full" data-ai-hint={dataAiHint} />
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-muted-foreground">{reviews} reviews</p>
                    </div>
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <p className="text-muted-foreground">{text}</p>
            </CardContent>
        </Card>
    );
}

    