"use client"
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
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
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
