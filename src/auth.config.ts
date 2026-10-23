import type { NextAuthConfig } from "next-auth";

// Edge-safe base config: NO database adapter, NO bcrypt, NO Node-only providers.
// Imported by both `middleware.ts` (Edge runtime) and `auth.ts` (Node runtime),
// so it must stay free of Node APIs. The credentials/bcrypt logic lives in auth.ts.
export const authConfig = {
  // trustHost is left unset on purpose: Auth.js then trusts X-Forwarded-Host only
  // when AUTH_TRUST_HOST, AUTH_URL or VERCEL is set (or outside production), so a
  // self-hosted deploy can't have its callback/redirect URLs spoofed.
  session: { strategy: "jwt" }, // required when using the Credentials provider
  pages: { signIn: "/login" },
  providers: [], // real providers are attached in auth.ts (Node runtime)
  callbacks: {
    // Used by the middleware to gate protected routes without touching the DB.
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/settings") ||
        pathname.startsWith("/projects");
      if (isProtected) return !!auth?.user;
      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id && session.user) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
