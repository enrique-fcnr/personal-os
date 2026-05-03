import type { Metadata } from "next";
import { Bayon, Inter } from "next/font/google";
import "./globals.css";

const bayon = Bayon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bayon",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal OS | Command Center",
  description: "Your integrated life operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bayon.variable} ${inter.variable} dark`}
    >
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
