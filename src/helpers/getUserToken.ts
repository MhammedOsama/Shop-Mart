import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const getToken = (await cookies()).get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: getToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return accessToken?.token;
}
