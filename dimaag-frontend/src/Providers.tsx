"use client";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";

export function Providers({ children }: { children: React.ReactNode }) {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        {children}
      </ClerkProvider>

      <Toaster />
    </>
  );
}
