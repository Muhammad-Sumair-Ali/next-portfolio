import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProviderWrapper from "@/helpers/ProviderWrapper";
import VisitorTracker from "@/components/TrackVisitors";


const generateCanonicalURL = () => {
  return `${process.env.BASE_URL}`;
};

export const metadata = {
  title: "Muhammad Sumair Portfolio - Full Stack Developer",
  description:
    "Explore Muhammad Sumair portfolio, a Full Stack Developer specializing in Next.js, React.js, and the MERN stack.",
  keywords:
    "Full Stack Developer, Next.js, React.js, MERN Stack, Web Development, Sumair Portfolio",
  author: "Muhammad Sumair",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
      canonical: generateCanonicalURL(),
    },
  openGraph: {
    title: "Muhammad Sumair Portfolio - Full Stack Developer",
    description:
      "Explore Muhammad Sumair portfolio showcasing expertise in Next.js, React.js, and the MERN stack.",
    type: "website",
    url: "https://muhammad-sumair.vercel.app",
    images: [
      {
        url: "https://muhammad-sumair.vercel.app",
        width: 1200,
        height: 630,
        alt: "Muhammad Sumair Portfolio",
      },
    ],
  },
};


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Sumair Portfolio" />
        <meta name="google-site-verification" content="4pzpEF4OpHHEidQSWcuTB6MOzzU1eGMwlRE3vUNUfn0" />
        
      </head>
      <body className={nunito.className}>
        <ProviderWrapper>
          <VisitorTracker />
          <Toaster position="top-center" />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
