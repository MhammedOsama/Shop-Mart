"use client";

import { CartResponse } from "@/interfaces";
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

  async function getCart() {
    setLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "GET",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTA2MzQwLCJleHAiOjE3NjU4ODIzNDB9.mbB1dge5t4IShu3tkAgRhX2Fxb42l7i4rzvso90v3r4",
        },
      }
    );
    const data: CartResponse = await response.json();
    setCartData(data);
    if (data.data.cartOwner) {
      localStorage.setItem("userId", data.data.cartOwner);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartData, loading, setCartData, setLoading, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
