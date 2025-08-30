import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Toast from "../components/Toast";
import PWA from "../components/PWA";
import ErrorBoundary from "../components/ErrorBoundary";
import Onboarding from "../components/Onboarding";
import LoadingScreen from "../components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneyTree",
  description: "AI-powered personal finance dashboard.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-500`}>
        <ErrorBoundary>
          <SessionProvider>
            <LoadingScreen />
            {children}
            <Toast />
            <PWA />
            <Onboarding />
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
