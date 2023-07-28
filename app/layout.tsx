"use client";
// import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/Providers/ModalProvider";
import ToasterProvider from "@/components/Providers/ToasterProvider";
import CrispProvider from "@/components/Providers/CrispProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Synth",
//   description: "AI platform",
// };

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    // <ClerkProvider>
    <SessionProvider session={session}>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
    // </ClerkProvider>
  );
}
