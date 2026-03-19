import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200",
        variant === "primary" &&
          "bg-accent text-white shadow-soft hover:-translate-y-0.5 hover:bg-accent/95",
        variant === "secondary" &&
          "border border-line bg-white/80 text-ink hover:bg-white",
        variant === "ghost" && "text-ink/70 hover:bg-white/60",
        className
      )}
    >
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </Link>
  );
}
