import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from '@/lib/context/CartContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital",
  description: "Video game store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} flex min-h-screen flex-col`}>
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </body>
  </html>
  );
}
