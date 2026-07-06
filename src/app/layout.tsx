import type { Metadata } from "next";
import Script from "next/script";
import { CheckoutTracker } from "@/components/analytics";
import "./globals.css";

// Set NEXT_PUBLIC_GA_ID in your deployment to enable Google Analytics.
// Left unset by default so buyers who clone this template don't ship
// someone else's analytics ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const SITE_URL = "https://saas-starter.slashman413.com";
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SaaS Starter Lite — Free Multi-Tenant Next.js Boilerplate",
    template: "%s | SaaS Starter Lite",
  },
  description:
    "Free, open-source Next.js 15 SaaS boilerplate with multi-tenancy, Auth.js v5, Prisma, and RBAC. Start building your B2B SaaS today.",
  keywords: [
    "Next.js SaaS boilerplate",
    "free multi-tenant SaaS starter",
    "Next.js Prisma Auth.js template",
    "B2B SaaS starter kit",
    "Next.js 15 boilerplate",
    "SaaS starter template",
    "multi-tenancy Next.js",
    "Next.js Auth.js boilerplate",
    "B2B SaaS boilerplate",
    "SaaS starter kit TypeScript",
    "Next.js RBAC template",
  ],
  authors: [{ name: "slashman413" }],
  creator: "slashman413",
  publisher: "slashman413",
  category: "Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SaaS Starter Lite",
    title: "SaaS Starter Lite — Free Multi-Tenant Next.js Boilerplate",
    description:
      "Free, open-source Next.js 15 SaaS boilerplate with multi-tenancy, Auth.js v5, Prisma, and RBAC. Start building your B2B SaaS today.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SaaS Starter — Next.js Multi-Tenant SaaS Boilerplate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Starter Lite — Free Multi-Tenant Next.js Boilerplate",
    description:
      "Free, open-source Next.js 15 SaaS boilerplate with multi-tenancy, Auth.js v5, Prisma, and RBAC. Start building your B2B SaaS today.",
    images: [OG_IMAGE],
    creator: "@slashman413",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
            <CheckoutTracker />
          </>
        ) : null}
      </body>
    </html>
  );
}
