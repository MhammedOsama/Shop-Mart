import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTA2MzQwLCJleHAiOjE3NjU4ODIzNDB9.mbB1dge5t4IShu3tkAgRhX2Fxb42l7i4rzvso90v3r4",
    },
  });
  const data: CartResponse = await response.json();
  return NextResponse.json(data);
}
