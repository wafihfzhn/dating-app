"use client";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useState, createContext, useEffect, useContext } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          setUser(session?.user ?? null)
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  async function signOut() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider value={{user , loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }

  return context;
}
