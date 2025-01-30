import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import ParticlesBackground from "./components/ParticlesBackground";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen `}
      >
        <ParticlesBackground
          
          particleCount={70}
          maxDistance={120}
          backgroundColor="#0000" // Even lighter purple background
          particleColor="#a855f7" // Different shade of purple
        
        />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}