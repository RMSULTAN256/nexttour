import type { Metadata } from "next";
import { Poppins, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

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
        </main>
        <footer className="w-full bg-blue-700 text-white py-8 mt-auto">
          {/* Inner container opsional agar teks footer sejajar dengan konten atas */}
          <div className="max-w-6xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between">
            <p>&copy; 2026 HappyTourRentCar.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Kebijakan Privasi</a>
              <a href="#" className="hover:underline">Kontak</a>
            </div>
          </div>
        </footer>
        </body>
    </html>
  );
}
