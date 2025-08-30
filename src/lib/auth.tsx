"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { initFirebase, getFirebaseAuth } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fbSignOut } from "firebase/auth";

export type User = { uid: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function hasFirebaseConfig() {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasFirebaseConfig()) {
      initFirebase();
      const auth = getFirebaseAuth();
      try {
        const unsub = onAuthStateChanged(auth, (u) => {
          if (u) setUser({ uid: u.uid, email: u.email ?? "" });
          else setUser(null);
          setLoading(false);
        });
        return () => unsub();
      } catch {
        // fallback to local
      }
    }
    const raw = typeof window !== "undefined" ? localStorage.getItem("mt_user") : null;
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (hasFirebaseConfig()) {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      return;
    }
    const u = { uid: "demo-uid", email };
    localStorage.setItem("mt_user", JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (email: string, password: string) => {
    if (hasFirebaseConfig()) {
      const auth = getFirebaseAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      return;
    }
    const u = { uid: "demo-uid", email };
    localStorage.setItem("mt_user", JSON.stringify(u));
    setUser(u);
  };

  const signOut = async () => {
    if (hasFirebaseConfig()) {
      const auth = getFirebaseAuth();
      await fbSignOut(auth);
    }
    localStorage.removeItem("mt_user");
    setUser(null);
  };

  const value: AuthContextType = { user, loading, signIn, signUp, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
