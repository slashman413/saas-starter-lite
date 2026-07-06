"use client";

import { useEffect } from "react";

// Fires a GA4 `begin_checkout` event when a user clicks a checkout link
// (Gumroad / LemonSqueezy / Ko-fi). Lets the pageview -> checkout step be
// measured. No-op unless GA4 is loaded (NEXT_PUBLIC_GA_ID set in layout).
export function CheckoutTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!/gumroad\.com|lemonsqueezy\.com|ko-?fi\.com/i.test(href)) return;
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "begin_checkout", {
          product: "saas-starter",
          cta_text: (a.textContent || "").trim().slice(0, 60),
          destination: href,
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
