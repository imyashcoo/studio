
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');


export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        // MOCK VERIFICATION: In a real app, you would call your backend here
        // to verify email, mobile, name, and business name exist and match.
        if (email && mobile && name && businessName) {
            toast({ title: "Verification Successful", description: "You can now reset your password." });
            setStep(2);
        } else {
            toast({ title: "Verification Failed", description: "The details provided do not match our records.", variant: "destructive" });
        }
    };
    
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({ title: "Passwords do not match", variant: "destructive" });
            return;
        }
        if (passwordError) {
             toast({ title: "Invalid Password", description: passwordError, variant: 'destructive' });
             return;
        }
        // MOCK PASSWORD RESET: In a real app, you'd call Firebase Auth's
        // `confirmPasswordReset` function or your backend endpoint.
        toast({ title: "Password Reset Successful", description: "You can now log in with your new password." });
        router.push('/login');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);
        const result = passwordSchema.safeParse(newPasswordValue);
        if (!result.success) {
            setPasswordError(result.error.errors.map(e => e.message).join(', '));
        } else {
            setPasswordError(null);
        }
    }


  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-md">
        {step === 1 && (
            <form onSubmit={handleVerification}>
                <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>
                    Please enter your details to verify your identity.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input id="business-name" placeholder="JD Retail" required value={businessName} onChange={e => setBusinessName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input id="mobile" type="tel" placeholder="9876543210" required value={mobile} onChange={e => setMobile(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Verify Identity</Button>
                </CardFooter>
            </form>
        )}
        {step === 2 && (
             <form onSubmit={handlePasswordReset}>
                <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" required value={newPassword} onChange={handlePasswordChange}/>
                        {newPassword && passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={!!passwordError || newPassword !== confirmPassword}>Reset Password</Button>
                     <Link href="/login" className="text-sm text-center text-primary hover:underline">
                        Back to Login
                     </Link>
                </CardFooter>
            </form>
        )}
      </Card>
    </div>
  );
}

