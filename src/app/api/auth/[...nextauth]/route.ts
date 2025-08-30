import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextauth";

const { handlers } = NextAuth(authOptions);

// NextAuth API route for Google OAuth authentication
export { handlers as GET, handlers as POST };
