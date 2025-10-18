"use server";

export async function AddToWishlistAction(productId: string, token: string) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
