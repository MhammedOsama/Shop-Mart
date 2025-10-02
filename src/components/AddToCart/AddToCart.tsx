"use client";

import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useContext(CartContext);

  async function handleAddToCart() {
    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODQ2MjM2LCJleHAiOjE3NjU2MjIyMzZ9.t6X0FsezrZH4litUJsMMo_ijw_CiLmYM9T7EkDf6_Eg",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    // setCartData(data);
    await getCart();
    if (data.status == "success") toast.success(data.message);
    setIsLoading(false);
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
      <HeartIcon />
    </CardFooter>
  );
}
