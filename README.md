# SaaS Starter Lite — Free, open-source multi-tenant Next.js boilerplate

A production-quality starting point for a B2B SaaS, covering the free feature set: authentication, multi-tenancy, RBAC, and a Projects CRUD module.

**License:** MIT — free to use, modify, and ship in your own products.

**Stack:** Next.js 15 (App Router) · TypeScript · PostgreSQL · Prisma · Auth.js (NextAuth v5) · Tailwind CSS

---

## Lite vs Full — what's the difference?

| Capability | Lite (free) | Full ($99) |
|---|:---:|:---:|
| Authentication (email/password + OAuth) | ✓ | ✓ |
| Multi-tenancy (orgs + members) | ✓ | ✓ |
| RBAC (Owner / Admin / Member) | ✓ | ✓ |
| Projects CRUD module | ✓ | ✓ |
| Dashboard overview | ✓ | ✓ |
| Stripe billing + webhook (HMAC-verified) | — | ✓ |
| API keys (hashed) + versioned public API | — | ✓ |
| Per-org audit logs | — | ✓ |
| 1-click Vercel deploy + Neon provisioning | — | ✓ |
| Typed API layer (route() + Zod) | — | ✓ |
| 90-second setup walkthrough (Loom) | — | ✓ |
| Deploy help | — | ✓ |
| Priority email support | — | ✓ |
| Lifetime updates | — | ✓ |

**[Upgrade to Full on Gumroad — $99](https://slashman413.gumroad.com/l/saas-starter)**

One-time payment · Perpetual license · Lifetime updates included · Priority email support

---

## Features (Lite)

| Area | What's included |
|------|-----------------|
| **Auth** | Email/password (bcrypt) + OAuth (Google) via Auth.js v5, JWT sessions |
| **Multi-tenancy** | `Organization` + `Membership` + `User`; all data scoped by `organizationId` |
| **RBAC** | `OWNER` / `ADMIN` / `MEMBER` roles + central permission matrix (`lib/rbac.ts`) |
| **Projects CRUD** | Generic create/read/update/delete module — swap for your real entity |
| **Members** | Invite teammates by email; pending invitations tracked |

---

## Getting Started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env        # set DATABASE_URL + AUTH_SECRET (openssl rand -base64 32)

# 3. Database
npm run db:push             # create tables
npm run db:seed             # demo data → owner@acme.test / password123

# 4. Run
npm run dev                 # http://localhost:3000
```

---

## File structure

```
saas-starter-lite/
├── prisma/
│   ├── schema.prisma         # User, Account, Session, Organization, Membership, Invitation, Project
│   └── seed.ts               # demo org + user + projects
├── src/
│   ├── auth.ts               # Auth.js config (credentials + Google, JWT)
│   ├── middleware.ts          # route protection
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client singleton
│   │   ├── tenant.ts         # session → { userId, organizationId, role }
│   │   ├── rbac.ts           # permissions + can()/assertCan()
│   │   └── api.ts            # route() wrapper, ok()/err(), error mapping
│   ├── components/ui.tsx     # Button/Input/Card primitives
│   └── app/
│       ├── page.tsx                      # Lite landing page
│       ├── (auth)/login, register
│       ├── (dashboard)/
│       │   ├── layout.tsx                # tenant-guarded shell + sidebar
│       │   ├── dashboard/                # overview (projects + members count)
│       │   ├── projects/                 # CRUD module
│       │   └── settings/members/         # member list + invite
│       └── api/
│           ├── auth/[...nextauth]/       # Auth.js
│           ├── register/                 # sign-up (user + org + owner membership)
│           ├── projects/ , projects/[id] # CRUD (RBAC + tenancy)
│           └── members/                  # list + invite
```

---

## Extending it

- **New business module:** copy the `Project` model + `api/projects` handlers + UI; tenancy and RBAC come for free.
- **New permission:** add to `PERMISSIONS` in `lib/rbac.ts`, grant it to roles, call `assertCan()`.
- **Add billing / API keys / audit logs:** [upgrade to the full version](https://slashman413.gumroad.com/l/saas-starter).

> Secure-by-default tenant isolation and centralized authorization — ready to extend into a real product.
