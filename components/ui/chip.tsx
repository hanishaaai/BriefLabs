import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  className?: string;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.18em] text-ink/65 uppercase backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}
