"use client";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Head from "next/head";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <Head>
        <title>Muhammad Sumair Portfolio - Full Stack Web Developer</title>
        <meta
          name="description"
          content="Explore Muhammad Sumair's portfolio, a Full Stack Web Developer specializing in Next.js, React.js, and the MERN stack. Discover projects, skills, and expertise in modern web development."
        />
        <meta name="keywords" content="Full Stack Developer, Next.js, React.js, MERN Stack, Web Development, Sumair Portfolio" />
        <meta name="author" content="Muhammad Sumair" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Muhammad Sumair Portfolio - Full Stack Web Developer" />
        <meta
          property="og:description"
          content="Explore Muhammad Sumair's portfolio showcasing expertise in Next.js, React.js, and the MERN stack."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sumair-dev.vercel.app" />
        <meta property="og:image" content="https://sumair-dev.vercel.app" />
 
      </Head>
      <body className={nunito.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Toaster position="top-center" />
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
