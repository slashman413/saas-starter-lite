import { PrismaClient } from "@prisma/client";

// Vercel's Neon integration injects POSTGRES_PRISMA_URL (pooled) rather than
// DATABASE_URL at runtime, but the Prisma schema datasource reads DATABASE_URL.
// Resolve the URL from all common names and pass it explicitly so the client
// connects regardless of which one the host provides.
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  undefined;

// Prevent multiple instances during dev hot-reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(dbUrl ? { datasourceUrl: dbUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
