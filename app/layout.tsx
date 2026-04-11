import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../portfolio/components/ThemeProvider";
import Navbar from "../../portfolio/components/Navbar";
import { Logo } from "../../portfolio/components/Logo";
import { Footer } from "../../portfolio/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "Next.js Portfolio with Aceternity UI",
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
          <Logo className="fixed top-8 left-8 z-[60] scale-90 md:scale-100" />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
