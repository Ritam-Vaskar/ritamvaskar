import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ritam Vaskar's Portfolio",
  description: "Created by Ritam Vaskar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="relative z-10">
          <ScrollToTop />
          <PageLoader />
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}