import { UserResponse } from "@/interfaces";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
    token?: string;
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse;
    token: string;
  }
}
