import Link from "next/link";
import { Button, Card } from "@/components/ui";

const FULL_VERSION_URL = "https://slashman413.gumroad.com/l/saas-starter";

const features = [
  { title: "Authentication", desc: "Email/password + OAuth (Google) via Auth.js v5, bcrypt, JWT sessions." },
  { title: "Multi-tenancy", desc: "Organizations, memberships, and tenant-scoped data — all queries gated by organizationId." },
  { title: "RBAC", desc: "Owner / Admin / Member roles with a central permission matrix in lib/rbac.ts." },
  { title: "Projects CRUD", desc: "A fully wired generic CRUD module — swap 'Project' for your real business entity." },
];

const comparisonRows: { capability: string; lite: boolean; full: boolean }[] = [
  { capability: "Authentication (email/password + OAuth)", lite: true,  full: true  },
  { capability: "Multi-tenancy (orgs + members)",          lite: true,  full: true  },
  { capability: "RBAC (Owner / Admin / Member)",           lite: true,  full: true  },
  { capability: "Projects CRUD module",                    lite: true,  full: true  },
  { capability: "Dashboard overview",                      lite: true,  full: true  },
  { capability: "Stripe billing + webhook (HMAC-verified)",lite: false, full: true  },
  { capability: "API keys (hashed) + versioned public API",lite: false, full: true  },
  { capability: "Per-org audit logs",                      lite: false, full: true  },
  { capability: "1-click Vercel deploy + Neon provisioning",lite: false,full: true  },
  { capability: "Typed API layer (route() + Zod)",         lite: false, full: true  },
  { capability: "90-second setup walkthrough (Loom)",      lite: false, full: true  },
  { capability: "Deploy help",                             lite: false, full: true  },
  { capability: "Priority email support",                  lite: false, full: true  },
  { capability: "Lifetime updates",                        lite: false, full: true  },
];

export default function HomePage() {
  return (
    <main className="bg-gray-50 text-gray-900 antialiased">

      {/* NAV */}
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <span className="text-lg font-black tracking-tight text-brand">◆ SaaS Starter Lite</span>
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <a href={FULL_VERSION_URL} target="_blank" rel="noopener noreferrer">
            <Button>Full version</Button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-brand">
          Free &amp; open source — MIT license
        </div>
        <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl">
          Multi-tenant SaaS starter.{" "}
          <span className="text-brand">Free Lite edition.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xl text-gray-600">
          Auth, organizations, RBAC, and a Projects CRUD module — everything you need to validate your idea,
          ready to extend with Next.js 15 and Prisma.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button className="px-8 py-3 text-base font-semibold">Get started free</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="px-8 py-3 text-base">Sign in to demo</Button>
          </Link>
        </div>
        <p className="mt-3 text-sm text-gray-500">Demo login: owner@acme.test / password123 (after seeding)</p>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-center text-2xl font-black">What&apos;s in the Lite version</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {features.map(({ title, desc }) => (
            <Card key={title} className="p-6">
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* LITE vs FULL COMPARISON TABLE */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-center text-3xl font-black sm:text-4xl">Lite (free) vs Full ($99)</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
          Lite covers everything you need to validate an idea. Full is the complete production stack — plus support and lifetime updates.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-gray-700">Capability</th>
                <th className="px-5 py-3 text-center font-semibold text-gray-500 w-28">Lite — free</th>
                <th className="px-5 py-3 text-center font-semibold text-brand w-28">Full — $99</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonRows.map(({ capability, lite, full }) => (
                <tr key={capability} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-800">{capability}</td>
                  <td className="px-5 py-3 text-center">
                    {lite ? (
                      <span className="text-green-500 font-semibold">✓</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {full ? (
                      <span className="text-green-500 font-semibold">✓</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* UPGRADE CTA */}
      <section className="bg-indigo-600 py-16 text-white" id="upgrade">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 inline-block rounded-full bg-indigo-500 px-4 py-1 text-sm font-semibold">
            Upgrade to Full — $99
          </div>
          <h2 className="text-3xl font-black">The complete production stack.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-200">
            Everything in Lite, plus the features that turn a validated idea into a shippable product:
          </p>
          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-indigo-100">
            {[
              "Stripe billing + HMAC-verified webhook",
              "API keys (hashed) + versioned public API (/api/v1/*)",
              "Per-org audit logs — drop-in compliance trail",
              "1-click Vercel deploy + Neon provisioning",
              "Typed API layer (route() + Zod validation)",
              "90-second setup walkthrough (Loom)",
              "Deploy help",
              "Priority email support — 1 business day",
              "Lifetime updates — free forever",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href={FULL_VERSION_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
            <button className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-indigo-700 transition hover:bg-indigo-50">
              Upgrade to Full — $99 on Gumroad
            </button>
          </a>
          <p className="mt-3 text-sm text-indigo-300">One-time payment · Perpetual license · Lifetime updates included</p>
        </div>
      </section>

      {/* STACK */}
      <section className="py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Built with</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {["Next.js 15", "TypeScript", "Prisma", "Auth.js v5", "Tailwind CSS", "PostgreSQL", "Zod"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
        <p>
          <span className="font-bold text-brand">◆ SaaS Starter Lite</span> — free, MIT-licensed multi-tenant Next.js boilerplate.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href={FULL_VERSION_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            Full version on Gumroad
          </a>
          <Link href="/login" className="hover:text-brand">Sign in</Link>
          <Link href="/register" className="hover:text-brand">Register</Link>
        </div>
      </footer>

    </main>
  );
}
