import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { DM_Sans, Patrick_Hand } from "next/font/google";

import MyNavBar from "@/components/MyNavBar";
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
        <MyNavBar />
        <main className="pt-12 md:pt-20">{children}</main>
        <Toaster richColors position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
