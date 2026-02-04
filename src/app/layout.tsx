import { Footer } from "@/components/Footer";
import NavBarServer from "@/components/NavBarServer";
import type { Metadata } from "next";
import { DM_Sans, Patrick_Hand } from "next/font/google";

import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Portfolio_Sooah",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${patrickHand.variable}`}>
      <body className="overflow-x-hidden">
        <NavBarServer />
        {children}
        <Toaster richColors position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
