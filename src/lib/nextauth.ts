import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { getFirestoreDb } from "./firebase";

const firestore = getFirestoreDb();

export const authOptions: NextAuthOptions = {
  // adapter: firestore ? FirestoreAdapter(firestore) : undefined,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) {
        (session.user as any).id = token.uid as string;
      }
      return session;
    },
    async signIn({ user }) {
      // Send welcome email
      if (user.email) {
        try {
          await fetch('/api/welcome', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, name: user.name }),
          });
        } catch (error) {
          console.error('Welcome email failed:', error);
        }
      }
      return true;
    },
  },
};
