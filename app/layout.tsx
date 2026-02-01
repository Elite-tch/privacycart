import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrivateCart | AI-Powered Private Shopping",
  description: "Amazon's AI knows everything you buy. Yours doesn't have to. The privacy-first shopping agent on NEAR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased selection:bg-primary/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
