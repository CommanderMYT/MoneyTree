"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export type User = { uid: string; email: string; name?: string; image?: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(null);
  const loading = status === "loading";

  useEffect(() => {
    if (session?.user) {
      setUser({
        uid: (session.user as any).id || session.user.email || "",
        email: session.user.email || "",
        name: session.user.name || "",
        image: session.user.image || "",
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const signIn = async () => {
    await nextAuthSignIn("google");
  };

  const signOut = async () => {
    await nextAuthSignOut();
  };

  const value: AuthContextType = { user, loading, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
