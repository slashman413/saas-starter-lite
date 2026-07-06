// Runs during `vercel build` (see package.json "vercel-build").
// Goal: make deployment near-zero-config.
//   - If a real DATABASE_URL is connected, create the schema (prisma db push)
//     and seed the demo org/user (idempotent).
//   - If no DB is attached yet (the very first deploy), skip quietly so the
//     build still succeeds. Add a Postgres store, then redeploy.
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
// Vercel's Postgres/Neon integration exposes POSTGRES_PRISMA_URL — fall back to it.
if (!process.env.DATABASE_URL && url) process.env.DATABASE_URL = url;

const looksReal = /^postgres(ql)?:\/\//.test(url) && !/localhost|@u:p@|placeholder/.test(url);

if (!looksReal) {
  console.log("[vercel-setup] No database connected yet — skipping schema/seed.");
  console.log("[vercel-setup] Add a Postgres store in Vercel → Storage, then redeploy.");
  process.exit(0);
}

function run(cmd) {
  console.log(`[vercel-setup] $ ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

try {
  // Prefer committed migrations in production — they never silently drop data.
  // Fall back to `db push` (WITHOUT --accept-data-loss) for zero-config first deploys:
  // a destructive schema change then aborts loudly instead of wiping the buyer's data.
  if (existsSync("prisma/migrations")) {
    run("prisma migrate deploy");
  } else {
    run("prisma db push --skip-generate");
  }
  run("tsx prisma/seed.ts");
  console.log("[vercel-setup] Schema applied and demo data seeded.");
} catch (e) {
  // Don't hard-fail the deploy on a transient DB hiccup; the app still ships.
  console.warn("[vercel-setup] DB setup failed (continuing build):", e?.message);
}
