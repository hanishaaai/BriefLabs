import Link from "next/link";

import { brand, footerLinks } from "@/data/product-content";

export function MarketingFooter() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10 pt-6 lg:px-10">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-white/72 px-6 py-8 shadow-soft lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <div className="font-display text-2xl text-ink">{brand.chosenName}</div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink/60">
            A calmer way to build creator briefs that feel clear, strategic, and ready to
            share.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink/62">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
