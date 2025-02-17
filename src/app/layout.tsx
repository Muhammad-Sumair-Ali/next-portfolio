
import {  Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"], // You can add more weights if needed
});

export const metadata = {
  title: "Sumair Dev",
  description: "Professional Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased bg-black text-white`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
