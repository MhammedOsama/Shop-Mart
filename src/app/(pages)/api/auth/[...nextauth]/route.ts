import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  SuccessLoginResponse,
  FailedLoginResponse,
} from "./../../../../../interfaces/login";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Mohamed",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const payload: SuccessLoginResponse | FailedLoginResponse =
          await response.json();

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      (session.user as any).token = token.token;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export both the handler (for Next.js routing) and authOptions (for imports elsewhere)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
