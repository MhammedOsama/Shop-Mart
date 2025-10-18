"use client";

import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WishlistContext } from "../context/WishlistContext";
import { AddToWishlistAction } from "@/app/(pages)/products/_action/AddToWishlist.action";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getWishlist } = useContext(WishlistContext);
  const session = useSession();
  const router = useRouter();
  const token = (session?.data?.user as any)?.token;
  console.log("Token used for wishlist:", token);

  async function handleAddToWishlist() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await AddToWishlistAction(productId, token);

      await getWishlist();
      if (data.status == "success") toast.success(data.message);
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }
  return (
    <CardFooter>
      <Button
        disabled={isLoading}
        onClick={handleAddToWishlist}
        className='grow  cursor-pointer'>
        {isLoading ? <Loader2 className='animate-spin' /> : <HeartIcon />}
      </Button>
    </CardFooter>
  );
}
