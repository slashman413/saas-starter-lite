import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Build an Edge-safe auth instance from the base config only (no adapter,
// no bcrypt). The `authorized` callback in auth.config.ts decides access.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // `authorized` already returned false for unauthenticated protected routes;
  // NextAuth turns that into a redirect to the configured signIn page.
  void req;
});

export const config = {
  // Run on everything except static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
