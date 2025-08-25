
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  User as FirebaseUser, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

// In a real app, you'd use Firestore or another DB
const mockUserDatabase: { [key: string]: User } = {};

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signup: (details: any) => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (details: any) => {
    const { email, password, name, businessName, mobile, whatsapp } = details;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // In a real app, you would save this to Firestore
      mockUserDatabase[userCredential.user.uid] = {
          uid: userCredential.user.uid,
          email,
          name,
          businessName,
          mobile,
          whatsapp,
      };

      // Manually update the user state to reflect the new profile data
      setUser(auth.currentUser);
    }
  };

  const login = async (identifier: string, password: string) => {
    // This is a simplified login. A real app would need to look up
    // the email associated with a mobile number from your database (e.g., Firestore).
    // For this example, we'll assume the identifier is always an email.
    await signInWithEmailAndPassword(auth, identifier, password);
    router.push('/dashboard');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
        console.error("Error signing out", error)
    }
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
