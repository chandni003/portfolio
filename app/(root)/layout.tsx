import React from "react";
import Navbar from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { CallToAction } from "@/components/CallToAction";

export default function RootWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Logo className="fixed top-8 left-8 z-[60] scale-90 md:scale-100 hidden md:flex" />
      <Navbar />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}
