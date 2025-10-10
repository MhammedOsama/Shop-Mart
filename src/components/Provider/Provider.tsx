"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/context/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <Navbar />
        <div className='container mx-auto py-4'>
          <Toaster />
          {children}
        </div>
      </CartContextProvider>
    </SessionProvider>
  );
}
