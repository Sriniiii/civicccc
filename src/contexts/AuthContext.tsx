import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User as AppUser } from '../types';

interface AuthContextType {
  session: Session | null;
  user: AppUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        // In a real app, you'd fetch the user profile from your 'profiles' table
        // For now, we'll construct a user object from the session
        const appUser: AppUser = {
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata.full_name || 'Citizen',
          role: session.user.user_metadata.role || 'citizen',
          created_at: session.user.created_at,
          updated_at: session.user.updated_at,
        };
        setUser(appUser);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        const appUser: AppUser = {
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata.full_name || 'Citizen',
          role: session.user.user_metadata.role || 'citizen',
          created_at: session.user.created_at,
          updated_at: session.user.updated_at,
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
