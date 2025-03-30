import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de CRE",
  description: "Calculadora de CRE",
  icons: {
    icon: "/ifpb-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-svh flex flex-col bg-neutral-900 text-neutral-200`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
