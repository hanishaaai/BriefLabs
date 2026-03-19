import { Chip } from "@/components/ui/chip";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description
}: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      <Chip>{eyebrow}</Chip>
      <div className="space-y-3">
        <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-ink/64">{description}</p>
      </div>
    </div>
  );
}
