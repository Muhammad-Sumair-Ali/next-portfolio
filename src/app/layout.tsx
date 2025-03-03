"use client"
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <SessionProvider> 
        <Toaster position="top-center" />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
