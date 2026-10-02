import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", inter.variable)}>
      <body>
        <header>
          <h2>My B2B App</h2>

          <Navbar />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
