"use client";

import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingScreen from "../components/LoadingScreen";
import Toast from "../components/Toast";
import PWA from "../components/PWA";
import Onboarding from "../components/Onboarding";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <LoadingScreen />
        {children}
        <Toast />
        <PWA />
        <Onboarding />
      </SessionProvider>
    </ErrorBoundary>
  );
}
