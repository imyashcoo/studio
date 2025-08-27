
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');


export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { signup } = useAuth();
  
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      setPasswordError(result.error.errors.map(e => e.message).join(', '));
    } else {
      setPasswordError(null);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(passwordError) {
        toast({
            title: 'Invalid Password',
            description: passwordError,
            variant: 'destructive',
        });
        return;
    }
    try {
      await signup({ email, password, name, businessName, mobile, whatsapp });
      toast({
        title: 'Signup Successful',
        description: 'You can now log in with your credentials.',
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        title: 'Signup Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join RackUp to start listing or renting racks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" placeholder="JD Retail" required value={businessName} onChange={e => setBusinessName(e.target.value)} />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" placeholder="9876543210" required type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" placeholder="9876543210" required type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={handlePasswordChange}/>
                 {password && passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                 {!passwordError && password && <p className="text-xs text-muted-foreground">Password must be 8+ characters with an uppercase letter, a number, and a special character.</p>}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Button type="submit" className="w-full" disabled={!!passwordError}>
             Create Account
            </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
}
