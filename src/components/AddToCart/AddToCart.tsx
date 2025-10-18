"use client";

import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { AddToCartAction } from "@/app/(pages)/products/_action/AddToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddToWishlist from "../AddtoWishlist/AddToWishlist";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useContext(CartContext);
  const session = useSession();
  const router = useRouter();

  async function handleAddToCart() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await AddToCartAction(productId);

      // setCartData(data);
      await getCart();
      if (data.status == "success") toast.success(data.message);
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }

  return (
    <CardFooter className='gap-1 '>
      <Button
        disabled={isLoading}
        onClick={handleAddToCart}
        className='grow  cursor-pointer'>
        {isLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          <ShoppingCartIcon />
        )}{" "}
        Add To card
      </Button>
      <AddToWishlist productId={productId} />
    </CardFooter>
  );
}
