"use client";

import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  loading: false,
  setLoading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();

  async function getCart() {
    setLoading(true);
    if (session.status == "authenticated") {
      const response = await fetch("http://localhost:3000/api/get-cart");
      const data: CartResponse = await response.json();
      setCartData(data);
      if (data?.data?.cartOwner) {
        localStorage.setItem("userId", data.data.cartOwner);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{ cartData, loading, setCartData, setLoading, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
