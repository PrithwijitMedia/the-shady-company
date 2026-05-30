import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono
} from "next/font/google";

import "./globals.css";

import {
  AuthProvider
} from "@/context/AuthContext";

import Navbar
from "@/components/site/Navbar";

import Footer
from "@/components/site/Footer";

const geistSans = Geist({
  variable:
    "--font-geist-sans",
  subsets:
    ["latin"]
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",
    subsets:
      ["latin"]
  });

export const metadata:
Metadata = {

  title:
    "The Shady Company",

  description:
    "Handcrafted lighting that shapes atmosphere."

};

export default function RootLayout({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >

      <body className="min-h-full flex flex-col">

        <AuthProvider>

          <Navbar />

          <main className="flex-1 pt-20">

            {children}

          </main>

          <Footer />

        </AuthProvider>

      </body>

    </html>

  );
}