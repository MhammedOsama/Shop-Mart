"use server";

export async function AddToCartAction(productId: string) {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODQ2MjM2LCJleHAiOjE3NjU2MjIyMzZ9.t6X0FsezrZH4litUJsMMo_ijw_CiLmYM9T7EkDf6_Eg",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
