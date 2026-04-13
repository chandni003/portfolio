import React from "react";
import Navbar from "../../../portfolio/components/Navbar";
import { Logo } from "../../../portfolio/components/Logo";
import { Footer } from "../../../portfolio/components/Footer";
import { CallToAction } from "../../../portfolio/components/CallToAction";

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
