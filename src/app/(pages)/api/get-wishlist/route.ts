import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...next-auth]/route";
import { WishlistResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const token = (session?.user as any)?.token;

  if (!token) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: {
        token,
      },
    }
  );

  const data: WishlistResponse = await response.json();
  return NextResponse.json(data);
}
