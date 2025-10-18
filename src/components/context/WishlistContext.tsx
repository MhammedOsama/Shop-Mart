"use client";

import { WishlistResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
  wishlistData: WishlistResponse | null;
  setWishlistData: (value: WishlistResponse | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  getWishlist: () => void;
}>({
  wishlistData: null,
  setWishlistData: () => {},
  loading: false,
  setLoading: () => {},
  getWishlist: () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const session = useSession();

  async function getWishlist() {
    if (session.status === "authenticated") {
      setLoading(true);
      try {
        const token = (session?.data?.user as any)?.token;
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: { token: token || "" },
          }
        );
        const data: WishlistResponse = await response.json();
        setWishlistData(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getWishlist();
  }, [session.status]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        loading,
        setWishlistData,
        setLoading,
        getWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}
