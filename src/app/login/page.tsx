'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

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

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48" 
        width="24px"
        height="24px"
    >
        <path fill="#f35325" d="M22,22H6V6h16V22z M22,42H6V26h16V42z M42,22H26V6h16V22z M42,42H26V26h16V42z"/>
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48" 
        width="24px"
        height="24px"
    >
        <path d="M36.5,27.9c-0.3,4.6-3.8,6.8-4.3,6.9c-0.5,0.1-1.1,0.2-2.1-0.1c-1.3-0.4-2.6-0.8-4.2-0.8s-2.8,0.4-4.1,0.8 c-1,0.3-1.6,0.2-2.1,0.1c-0.5-0.1-3.3-2-4-6.5c-0.6-3.8,0.6-7.5,2.4-9.9c1.6-2.2,3.9-3.6,6.4-3.6c0.8,0,2.5,0.6,4.1,0.6 c1.5,0,3.3-0.7,4.2-0.7c2.3,0,4.5,1.3,6.1,3.4C36.3,20.5,37.2,24.1,36.5,27.9z"/>
        <path d="M31.4,14c1.2-1.4,1.8-3.3,1.6-5c-1.6,0.1-3.3,1-4.4,2.3c-1.1,1.2-1.9,3-1.7,4.8C28.5,16.2,30.3,15.3,31.4,14z"/>
    </svg>
);

export default function LoginPage() {
 
  const handleLogin = (provider: 'google' | 'microsoft' | 'apple') => {
    // TODO: Implement actual login logic
    console.log(`Logging in with ${provider}`)
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in with your favorite provider to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full" onClick={() => handleLogin('google')}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleLogin('microsoft')}>
            <MicrosoftIcon className="mr-2 h-5 w-5" />
            Continue with Microsoft
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleLogin('apple')}>
            <AppleIcon className="mr-2 h-5 w-5" />
            Continue with Apple
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
