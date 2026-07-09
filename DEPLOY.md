# Deploy — as close to one-click as a full-stack app gets

This app is a real Next.js server + PostgreSQL, so it can't run on GitHub Pages.
The flow below gets you a live, permanent instance with a stable URL.

## Option A — One-click button (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fslashman413%2Fsaas-starter-lite&project-name=saas-starter-lite&repository-name=saas-starter-lite&env=AUTH_SECRET&envDescription=Random%2032-byte%20secret%20for%20session%20encryption&envLink=https%3A%2F%2Fgenerate-secret.vercel.app%2F32&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22neon%22%2C%22productSlug%22%3A%22neon%22%2C%22protocol%22%3A%22storage%22%7D%5D)

What happens, in order:

1. **Log in with GitHub** → Vercel clones `saas-starter-lite` into your account.
2. **Create database** → the flow offers a **Neon Postgres** store; click *Create*. Vercel injects `DATABASE_URL` for you.
3. **AUTH_SECRET** → click the *Generate* link on the form ([generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)), copy the value, paste it.
4. **Deploy.** The `vercel-build` script (`scripts/vercel-setup.mjs`) automatically:
   - `prisma generate`
   - `prisma db push` (creates all tables)
   - seeds the demo org + `owner@acme.test` / `password123` (idempotent — safe on every deploy)
   - `next build`

Done. Open the deployment URL and sign in.

## Option B — Deploy from the CLI

If you'd rather not use the button, deploy with the Vercel CLI. You need a Neon
(or any Postgres) `DATABASE_URL` and a Vercel token from [vercel.com/account/tokens](https://vercel.com/account/tokens):

```bash
export VERCEL_TOKEN="..."                     # vercel.com/account/tokens

npx vercel link --yes --token "$VERCEL_TOKEN" # create/link the Vercel project

# Set the two required env vars (each command prompts for the value):
npx vercel env add DATABASE_URL production --token "$VERCEL_TOKEN"   # paste your Neon pooled string
npx vercel env add AUTH_SECRET production --token "$VERCEL_TOKEN"    # paste output of: openssl rand -base64 32

npx vercel deploy --prod --token "$VERCEL_TOKEN"
```

The production build runs the same `vercel-build` script as Option A
(`scripts/vercel-setup.mjs`), so the schema push and demo seed happen automatically.

## Troubleshooting

- **First build skipped the DB** (no store attached yet): the build still succeeds.
  Go to **Project → Storage → Create Database → Postgres (Neon)**, then **Redeploy**.
  `vercel-setup.mjs` will detect `DATABASE_URL` and create + seed the schema.
- **Want to re-seed**: trigger a redeploy; seeding is idempotent and only adds demo
  projects when the org has none.
- **Custom domain / stable URL**: add it under **Project → Domains**.

## Env vars reference

| Var | Required | Source |
|-----|----------|--------|
| `DATABASE_URL` | yes | Auto-injected by the Neon store (or paste a Postgres URL) |
| `AUTH_SECRET` | yes | Generate at generate-secret.vercel.app/32 |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optional | Enables Google login if both are set |
