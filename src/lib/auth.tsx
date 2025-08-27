
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { mockUserDatabase } from '@/lib/data';

// In a real app, you'd use a proper database.
let mockUserIdCounter = Object.keys(mockUserDatabase).length;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (details: any) => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you might check a token from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const signup = async (details: any) => {
    const { email, password, name, businessName, mobile, whatsapp } = details;
    
    // Check if user already exists
    if (Object.values(mockUserDatabase).some(u => u.email === email || u.mobile === mobile)) {
        throw new Error('User with this email or mobile number already exists.');
    }

    const uid = `user-${++mockUserIdCounter}`;
    const newUser: User = {
        uid,
        email,
        name,
        businessName,
        mobile,
        whatsapp,
        // In a real app, you would hash the password
        password, 
        avatarUrl: `https://placehold.co/100x100.png?text=${name.substring(0,1)}`
    };
    mockUserDatabase[uid] = newUser;
    console.log("New user signed up:", newUser);
    console.log("DB state:", mockUserDatabase);
  };

  const login = async (identifier: string, password: string) => {
    const foundUser = Object.values(mockUserDatabase).find(
      u => (u.email === identifier || u.mobile === identifier) && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid credentials or user not found.');
    }
    
    // SECURITY FIX: Do not store the password in the user object that goes to the state and localStorage.
    const { password: _, ...userToStore } = foundUser;

    setUser(userToStore);
    localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
    // The redirect is now handled in the login page itself.
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
