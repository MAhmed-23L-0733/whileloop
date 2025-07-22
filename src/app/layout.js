import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import Provider from "@/components/provider";
import SideBar from "@/components/sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WhileLoop",
  description: "Video sharing platform for developers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar></Navbar>
          <SideBar></SideBar>
          <div className={`pt-20 bg-black min-h-screen`}>{children}</div>
          <Footer></Footer>
        </Provider>
      </body>
    </html>
  );
}
