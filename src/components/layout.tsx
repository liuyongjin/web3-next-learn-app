"use client";

import { ContextProvider } from "@/app/context";

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContextProvider>{children}</ContextProvider>;
}
