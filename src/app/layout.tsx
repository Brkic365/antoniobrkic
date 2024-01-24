import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import "./globals.css";

import Favicon from "/public/images/Metadata/favicon.ico";

import Navbar from "./[lang]/components/Navbar";
import Footer from "./[lang]/components/Footer";

const font = League_Gothic({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antonio Brkic",
  description:
    "I am a dedicated web developer with 2 years of experience. During the past 2 years, I have developed multiple websites, ranging from simple to complex.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
