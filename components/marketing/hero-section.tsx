import { ButtonLink } from "@/components/ui/button-link";
import { Chip } from "@/components/ui/chip";
import { brand, ctaLinks, featureStrip, heroMetrics } from "@/data/product-content";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
      <div className="space-y-8">
        <Chip>Creator brief intelligence</Chip>
        <div className="space-y-5">
          <h1 className="max-w-4xl font-display text-5xl leading-tight text-ink md:text-6xl lg:text-7xl">
            Create influencer briefs that creators actually understand.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-ink/68 text-balance">
            Lumia Brief helps brands turn scattered campaign inputs into polished,
            creator-friendly briefs with built-in AI guidance, hook generation, and
            interpretation testing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {ctaLinks.map(({ label, href, icon }) => (
            <ButtonLink key={label} href={href} icon={icon}>
              {label}
            </ButtonLink>
          ))}
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {heroMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-line bg-white/72 p-5 shadow-soft"
            >
              <div className="font-display text-3xl text-ink">{item.value}</div>
              <div className="mt-2 text-sm text-ink/60">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grain relative overflow-hidden rounded-[2rem] border border-white/60 bg-panel p-6 shadow-card lg:p-8">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs tracking-[0.22em] text-ink/45 uppercase">
                Live workspace preview
              </div>
              <div className="mt-2 font-display text-3xl text-ink">
                Solstice Serum Spring Push
              </div>
            </div>
            <div className="rounded-full bg-accent-soft px-4 py-2 text-sm text-accent">
              Readiness 84
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-line bg-mist p-5">
              <div className="text-sm text-ink/50">AI Brief Assistant</div>
              <p className="mt-3 text-sm leading-7 text-ink/75">
                Your key message is strong, but creators may still need a more specific CTA
                and a clearer cue on when the product should appear on screen.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-line bg-white p-5">
              <div className="text-sm text-ink/50">Potential hooks</div>
              <ul className="mt-3 space-y-3 text-sm text-ink/78">
                <li>POV: The routine swap that made my skin look calmer fast.</li>
                <li>This is how I would explain this serum in 15 seconds.</li>
                <li>A realistic morning routine with one product that earns its spot.</li>
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-line bg-accent/95 p-5 text-white">
              <div className="text-sm text-white/72">Creator interpretation lens</div>
              <p className="mt-3 text-sm leading-7 text-white/88">
                The brief feels collaborative overall, though the visual direction may read a
                little too fixed unless you leave room for the creator's own routine style.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {featureStrip.slice(0, 5).map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-2 text-xs text-ink/65"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
