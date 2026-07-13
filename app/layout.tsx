import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Poppins, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins", 
});

const monterrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Happy Tour & Rental",
  description: "Tempat rental dan paket traveling cepat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${monterrat.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        <main>
        {children}
        <SpeedInsights />
        </main>
          <Footer />
        </body>
    </html>
  );
}
