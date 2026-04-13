import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../portfolio/components/ThemeProvider";
import Navbar from "../../portfolio/components/Navbar";
import { Logo } from "../../portfolio/components/Logo";
import { Footer } from "../../portfolio/components/Footer";
import { CallToAction } from "../../portfolio/components/CallToAction";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chandani Kumari | Portfolio",
  description: "Chandani Kumari Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
