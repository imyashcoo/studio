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
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.022,35.022,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export default function SignupPage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      toast({
        title: 'Invalid Mobile Number',
        description: 'Please enter a valid 10-digit mobile number.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: 'An OTP has been sent to your mobile number.',
    });
  };

  const handleSignup = () => {
     // TODO: Implement actual signup logic
    console.log("Signing up with", { name, mobile, otp });
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join RackUp to start listing or renting racks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="flex gap-2">
              <Input
                id="mobile"
                type="tel"
                placeholder="12345 67890"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent || loading}
                maxLength={10}
              />
              {!otpSent && (
                <Button onClick={handleGetOtp} disabled={mobile.length !== 10 || loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Get OTP"}
                </Button>
              )}
            </div>
          </div>
          {otpSent && (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="Enter OTP" 
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full as-child" disabled={!otpSent || otp.length !== 6 || name.length < 2}>
            <Link href="/explore" onClick={handleSignup}>Create Account</Link>
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
      </Card>
    </div>
  );
}
