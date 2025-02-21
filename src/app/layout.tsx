import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "800"], // You can add more weights if needed
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
      <body className={`${nunito.className}  `}>
        <Navbar />
        {children}
      </body>
      1
    </html>
  );
}
