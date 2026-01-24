import { Footer } from "@/components/Footer";
import NavBarServer from "@/components/NavBarServer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6D65FF",
          borderRadius: "0.75rem",
          fontFamily: "DM Sans, system-ui, -apple-system, sans-serif",
        },
      }}
    >
      <html lang="en" className={dmSans.variable}>
        <body className="overflow-x-hidden">
          <NavBarServer />
          {children}
          <Toaster richColors position="top-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
