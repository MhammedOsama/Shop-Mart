"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/context/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Footer from "../Footer/Footer";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <Navbar />
        <div className='pt-20 container mx-auto py-4 min-h-screen'>
          <Toaster />
          {children}
        </div>
        <Footer />
      </CartContextProvider>
    </SessionProvider>
  );
}
