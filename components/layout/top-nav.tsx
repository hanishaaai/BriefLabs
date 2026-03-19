import Link from "next/link";

import { brand, navItems } from "@/data/product-content";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-white shadow-soft">
            L
          </div>
          <div>
            <div className="font-display text-lg text-ink">{brand.chosenName}</div>
            <div className="text-xs tracking-[0.18em] text-ink/45 uppercase">
              Influencer brief intelligence
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-line bg-white/65 p-1.5 shadow-soft md:flex">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink/70 transition hover:bg-white hover:text-ink"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/dashboard"
          className="rounded-full border border-line bg-white/80 px-4 py-2 text-sm text-ink transition hover:bg-white"
        >
          Open workspace
        </Link>
      </div>
    </header>
  );
}
